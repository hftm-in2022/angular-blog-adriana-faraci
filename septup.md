# SETUP.md

## Iteration 0: Initial Setup for Angular Project

In agile software development, Iteration 0 (also called "Sprint 0") is used to establish the necessary preparations for subsequent development cycles. No functional features are developed during this phase; instead, the foundation for the project is laid. This includes setting up the development environment, configuring tools, and ensuring that the team is ready for actual development.

The objective of this setup is to create a solid foundation for the Angular project, ensuring that all technical requirements are met for efficient and secure work in the upcoming iterations.

### Table of Contents

-   [SETUP.md](#setupmd)
    -   [Iteration 0: Initial Setup for Angular Project](#iteration-0-initial-setup-for-angular-project)
        -   [Table of Contents](#table-of-contents)
    -   [1. Creating a New Angular Project](#1-creating-a-new-angular-project)
    -   [2. Setting Up a GitHub Repository](#2-setting-up-a-github-repository)
    -   [3. Configuring Code Quality Tools](#3-configuring-code-quality-tools)
        -   [a. ESLint Setup](#a-eslint-setup)
        -   [b. Prettier Setup](#b-prettier-setup)
        -   [c. CommitLint, Husky, and Lint-Staged Setup](#c-commitlint-husky-and-lint-staged-setup)
    -   [4. Automated Deployment to Azure](#4-automated-deployment-to-azure)
    -   [5. CI/CD Pipeline Setup](#5-cicd-pipeline-setup)
        -   [1. **Node.js CI Workflow**](#1-nodejs-ci-workflow)
        -   [2. **CodeQL Advanced Workflow**](#2-codeql-advanced-workflow)
        -   [3. **Angular Update Workflow**](#3-angular-update-workflow)
        -   [Summary](#summary)

----------

## 1. Creating a New Angular Project

1.  Make sure you have Node.js and npm installed. Verify this by running:

    `node -v
    npm -v` 

    
2.  Install the Angular CLI globally if not already installed:

    `npm install -g @angular/cli` 
    
3.  Create a new Angular project using SCSS as the CSS preprocessor:
    
    `ng new blog-app --style=scss` 
    
    Follow the prompts to set up routing if needed.
    

## 2. Setting Up a GitHub Repository

1.  Go to [https://github.com/hftm-in2022](https://github.com/hftm-in2022) and create a new repository named `angular-<projectname>-<firstname>-<lastname>`. For example:

    `angular-blog-app-adriana-faraci` 
    
2.  Clone the repository to your local development environment:
    
    `git clone https://github.com/hftm-in2022/angular-blog-app-adriana-faraci.git
    cd angular-blog-app-adriana-faraci` 
    
3.  Initialize the local Angular project in this repository:
    
    `git init
    git remote add origin https://github.com/hftm-in2022/angular-blog-app-adriana-faraci.git` 
    
4.  Commit and push the initial setup:

    `git add .
    git commit -m "Initial commit: Set up Angular project"
    git branch -M main
    git push -u origin main` 
    
5.  Ensure the repository is public (unless otherwise required). Add a descriptive `README.md` to the repository.
    

## 3. Configuring Code Quality Tools

### a. ESLint Setup

1.  Install `@angular-eslint`:
    
    `ng add @angular-eslint/schematics` 
    
2.  Configure ESLint by adjusting `.eslintrc.json` according to your project’s needs.
    

### b. Prettier Setup

1.  Install Prettier:
2. 
    `npm install --save-dev prettier` 
    
3.  Create a `.prettierrc` file for Prettier configuration:
    
    `{
      "singleQuote": true,
      "semi": false
    }` 
    

### c. CommitLint, Husky, and Lint-Staged Setup

1.  Install necessary packages:
        
    `npm install --save-dev @commitlint/{config-conventional,cli} husky lint-staged` 
    
2.  Set up Husky hooks:
    
    `npx husky install
    npx husky add .husky/pre-commit "npx lint-staged"
    npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'` 
    
3.  Add the following configuration in `package.json`:

    `"lint-staged": {
      "*.{ts,html,scss}": [
        "eslint --fix",
        "prettier --write"
      ]
    },
    "commitlint": {
      "extends": [
        "@commitlint/config-conventional"
      ]
    }` 
    

## 4. Automated Deployment to Azure

To deploy your Angular application to Azure, follow these steps:

1.  Install the [Azure Plugin](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack).
    
2.  Add a new static web app:
    
    -   Select the **resource group**.
    -   Enter a name for the static web app.
    -   Select a **Service Plan**.
    -   Choose **Angular** as the framework.
    -   Enter `/` for the **application directory**.
    -   Leave **blank** for the build directory.
    -   Enter `dist/<your-app-name>/browser` for the **output location**.
3.  A GitHub Action will be automatically created for your project, setting up continuous deployment.
    

## 5. CI/CD Pipeline Setup

### 1. **Node.js CI Workflow**

This workflow runs tests and builds for different Node.js versions. It uses the matrix approach to test the project with Node.js `18.x`, `20.x`, and `22.x`.

    `name: Node.js CI
    
    on:
      push:
        branches: [ "main" ]
      pull_request:
        branches: [ "main" ]
    
    jobs:
      build:
        runs-on: ubuntu-latest
    
        strategy:
          matrix:
            node-version: ['18.x', '20.x', '22.x']
            # See supported Node.js release schedule at https://nodejs.org/en/about/releases/
    
        steps:
        - uses: actions/checkout@v4
    
        - name: Use Node.js ${{ matrix.node-version }}
          uses: actions/setup-node@v4
          with:
            node-version: ${{ matrix.node-version }}
            cache: 'npm'
            cache-dependency-path: './blog-app/package-lock.json'
    
        - name: Install dependencies
          run: npm ci
          working-directory: ./blog-app
    
        - name: Run tests
          run: npm run test:ci
          working-directory: ./blog-app
    
        - name: Build
          run: npm run build
          working-directory: ./blog-app` 

### 2. **CodeQL Advanced Workflow**

This workflow uses CodeQL to analyze JavaScript/TypeScript code and is intended for public repositories. **Note:** The repository must be public for this workflow to function properly, as some GitHub actions and security checks work only with public repositories.

    `name: "CodeQL Advanced"
    
    on:
      push:
        branches: [ "main" ]
      pull_request:
        branches: [ "main" ]
      schedule:
        - cron: '16 14 * * 4'
    
    jobs:
      analyze:
        name: Analyze (${{ matrix.language }})
        runs-on: ${{ (matrix.language == 'swift' && 'macos-latest') || 'ubuntu-latest' }}
        permissions:
          security-events: write
          packages: read
          actions: read
          contents: read
    
        strategy:
          fail-fast: false
          matrix:
            include:
            - language: javascript-typescript
              build-mode: none
    
        steps:
        - name: Checkout repository
          uses: actions/checkout@v4
    
        - name: Initialize CodeQL
          uses: github/codeql-action/init@v3
          with:
            languages: ${{ matrix.language }}
            build-mode: ${{ matrix.build-mode }}
    
        - if: matrix.build-mode == 'manual'
          shell: bash
          run: |
            echo 'If you are using a "manual" build mode for one or more of the' \
              'languages you are analyzing, replace this with the commands to build' \
              'your code, for example:'
            echo '  make bootstrap'
            echo '  make release'
            exit 1 
        - name: Perform CodeQL Analysis
          uses: github/codeql-action/analyze@v3
          with:
            category: "/language:${{matrix.language}}"` 

### 3. **Angular Update Workflow**

This workflow automatically updates Angular dependencies once per week, on Wednesdays at 05:30 UTC. **Note:** This workflow only works if the repository is public to ensure proper token access.

    `name: "Update Angular Action"
    
    on:
      schedule:
        - cron: "30 5 * * 3"
      workflow_dispatch:
    
    jobs:
      ngxUptodate:
        runs-on: ubuntu-latest
        steps:
          - name: Updating ng dependencies
            uses: fast-facts/ng-update@v1
            with:
              base-branch: main
              repo-token: ${{ secrets.GITHUB_TOKEN }}` 

### Summary

-   **Node.js CI Workflow**: Tests and builds the project on multiple Node.js versions.
-   **CodeQL Advanced Workflow**: Performs CodeQL analysis to identify security and code quality issues. The repository must be public for security features to function correctly.
-   **Angular Update Workflow**: Automatically updates Angular dependencies weekly. The repository must be public for this workflow.

These workflows are optimized and documented to meet the requirements for a public repository. If you want to remove old or unnecessary workflows, you can delete them directly from your `.github/workflows` directory.
