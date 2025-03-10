# Planets App Documentation

Welcome to the Planets App, a MEN (MongoDB, Express, Node.js) stack application designed to help users explore and manage information about planets. This documentation provides an overview of the application's structure, functionality, and setup instructions.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Frontend Views](#frontend-views)
- [Environment Variables](#environment-variables)
- [Future Enhancements](#future-enhancements)

## Features

- **View All Planets**: Display a list of all planets with their names.
- **Add New Planet**: Create a new planet with details like name, description, image URL, and observation status.
- **Edit Planet**: Update the details of an existing planet.
- **Delete Planet**: Remove a planet from the database.
- **Planet Details**: View detailed information about a specific planet, including its image and description.
- **NASA API Integration**: Fetch and display NASA's Astronomy Picture of the Day (APOD) on the homepage.
- **Video Background**: A dynamic video background of the sun enhances the user experience.

## Technologies Used

### Backend:

- **Node.js**
- **Express.js**
- **MongoDB** (with Mongoose for database modeling)

### Frontend:

- **EJS** (Embedded JavaScript) for templating
- **HTML, CSS, JavaScript**

### APIs:

- **NASA API** (for fetching astronomy data)

### Other Tools:

- **Dotenv** (for environment variables)
- **Method-override** (for PUT and DELETE requests)
- **Morgan** (for logging, currently commented out)

## Project Structure

planets-app/ ├── models/ │ └── planet.js # Mongoose schema for planets ├── public/ │ ├── imgs/ # Static images │ ├── js/ │ │ └── script.js # Client-side JavaScript for NASA API integration │ ├── videos/ # Background video files │ └── style/ │ └── style.css # Global styles ├── views/ │ ├── planets/ │ │ ├── edit.ejs # Edit planet page │ │ ├── index.ejs # List of all planets │ │ ├── new.ejs # Add new planet page │ │ └── show.ejs # Planet details page │ └── index.ejs # Homepage ├── .env # Environment variables ├── .gitignore # Files to ignore in Git ├── package.json # Project dependencies and scripts ├── README.md # Project documentation └── server.js # Main server file

## Setup Instructions

### Prerequisites
- Node.js and npm installed.
- MongoDB Atlas account or local MongoDB instance.
- NASA API key (optional, for APOD integration).

### Steps

1. **Clone the Repository:**

```bash
git clone <repository-url>
cd planets-app

Install Dependencies:
npm install

## Setup Instructions

### Prerequisites
- Node.js and npm installed.
- MongoDB Atlas account or local MongoDB instance.
- NASA API key (optional, for APOD integration).

### Steps

1. **Clone the Repository**:

    ```bash
    git clone <repository-url>
    cd planets-app
    ```

2. **Install Dependencies**:

    ```bash
    npm install
    ```

3. **Set Up Environment Variables**:  
   Create a `.env` file in the root directory and add the following:

    ```ini
    MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/planets?retryWrites=true
    NASA_API_KEY=your-nasa-api-key
    ```

4. **Run the Application**:

    ```bash
    npm start
    ```

    The app will be available at [http://localhost:3001](http://localhost:3001).

---

## API Endpoints

| Method | Endpoint                  | Description                                       |
|--------|---------------------------|---------------------------------------------------|
| GET    | `/`                       | Homepage with NASA APOD integration.              |
| GET    | `/planets`                | List all planets.                                |
| GET    | `/planets/new`            | Form to add a new planet.                        |
| POST   | `/planets`                | Create a new planet.                             |
| GET    | `/planets/:planetId`      | Show details of a specific planet.               |
| GET    | `/planets/:planetId/edit` | Form to edit a planet.                           |
| PUT    | `/planets/:planetId`      | Update a planet.                                 |
| DELETE | `/planets/:planetId`      | Delete a planet.                                 |

---

## Frontend Views

1. **Homepage (`index.ejs`)**  
   - Displays a welcome message and a navigation menu.
   - Fetches and displays NASA's Astronomy Picture of the Day (APOD) using the NASA API.

2. **Planets Index (`planets/index.ejs`)**  
   - Lists all planets with their names.
   - Includes a link to add a new planet.

3. **Add New Planet (`planets/new.ejs`)**  
   - A form to add a new planet with fields for name, description, image URL, and observation status.

4. **Planet Details (`planets/show.ejs`)**  
   - Displays detailed information about a planet, including its image and description.
   - Provides options to edit or delete the planet.

5. **Edit Planet (`planets/edit.ejs`)**  
   - A pre-filled form to update a planet's details.

---

## Environment Variables

- **MONGODB_URI**: Connection string for MongoDB.
- **NASA_API_KEY**: API key for NASA's APOD API (optional).

---

## Future Enhancements

1. **AI-Generated Images**:  
   Integrate OpenAI's DALL·E API to generate planet images dynamically.

2. **User Authentication**:  
   Add user login and registration to personalize the experience.

3. **Search and Filter**:  
   Implement search and filter functionality for planets.

4. **Responsive Design**:  
   Improve the app's responsiveness for mobile devices.

5. **Advanced Styling**:  
   Add animations and transitions for a more engaging UI.

---
