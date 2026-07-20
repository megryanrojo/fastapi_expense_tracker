# Xpens Tracker

Xpens Tracker is a small expense tracking app with a FastAPI backend and a React frontend. It covers login, user accounts, expenses, income, and a dashboard with a few summary cards and charts.

## What is inside

- FastAPI backend with JWT login
- SQLite database for users, expenses, income, and categories
- React + Vite frontend
- Tailwind CSS for styling
- Chart.js for dashboard graphs

## Main screens

- Landing page with login modal
- Dashboard with total spent, revenue, net balance, category summary, and cash flow
- Transactions page, which is there but still pretty bare

## Setup

You will need Python 3.12+ and Node.js.

### Backend

1. Create and activate a virtual environment:

```bash
python -m venv .venv
source .venv/bin/activate
```

2. Install the backend packages:

```bash
pip install fastapi[standard] uvicorn bcrypt jwt python-jose requests
```

3. Create a `.env` file in the project root and add your secret key:

```env
SECRET_KEY=your_secret_key_here
```

4. Initialize the database:

```bash
python backend/database/init_db.py
```

5. Start the API:

```bash
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

The API docs will be at `http://127.0.0.1:8000/docs`.

### Frontend

1. Move into the frontend folder:

```bash
cd frontend
```

2. Install the frontend packages:

```bash
npm install
```

3. Start the frontend:

```bash
npm run dev
```

## API at a glance

- `POST /api/v1/auth/login`
- `POST /api/v1/users`
- `GET /api/v1/users`
- `GET /api/v1/users/{user_id}`
- `PATCH /api/v1/users/{user_id}`
- `POST /api/v1/expenses`
- `GET /api/v1/expenses`
- `GET /api/v1/expenses/total`
- `GET /api/v1/expenses/category-summary`
- `GET /api/v1/expenses/expense-cash-flow`
- `GET /api/v1/income`
- `POST /api/v1/income`
- `GET /api/v1/income/total`
- `GET /api/v1/income/cash-flow`
- `GET /api/v1/users/me/net-balance`

## Project structure

- `backend/main.py` starts the API and registers the routers.
- `backend/routers/` holds the auth, user, expense, and income routes.
- `backend/database/` contains the SQLite setup and query files.
- `frontend/src/pages/` has the landing page, dashboard, and transactions page.
- `frontend/src/components/` holds the dashboard and UI pieces.

## Notes

- The root `main.py` is just a small placeholder.
- The transactions page is not fully built yet.
- The backend and frontend both expect to run locally during development.
