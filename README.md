# Lunar Discoveries App

Welcome to the Lunar Discoveries Portal, a one-of-a-kind application for documenting the groundbreaking scientific discoveries made by historical figures about chickens on the moon.

This application is built entirely on the Manifest platform, showcasing a powerful and simple way to build full-stack applications with a React frontend and a declarative Manifest backend.

## Features

- **User Authentication**: Sign up and log in as a scientist to start documenting your findings.
- **Log Observations**: Create and manage scientific observations, attributing them to either Isaac Newton or Joseph-Louis Lagrange.
- **Manage Chickens**: Register and track your personal flock of lunar chickens.
- **Public Feed**: All discoveries are publicly visible on the main dashboard.
- **Secure**: Users can only manage the chickens and observations they have created.
- **Admin Panel**: A built-in admin panel for managing all data.

## Getting Started

### Prerequisites

- Node.js and npm
- A running Manifest backend instance

### Setup

1.  **Clone the repository.**
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Configure Environment:**
    Create a `.env.local` file in the root of the project and add your Manifest backend URL and App ID:
    ```
    VITE_APP_ID=your-app-id
    VITE_BACKEND_URL=your-backend-url
    ```
4.  **Run the application:**
    ```bash
    npm run dev
    ```

### Admin Access

Access the comprehensive admin panel at `/admin` of your backend URL.

- **URL**: `YOUR_BACKEND_URL/admin`
- **Default Email**: `admin@manifest.build`
- **Default Password**: `admin`
