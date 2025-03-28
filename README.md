# University Project on modern JavaScsript Ecosystem 

**Description:**  
This repository contains the final submission of our university project on the topic of "Modern Web Development with JavaScript." The goal of the project was to learn and practically apply modern web technologies. We used various technologies from the JavaScript Ecosystem, including Webpack, Babel, React, ESLint, Firebase, and more.

📌 **Note:**  
The project consisted of several parts, each focusing on specific concepts and tools. While this README contains information about all used Technologies & Tools, 
the code of parts 1 to 4 was deleted due to given code from the lecturer.

## 🚀 Assignments with Features

### 📌 Assignment 1: Literature Management System (Website)  
- Implementation of a **Single-Page Application (SPA)**  
- Use of **ECMAScript (ES6+)** features  
- Application of the **MVC pattern**  

### 📌 Assignment 2: CLI Application  
- Use of **third-party modules** via **npm**  
- Implementation of **asynchronous programming**  

### 📌 Assignment 3: Website Extension  
- Integration of **Babel** and **Webpack**  
- Code quality improvement with **ESLint**  
- Addition of a **rating system**  

### 📌 Assignment 4: Testing & CI/CD  
- Introduction to **automated testing**  
- Setting up **CI/CD pipelines** with **GitHub Actions**  

### 📌 Assignment 5: Final Project with React  
- Implementation of a complete web application with **React**  
- Use of **Firebase - Cloud Firestore Database**
- Deploy through **Firebase - Hosting**

---

## 🛠 Technologies & Tools  
✅ **JavaScript (ES6+)**  
✅ **React**  
✅ **Node.js & npm**  
✅ **Babel & Webpack**  
✅ **ESLint**  
✅ **Vitest**  
✅ **Vite**  
✅ **Firebase**  
✅ **GitHub Actions**  

---

## 📂 Folder Structure
📌 **Note:** Each Assignment was located in its own folder within the repository. The structure wasn't changed after deleting the folders for Assignment 1-4 🚀  

```
📦 University-Project-on-modern-JavaScript-Ecosystem
 ┣ 📂 .github/workflows
 ┣ 📂 Assignment5
 ┗ 📜 .gitignore
```

---

## Installation  

### Required Software  
To install and run the project locally, you will need the following software:  
- **Node.js** (version 14.x or higher)  
- **npm** (installed with Node.js)  
- **Git** (for cloning the repository)  

### Installation Steps  
1. Clone the repository and open the project folder:
   ```bash
   git clone https://github.com/ElenaLaubinger/University-Project-on-modern-JavaScript-Ecosystem.git
   
2. Navigate to the respective assignment folder:
   ```bash
   cd <Assignment>
   
3. Install the dependencies:
   ```bash
   npm install

---

## Usage

### Assignment 5 
<details> 
 <summary> Show more </summary>

#### Get the developer documentation

1. Run following command

   ```bash
   npx jsdoc src -r
   
2. The folder *out* will be created in the Assignment directory. This folder contains the generated HTML documentation.
3. Open **index.html** with **Live Server** and you can now navigate through the documentation to explore the component details.

#### Configurate firebase 
 1. To use the application as developer you need to have a Google-Account or create one
 2. Go to [Google Firebase](https://console.firebase.google.com) and follow the steps to create a new project
 3. Go to Project settigns and click `Add App`. Select `npm` for the right configuration method
 4. Create a `.env` file into the *Assignment5* folder
 5. Put in the variables below and your matching firebaseConfig data
    ```env
    VITE_FIREBASE_API_KEY = "your-api-key"
    VITE_FIREBASE_AUTH_DOMAIN = "your-auth-domain"
    VITE_FIREBASE_PROJECT_ID = "your-project-id"
    VITE_FIREBASE_STORAGE_BUCKET = "your-storage-bucket"
    VITE_FIREBASE_MESSAGING_SENDER_ID = "your-sender-id"
    VITE_FIREBASE_APP_ID = "your-app-id"
    VITE_FIREBASE_MEASUREMENT_ID = "your-measurement-id"
   
 6. Change the **collectionName** in the **Database.jsx** to the name of your own collection
     ```
    📂 Assignment5
     ┣ 📂 src
        ┣ 📂 assets
        ┣ 📂 firebase_local
           ┣ ⚛️ Database.jsx    🡄
           ┣ ⚛️ FB_App.jsx
        ┣ 📂 Modules
        ┣ ⚛️ App.jsx
        ┣ ⚛️ main.jsx
        ...
   
   ![image](https://github.com/user-attachments/assets/b299327b-03d3-4586-b5c2-a40ab123b65d)

#### Deployment with Firebase Hosting
Please look up information on Deployment in the **README.md** file in the *Assignment5* folder


#### How to run the scripts manually

- **Testing**
  - Check the Test-Coverage
     ```bash
     npm run test:coverage
   
  - Run test on BookDetail.jsx
     ```bash 
     npm run test
     
- **Linting**
  - Run the linting
     ```bash 
     npm run lint
    
- **Build for Production**
  - Production-Mode
    ```bash 
    npm run build
    
- **Show Preview of build application**
    ```bash 
    npm run preview
   
- **Start Development Server**
   - Development-Mode
     ```bash 
     npm run dev

  </details>

---

## 👥Authors  
👤 Elena Julia Laubinger  
👤 Anna-Lena Lumpp  
👤 Monique Maurer  
👤 Xinyu Ren  

---

## 🔒 License  
BSD 3-Clause License

Copyright (c) [2025], [Elena Julia Laubinger, Anna-Lena Lumpp, Monique Maurer, Xinyu Ren]

Use, modification, and distribution of the code are permitted with the condition that the copyright notice and this license are included in all copies of the code. The name of the author or organization may not be used in connection with derived works without explicit permission.
