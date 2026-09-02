const db = require("../db/database");

// CREATE
const createExpense = (req, res) => {
    const { amount, category, description, date } = req.body;

    if (!amount || !category || !date) {
        return res.status(400).json({
            message: "Amount, category and date are required"
        });
    }

    const sql = `
        INSERT INTO expenses
        (amount, category, description, expense_date)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [amount, category, description, date], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Database error"
            });
        }

        res.status(201).json({
            message: "Expense added successfully",
            id: result.insertId
        });
    });
};


// READ ALL

const getAllExpenses = (req, res) => {
    const { category, date } = req.query;

    let sql = "SELECT * FROM expenses";
    let values = [];

    if (category && date) {
        sql += " WHERE category = ? AND expense_date = ?";
        values.push(category, date);
    }
    else if (category) {
        sql += " WHERE category = ?";
        values.push(category);
    }
    else if (date) {
        sql += " WHERE expense_date = ?";
        values.push(date);
    }

    db.query(sql, values, (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Database error"
            });
        }

        res.json(results);
    });
};

// READ ONE
const getExpenseById = (req, res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM expenses WHERE id = ?";

    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Database error"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        res.json(results[0]);
    });
};


// UPDATE
const updateExpense = (req, res) => {
    const id = req.params.id;

    const { amount, category, description, date } = req.body;

    const sql = `
        UPDATE expenses
        SET amount = ?, category = ?, description = ?, expense_date = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [amount, category, description, date, id],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Database error"
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Expense not found"
                });
            }

            res.json({
                message: "Expense updated successfully"
            });
        }
    );
};


// DELETE
const deleteExpense = (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM expenses WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Database error"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        res.json({
            message: "Expense deleted successfully"
        });
    });
};

const getExpenseSummary = (req, res) => {
    const totalSql = `
        SELECT SUM(amount) AS total
        FROM expenses
    `;

    const categorySql = `
        SELECT category, SUM(amount) AS total
        FROM expenses
        GROUP BY category
    `;

    db.query(totalSql, (err, totalResults) => {
        if (err) {
            return res.status(500).json({
                message: "Database error"
            });
        }

        db.query(categorySql, (err, categoryResults) => {
            if (err) {
                return res.status(500).json({
                    message: "Database error"
                });
            }

            res.json({
                total: totalResults[0].total,
                categoryWise: categoryResults
            });
        });
    });
};


module.exports = {
    createExpense,
    getAllExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
    getExpenseSummary
};