# Project Admin & Maintainer Guide

Congratulations on being selected as a Project Admin for SWOC (Script Winter of Code)! This guide will help you manage your project, `Smart-Rent`, effectively.

## 1. Setting Up Your Repository

### Branching Strategy
- **`main`**: The production-ready code. Avoid committing directly to this branch.
- **`develop`** (Optional but recommended): A branch where all features are merged before going to `main`.
- **Feature Branches**: Contributors should create branches like `feat/login-page` or `fix/nav-bug` from `main` (or `develop`).

### Issue Labels
Create these labels in your GitHub repository (`Issues` -> `Labels`) to help contributors find tasks:
- `good first issue`: Easy tasks for beginners (e.g., typos, simple CSS fixes).
- `help wanted`: Tasks where you need assistance.
- `bug`: Something isn't working.
- `enhancement`: New feature or improvement.
- `documentation`: Improvements to README or other docs.
- `SWOC`: Specifically for SWOC participants.

## 2. Managing Contributors

### Assigning Issues
- Contributors will comment on issues, asking to be assigned.
- Assign the issue to **one** person at a time to avoid conflicts.
- Ask them for an estimated timeline (e.g., "Can you finish this in 2 days?").

### Reviewing Pull Requests (PRs)
When a contributor submits a PR:
1.  **Check the Description**: Does it follow the template? Does it link to an issue (e.g., `Fixes #12`)?
2.  **Review the Code**:
    *   Look for clean, readable code.
    *   Ensure no unnecessary files (like `.env` or `node_modules`) are committed.
    *   Check for comments and documentation.
3.  **Test Locally**:
    *   Pull their branch: `git checkout -b <their-branch> origin/<their-branch>`
    *   Run the project (`npm run dev`) and verify the fix/feature.
4.  **Request Changes**: If something is wrong, be polite and constructive. Example: *"Great start! Could you please fix this formatting issue on line 45?"*
5.  **Merge**: Once everything looks good, approve and merge the PR!

## 3. Communication
- Be active in the SWOC discord/community.
- Respond to GitHub issues and PRs promptly (within 24-48 hours is good practice).
- Be welcoming! Open source can be intimidating for new folks.

## 4. Post-SWOC
- Thank your contributors.
- Update your `CONTRIBUTORS.md` (if you have one) to recognize their work.

Good luck! You're going to build something amazing while helping others learn.
