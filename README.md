### Backend (`WeLoveMovies-backend`) `README.md`

```markdown
# Movie Review Backend

This is the backend of the Movie Review application, built with Express.js. It provides RESTful APIs for managing movies and reviews.

## Table of Contents
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Deployment](#deployment)
- [API Endpoints](#api-endpoints)
- [Built With](#built-with)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

Follow these instructions to get the backend server running on your local machine for development and testing purposes.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or v16 recommended)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

## Installation

1. Clone the repository:
   git clone https://github.com/your-username/movie-review-backend.git
   cd WeLoveMovies-backend

2. Install the necessary dependencies:
npm install

3. Create a .env file to configure your environment variables:
DATABASE_URL=your_database_url
PORT=5001

4.Run database migrations:
npx knex migrate:latest

5. Start the development server:
npm start
The backend server will be running on http://localhost:5001.


API Endpoints

GET /api/movies: Fetch all movies.
GET /api/movies/:id: Fetch a movie by ID.
POST /api/movies: Add a new movie.
GET /api/reviews: Fetch all reviews.
GET /api/reviews/:id: Fetch a review by ID.
POST /api/reviews: Add a new review.


Built With
Express.js
Knex.js
PostgreSQL
