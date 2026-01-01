import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import profRoutes from "./routes/profRoutes.js";
import eleveRoutes from "./routes/eleveRoutes.js";
import classRoutes from "./routes/classroutes.js";
import coursRoutes from "./routes/coursRoutes.js";
import fs from "fs";
import path from "path";
import multer from "multer";
import demandeRoutes from "./routes/demandeRoutes.js";
import connectDB from "./config/db.js";
import "./config/cloudinary.js";


const app = express();

// 🔥 CORS — doit être placé en tout premier
//app.use(cors());
app.use(cors({
  origin: "https://senecolevirtuelle.com", 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// 🔥 Obligatoire pour Railway/Vercel (préflight OPTIONS)
//app.options("/api/*", cors());

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

const __dirname = path.resolve();
// Crée le dossier uploads s'il n'existe pas
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configuration Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir); // utilise le chemin complet
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

app.use("/api/uploads", express.static(uploadsDir));

// Connexion DB
connectDB();

// Routes
app.use("/api/eleves", eleveRoutes);
app.use("/api/profs", profRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/cours", coursRoutes);
app.use("/api/demandes", demandeRoutes);

// Accès aux uploads
//app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));












