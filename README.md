# ExpenseFlow

ExpenseFlow is a full-stack expense management web application built with **Node.js, Express.js, MySQL, HTML, CSS, and Vanilla JavaScript**.

The project allows users to add, view, edit, update, delete, filter, and summarize expenses through a simple web interface.

## Features

- Add new expenses
- View all expenses
- Edit and update existing expenses
- Delete expenses
- Filter expenses by category
- Filter expenses by date
- Filter by category and date together
- View total expense amount
- View category-wise expense totals
- Automatic UI refresh after add, update, and delete
- Responsive frontend styling
- MySQL database integration
- Environment variables for database credentials

## Tech Stack

### Frontend
- HTML
- CSS
- Vanilla JavaScript

### Backend
- Node.js
- Express.js

### Database
- MySQL
- mysql2

### Other
- dotenv

## Project Structure

```text
ExpenseFlow-Learn/
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── src/
│   ├── controllers/
│   │   └── expenseController.js
│   ├── db/
│   │   └── database.js
│   ├── routes/
│   │   └── expenseRoutes.js
│   └── server.js
├── .env
├── .gitignore
├── package.json
└── package-lock.json
```

> `.env` is intentionally ignored by Git and should never be pushed to GitHub.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/expenses` | Create a new expense |
| GET | `/api/expenses` | Get all expenses |
| GET | `/api/expenses/:id` | Get one expense by ID |
| PUT | `/api/expenses/:id` | Update an expense |
| DELETE | `/api/expenses/:id` | Delete an expense |
| GET | `/api/expenses?category=Food` | Filter by category |
| GET | `/api/expenses?date=2026-09-03` | Filter by date |
| GET | `/api/expenses?category=Food&date=2026-09-03` | Filter by category and date |
| GET | `/api/expenses/summary` | Get total and category-wise summary |

## Database Setup

Create a MySQL database:

```sql
CREATE DATABASE expenseflow_learn;
USE expenseflow_learn;
```

Create the `expenses` table:

```sql
CREATE TABLE expenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL(10,2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    expense_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Environment Variables

Create a `.env` file in the project root:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=expenseflow_learn
```

Do not commit your `.env` file.

## Installation

Clone the repository and enter the project directory:

```bash
git clone <your-repository-url>
cd ExpenseFlow-Learn
```

Install dependencies:

```bash
npm install
```

Create the `.env` file with your MySQL configuration.

Start the server:

```bash
npm start
```

Open:

```text
http://localhost:3000
```

## How It Works

The frontend sends HTTP requests using the Fetch API.

```text
Browser
   ↓
Express Routes
   ↓
Controller
   ↓
MySQL
   ↓
JSON Response
   ↓
Frontend UI
```

For example, when a user adds an expense:

```text
Form Submit
   ↓
POST /api/expenses
   ↓
createExpense controller
   ↓
INSERT INTO expenses
   ↓
MySQL
   ↓
JSON response
   ↓
Expense list and summary refresh
```

## Future Improvements

- Improved frontend error handling
- More input validation
- Pagination
- Authentication
- Monthly analytics and charts
- Deployment

## Author

**Shubham Singh**
