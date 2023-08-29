import express from "express";
import dotenv from "dotenv";
// import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
// import path from 'path';
//configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
// app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// Use environment variables or configuration to provide the paths
// const CLIENT_BUILD_PATH = process.env.CLIENT_BUILD_PATH || path.resolve(__dirname, 'client', 'build');
// const INDEX_HTML_PATH = path.resolve(CLIENT_BUILD_PATH, 'index.html');

// app.use(express.static(CLIENT_BUILD_PATH));

// app.get('*', (req, res) => {
//   res.sendFile(INDEX_HTML_PATH);
// });
//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on port ${PORT}`.bgCyan
      .white
  );
});
