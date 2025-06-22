// Create a new file: server-test.js
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';


dotenv.config();
import dbConnection from "./config/db.js";
import ps4Routes from "./routes/ps4.routes.js"
import ps5Routes from "./routes/ps5.routes.js";
import xboxOneRoutes from "./routes/xboxOne.route.js"
import xboxXRoutes from "./routes/xboxX.routes.js";
import productsRoutes from "./routes/products.routes.js";
import askAIRoutes from "./routes/askAI.routes.js"
import authenticationRoutes from "./routes/authentication.routes.js"
import cartRoutes from "./routes/cart.routes.js"
import productsItemsRoutes from "./routes/items.routes.js"
import userInformation from "./routes/userInformation.routes.js"

dbConnection(); // Initialize database connection
const app = express();
const PORT = 5000;

console.log('Starting minimal server...');

// cors
app.use(cors({
  origin: ["http://localhost:5173" ,"http://localhost:3000", "https://gamenation-project-frontend.onrender.com"],
  credentials: true 
}) 
);

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use("/ps4", ps4Routes);
app.use("/ps5", ps5Routes);
app.use("/xboxOne", xboxOneRoutes);
app.use("/xboxX", xboxXRoutes);
app.use("/products", productsRoutes);
app.use("/askAI", askAIRoutes);
app.use("/authentication", authenticationRoutes);
app.use("/cart", cartRoutes);
app.use("/productsItems", productsItemsRoutes);
app.use("/userInformation", userInformation);

// Simple routes - NO parameters, NO external routes
app.get('/', (req, res) => {
    console.log('Root accessed');
    res.json({ message: 'Server working!' });
});

app.get('/home', (req, res) => {
    console.log('Home accessed');
    res.json({ message: 'Home page working!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Minimal server running on http://localhost:${PORT}`);
    console.log(`Test: http://localhost:${PORT}/home`);
});

console.log('Server setup complete - should not crash!');
