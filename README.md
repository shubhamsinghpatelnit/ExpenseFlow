# ExpenseFlow

ExpenseFlow is a simple full-stack expense management application built for learning backend development and explaining a real project in SDE interviews.

## Objective

The project helps users record and organize day-to-day expenses so they can understand where their money is being spent.

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: SQLite

## Features

- Add a new expense
- View all expenses
- View a single expense
- Update an expense through the API
- Delete an expense
- Filter expenses by category
- Filter expenses by date
- Calculate total spending
- Show category-wise spending summary
- Persistent SQLite storage
- Basic validation and error handling

## Project Structure

```text
ExpenseFlow/
|
|-- src/
|   |-- server.js
|   |-- routes/
|   |   `-- expenseRoutes.js
|   |-- controllers/
|   |   `-- expenseController.js
|   |-- db/
|   |   `-- database.js
|   `-- utils/
|       `-- validation.js
|
|-- public/
|   |-- index.html
|   |-- style.css
|   `-- script.js
|
|-- data/
|   `-- expenses.db   # created automatically when the app runs
|
|-- package.json
|-- .gitignore
`-- README.md
```

## API Endpoints

### Create expense
`POST /api/expenses`

Example body:

```json
{
  "amount": 500,
  "category": "Food",
  "description": "Dinner",
  "date": "2026-08-19"
}
```

### Get all expenses
`GET /api/expenses`

Optional filters:

`GET /api/expenses?category=Food`

`GET /api/expenses?date=2026-08-19`

### Get one expense
`GET /api/expenses/:id`

### Update expense
`PUT /api/expenses/:id`

### Delete expense
`DELETE /api/expenses/:id`

### Expense summary
`GET /api/expenses/summary`

## Run Locally

1. Install Node.js.
2. Open this project in a terminal.
3. Run:

```bash
npm install
npm start
```

4. Open:

```text
http://localhost:3000
```

## Backend Flow

```text
Frontend
   |
   v
Express Route
   |
   v
Controller
   |
   v
SQLite Database
   |
   v
JSON Response
```

## Interview Explanation

ExpenseFlow is a REST-based expense management application. The frontend sends HTTP requests to an Express backend. Express routes forward those requests to controller functions, which validate the input and execute SQLite queries. The application supports CRUD operations, filtering, and spending summaries.

The project intentionally uses a simple architecture so every part can be understood and explained clearly.
