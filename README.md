# Sakib Swift Launch

A comprehensive platform designed for community welfare and fundraising, enabling users to create, manage, and participate in donation campaigns. This project also facilitates lost and found item management, allowing users to post, browse, and recover lost belongings effectively.

## Features

### General Features
- **Lost and Found Posts:** Users can create posts with detailed descriptions and images to report lost or found items.
- **User Management:** Handles user registration and ensures proper user data storage in MongoDB.
- **Search & Details:** Fetch specific post details using a robust search functionality.
- **Real-Time Updates:** Users can update their posts dynamically.
- **Secure Transactions:** All recovered data is securely stored in the database.
- **JWT Authentication:** Ensures secure access to private routes and user-specific data.

### API Endpoints

#### User Management
1. **Add User**
   - **Method:** `POST /users`
   - **Functionality:** Adds a new user to the database.
   - **Input:** User data (name, email, photo, etc.).

2. **Fetch User by Email**
   - **Method:** `GET /users/:mail`
   - **Functionality:** Fetches user details by email.

#### Lost & Found Campaigns
1. **Create Lost/Found Item Post**
   - **Method:** `POST /items`
   - **Functionality:** Adds a new lost or found item post to the database.

2. **Fetch All Posts**
   - **Method:** `GET /items`
   - **Functionality:** Retrieves all lost and found item posts.

3. **Fetch Post Details**
   - **Method:** `GET /items/:id`
   - **Functionality:** Fetches detailed information about a specific lost or found item post using its ID.

4. **Update Post**
   - **Method:** `PUT /items/:id`
   - **Functionality:** Updates an existing lost or found item post by its ID.

5. **Delete Post**
   - **Method:** `DELETE /items/:id`
   - **Functionality:** Deletes a specific lost or found item post by ID.

#### Recovered Items Management
1. **Mark as Recovered**
   - **Method:** `POST /recovered`
   - **Functionality:** Marks a lost or found item as recovered and stores recovery details (location, date, recovered by).

2. **Fetch All Recovered Items**
   - **Method:** `GET /recovered`
   - **Functionality:** Retrieves all recovered items with relevant details.

### Deployment Guidelines
- Ensure Firebase and MongoDB configurations are secured using environment variables.
- Fully responsive design optimized for mobile, tablet, and desktop.
- Avoid CORS/404/504 errors on production.

## Live Site
[Visit Sakib Swift Launch](https://sakib-welfare-champine.netlify.app/)

## GitHub Repositories
- **Server Repository:** [server-side-engrsakib](https://github.com/programming-hero-web-course2/b10a11-server-side-engrsakib)
- **Client Repository:** [client-side-engrsakib](https://github.com/programming-hero-web-course2/b10a11-client-side-engrsakib)

## How to Run the Server
1. Clone the repository:
   ```bash
   git clone https://github.com/engrsakib/sakib-welfare-champine-server-side.git
   cd sakib-welfare-champine-server-side
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   nodemon index.js
   ```

## How to Run the Client
1. Clone the repository:
   ```bash
   git clone https://github.com/engrsakib/sakib-welfare-champine-client-side.git
   cd sakib-welfare-champine-client-side
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the client:
   ```bash
   npm start
   ```

## Contribution
Contributions are welcome! Feel free to submit issues or pull requests to improve the platform.

