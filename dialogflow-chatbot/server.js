// // Code for the webhook server

// const express = require("express");
// const bodyParser = require("body-parser");

// const app = express();
// app.use(bodyParser.json());

// // Webhook endpoint for Dialogflow CX
// app.post("/webhook", (req, res) => {
//     const tag = req.body.fulfillmentInfo.tag; // Identify which intent triggered the webhook
//     let response = {};

//     if (tag === "business_hours") {
//         response = { fulfillment_response: { messages: [{ text: { text: ["We are open from 9 AM to 6 PM, Monday to Friday."] } }] } };
//     } else if (tag === "services") {
//         response = { fulfillment_response: { messages: [{ text: { text: ["We offer web development, AI solutions, and blockchain services."] } }] } };
//     } else {
//         response = { fulfillment_response: { messages: [{ text: { text: ["Sorry, I didn't understand that."] } }] } };
//     }

//     res.json(response);
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });




















// // After integrating with Vertex AI Agent Builder

// const express = require('express');
// const { GoogleAuth } = require('google-auth-library');
// const axios = require('axios');

// const app = express();
// app.use(express.json());

// // Authenticate using Google Cloud service account key
// const auth = new GoogleAuth({
//   keyFile: 'dialogflow-chatbot\securedocchatbot-0ac62d769600.json',  // Path to your service account JSON key
//   scopes: 'https://www.googleapis.com/auth/cloud-platform',
// });

// app.post('/webhook', async (req, res) => {
//   const query = req.body.queryResult.queryText;

//   try {
//     const client = await auth.getClient();
//     const projectId = 'securedocchatbot'; // Replace with your project ID
//     const dataStoreId = 'doc-chatbot_1738523521163'; // Replace with your Data Store ID
//     const location = 'asia-south1 (Mumbai, India)'; // Replace with your region if different

//     // Make a request to Vertex AI Agent Builder
//     const url = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/dataStores/${dataStoreId}:search`;

//     const response = await axios.post(url, { query }, {
//       headers: { Authorization: `Bearer ${await client.getAccessToken()}` }
//     });

//     const result = response.data.results[0]?.document?.content || "Sorry, I couldn't find an answer in the documents.";

//     res.json({
//       fulfillmentText: result,
//     });
//   } catch (error) {
//     console.error('Error querying Vertex AI Agent Builder:', error);
//     res.json({
//       fulfillmentText: "Oops! I couldn't retrieve the answer from the documents.",
//     });
//   }
// });

// app.listen(5000, () => console.log('Webhook running on port 5000'));









































// const express = require('express');
// const cors = require('cors'); // Import CORS
// const { GoogleAuth } = require('google-auth-library');
// const axios = require('axios');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const dotenv = require('dotenv');

// const app = express();
// app.use(express.json());
// app.use(express.static('public'))


// // Use CORS Middleware
// app.use(cors({
//     origin: 'http://127.0.0.1:5500', // Allow only your frontend origin
//     methods: 'GET,POST,PUT,DELETE',  // Allow these HTTP methods
//     allowedHeaders: 'Content-Type,Authorization' // Allow these headers
// }));



// // MongoDB Connection

// dotenv.config();  // Load environment variables

// const MONGO_URI = process.env.MONGO_URI; // Get from .env file
// console.log(MONGO_URI)
// if (!MONGO_URI) {
//   console.error("MongoDB URI is missing. Set MONGO_URI in .env file.");
//   process.exit(1);
// }

// mongoose.connect(MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch(err => console.error('MongoDB connection error:', err));

// // User Schema
// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true }
// });

// const User = mongoose.model('User', userSchema);

// // Google Authentication
// const auth = new GoogleAuth({
//   keyFile: 'dialogflow-chatbot\securedocchatbot-0ac62d769600.json',
//   scopes: 'https://www.googleapis.com/auth/cloud-platform',
// });

// // Authentication Routes
// app.post('/signup', async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     // Check if user exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create user
//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword
//     });

//     await newUser.save();
//     res.status(201).json({ message: 'User created successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating user', error: error.message });
//   }
// });

// app.post('/login', async (req, res) => {
//     try {
//       const { email, password } = req.body;
  
//       // Find user
//       const user = await User.findOne({ email });
//       if (!user) {
//         return res.status(400).json({ message: 'Invalid credentials' });
//       }
  
//       // Check password
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return res.status(400).json({ message: 'Invalid credentials' });
//       }
  
//       // Return success message if login is successful
//       res.status(200).json({ message: 'Login successful' });
  
//     } catch (error) {
//       res.status(500).json({ message: 'Error logging in', error: error.message });
//     }
//   });
  

// // Webhook Route (existing)
// app.post('/webhook', async (req, res) => {
//   // ... (keep your existing webhook code here)
// });

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


























































const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();
connectDB();
app.use(express.json());

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);


// After integrating with Vertex AI Agent Builder

const { GoogleAuth } = require('google-auth-library');
const axios = require('axios');


// Authenticate using Google Cloud service account key
const auth = new GoogleAuth({
  keyFile: process.env.SERVICE_ACCOUNT_JSON_KEY,  // Path to your service account JSON key
  scopes: 'https://www.googleapis.com/auth/cloud-platform',
});

app.post('/webhook', async (req, res) => {
  const query = req.body.queryResult.queryText;

  try {
    const client = await auth.getClient();
    const projectId = process.env.PROJECT_ID; // Replace with your project ID
    const dataStoreId = process.env.DATA_STORE_ID; // Replace with your Data Store ID
    const location = process.env.LOCATION; // Replace with your region if different

    // Make a request to Vertex AI Agent Builder
    const url = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/dataStores/${dataStoreId}:search`;

    const response = await axios.post(url, { query }, {
      headers: { Authorization: `Bearer ${await client.getAccessToken()}` }
    });

    const result = response.data.results[0]?.document?.content || "Sorry, I couldn't find an answer in the documents.";

    res.json({
      fulfillmentText: result,
    });
  } catch (error) {
    console.error('Error querying Vertex AI Agent Builder:', error);
    res.json({
      fulfillmentText: "Oops! I couldn't retrieve the answer from the documents.",
    });
  }
});

// app.listen(5000, () => console.log('Webhook running on port 5000'));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));