const express = require("express");
const ctr = require("../controllers/expenseController");

const rt = express.Router();

rt.get("/summary", ctr.getSum);

rt.post("/", ctr.addExp);
rt.get("/", ctr.getExp);
rt.get("/:id", ctr.getOne);
rt.put("/:id", ctr.updExp);
rt.delete("/:id", ctr.delExp);

module.exports = rt;
