# 📚 Bookmandu

Bookmandu is a full-stack MERN (MongoDB, Express, React, Node.js) web application where users can explore, add, and review books. It includes authentication, user reviews, and a simple UI for a better book discovery experience.

---

## 🔧 Tech Stack

**Frontend:**  
- React.js  
- CSS Modules  

**Backend:**  
- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- JWT (Authentication)

---

## 📁 Project Structure

### Backend (`/api`)

```
api/
├── models/
│   ├── auth.controller.js
│   ├── Book.js
│   ├── book.model.js
│   ├── Review.js
│   └── user.model.js
├── routes/
│   ├── auth.route.js
│   ├── book.routes.js
│   ├── books.js
│   └── index.js
```

### Frontend (`/client`)

```
client/
├── component/
│   ├── Footer.jsx
│   ├── Header.jsx
│   └── Header.css
├── public/
├── src/
    ├── assets/
    ├── pages/
    │   ├── About.jsx
    │   ├── AddBook.jsx
    │   ├── BookDetail.jsx
    │   ├── BookList.jsx
    │   ├── Contact.jsx
    │   ├── Home.jsx
    │   ├── Services.jsx
    │   ├── Signin.jsx
    │   ├── Signup.jsx
    │   ├── index.css
    │   ├── main.jsx
    │   ├── Signin.css
    │   └── Signup.css
    ├── utils/
    │   └── api.js
    ├── App.jsx
    ├── App.css
    ├── main.jsx
    └── index.css

```

---

## 🚀 Features

- 🔐 User Signup and Signin
- 📖 View list of all books
- ➕ Add new books
- 📝 Book detail and reviews
- 🧹 Clean and modular folder structure

---

## 📦 Installation & Run Locally

### 1. Clone the repo
```bash
git clone https://github.com/codeypas/bookmandu.git
cd bookmandu
```

### 2. Install Backend Dependencies
```bash
cd api
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../client
npm install
```

### 4. Set Environment Variables

Create a `.env` file inside `/api`:

```
MONGODB_URI=mongodb secret key
JWT_SECRET=your_jwt_secret
```

### 5. Run the App

#### Backend:
```bash
npm run dev
```

#### Frontend:
```bash
cd client
npm run dev
```

Now visit: `http://localhost:5173/`

---

## ✍️ Author

**Bijay Adhikari**  
[Portfolio](https://github.com/codeypas?tab=repositories) | [LinkedIn](https://www.linkedin.com/in/bijay-adhikari-656122327/)

