# 🖥️ HabitToolServer

HabitToolServer is the backend server for the HabitTool application, a system for tracking and maintaining a record of daily habits. This repository contains the source code of the server, developed in Node.js, using MySQL as the database and Prisma as the ORM.

## 📜 Description

HabitToolServer is responsible for providing the necessary APIs for the HabitTool application. It manages operations related to habits, users, and authentication.

## ✨ Features

- Habit management: creation and listing of habits.
- Database integration: uses MySQL as the database and Prisma as the ORM.

## ⚙️ Prerequisites

- Node.js (version X.X.X)
- MySQL (installed and configured)
- Prisma (installed globally)

## 🚀 Installation

1. Clone the repository to your local environment:
git clone https://github.com/RomuloRamos/HabitToolServer.git
2. Navigate to the project directory:
cd HabitToolServer
3. Install the dependencies:
npm install
4. Configure the environment variables:
- Create a `.env` file in the root of the project.
- Set the following environment variables in the `.env` file:
  ```
  DATABASE_URL="file:./dev.db"
  SERVER_ADDR="Server IP"
  PORT="Port to be used"
  ```
5. Run the database migrations:
npx prisma migrate dev
6. Start the server:
npm run dev

## 💡 Usage

- HTTP - Server Running.

## 🤝 Contributing

Contributions are welcome! Feel free to submit pull requests with improvements, bug fixes, or new features. To contribute to the project, follow these steps:

1. Fork the repository.
2. Create a new branch for your changes: `git checkout -b my-feature`.
3. Make the desired changes and commit.
4. Push your changes to your fork: `git push origin my-feature`.
5. Submit a pull request on GitHub.

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## ✍️ Author

- Name: Rômulo Ramos
- Email: romulo.ramos@gee.inatel.br

## 📝 Additional Notes

- For more information about the HabitTool frontend, refer to the [HabitToolFrontend repository](https://github.com/RomuloRamos/HabitToolFrontend).
- For more information about the HabitTool mobile application, refer to the [HabitToolMobile repository](https://github.com/RomuloRamos/HabitToolMobile).
- To report issues or request new features, create an issue in this repository.
