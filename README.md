
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



## **Contributing**  
Feel free to open issues and submit pull requests to improve the project! 🚀  

---
