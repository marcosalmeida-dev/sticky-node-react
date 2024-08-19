# Sticky Note App

A simple application for creating sticky notes and managing users with JWT authentication. This project consists of a Node.js backend and a React frontend, both built using TypeScript. The application allows users to register, log in, and create/edit/delete sticky notes.

## Tech Stack

- **Backend:** 
  - Node.js
  - TypeScript
  - Express
  - Swagger
  - MongoDB (Mongoose)
  - Express-Validator (For validating user input in the backend)
  - Bcryptjs (For hashing passwords)
  - Jsonwebtoken (For handling JWT authentication)
  
- **Frontend:** 
  - React
  - TypeScript
  - Axios
  - Material-UI

- **Other Tools:** 
  - Docker
  - Docker Compose

## Project Overview

This project is a full-stack application that provides user authentication and sticky note management functionalities. The backend is built using Node.js with TypeScript, Express for the server framework, and MongoDB for the database. The frontend is built using React with TypeScript, leveraging Material-UI for the UI components.

### Backend Features:
- **User Registration & Login:** Handles user authentication with JWT tokens.
- **Sticky Note Management:** Allows users to create, update, and delete sticky notes.
- **Swagger Documentation:** Auto-generated API documentation available at [http://localhost:5000/docs](http://localhost:5000/docs).

### Frontend Features:
- **User Authentication:** Users can register and log in to manage their sticky notes.
- **Sticky Note UI:** Users can create, edit, and delete sticky notes in a responsive UI.
- **Material-UI:** Styled components using Material-UI.

## Running the Application
1. Build and start the Docker containers:
   ```bash
   docker-compose up --build
