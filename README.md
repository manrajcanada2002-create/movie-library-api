# Movie Library API – Phase 5 (Auth, OTP & RBAC)

This project extends the previous phases by adding:

- Email + password login
- Email-based OTP (MFA)
- JWT token-based authentication
- Role-based access control (admin vs user)
- Frontend login + OTP flow
- Protected movie management UI

## How to Run – Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env and set:
# - MONGODB_URI
# - JWT_SECRET
# - EMAIL_USER (your Gmail)
# - EMAIL_PASS (Gmail App Password)

npm start
```

The backend will run on `http://localhost:5000`.

### Creating a User

Use a REST client (Postman, Thunder Client, curl) to create at least one user:

```http
POST http://localhost:5000/auth/register
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "secret123",
  "role": "admin"
}
```

## How to Run – Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`.

## Login + OTP Flow

1. Open the frontend and go to the **Login** page.
2. Enter your email and password, then click **Request OTP**.
3. Check the configured email inbox for the OTP code (or see server logs if email is not fully configured).
4. Go to the **Verify OTP** screen and enter the same email + OTP.
5. On success, a JWT token is stored and you are redirected to the **Movies** page.

## Route Protection

- Public:
  - `GET /api/movies`
  - `GET /api/movies/:id`
- Protected (admin only, requires valid JWT with role `admin`):
  - `POST /api/movies`
  - `PUT /api/movies/:id`
  - `DELETE /api/movies/:id`

The frontend hides **Add / Edit / Delete** controls when the logged-in user is not an admin.

