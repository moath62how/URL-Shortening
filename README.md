
---

# **URL Shortening Service**  

## **Overview**  
This project is a **URL-shortening service** that provides both an **API** and a **front-end page** for users to shorten long URLs and track access counts. It is designed to be used in **GDG Express**, where I will be the instructor.  

## **Features**  
✅ Shorten long URLs  
✅ Track the number of times a shortened URL is accessed  
✅ RESTful API for integration with other applications  
✅ User-friendly front-end interface  
✅ Built with **Node.js, Express, MongoDB**, and **Bootstrap**  

## **Technologies Used**  
- **Backend**: Node.js, Express.js, MongoDB  
- **Frontend**: HTML, CSS, Bootstrap, Pug  
- **Database**: MongoDB (Mongoose ODM)  
- **Tools**: Toastify.js for notifications  

## **How to Run Locally**  
### **1. Clone the repository**  
```sh
git clone https://github.com/moath62how/URL-Shortening.git
cd URL-Shortening
```

### **2. Install dependencies**  
```sh
npm install
```

### **3. Set up environment variables**  
Create a `.env` file and add:  
```
MONGO_URI=your_mongodb_connection_string
PORT=3000
JWT_SECRET_PASSOWRD=a_secret_of_your_choice
NODE_ENV=dev_or_prod
JWT_COOKIES_EXPIRES=time_in_days
```


---

## **API Endpoints**  

### **Authentication Endpoints**  

| Method   | Endpoint            | Description                           | Authentication |
|----------|---------------------|---------------------------------------|---------------|
| **POST**  | `/api/v1/auth/signup`  | Registers a new user                  | ❌ No        |
| **POST**  | `/api/v1/auth/login`   | Authenticates a user and returns a token | ❌ No        |
| **POST**  | `/api/v1/auth/logout`  | Logs out the user                      | ✅ Yes (Required) |

---

### **URL Shortening Endpoints**  

| Method   | Endpoint                  | Description                                | Authentication |
|----------|---------------------------|--------------------------------------------|---------------|
| **POST**   | `/api/v1/shorten/`         | Creates a new shortened URL                | ✅ Yes (User) |
| **GET**    | `/api/v1/shorten/`         | Retrieves all shortened URLs               | ✅ Yes (Admin) |
| **GET**    | `/api/v1/shorten/{URL_id}` | Retrieves details of a specific URL        | ✅ Yes (Admin) |
| **PATCH**  | `/api/v1/shorten/{URL_id}` | Updates a shortened URL                    | ✅ Yes (Admin) |
| **DELETE** | `/api/v1/shorten/{URL_id}` | Deletes a shortened URL                    | ✅ Yes (Admin) |

---

### **User Management Endpoints**  

| Method   | Endpoint              | Description                                | Authentication |
|----------|-----------------------|--------------------------------------------|---------------|
| **POST**   | `/api/v1/user/`        | Creates a new user                         | ✅ Yes (Required) |
| **GET**    | `/api/v1/user/`        | Retrieves all users (Admin only)           | ✅ Yes (Admin) |
| **GET**    | `/api/v1/user/{user_id}` | Retrieves details of a specific user       | ✅ Yes (Admin) |
| **PATCH**  | `/api/v1/user/{user_id}` | Updates a specific user's details          | ✅ Yes (Admin) |
| **DELETE** | `/api/v1/user/{user_id}` | Deletes a user                             | ✅ Yes (Admin) |

---


## **Contributing**  
Feel free to open issues and submit pull requests to improve the project! 🚀  

---
