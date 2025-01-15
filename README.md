# Next.js Todolist

This repository contains a full-stack Todolist application built with **Next.js**, **Prisma**, and **PostgreSQL**. While the project is still a work in progress, it already includes features such as task management and user authentication.

---

## Features

- **Task Management**:
  - Create, update, and delete tasks.
  - Organize tasks with categories.
- **User Authentication**:
  - Secure user login and registration using **NextAuth**.
- **Theme Support**:
  - Light and dark mode functionality using **next-themes**.
- **Responsive Design**:
  - Fully responsive interface with **Tailwind CSS**.

---

## Requirements

- **Node.js** (v16 or higher)
- **PostgreSQL** database

---

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/Jszigeti/next-todolist.git
cd next-todolist
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the root directory and define the following variables:

```env
DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<database_name>"
NEXTAUTH_SECRET="your_secret_key"
NEXTAUTH_URL="http://localhost:3000"
```

Replace `<username>`, `<password>`, `<host>`, `<port>`, and `<database_name>` with your PostgreSQL credentials.

---

## Database Setup

### Prisma Migration

To set up the database schema, run:

```bash
npx prisma migrate dev
```

### Generate Prisma Client

```bash
npx prisma generate
```

---

## Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm run build
npm start
```

---

## Scripts

### Key Commands

| Script          | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the development server         |
| `npm run build` | Build the application for production |
| `npm start`     | Start the production server          |
| `npm run lint`  | Run linting with ESLint              |

---

## Project Structure

```plaintext
next-todolist/
├── app/                # Application routes and components
│   ├── api/            # API routes (Next.js API handlers)
│   ├── dashboard/      # Dashboard page folder
│   ├── signin/         # Signin page folder
│   ├── signup/         # Signup page folder
│   └── page.tsx        # Main page
├── components/         # Reusable components
├── prisma/
│   ├── schema.prisma   # Prisma schema
│   └── migrations/     # Database migrations
├── public/             # Static assets
├── types/              # Types
├── .env                # Environment variables
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
├── next.config.js      # Next.js configuration
└── package.json        # Project dependencies and scripts
```

---

## Known Issues

This application is a work in progress. Expect incomplete features and potential bugs. Contributions are welcome to improve and complete the application.

---

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

## License

This project is **UNLICENSED** and provided as an example. Feel free to adapt it to your needs.

---

## Contact

- Author: Jonas Szigeti
- GitHub: [https://github.com/Jszigeti](https://github.com/Jszigeti)
- Issues: [Open an issue](https://github.com/Jszigeti/next-todolist/issues)
