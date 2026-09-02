const express = require("express");
const path = require("path");

const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

// Serve frontend files from public/
app.use(express.static(path.join(__dirname, "../public")));

// Expense APIs
app.use("/api/expenses", expenseRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});