# Revive - Fullstack E-Commerce Application

Fullstack React e-commerce application featuring a storefront for browsing fashion collections and an admin panel for managing products and orders. The app integrates a secure checkout system with Stripe for payments, and full user authentication using JWT tokens. Product data is managed with MongoDB, and file uploads (product images) are handled via Cloudinary.

[Ecommerce Store Live Demo Link](https://revive-storefront-mern.netlify.app/)

[Admin Panel Live Demo](https://revive-admin-panel-mern.netlify.app/)

Ecommece Storefront
![ecommerce-home](https://github.com/user-attachments/assets/fd3f3066-384b-4a94-8791-e09339658353)

Admin Panel
![ecommerce-admin](https://github.com/user-attachments/assets/ab25f2e8-06c3-405e-abdb-44560bf2de76)

## ⚙️ **Tech Stack**
- **React.js**
- **Vite**
- **TypeScript**
- **Tailwind CSS**
- **React Router DOM**
- **React Hook Form**
- **Zod**
- **Axios**
- **React Context API**
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT (JSON Web Token)**
- **Stripe**
- **Cloudinary**
- **Multer**
- **Bcrypt**

## 🚀 Project Features

### **Storefront Features**

- **Product Browsing**:
  - Users can browse a wide variety of fashion products for **Men**, **Women**, and **Kids** in the latest collections.
  - The app supports filtering products by **Category**, **Sub-category**, and **Price Range**, helping users find what they're looking for quickly.
  - **Search functionality** allows users to search for products by name, category, or other relevant parameters.
  
- **Product Details Page**:
  - Features a detailed product page showing additional information like descriptions, images, available sizes, and price.

- **Recommended Products**:
  - The app suggests **related or recommended products** based on the current product being viewed, improving the shopping experience.

- **Cart Management**:
  - Users can add, update, or remove products in their shopping cart.
  - The cart displays real-time totals, including price, tax, and shipping costs.
  
- **Cart Recovery**:
  - The app stores the cart on the **server-side** (MongoDB) so that users can maintain their cart across device switches or page reloads.
  - Users' cart data is automatically recovered from the database upon returning to the site, ensuring that their cart is persistent even if       they refresh the browser or switch devices.

- **Checkout & Payment**:
  - Users can proceed to checkout with their cart, providing necessary details (shipping address, payment method).
  - **Stripe Integration** allows users to make secure payments online through **Stripe Checkout Sessions**.
  - In addition to Stripe, users can choose **Cash on Delivery (COD)** as an alternative payment method.
  - After successful payment (via Stripe) or order confirmation (via COD), the app updates the order status in the database.

- **Authentication**:
  - Full user authentication system with JWT tokens to securely log in, sign up, and manage user sessions.
  - User registration and login flows ensure that customers can securely place orders.

- **Order Management**:
  - After completing a purchase, users can view their order history and track order status.

- **Responsive UI**:
  - The storefront is fully responsive, providing an optimized experience across mobile, tablet, and desktop devices using **Tailwind CSS**.

### **Admin Panel Features**

- **Product Management**:
  - Admins can **Add** and **Delete** products from the inventory.
  - Products can be categorized, with flexible options for setting prices, and adding product images (handled via **Cloudinary** for media storage).

- **Order Management**:
  - Admins can **View and Update Order Status** to manage customer orders effectively (e.g., marking orders as "Shipped", "Processing", etc.).
  - Admins can access detailed information for each order, including customer details and items purchased.

- **Authentication**:
  - Admins can log in to a secure dashboard using a JWT token-based authentication system, ensuring that only authorized personnel can access      the admin panel.
  
- **File Uploads**:
  - Admins can upload product images and files using **Multer**, with storage handled by **Cloudinary** for better media management.

### **Middleware Features**

- **JWT Authentication Middleware**:
  - All protected routes (like order management, user operations, cart API) use **Authentication middleware** to ensure that only                  authenticated users can access them.
    
- **Protected Routes**:
  - Certain routes (such as adding products to the cart, completing checkout, and viewing order history) are secured with JWT authentication.
  - The server checks the authenticity of the JWT token before proceeding with sensitive operations like checkout, cart operations and order       updates.

### **Stripe Payment Integration & Webhooks**

- **Stripe Integration**:
  - The app integrates with **Stripe** for handling secure payments, allowing users to pay for their orders via **Stripe Checkout Sessions**.
  - Users are redirected to the Stripe payment gateway where they can complete their transaction using various payment methods.
  
- **Stripe Webhook**:
  - **Stripe Webhooks** are used to receive real-time updates on the payment status. After a successful payment, the server updates the order status in the database and triggers order fulfillment.
  - The system handles incoming Stripe Webhook events to update the status of orders, such as marking them as paid or failed based on the response from Stripe.

### **Responsive UI**

- The frontend is built with **React.js** and **Tailwind CSS**, providing a modern, responsive design that adapts seamlessly across desktop, tablet, and mobile devices.
- **React Router DOM** is used for navigating through different views, such as product pages, cart, and order details.

### **Error Handling and Notifications**

- The app provides real-time notifications using **React Hot Toast** for success or failure messages (e.g., "Payment successful" or "Payment failed").
- Error handling ensures a smooth user experience, displaying appropriate messages when users encounter issues (e.g., invalid payment details).

## 🚀 API Endpoints

### **User Authentication**
- **POST /api/users/register**: Registers a new user.
- **POST /api/users/login**: Logs in an existing user.
- **POST /api/users/admin**: Logs in an admin user.

### **Cart Management**
- **GET /api/cart**: Retrieves the current cart for the authenticated user.
- **POST /api/cart/add**: Adds a product to the user's cart.
- **PATCH /api/cart/update**: Updates the items in the user's cart.

### **Order Management**
- **GET /api/orders/admin/orders**: Retrieves all orders for admin users.
- **PATCH /api/orders/status**: Updates the status of an order (admin only).
- **POST /api/orders/cod**: Places an order using Cash on Delivery (COD).
- **POST /api/orders/stripe**: Places an order using Stripe for payment.
- **GET /api/orders/user/orders**: Retrieves all orders for the authenticated user.

### **Product Management**
- **POST /api/products/add**: Adds a new product (admin only).
- **POST /api/products/single**: Retrieves a single product by ID.
- **GET /api/products/list**: Retrieves a list of all products.
- **DELETE /api/products/remove**: Removes a product (admin only).

### Prerequisites

- Node.js (>= 16.x)
- MongoDB (cloud or local instance)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/todo-app.git
   cd ecommerce-store-mern
   ```

2. Install dependencies for the backend:
```bash
   cd server
   npm install
```
3. Install dependencies for the  both admin and client frontend:
```bash
   cd client
   npm install

   cd admin
   npm install
```
4. Setup env variables frontend and backend projects

  - Create .env.local file with these variables for admin and client
   ```bash
     VITE_SERVER_URL="your backend url"
  ```

- Create .env file with these variables for server
   ```bash
    MONGODB_URI= "your mongodb connection string"
    CLOUDINARY_CLOUD_NAME= "your cloud name"
    CLOUDINARY_API_KEY= "cloudinary api key"
    CLOUDINARY_API_SECRECT= "cloudinary api secret"
    JWT_SECRET= "your jwt secrect"
    ADMIN_EMAIL= "sample placeholder admin email"
    ADMIN_PASSWORD= "sample admin password"
    STRIPE_SECRET_KEY= "stripe secret key"
    STRIPE_ENDPOINT_SECRET= "stripe webhook secret"
  ```
5. Start both the backend and frontend servers:
```bash
   cd server
   npm run dev
```
```bash
   cd client
   mpm run dev
```
```bash
   cd admin
   npm run dev
```
6. The storefront should be available on http://locahost:5173/ the admin panel should be available on http://localhost:5174/ and the server should be running on http://localhost:5000/

