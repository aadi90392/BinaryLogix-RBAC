# BinaryLogix Role-Based Access Control (RBAC) Portal

This is a full-stack MERN application developed for the BinaryLogix placement task. It implements a secure, hierarchical Role-Based Access Control system for Admins, Managers, and standard Users.

##  Features Implemented
- **Public Landing Page:** Clean UI with system introduction and quick access.
- **Strict Role Hierarchy:** - **Admin:** Highest permission. Can create Managers/Users, edit system records, and view all profiles.
  - **Manager:** Intermediate role. Can register and view standard Users only.
  - **User:** Can signup, login, and manage their own profile.
- **Profile Management:** Users can update their Name, Phone, Address, and upload a Profile Photo (handled via Multer).
- **Secure Authentication:** JWT-based protected routes and smart redirection to prevent unauthorized dashboard access.

##  Technology Stack
- **Frontend:** React.js, Tailwind CSS, React Router DOM, Axios, React Hot Toast.
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT, Multer (for image uploads), bcryptjs.

##  Steps to Run the Project Locally

Follow these instructions to run the project on your local machine:

### 1. Clone the Repository
```bash
git clone [https://github.com/aadi90392/BinaryLogix-RBAC.git](https://github.com/aadi90392/BinaryLogix-RBAC.git)
cd BinaryLogix-RBAC
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Ensure you have an `uploads` folder in the backend directory for profile photos:
```bash
mkdir uploads
```

Create a `.env` file in the `backend` folder and add your configuration:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

Start the backend server:
```bash
npm start
# Server will run on http://localhost:5000
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```

Start the Vite development server:
```bash
npm run dev
# App will run on http://localhost:5173
```

---

##  Important Note for Evaluators (How to test the Admin Role)

By design, the system restricts any open registration for the **Admin** or **Manager** roles for security purposes. To evaluate the Admin dashboard and test the hierarchy, please follow these steps to create your first Admin:

1. Open the application and **Sign Up** as a standard user.
2. Open your **MongoDB Database** (Atlas or Compass) that is connected to the application.
3. Locate the `users` collection and find the account you just registered.
4. Manually change the `"role"` field value from `"User"` to `"Admin"`.
5. Return to the application and **Log In** with those credentials. 

*You will now be redirected to the Admin Dashboard and have full privileges to create new Managers and Users from the UI.*