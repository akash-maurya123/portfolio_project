// const express = require("express");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");
// const projectRoutes = require("./routes/projectRoutes");

// dotenv.config();
// connectDB();

// const app = express();
// app.use(express.json());

// // Routes
// app.use("/api/projects", projectRoutes);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   res.status(500).json({ message: err.message });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const projectRoutes = require("./routes/projectRoutes");
const cors = require("cors"); // 👉 import cors

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// ✅ CORS setup
const allowedOrigins = [
  // "http://localhost:3000" ,         // local frontend
  "https://frontend-portfolio-project.onrender.com/"   // live frontend domain
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Postman, curl ke liye
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

// Routes
app.use("/api/projects", projectRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
