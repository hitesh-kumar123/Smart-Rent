# Contributing to Smart-Rent

Welcome to Smart-Rent! We're excited to have you contribute to this open-source MERN rental property management platform. This document provides guidelines and instructions for contributing to the project.

Whether you're fixing bugs, adding features, improving documentation, or suggesting enhancements, we appreciate your effort to make Smart-Rent better for everyone.

---

## Table of Contents

- [How to Contribute](#how-to-contribute)
- [Setup Instructions](#setup-instructions)
- [Coding Standards](#coding-standards)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Issue Reporting](#issue-reporting)
- [Good First Issues](#good-first-issues)
- [Communication](#communication)
- [Code of Conduct](#code-of-conduct)

---

## How to Contribute

### Step 1: Fork the Repository

1. Go to the [Smart-Rent repository](https://github.com/hitesh-kumar123/Smart-Rent)
2. Click the **Fork** button in the top-right corner
3. This creates a copy of the repository under your GitHub account

### Step 2: Clone Your Fork

```bash
# Clone your forked repository
git clone https://github.com/YOUR_USERNAME/Smart-Rent.git

# Navigate to the project directory
cd Smart-Rent

# Add upstream repository as a remote
git remote add upstream https://github.com/hitesh-kumar123/Smart-Rent.git
```

### Step 3: Create a New Branch

Always create a new branch for your work. Do not commit directly to `main` or `master`.

```bash
# Fetch the latest changes from upstream
git fetch upstream

# Create a new branch from the latest upstream main
git checkout -b YOUR_BRANCH_NAME upstream/main
```

### Branch Naming Conventions

Use descriptive branch names following these patterns:

| Type          | Pattern                   | Example                          |
| ------------- | ------------------------- | -------------------------------- |
| Feature       | `feature/feature-name`    | `feature/add-wishlist`           |
| Bug Fix       | `fix/bug-description`     | `fix/booking-date-validation`    |
| Documentation | `docs/doc-name`           | `docs/update-contributing-guide` |
| Refactor      | `refactor/component-name` | `refactor/auth-middleware`       |
| Tests         | `test/test-description`   | `test/add-booking-tests`         |

✅ **Good branch names**:

- `feature/property-search-filter`
- `fix/cors-error-handling`
- `docs/api-documentation`

❌ **Bad branch names**:

- `update`
- `fix-stuff`
- `working-on-this`

### Step 4: Make Your Changes

Make your code changes while adhering to the [Coding Standards](#coding-standards) section below.

```bash
# Check which files you've modified
git status

# Stage your changes
git add .

# Or stage specific files
git add path/to/file.js
```

### Step 5: Commit Your Changes

Write clear, descriptive commit messages following the **Conventional Commits** format.

#### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type** (required):

- `feat` - A new feature
- `fix` - A bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, missing semicolons, etc.)
- `refactor` - Code refactoring without feature changes
- `perf` - Performance improvements
- `test` - Adding or updating tests
- `chore` - Build process, dependencies, or tooling changes

**Scope** (optional):

- Component or area affected: `auth`, `booking`, `property`, `messaging`, etc.

**Subject** (required):

- Use imperative mood ("add" not "added" or "adds")
- Don't capitalize first letter
- No period (.) at the end
- Limit to 50 characters

**Body** (optional):

- Explain what and why, not how
- Wrap at 72 characters
- Separate from subject with blank line

**Footer** (optional):

- Reference issue numbers: `Fixes #123` or `Closes #456`

#### Commit Examples

```bash
# Simple feature
git commit -m "feat(property): add availability calendar to property detail page"

# Bug fix with body
git commit -m "fix(booking): resolve double-booking issue

Prevent users from booking overlapping dates by validating
against existing bookings before confirmation.

Fixes #234"

# Documentation update
git commit -m "docs: update API documentation for booking endpoints"

# Refactor
git commit -m "refactor(auth): simplify JWT token validation logic"
```

### Step 6: Push Your Changes

```bash
# Push your branch to your fork
git push origin YOUR_BRANCH_NAME
```

### Step 7: Create a Pull Request

1. Go to the original [Smart-Rent repository](https://github.com/hitesh-kumar123/Smart-Rent)
2. Click **Compare & pull request** button (usually appears after pushing)
3. Alternatively, go to **Pull requests** tab → **New pull request** → select your branch
4. Fill out the PR template following the [Pull Request Guidelines](#pull-request-guidelines)
5. Click **Create Pull Request**

---

## Setup Instructions

### Prerequisites

- **Node.js** v14 or higher ([Download](https://nodejs.org/))
- **npm** or **yarn** (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- **MongoDB** account ([MongoDB Atlas](https://mongodb.com/atlas))
- **Cloudinary** account ([Sign up](https://cloudinary.com/))

### Backend Setup

```bash
# Navigate to project root
cd Smart-Rent

# Install backend dependencies
npm install

# Create .env file from example
cp env.example .env

# Edit .env with your credentials
# Required variables:
# - MONGODB_URI
# - JWT_SECRET
# - CLOUDINARY_CLOUD_NAME
# - CLOUDINARY_API_KEY
# - CLOUDINARY_API_SECRET
# - EMAIL_USER
# - EMAIL_PASS
# See env.example for all variables

# Start backend server (runs on http://localhost:8000)
npm start
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install frontend dependencies
npm install

# Start frontend development server (runs on http://localhost:3000)
npm start
```

### Environment Variables

Create a `.env` file in the root directory. See `env.example` for the complete template.

**Minimum required for development**:

```bash
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/smart-rent
JWT_SECRET=your-secret-key-here
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
NODE_ENV=development
PORT=8000
```

See [SETUP.md](./SETUP.md) for detailed configuration instructions.

---

## Coding Standards

### General Guidelines

1. **Write clean, readable code**

   - Use meaningful variable and function names
   - Keep functions small and focused (Single Responsibility Principle)
   - Add comments for complex logic
   - Remove console.log statements before submitting PR

2. **Follow existing code style**

   - Match the indentation (2 spaces for JavaScript)
   - Use consistent naming conventions
   - Follow the folder structure

3. **DRY Principle**
   - Don't repeat code
   - Extract reusable components and functions
   - Use constants for repeated values

### JavaScript/Node.js Standards

```javascript
// ✅ Good
const getUserProfile = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

// ❌ Bad
const gup = async (id) => {
  try {
    let u = await User.findById(id);
    return u;
  } catch (e) {
    console.log(e);
  }
};
```

### React Component Standards

```jsx
// ✅ Good
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const PropertyCard = ({ property, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="property-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3>{property.title}</h3>
      <p>${property.price}/night</p>
    </div>
  );
};

PropertyCard.propTypes = {
  property: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default PropertyCard;

// ❌ Bad
const PropertyCard = (props) => {
  return <div>{props.property.title}</div>;
};
```

### Folder Structure

Maintain the existing folder structure:

```
backend/
├── controllers/        # Request handlers
├── models/            # Database schemas
├── routes/            # API endpoints
├── middleware/        # Express middleware
├── services/          # Business logic
└── schema.js          # Validation schemas

frontend/src/
├── pages/             # Full page components
├── components/        # Reusable components
├── contexts/          # React contexts
├── services/          # API calls
├── hooks/             # Custom hooks
├── utils/             # Utility functions
└── config/            # Configuration files
```

### Code Formatting

Use consistent formatting:

```javascript
// ✅ Use const/let (no var)
const apiUrl = "http://api.example.com";
let count = 0;

// ✅ Use template literals
const message = `Hello, ${name}!`;

// ✅ Use arrow functions
const sum = (a, b) => a + b;

// ✅ Use async/await
const fetchData = async () => {
  const response = await fetch("/api/data");
  return response.json();
};

// ✅ Proper spacing
const object = {
  name: "John",
  email: "john@example.com",
  role: "user",
};

// ✅ Meaningful names
const calculateBookingPrice = (nightlyRate, nights) => {
  return nightlyRate * nights;
};
```

### Testing Your Changes

Before submitting a PR, test your changes thoroughly:

```bash
# Backend: Test API endpoints
curl -X GET http://localhost:8000/api/health

# Frontend: Check for console errors
# Open browser DevTools (F12) and check Console tab

# Test in different browsers if possible
```

---

## Pull Request Guidelines

### PR Title

Use clear, descriptive titles that explain what the PR does:

✅ Good titles:

- `feat: Add property search filters to listings page`
- `fix: Resolve CORS error in message attachments`
- `docs: Update API documentation for bookings`

❌ Bad titles:

- `Update`
- `Fix stuff`
- `Work in progress`

### PR Description

Use the following template for your PR description:

```markdown
## Description

Brief description of what this PR does.

## Type of Change

- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to change)
- [ ] Documentation update

## Related Issues

Fixes #123

## Changes Made

- Change 1
- Change 2
- Change 3

## How to Test

Steps to test the changes:

1. Step 1
2. Step 2
3. Step 3

## Screenshots (if applicable)

[Add screenshots for UI changes]

## Checklist

- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings or errors
- [ ] I have tested locally and verified the changes work
```

### PR Checklist

Before submitting your PR, ensure:

- [ ] Branch is up to date with upstream `main`
- [ ] Code follows [Coding Standards](#coding-standards)
- [ ] No unnecessary console.logs or debug code
- [ ] Comments added for complex logic
- [ ] Tests pass locally
- [ ] UI changes tested in different screen sizes
- [ ] Documentation updated (if needed)
- [ ] Commit messages follow Conventional Commits
- [ ] PR title and description are clear

### Linking Issues

Always link related issues in your PR:

```markdown
Fixes #123
Closes #456
Related to #789
```

### Screenshots for UI Changes

If your PR includes UI changes, add before/after screenshots:

```markdown
## Screenshots

### Before

[Screenshot of old UI]

### After

[Screenshot of new UI]
```

---

## Issue Reporting

### Before Opening an Issue

1. Check if the issue already exists in [Issues](https://github.com/hitesh-kumar123/Smart-Rent/issues)
2. Read the [README.md](./README.md) and [SETUP.md](./SETUP.md)
3. Check if you can reproduce the issue

### Opening an Issue

1. Go to [Issues](https://github.com/hitesh-kumar123/Smart-Rent/issues)
2. Click **New issue**
3. Choose the appropriate template (bug report, feature request, etc.)
4. Fill in all required fields

### Bug Report Template

```markdown
## Description

Brief description of the bug.

## Environment

- OS: [Windows/Mac/Linux]
- Node.js version: [v14.x]
- Browser: [Chrome/Firefox/Safari]

## Steps to Reproduce

1. Step 1
2. Step 2
3. Step 3

## Expected Behavior

What should happen?

## Actual Behavior

What actually happened?

## Screenshots/Logs

[Add screenshots or error logs]

## Additional Context

Any additional information relevant to the bug.
```

### Issue Labels

Use appropriate labels when opening issues:

| Label              | Purpose                                        |
| ------------------ | ---------------------------------------------- |
| `bug`              | Something is broken or not working as expected |
| `enhancement`      | Feature request or improvement suggestion      |
| `documentation`    | Documentation needs to be added or improved    |
| `good-first-issue` | Good for newcomers to the project              |
| `help-wanted`      | Looking for help/volunteers                    |
| `question`         | Questions about the project                    |
| `wontfix`          | This issue will not be fixed                   |
| `duplicate`        | This issue is a duplicate of another           |

---

## Good First Issues

If you're new to the project, start with issues labeled:

- **`good-first-issue`** - Perfect for beginners
- **`help-wanted`** - Looking for community help
- **`documentation`** - Documentation improvements (great way to learn)

These issues are specifically curated to be approachable for new contributors and require minimal setup knowledge.

### Where to Find Them

1. Go to [Issues](https://github.com/hitesh-kumar123/Smart-Rent/issues)
2. Filter by labels:
   - Click **Labels** → select `good-first-issue`
   - Click **Labels** → select `help-wanted`

### Tips for First Contributions

1. Start with documentation updates (easier to get merged)
2. Read related documentation before starting
3. Ask questions in GitHub Discussions if unsure
4. Start small and gradually tackle larger issues
5. Don't hesitate to ask for help in comments

---

## Communication

### Getting Help

If you have questions or need clarification:

1. **GitHub Issues** - Ask in issue comments
2. **GitHub Discussions** - Start a discussion for broader topics
3. **Pull Request Comments** - Ask reviewers for clarification

### Maintainer Contact

For urgent matters not suited for public discussion:

- **Project Lead**: [Hitesh Kumar](https://github.com/hitesh-kumar123)
- **Email**: hiteshkumar@example.com (placeholder - update as needed)

### Response Time

We aim to:

- Review PRs within 5-7 business days
- Respond to issues within 3-5 business days
- Provide feedback or request changes on active PRs

### Expected Behavior

- Be respectful and professional
- Provide constructive feedback
- Help other contributors
- Be patient - maintainers are volunteers

---

## Code of Conduct

This project adheres to the **Contributor Covenant Code of Conduct**.

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. We pledge to make participation in our community a harassment-free experience for everyone.

### Our Values

- **Respectful**: Treat all community members with respect
- **Inclusive**: Welcome people of all backgrounds and experience levels
- **Professional**: Keep discussions focused and constructive
- **Safe**: Foster a safe environment for learning and growth

### Unacceptable Behavior

The following behaviors are unacceptable:

- Harassment, bullying, or intimidation
- Discrimination based on any characteristic
- Offensive comments or language
- Unwelcome advances or attention
- Threats or violence

### Reporting Issues

If you experience or witness unacceptable behavior:

1. Report it to the project maintainers
2. Provide details about the incident
3. Your report will be handled confidentially
4. We will take appropriate action

For more details, see the [Contributor Covenant](https://www.contributor-covenant.org/) code of conduct.

---

## Development Workflow Summary

```
1. Fork repository
       ↓
2. Clone your fork
       ↓
3. Create feature branch (git checkout -b feature/...)
       ↓
4. Make changes following coding standards
       ↓
5. Commit with conventional commit messages
       ↓
6. Push to your fork
       ↓
7. Create Pull Request
       ↓
8. Respond to review comments
       ↓
9. PR merged - celebrate! 🎉
```

---

## Resources

### Documentation

- [README.md](./README.md) - Project overview
- [SETUP.md](./SETUP.md) - Detailed setup guide
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture
- [API.md](./API.md) - API documentation

### Developer Guides

- [BACKEND.md](./BACKEND.md) - Backend development
- [FRONTEND.md](./FRONTEND.md) - Frontend development

### Tools & Technologies

- [Node.js Documentation](https://nodejs.org/docs/)
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)

### Open Source Resources

- [First Timers Only](https://www.firsttimersonly.com/)
- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [Git Documentation](https://git-scm.com/doc)

---

## Thank You! 🙏

Your contributions make Smart-Rent better for everyone. Whether it's code, documentation, bug reports, or suggestions - we appreciate you!

**Happy Contributing!**

---

## Frequently Asked Questions

### Q: I don't know where to start

**A**: Check out issues labeled `good-first-issue` or read the documentation to familiarize yourself with the project.

### Q: How long does it take to review a PR?

**A**: Usually 5-7 business days. Response times may vary based on complexity and maintainer availability.

### Q: Can I work on multiple issues at once?

**A**: Yes, but please use separate branches for each issue. This makes it easier to manage PRs independently.

### Q: What if my PR gets rejected?

**A**: Don't take it personally! We'll provide feedback explaining why. Feel free to ask questions and improve your changes.

### Q: How can I test my backend changes?

**A**: Use Postman, curl, or the API test page (`http://localhost:3000/api-test`) to test endpoints.

### Q: Do I need to update documentation for code changes?

**A**: Yes, if your changes affect how the project is used or configured. Update the relevant `.md` files.

### Q: Can I work on features that aren't in issues?

**A**: For major features, please open an issue first to discuss. This prevents duplicate work and ensures alignment with project goals.

---

**Last Updated**: December 3, 2025  
**Version**: 1.0.0

For the latest version of this guide, visit the [CONTRIBUTING.md](./CONTRIBUTING.md) file in the repository.
