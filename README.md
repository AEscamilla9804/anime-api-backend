📌 Anime Explorer - Backend

This is the backend service for the Anime API Project, built with Node.js, Express, and MongoDB.
It provides authentication, favorites management, and anime data fetching from both a local database and the external Jikan API.

🚀 Features:

- User Authentication (JWT-based)
- Favorites Management (CRUD)
- Anime Fetching from:
    - MongoDB (local data)
    - Jikan API (external data)
- Public & Private Routes
- Email Handling with Nodemailer (development only)
- Middleware for JWT verification & error handling

🛠 Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT for authentication
- Axios for API calls
- Nodemailer (dev mode only)
- dotenv for environment configuration

📂 Project Structure

backend/
│
├── controllers/        # Business logic for each route
│   ├── userController.js
│   ├── favoritesController.js
│   └── animesController.js
│
├── routes/             # API route definitions
│   ├── userRoutes.js
│   ├── favoritesRoutes.js
│   └── animeRoutes.js
│
├── models/             # Database Structure (Schema) for both users and favorites
│   └── Favorites.js
│   └── Users.js
│
├── helpers/        # Auxiliar functions (Nodemailer, ID generation, JWT generation)
│   └── forgotPasswordEmail.js
│   └── registrationEmail.js
│   └── generateId.js
│   └── generateJWT.js
│
├── middlewares/        # Middleware functions (JWT verification, error handling)
│   └── authMiddleware.js
│
├── config/             # Database and other configs
│   └── db.js
│
├── .env                # Example environment variables
└── index.js            # Entry point

⚙️ Installation & Setup

1. Clone the repository

git clone https://github.com/aescamilla9804/anime-api-backend.git
cd anime-api-backend

2. Install dependencies

npm install

3. Configure environment variables

MONGO_URI=your_mongodb_cluster
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:####
EMAIL_HOST=your_sandbox_host
EMAIL_PORT=your_sandbox_port
EMAIL_USER=your_sandbox_user
EMAIL_PASS=your_sandbox_password

4. Run the development server

npm run dev

📡 API Routes

Auth / Users

Method	    Endpoint	            Access	        Description
POST	    /api/users	            Public	        Register a new user
POST	    /api/users/login	    Public	        Login a user
GET	        /api/users/profile	    Private	        Get logged-in user's profile
PUT	        /api/users/profile	    Private	        Update user profile

Favorites

Method	    Endpoint	            Access	        Description
GET	        /api/favorites	        Private	        Get user's favorites
POST	    /api/favorites	        Private	        Add anime to favorites
DELETE	    /api/favorites/:id	    Private	        Remove anime from favorites

Anime Fetching

Method	    Endpoint	            Access	        Description
GET	        /api/animes	            Public	        Fetch anime list from Jikan API
GET	        /api/animes/:id	        Public	        Fetch single anime by ID

📧 Development Email Notes

Email functionality is available only in development mode and uses demo accounts for testing.
If you want to test emails locally, make sure to configure:

- EMAIL_HOST
- EMAIL_PORT
- EMAIL_USER
- EMAIL_PASS

🧪 Testing with Demo Accounts

For testing purposes, you can log in using:

- Email: demo@example.com | Password: Demo123#
- Email: demo2@example.com | Password: Demo123#

🔒 Authentication

All private routes require a JWT token passed in the Authorization header:

Authorization: Bearer <your_token_here>

📜 License

This project is licensed under the MIT License.