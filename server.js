import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import profRoutes from "./routes/profRoutes.js";
import eleveRoutes from "./routes/eleveRoutes.js";
import classRoutes from "./routes/classroutes.js";
import coursRoutes from "./routes/coursRoutes.js";
import demandeRoutes from "./routes/demandeRoutes.js";
import connectDB from "./config/db.js";
import path from "path";

const app = express();

// ✅ CORS UNIFIÉ
app.use(cors({
  origin: "https://senecolevirtuelle.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

app.use(express.json());

// Répondre proprement aux preflight OPTIONS
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "https://senecolevirtuelle.vercel.app");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.status(200).end();
  }
  next();
});

/*app.use(cors({
  origin: "https://senecolevirtuelle.vercel.app",
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
}));

// 🔥 Répondre aux requêtes OPTIONS (preflight)
app.options("*", cors());*/

const __dirname = path.resolve();

// DB
connectDB();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/eleves", eleveRoutes);
app.use("/api/profs", profRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/cours", coursRoutes);
app.use("/api/demandes", demandeRoutes);

// Uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));


/*import "dotenv/config";   // Bibliotéque de node.js. Permet de charger les variables d'environnement
import express from "express"; // framework de node.js. Sert uniquement á gérer les routes http comm app.get, app.post ...
import cors from "cors";  // Middleware permet d'activer le CROSS-ORIGIN RESOURCE SHARING
import morgan from "morgan";//Middlewae du protocole http. permet de loguer dans le cosole toutes les requètes http
import profRoutes from "./routes/profRoutes.js"; //Objet routeur express, crèer avec express.Router().
import eleveRoutes from "./routes/eleveRoutes.js";
//import loginProfRoutes from "./routes/loginprofroutes.js";
import classRoutes from "./routes/classroutes.js";
import coursRoutes from "./routes/coursRoutes.js";
import path from "path";
import demandeRoutes from "./routes/demandeRoutes.js";




import connectDB from "./config/db.js"; 

const app = express(); //instance d'express

const allowedOrigin = "https://senecolevirtuelle.vercel.app";

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


const __dirname = path.resolve();




// Connexion à la base de données
connectDB();

// Middlewares
app.use(express.json()); // permet à notre app de pouvoir lire les fichiers JSON des requétes du client
//app.use(cors());
app.use(cors({
  origin: "https://senecolevirtuelle.vercel.app",
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
}));
app.use(morgan("dev"));

//Les routes
//app.use("/api/prof", signupProfRoutes); // pour toutes les requetes qui commencent par /api/signup utiliser signupRoutes. Permet à app d'utiliser lobjet router d'express avec la route /api/signup
app.use("/api/eleves", eleveRoutes);
app.use("/api/profs", profRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/cours", coursRoutes);

// ⚡ Permet d'accéder aux fichiers uploadés
//app.use("/uploads", express.static("uploads"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/api/demandes", demandeRoutes);

//app.use("/api/eleves", eleveRoutes);



// Tester les routes
/*app.get("/", (req, res) => {
  res.send("🚀 API running with ESM!");
});*/





// Démarrage du serveur
//const PORT = process.env.PORT || 5000;
//app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
