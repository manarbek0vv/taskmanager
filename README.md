# 🗂️ Task Manager App

A complete full-stack task management application. Includes registration, authentication, task assignment, deadlines, statuses and much more.

---

## 📦 Technologies

### Backend (NestJS)
- NestJS + TypeScript
- Prisma ORM + PostgreSQL
- JWT authentication
- Validation (Pipes)
- File storage (uploads)

### Frontend (React)
- React + TypeScript
- Mobx state
- Axios
- React Router

---

## 🚀 Quick Start

### 1. Clone repository

```bash
git clone https://github.com/manarbek0vv/taskmanager.git
cd taskmanager
```

---

### 2. Installing dependencies

```bash
# Installing dependencies at root (if workspace is used)
npm install

# Or separately:
cd server && npm install
cd ../client && npm install
```

---

### 3. Setting up `.env` files

Create `.env` in the `server/` folder:

```bash
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
ACCESS_SECRET_KEY=your_secret_key
REFRESH_SECRET_KEY=you_secret_key
CLIENT_URL=http://localhost:5173
```

Create `.env` в `client/`:

```bash
VITE_API_URL=http://localhost:5000
```

---

### 4. Setting up Prisma (server)

```bash
cd server
npx prisma generate
npx prisma migrate dev --name init
```

---

### 5. Launch

#### Backend (NestJS):

```bash
cd server
npm run start:dev
```

#### Frontend (React):

```bash
cd client
npm run dev
```

---

## 📁 Project structure

```
task-manager-app/
│
├── client/         # Frontend
├── server/         # Backend (NestJS)
│   ├── src/
│   ├── prisma/
│   ├── uploads/    # uploading files (ignored in git)
│   ├── .env
│   └── ...
└── README.md
```

---

## 🛡 Safety

- All secrets and tokens are hidden in `.env`
- `.gitignore` is set up correctly
- Folders `dist/`, `uploads/`, `generated/`, `node_modules/` are not included in git

---

## 🧑‍💻 Author

**manarbek0vv**  
[GitHub profile](https://github.com/manarbek0vv)

---

## 📜 License

An open source project licensed under the MIT license.