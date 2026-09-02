


const express = require("express");

const {
    createExpense,
    getAllExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
    getExpenseSummary
} = require("../controllers/expenseController");




const router = express.Router();

router.post("/", createExpense);
router.get("/", getAllExpenses);
router.get("/summary", getExpenseSummary);
router.get("/:id", getExpenseById);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

module.exports = router;