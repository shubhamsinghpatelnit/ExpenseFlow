function validateExpense(data) {
    const { amount, category, date } = data;

    if (amount === undefined || amount === null || Number(amount) <= 0) {
        return "Amount must be greater than 0";
    }

    if (!category || category.trim() === "") {
        return "Category is required";
    }

    if (!date || Number.isNaN(Date.parse(date))) {
        return "A valid date is required";
    }

    return null;
}

module.exports = { validateExpense };
