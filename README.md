# Product Hunt Website

## Description

A modern Product Hunt platform featuring user roles (Normal Users, Moderators, Admins), authentication, CRUD operations, private routes, payment integration, and a product moderation system. This project is built with a focus on clean UI, responsiveness, and secure authentication using JWT.

---

## Features

- User authentication with Firebase.
- Role-based access control:
  - **Normal Users**: Can add/view products.
  - **Moderators**: Can approve/reject products.
  - **Admins**: Can manage users and settings.
- CRUD operations for managing products.
- Private routes to ensure access control.
- Payment gateway integration (Stripe/PayPal).
- Product moderation system.
- Fully responsive design using Tailwind CSS.
- Secure JWT-based authentication.

---

## Installation and Setup

### Prerequisites

- Node.js installed on your system.
- MongoDB Atlas account or local MongoDB setup.
- Firebase project configured with authentication enabled.

### Steps to Set Up Locally

1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```
2. Navigate to the project directory:
   ```bash
   cd product-hunt-website
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the root directory and add the following:
     ```env
     REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
     REACT_APP_BACKEND_URL=your-backend-url
     JWT_SECRET=your-jwt-secret
     ```
5. Run the application:
   - Start the client:
     ```bash
     npm start
     ```
   - Start the server (if applicable):
     ```bash
     npm run server
     ```

---

## Usage Guide

### User Guide

- **Registration:**
  - Users can register using their email and password.
- **Login:**
  - Login to access the dashboard and features.

### Role-Based Access

- **Normal Users:**
  - View products.
  - Add products to the marketplace.
- **Moderators:**
  - Approve or reject submitted products.
- **Admins:**
  - Manage user roles and oversee platform settings.

---

## Technologies Used

### Frontend

- React.js
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB

### Other Tools

- Firebase for Authentication
- JWT for secure sessions
- Stripe/PayPal for Payment Integration

---

## Live Demo

Provide a link to your live deployment (e.g., Vercel, Netlify):

- [Live Demo](https://product-hunt-demo.com)

---

## Screenshots

_Add screenshots of the application, including:_

1. Home Page
2. Dashboard
3. Product Approval System
4. Payment Page

---

## API Documentation

### Endpoints

#### User Authentication

- `POST /api/login` - Login a user.
- `POST /api/register` - Register a new user.

#### Products

- `GET /api/products` - Fetch all products.
- `POST /api/products` - Add a new product.
- `PUT /api/products/:id` - Update a product.
- `DELETE /api/products/:id` - Delete a product.

#### Moderation

- `PUT /api/products/:id/approve` - Approve a product.
- `PUT /api/products/:id/reject` - Reject a product.

---

## Contributing

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License.

---

## Contact

- **Name:** Rahul Baishnab
- **Email:** rahulwp24@gmail.com
