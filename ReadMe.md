# JobHive 🚀

JobHive is a dynamic MERN‑stack job portal with a stunning UI ✨. It features smart search & filtering 🔍, plus tailored views for recruiters 🏢 and students 🎓—making job hunting and hiring smooth and intuitive.

---

## Table of Contents 📚

- [Features](#features-)  
- [Tech Stack](#tech-stack-️)  
- [Project Structure](#project-structure-)  
- [Setup & Installation](#setup--installation-️)  
  - [Prerequisites](#prerequisites-)  
  - [Environment Variables](#environment-variables-)  
  - [Backend](#backend-️)  
  - [Frontend](#frontend-)  
- [Usage](#usage-)  
- [Contributing](#contributing-)    

---

## Features ✨

- **Smart Search & Filter 🔍**  
  Quickly find jobs by keyword, location, or category.  
- **Dual User Roles 👥**  
  - **Students 🎓** can browse listings, apply for jobs, and manage their profile.  
  - **Recruiters 🏢** can post new jobs, review applicants, and update listings.  
- **Responsive Design 📱**  
  Fully functional on desktop and mobile.  
- **Authentication & Authorization 🔒**  
  - Secure login/signup for both roles.  
  - Access control ensures recruiters only see recruiter‑specific pages and students only see student‑specific pages.  
- **Profile Management 👤**  
  - Students can upload resumes 📄, update details, and track applications.  
  - Recruiters can manage company profiles 🏭 and posted jobs.  
- **Notifications 🔔** (if implemented)  
  In‑app or email alerts for new applications or job status updates.  

---

## Tech Stack 🛠️

| Layer        | Technology                                                      |
| ------------ | ---------------------------------------------------------------- |
| **Client 🖥️**   | React.js, Redux (or Context API), React Router, Axios            |
| **Server 🏗️**   | Node.js, Express.js                                              |
| **Database 🗄️** | MongoDB (Mongoose ORM)                                           |
| **Auth 🛡️**     | JSON Web Tokens (JWT)                                            |
| **Styling 🎨**  | Tailwind CSS (or Bootstrap / Material UI if preferred)          |
| **Misc 🧰**     | Dotenv for environment variables, bcrypt for password hashing   |

---

## Project Structure 📂

```plaintext
jobHive/
├── backend/                   # Express server, API endpoints
│   ├── controllers/           # Route handlers (e.g., auth, jobs, users)  
│   ├── models/                # Mongoose schemas (User, Job, Application)  
│   ├── routes/                # Express routes (authRoutes.js, jobRoutes.js, etc.)  
│   ├── middleware/            # Auth middleware (verifyToken, roleCheck)  
│   ├── config/                # DB connection (db.js), constants  
│   ├── utils/                 # Helper functions (e.g., email sender)  
│   ├── .env.example           # Sample environment variables  
│   ├── server.js              # Entry point for the backend  
│   └── package.json           # Backend dependencies and scripts  
│
├── frontend/                  # React client application
│   ├── public/                # Static assets (index.html, favicon)  
│   ├── src/
│   │   ├── components/        # Reusable UI components (Navbar, JobCard, etc.)  
│   │   ├── pages/             # Page-level components (Home, Dashboard, Profile)  
│   │   ├── redux/             # (Optional) Redux slices, store configuration  
│   │   ├── services/          # API service functions (authService, jobService)  
│   │   ├── utils/             # Utilities (e.g., auth helper, form validators)  
│   │   ├── App.jsx            # Main React component with routes  
│   │   ├── index.jsx          # React entry point  
│   │   └── tailwind.config.js # Tailwind configuration (if using Tailwind)  
│   └── package.json           # Frontend dependencies and scripts  
│
├── README.md                  # This file  
└── .gitignore                 # Files to ignore in Git  
````

* **backend/ 🏗️**
  Contains all server‑side code. Key folders:

  * `controllers/`: Defines logic for each route (creating jobs, registering users, etc.).
  * `models/`: Mongoose schemas for `User`, `Job`, and `Application`.
  * `routes/`: API endpoint definitions, grouped by feature (auth, jobs, users).
  * `middleware/`: JWT verification and role‑based access control.
  * `config/`: Database connection setup (e.g., connecting to MongoDB).
* **frontend/ 🖥️**
  Contains all client‑side React code. Key folders:

  * `components/`: Presentational components reused across multiple pages.
  * `pages/`: Route‑specific components (e.g., `Home.jsx`, `JobDetails.jsx`, `Dashboard.jsx`).
  * `services/`: Abstraction for HTTP calls to backend (using Axios).
  * `redux/` (if applicable): State management logic.
  * `utils/`: Generic helpers (e.g., token utilities, form validation).


## Setup & Installation ⚙️

> Follow these steps to get JobHive running on your local machine.

### Prerequisites 📋

* **Node.js** (v14 or higher) & **npm** (v6+).
* **MongoDB** (local or Atlas).
* (Optional) **Yarn** (if you prefer Yarn over npm).

### Environment Variables 🌐

Create a `.env` file in the `backend/` directory with the following (example) variables:

```env
PORT=5000
MONGO_URI=<your_mongo_connection_string>
JWT_SECRET=<your_jwt_secret>
CLIENT_URL=http://localhost:3000


* `PORT`: Port for backend server (default: 5000).
* `MONGO_URI`: MongoDB connection string.
* `JWT_SECRET`: Secret key for signing JWTs.
* `CLIENT_URL`: URL of the React frontend (used in CORS settings).

Copy `backend/.env.example` to `backend/.env` and fill in your own values.
```

### Backend 🖥️

1. Open a terminal and navigate to the `backend/` folder:

   ```bash
   cd jobHive/backend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the server in development mode:

   ```bash
   npm run dev
   ```

   * This assumes you have a script in `package.json` like:

     ```json
     "scripts": {
       "dev": "nodemon server.js"
     }
     ```
4. The server should now be running at `http://localhost:5000` 🚀.

### Frontend 🌐

1. Open a new terminal window/tab and navigate to the `frontend/` folder:

   ```bash
   cd jobHive/frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the React development server:

   ```bash
   npm start
   ```
4. The client will run at `http://localhost:3000` by default. It should proxy API requests to `http://localhost:5000` (verify proxy settings in `frontend/package.json`) 🔄.

---

## Usage 🎯

1. **Register 🔑** as either a **Student 🎓** or **Recruiter 🏢**.
2. **Log in 🔒** to access role‑specific dashboards:

   * **Students 🎓** can browse job listings, apply to positions, and update their profiles/resumes.
   * **Recruiters 🏢** can post new job openings, review applications, and manage company details.
3. Use the **Search & Filter 🔍** bar to quickly narrow down jobs by title, location, or category.
4. **Logout 🚪** when you’re done to clear your session.

> **Note**: All API calls require a valid JWT in the `Authorization` header (`Bearer <token>`).

---

## Contributing 🤝

1. Fork this repository.
2. Create a new branch for your feature or bugfix:

   ```bash
   git checkout -b feature/<your-feature-name>
   ```
3. Make your changes and commit:

   ```bash
   git commit -m "Add <feature> or fix <issue>"
   ```
4. Push to your fork:

   ```bash
   git push origin feature/<your-feature-name>
   ```
5. Open a Pull Request against `rahull0328/jobHive:main`.
6. Ensure your PR description clearly outlines what you’ve added or fixed.

> Please follow best practices for commit messages and code style. Run any existing linters/tests before submitting.

---

<!-- ## License 📄

This project is licensed under the **MIT License**. -->



## Author 🙋‍♂️

**Rahul Mehta**

* GitHub: [rahull0328](https://github.com/rahull0328)

Feel free to reach out for any questions or feedback!

