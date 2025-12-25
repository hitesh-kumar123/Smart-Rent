# Contributing to Smart Rent System

Welcome to the Smart Rent System project!

First off, thank you for considering contributing to Smart Rent System. It's people like you that make the open-source community such an amazing place to learn, inspire, and create.

This project is part of **Social Winter of Code (SWoC)** and is built using the **MERN Stack** (MongoDB, Express, React, Node.js). We welcome contributors of all skill levels, from beginners to experienced developers.

## 1. Ways to Contribute

You can contribute in many ways:
- **Code:** Fix bugs, add new features, or improve performance.
- **Documentation:** Improve README, fix typos, or add code comments.
- **Testing:** Add unit tests to improve code reliability.
- **UI/UX:** Improve the design or user experience of the frontend.
- **Issues:** Report bugs or suggest new features.

## 2. Project Setup

Follow these steps to get the project running on your local machine.

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB (Local or Atlas URL)
- Git

### Installation

1.  **Fork the repository**
    Click the "Fork" button at the top right of this page to create your own copy of the repository.

2.  **Clone your fork**
    ```bash
    git clone https://github.com/YOUR-USERNAME/Smart-Rent-System.git
    cd Smart-Rent-System
    ```

3.  **Setup Backend**
    ```bash
    cd backend
    npm install
    # Create a .env file and add your MongoDB URL and other secrets
    npm run dev
    ```

4.  **Setup Frontend**
    Open a new terminal terminal:
    ```bash
    cd frontend
    npm install
    npm start
    ```

The frontend should now be running at `http://localhost:3000` and the backend at `http://localhost:8000`.

## 3. Branching Strategy

We follow a strict branching strategy to keep the codebase clean.

- **`main`**: The production-ready code. **Do not push directly to this branch.**
- **Feature Branches**: Create a new branch for every feature or bug fix.

**Naming Convention:**
- `feat/feature-name` (e.g., `feat/login-page`)
- `fix/bug-name` (e.g., `fix/navbar-issue`)
- `docs/documentation-change` (e.g., `docs/update-readme`)

To create a branch:
```bash
git checkout -b feat/your-feature-name
```

## 4. Commit Message Guidelines

- Use clear and descriptive commit messages.
- Start with a verb in present tense (e.g., "Add", "Fix", "Update").
- **Good:** `Fix login validation error`
- **Bad:** `Fixed bug` or `Update`

## 5. Pull Request Process

1.  **Sync your fork:** Ensure your fork is up to date with the original repository before starting.
2.  **Create a Branch:** As described above.
3.  **Make Changes:** Write your code and test it.
4.  **Commit and Push:**
    ```bash
    git add .
    git commit -m "Add descriptive message"
    git push origin your-branch-name
    ```
5.  **Create PR:** Go to the original repository and click "Compare & pull request".
6.  **Description:** Fill out the PR template. Explain **what** you changed and **why**. Attach screenshots if it's a UI change.
7.  **Review:** Wait for a maintainer to review. Be open to feedback and make changes if requested.

## 6. Issue Guidelines

- **Search first:** Before creating a new issue, search existing issues to avoid duplicates.
- **Be clear:** Describe the bug or feature request in detail.
- **Claiming issues:** If you want to work on an issue, comment "I would like to work on this" on the issue. Wait to be assigned before starting work.

## 7. Code Style & Best Practices

- **Formatting:** Use Prettier or standard indentation (2 or 4 spaces) consistently.
- **Variables:** Use meaningful variable names (camelCase for JS).
- **Comments:** Comment complex logic, but avoid stating the obvious.
- **Clean Code:** Remove `console.log` statements before pushing code.

## 8. Communication & Help

If you have questions or get stuck:
- Open a GitHub Issue with the `question` label.
- Join the project's communication channel (Discord/Slack/Etc) if available.
- Be respectful and patient.

## 9. Code of Conduct 

All contributors are expected to adhere to our [Code of Conduct](./CODE_OF_CONDUCT.md). We pledge to create a harassment-free community for everyone.

## 10. Maintainer Review Process

Maintainers will review your PR as soon as possible.
- If everything looks good, it will be merged! 🚀
- If changes are needed, you will receive comments. Please address them and re-request review.

Thank you for contributing to Smart-Rent! Happy coding! 💻
