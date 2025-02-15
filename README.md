# Auth Demo Application

Welcome to the **Auth Demo Application** – a modern, feature-rich demo designed to showcase secure authentication flows and user management in a production-ready Next.js environment.

## Overview

This demo application illustrates:

- **User Registration & Login**: Traditional email/password as well as social logins (GitHub, Google).
- **Email Verification & Password Reset**: Secure flows to confirm user identity and manage password recovery.
- **Protected Routes**: Middleware ensures that only authenticated users can access secure areas.
- **Modern UI**: Responsive design powered by TailwindCSS and custom UI components.

## Features

- **Modern Authentication**  
  Built on [NextAuth](src/auth.ts) with credential and social providers integration.

- **Robust Security**  
  Verification tokens and secure server actions (see [verify-email](src/actions/verify-email.ts) and [new-password](src/actions/new-password.ts)) ensure best practices in authentication.

- **Database Integration**  
  Uses [Prisma](prisma/schema.prisma) for schema management and database operations, ensuring scalability and reliability.

- **Clean and Modular Codebase**  
  Organized file structure separating actions, UI components, and server logic:
  - Pages and layouts in [src/app](src/app/page.tsx)
  - Authentication actions in [src/actions](src/actions/register.ts)
  - UI components in [src/components](src/components/auth/login-form.tsx)

## Project Structure

- **src/app/** – Application routes and layouts.  
  For example, the protected settings page is implemented in [src/app/(protected)/settings/page.tsx](<src/app/(protected)/settings/page.tsx>).

- **src/actions/** – Server-side actions such as login, registration, password resets, and email verification.

- **src/components/** – Reusable UI components built with TailwindCSS and modern React principles.

- **src/lib/** – Utility libraries for database access, email sending, token generation, etc.

- **prisma/** – Contains the Prisma schema and migration files.

## Getting Started

1. **Install Dependencies**

   ```sh
   npm install
   ```

2. Configure Environment Variables
   Create a .env file in the root directory and populate it with the necessary keys (e.g., database URL, API keys for GitHub, Google, and Resend).

3. Run Migrations

   ```sh
   npx prisma migrate dev
   ```

4. Start the Development Server

```sh
   npm run dev
```

## Deployment

To build and run the project in production mode:

```sh
npm run build
npm run start
```

### Continuous Integration and Continuous Deployment (CI/CD)

This project is already set up with a CI/CD pipeline to automate the deployment process. The pipeline includes steps for:

1. Installing dependencies
2. Running database migrations
3. Building the application
4. Starting the application

## License

This demo is proprietary software provided under license. For full license details, please refer to the [LICENSE](LICENSE) file.

## Contact

For demo requests, pricing information, or additional inquiries, please contact:

[Your Contact Information]
