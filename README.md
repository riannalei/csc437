# Travel Planner

## Project Overview

This is my Travel Planner app. It’s meant for travelers to plan trips and build a day‑by‑day itinerary, instead of just storing static info.

## Getting Started

### Prerequisites

To run this project locally, you will need:

* Node.js (LTS version recommended)
* npm
* A database instance configured for the server (e.g., PostgreSQL, MySQL).

### Local Development

1.  **Clone the repository:**
    ```bash
    git clone [Your Repo URL]
    cd [Your Repo Directory]
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file** in the `server/` directory and add your database connection strings, API keys, and other secrets. (See the included `.env.example` if available).

4.  **Run the application (Client and Server):**
    ```bash
    # Start the server and client in development mode (usually with live reload)
    npm start 
    # OR:
    npm run dev
    ```
    The application will typically be accessible at `http://localhost:8080` (or the port configured in your server).

## 🛠️ Deployment and Startup Instructions (For Instructor)

This section provides the necessary steps to manage and restart the application deployed on the VPS for grading purposes.

### Target Environment

* **Host:** `xxx-host.csse.dev`
* **User:** `xxx`
* **Deployment Directory:** `~/csc437`

### Credentials Note

**Sensitive information (passwords, API keys, connection strings) is NOT included in this repository.** All necessary environment variables are contained in a separate `.env` file that must be manually present in the `~/csc437` directory on the VPS.

### Steps to Start the Application on the VPS

To pull the latest code, rebuild the application, and restart the server process using `nohup`, execute the following commands in sequence:

1.  **SSH into the Host:**
    ```bash
    ssh xxx@xxx-host.csse.dev
    ```

2.  **Navigate and Update Code:**
    ```bash
    cd ~/csc437
    git pull
    ```

3.  **Install Dependencies:**
    ```bash
    npm install
    ```

4.  **Build the Client (`app` workspace):**
    ```bash
    npm -w app run build
    ```

5.  **Build the Server (`server` workspace):**
    ```bash
    npm -w server run build
    ```

6.  **Stop Any Existing Server Process (Graceful Kill):**
    ```bash
    pkill -f "server/dist/index.js" || true
    ```
    *(This ensures the previous process is terminated before starting a new one.)*

7.  **Start the Server in the Background:**
    ```bash
    nohup npm -w server run start:app > server.log 2>&1 &
    ```
    *(The server will now be running and logs will be redirected to `server.log`.)*

## Student Learning Outcomes Demonstrated

This project incorporates the assignments and practices from the course, demonstrating proficiency in the following areas:

* **Client-Rendered Architecture:** The server exclusively serves data (via REST and JSON); all rendering is handled client-side using standard Web APIs, HTML Custom Elements, and few dependencies (`lit`, `@calpoly/mustang`).
* **Separation of Concerns:** Utilizes an HTML-first approach, employing advanced CSS (custom properties, flex/grid) for styling, and JavaScript/TypeScript for behavior, following the principle of using the right tool for the job.
* **Framework Fluency:** Employs the Lit library for view creation and leverages `@calpoly/mustang` for implementing the Model-View-Update (MVU) pattern, including state management, routing, and effects.
* **Security and Deployment:** Implements a three-tier architecture (Client, Server/Backend, Database) with REST API communication secured against unauthorized use. The application is deployed to a public production environment.
