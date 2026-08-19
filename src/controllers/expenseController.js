const db = require("../db/database");
const { validateExpense } = require("../utils/validation");

function addExp(req, res) {
    const err = validateExpense(req.body);

    if (err) {
        return res.status(400).json({ error: err });
    }

    const { amount, category, description = "", date } = req.body;

    const sql = `
        INSERT INTO expenses (amount, category, description, date)
        VALUES (?, ?, ?, ?)
    `;

    db.run(
        sql,
        [Number(amount), category.trim(), description.trim(), date],
        function (dbErr) {
            if (dbErr) {
                return res.status(500).json({ error: "Failed to add expense" });
            }

            res.status(201).json({
                id: this.lastID,
                amount: Number(amount),
                category: category.trim(),
                description: description.trim(),
                date
            });
        }
    );
}

function getExp(req, res) {
    const { category, date } = req.query;

    let sql = "SELECT * FROM expenses";
    const con = [];
    const val = [];

    if (category) {
        con.push("LOWER(category) = LOWER(?)");
        val.push(category);
    }

    if (date) {
        con.push("date = ?");
        val.push(date);
    }

    if (con.length > 0) {
        sql += " WHERE " + con.join(" AND ");
    }

    sql += " ORDER BY date DESC, id DESC";

    db.all(sql, val, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: "Failed to fetch expenses" });
        }

        res.json(rows);
    });
}

function getOne(req, res) {
    const { id } = req.params;

    db.get("SELECT * FROM expenses WHERE id = ?", [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: "Failed to fetch expense" });
        }

        if (!row) {
            return res.status(404).json({ error: "Expense not found" });
        }

        res.json(row);
    });
}

function updExp(req, res) {
    const err = validateExpense(req.body);

    if (err) {
        return res.status(400).json({ error: err });
    }

    const { id } = req.params;
    const { amount, category, description = "", date } = req.body;

    const sql = `
        UPDATE expenses
        SET amount = ?, category = ?, description = ?, date = ?
        WHERE id = ?
    `;

    db.run(
        sql,
        [Number(amount), category.trim(), description.trim(), date, id],
        function (dbErr) {
            if (dbErr) {
                return res.status(500).json({ error: "Failed to update expense" });
            }

            if (this.changes === 0) {
                return res.status(404).json({ error: "Expense not found" });
            }

            res.json({ message: "Expense updated successfully" });
        }
    );
}

function delExp(req, res) {
    const { id } = req.params;

    db.run("DELETE FROM expenses WHERE id = ?", [id], function (err) {
        if (err) {
            return res.status(500).json({ error: "Failed to delete expense" });
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: "Expense not found" });
        }

        res.json({ message: "Expense deleted successfully" });
    });
}

function getSum(req, res) {
    const totalSql = `
        SELECT ROUND(COALESCE(SUM(amount), 0), 2) AS total
        FROM expenses
    `;

    const catSql = `
        SELECT category, ROUND(SUM(amount), 2) AS total
        FROM expenses
        GROUP BY category
        ORDER BY total DESC
    `;

    db.get(totalSql, [], (err, totalRow) => {
        if (err) {
            return res.status(500).json({ error: "Failed to calculate total" });
        }

        db.all(catSql, [], (catErr, rows) => {
            if (catErr) {
                return res.status(500).json({ error: "Failed to calculate category totals" });
            }

            res.json({
                total: totalRow.total,
                byCategory: rows
            });
        });
    });
}

module.exports = {
    addExp,
    getExp,
    getOne,
    updExp,
    delExp,
    getSum
};
