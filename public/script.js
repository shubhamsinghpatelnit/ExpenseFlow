const form = document.getElementById("expense-form");

let editingId = null;


// ==========================================
// ADD / UPDATE EXPENSE
// ==========================================

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const amount =
        document.getElementById("amount").value;

    const category =
        document.getElementById("category").value;

    const description =
        document.getElementById("description").value;

    const date =
        document.getElementById("date").value;


    const expense = {
        amount,
        category,
        description,
        date
    };


    let response;


    // ----------------------------------
    // CREATE
    // ----------------------------------

    if (editingId === null) {

        response = await fetch("/api/expenses", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(expense)
        });

    }


    // ----------------------------------
    // UPDATE
    // ----------------------------------

    else {

        response = await fetch(
            `/api/expenses/${editingId}`,
            {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(expense)
            }
        );
    }


    const data = await response.json();

    console.log(data);


    // Clear form
    form.reset();


    // Return to Add mode
    editingId = null;


    document.querySelector(
        '#expense-form button[type="submit"]'
    ).textContent = "Add Expense";


    // Refresh expenses
    await loadExpenses();


    // Refresh summary
    await loadSummary();
});



// ==========================================
// LOAD / DISPLAY EXPENSES
// ==========================================

async function loadExpenses(url = "/api/expenses") {

    const response = await fetch(url);

    const expenses = await response.json();


    const expenseList =
        document.getElementById("expense-list");


    // Remove old displayed expenses
    expenseList.innerHTML = "";


    expenses.forEach((expense) => {

        const item =
            document.createElement("p");


        item.textContent =
            `${expense.category} - ₹${expense.amount} - ${expense.description || ""} `;



        // ==================================
        // EDIT BUTTON
        // ==================================

        const editButton =
            document.createElement("button");


        editButton.textContent = "Edit";


        editButton.addEventListener("click", () => {


            // Put old data into form

            document.getElementById("amount").value =
                expense.amount;


            document.getElementById("category").value =
                expense.category;


            document.getElementById("description").value =
                expense.description || "";



            // ----------------------------------
            // Put old date into form
            // ----------------------------------

            const expenseDate =
                new Date(expense.expense_date);


            const year =
                expenseDate.getFullYear();


            const month =
                String(
                    expenseDate.getMonth() + 1
                ).padStart(2, "0");


            const day =
                String(
                    expenseDate.getDate()
                ).padStart(2, "0");


            document.getElementById("date").value =
                `${year}-${month}-${day}`;



            // Remember which expense is being edited
            editingId = expense.id;


            // Change submit button
            document.querySelector(
                '#expense-form button[type="submit"]'
            ).textContent = "Update Expense";


            console.log(
                "Editing ID:",
                editingId
            );
        });



        // ==================================
        // DELETE BUTTON
        // ==================================

        const deleteButton =
            document.createElement("button");


        deleteButton.textContent = "Delete";


        deleteButton.addEventListener(
            "click",
            async () => {

                const response =
                    await fetch(
                        `/api/expenses/${expense.id}`,
                        {
                            method: "DELETE"
                        }
                    );


                const data =
                    await response.json();


                console.log(data);


                // Refresh expense list
                await loadExpenses();


                // Refresh summary
                await loadSummary();
            }
        );



        // Add buttons to expense
        item.appendChild(editButton);

        item.appendChild(deleteButton);


        // Add expense to page
        expenseList.appendChild(item);
    });
}



// ==========================================
// LOAD SUMMARY
// ==========================================

async function loadSummary() {

    const response =
        await fetch("/api/expenses/summary");


    const summary =
        await response.json();



    // ----------------------------------
    // TOTAL EXPENSE
    // ----------------------------------

    document.getElementById(
        "total-expense"
    ).textContent =
        summary.total || 0;



    // ----------------------------------
    // CATEGORY WISE SUMMARY
    // ----------------------------------

    const categorySummary =
        document.getElementById(
            "category-summary"
        );


    // Remove old category summary
    categorySummary.innerHTML = "";


    summary.categoryWise.forEach(
        (item) => {

            const p =
                document.createElement("p");


            p.textContent =
                `${item.category}: ₹${item.total}`;


            categorySummary.appendChild(p);
        }
    );
}



// ==========================================
// FILTER EXPENSES
// ==========================================

const filterButton =
    document.getElementById(
        "filter-button"
    );


filterButton.addEventListener(
    "click",
    async () => {


        const category =
            document.getElementById(
                "filter-category"
            ).value;


        const date =
            document.getElementById(
                "filter-date"
            ).value;



        let url = "/api/expenses";



        // Category + Date
        if (category && date) {

            url +=
                `?category=${category}&date=${date}`;
        }


        // Only Category
        else if (category) {

            url +=
                `?category=${category}`;
        }


        // Only Date
        else if (date) {

            url +=
                `?date=${date}`;
        }



        console.log(
            "Filter URL:",
            url
        );


        // Display filtered expenses
        await loadExpenses(url);
    }
);



// ==========================================
// RUN WHEN PAGE LOADS
// ==========================================

loadExpenses();

loadSummary();