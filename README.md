🛒 MERN E-Commerce Application with AI Chatbot
📌 Project Overview

This is a full-stack MERN e-commerce platform built as part of a technical assessment.
It supports role-based access (Admin & Customer), product browsing and ordering, and includes an AI-powered chatbot to answer customer queries like product availability, pricing, categories, and store policies.

The platform is designed to be modular, scalable, and easy to extend.

✨ Features Implemented
🔐 Authentication & Authorization

JWT-based authentication

Role-based access control (Admin / Customer)

🛍 E-Commerce Features

Product listing & details

Category filtering

Shopping cart

Order placement

Order history

Admin product management (Add / Edit / Delete products)

🤖 AI-Powered Chatbot

Availability check (“Is iPhone in stock?”)

Product search (“Show laptops under 50000”)

Product details (“Tell me about MacBook Air”)

Cheapest product lookup

Category listing

Help & policy queries

🛠 Admin Panel

Secure admin login

Product management

Order monitoring

🧰 Technology Stack
Frontend

React.js

React Router

Styled Components / CSS

Backend

Node.js

Express.js

MongoDB with Mongoose

JWT Authentication

OpenAI API for chatbot

AI Service

OpenAI GPT-4o-mini for intent extraction and conversational responses

⚙️ Setup Instructions
1️⃣ Clone the repository
git clone https://github.com/Soumyacode1-prog/mern-ecommerce-assessment.git
cd mern-ecommerce-assessment

2️⃣ Install Backend Dependencies
cd project
cd server
npm install

3️⃣ Install Frontend Dependencies
cd project
cd client
npm install

4️⃣ Environment Variables

Create a .env file inside the backend folder:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mern_ecommerce
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key_here   



5️⃣ Start MongoDB

Make sure MongoDB is running locally:

mongod

6️⃣ Run Backend
cd project
cd server
npm run dev


or

npm start

7️⃣ Run Frontend
cd project
cd client
npm start

▶️ Application URLs
Service	URL
Frontend	http://localhost:3000

Backend API	http://localhost:5000

Chatbot API	http://localhost:5000/api/chatbot

🔑 Test Credentials
Admin Account
Email: shambhavisoumya10@gmail.com
Password: 123456

Website video:   https://docs.google.com/videos/d/1QwTopKvYNY2n_QeGsqu0GidagqM0cwp_yaKw8u0oSZ0/edit?usp=sharing

⚠️ Note: These credentials are for testing/demo only.
Change them in production.

🧪 Sample Chatbot Queries

• Categories: "What do you sell?"

• Help: "How do I place an order?"

• Store Policies: "What's your return policy?"

• Availability Check: "Is [product name] in stock?"

• Product Search: "Show me [category] under [price]"

• Product Details: "Tell me about [product name]"

• Price Queries: "What's the cheapest laptop you have?"

📦 Database

Database Name: mern_ecommerce

Collections:

users

products

orders

Each product contains:

name

price

category

description

stock

🧠 Assumptions & Design Decisions

JWT is used for stateless authentication.

Chatbot extracts structured intent before querying the database.

Products are searched using regex for flexible matching.

Price filters use “less than or equal to” logic.

Admin privileges are assigned by role in the user model.

The chatbot is designed for read-only assistance, not order placement.

🚀 Future Enhancements

Payment gateway integration

Recommendation system

Order tracking chatbot intent

Voice chatbot support

Admin analytics dashboard

👩‍💻 Author

Shambhavi Soumya
Full-Stack Developer | MERN | AI Integrations
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
