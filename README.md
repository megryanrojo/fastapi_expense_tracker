# Xpens Tracker

A backend expense tracker API built with FastAPI, SQLite, and JWT authentication.

## Current Status

- Backend-only FastAPI application.
- SQLite database stored in `backend/database/expenses.db`.
- JWT login and protected expense endpoints.
- User registration and user query endpoints are available.
- No frontend included.

> The root `main.py` is a placeholder greeting. The actual FastAPI app entrypoint is `backend/main.py`.

## Requirements

- Python 3.12+
- Python packages:
  - `fastapi[standard]`
  - `uvicorn`
  - `bcrypt`
  - `jwt`
  - `python-jose`
  - `requests`
  - `python-dotenv`

> Note: `python-dotenv` is required by `backend/core/jwt_handler.py` but is not listed in the current `pyproject.toml` dependencies.

## Setup

1. Create and activate a virtual environment:

```bash
python -m venv .venv
source .venv/bin/activate
```

2. Install dependencies:

```bash
pip install fastapi[standard] uvicorn bcrypt jwt python-jose requests python-dotenv
```

3. Create a `.env` file in the project root with at least:

```env
SECRET_KEY=your_secret_key_here
```

4. Initialize the database and default categories:

```bash
cd backend/database
python init_db.py
```

5. Start the API server from the project root:

```bash
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

6. Open the interactive API docs:

- `http://127.0.0.1:8000/docs`
- `http://127.0.0.1:8000/redoc`

## API Endpoints

### Authentication

- `POST /api/v1/auth/login`
  - Request body: `name`, `password`
  - Returns: `access_token`, `token_type`, `name`

### Users

- `POST /api/v1/users`
  - Create a new user.
  - Request body: `name`, `password`, `date_created`

- `GET /api/v1/users`
  - List all users.

- `GET /api/v1/users/{user_id}`
  - Get a specific user by ID.

- `PATCH /api/v1/users/{user_id}`
  - Update user name and/or password.

### Expenses (requires Bearer token)

- `POST /api/v1/expenses`
  - Create a new expense.
  - Request body: `title`, `amount`, `category_id`, `expense_date`.
  - `user_id` is assigned from the authenticated token.

- `GET /api/v1/expenses`
  - Get the authenticated users expenses (up to 10 records).

- `GET /api/v1/expenses/{expense_id}`
  - Get a single expense by ID.

- `GET /api/v1/expenses/category/{category_id}`
  - Get expenses for the authenticated user filtered by category.

- `PATCH /api/v1/expenses/{expense_id}`
  - Update title, amount, and/or category of an expense.

## Database

- Database path: `backend/database/expenses.db`
- Schema is created by `backend/database/init_db.py`.
- Default categories seeded on initialization include:
  - Entertainment
  - Groceries
  - Fast Food
  - Rent
  - Transport
  - Gas

## Notes and Limitations

- Expense list endpoints currently limit results to 10 items.
- There is no exposed delete endpoint for expenses.
- User endpoints are not protected by authentication.
- `expense_date` is included in models but is set to the database default current date on insert.
- JWT token expiry is 30 minutes.

## Project Structure

- `backend/main.py` - FastAPI application and router registration.
- `backend/routers/` - Route definitions for auth, users, and expenses.
- `backend/schemas/` - Pydantic request/response models.
- `backend/database/` - SQLite connection, initialization, and query logic.
- `backend/core/` - JWT handling and dependency helpers.

## Running Locally

From the project root:

```bash
uvicorn backend.main:app --reload
```

Then use `/docs` to explore the API interactively.
