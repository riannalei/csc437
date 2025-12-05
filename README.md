# Travel Planner

## Project Overview

This is my Travel Planner app. It’s meant for travelers to plan trips and build a day‑by‑day itinerary, instead of just storing static info.

## 🛠️ Deployment and Startup Instructions (VPS)

This section provides the necessary steps to manage and restart the application deployed on the VPS for grading purposes.

### Target Environment

* **Host:** `xxx-host.csse.dev`
* **User:** `xxx`
* **Deployment Directory:** `~/csc437`

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
