import "dotenv/config";   // Bibliotéque de node.js. Permet de charger les variables d'environnement
import express from "express"; // framework de node.js. Sert uniquement á gérer les routes http comm app.get, app.post ...
import cors from "cors";  // Middleware permet d'activer le CROSS-ORIGIN RESOURCE SHARING
import morgan from "morgan";//Middlewae du protocole http. permet de loguer dans le cosole toutes les requètes http
import profRoutes from "./routes/profRoutes.js"; //Objet routeur express, crèer avec express.Router().
import eleveRoutes from "./routes/eleveRoutes.js";
import classRoutes from "./routes/classroutes.js";
import coursRoutes from "./routes/coursRoutes.js";
import path from "path";
import demandeRoutes from "./routes/demandeRoutes.js";




import connectDB from "./config/db.js"; 

const app = express(); //instance d'express

// Middlewares
app.use(express.json()); // permet à notre app de pouvoir lire les fichiers JSON des requétes du client
//app.use(cors());
app.use(cors({
  origin: "https://senecolevirtuelle.vercel.app",
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
}));
app.use(morgan("dev"));

/*const allowedOrigin = "https://senecolevirtuelle.vercel.app";

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", allowedOrigin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  // IMPORTANT POUR VERCEL : Répondre aux préflight OPTIONS
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

*/
const __dirname = path.resolve();




// Connexion à la base de données
connectDB();



//Les routes

app.use("/api/eleves", eleveRoutes);
app.use("/api/profs", profRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/cours", coursRoutes);

// ⚡ Permet d'accéder aux fichiers uploadés

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/api/demandes", demandeRoutes);

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
