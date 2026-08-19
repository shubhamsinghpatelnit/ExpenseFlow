const express = require("express");
const path = require("path");

const expRt = require("./routes/expenseRoutes");
require("./db/database");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api/expenses", expRt);

app.get("/api/health", (req, res) => {
    res.json({ message: "ExpenseFlow API is running" });
});

app.listen(port, () => {
    console.log(`ExpenseFlow running at http://localhost:${port}`);
});
