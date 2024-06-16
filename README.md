# Weather App

Welcome to the Weather App! This application is built using the MERN stack (MongoDB, Express.js, React, Node.js) and integrates with the OpenWeather API to provide weather data. The app allows users to view weather information and manage their favorite locations.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Real-time Weather Data:** Fetches weather information from the OpenWeather API.
- **User Authentication:** Users can sign up, log in, and manage their favorite locations.
- **Favorite Places:** Users can save and view their favorite places.
- **Responsive Design:** Works on both desktop and mobile devices.

## Installation

To get started with the Weather App, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/weather-app.git
    cd weather-app
    ```

2. **Install dependencies for the client and server:**

    ```bash
    cd client
    npm install
    cd ../server
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the `server` directory and add the following variables:
    
    ```env
    MONGO_USER=your_mongo_user
    MONGO_PASSWORD=your_mongo_password
    ```

    create a `.env` file in `client` directory and add the following variables

    ```env
    REACT_APP_OPEN_WEATHER_API
    ```

4. **Start the development servers:**

    - **Client:**

        ```bash
        cd client
        npm start
        ```

    - **Server:**

        ```bash
        cd server
        npm start
        ```

## Usage

Once the servers are running, you can access the application in your web browser at `http://localhost:3000`.

- **Sign Up / Log In:** Create an account or log in with existing credentials.
- **View Weather:** Enter a location to view current weather data.
- **Manage Favorites:** Save your favorite places for quick access.

## Environment Variables

The server requires the following environment variables:

- `MONGO_USER`: Your MongoDB user.
- `MONGO_PASSWORD`: Your MongoDB password.

These variables should be defined in the `.env` file located in the `server` directory.

## Project Structure

The project is divided into two main folders: `client` and `server`.

- **client:** Contains the React front-end code.
- **server:** Contains the Express.js back-end code.

