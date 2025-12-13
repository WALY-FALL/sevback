import express from "express";
import multer from "multer";
import { ajouterCours, getCoursParProfesseur, getCoursParClasse, supprimerCours } from "../controller/coursController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import { protect } from "../middlewares/authMiddleware.js";
//import { v2 as cloudinary } from "cloudinary";
//import { creerCours } from "../controllers/coursController.js";

const router = express.Router();



// Storage Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "cours",
    resource_type: "auto",
  },
});

const upload = multer({ storage });

// Route upload cours

router.post("/", upload.array("fichiers", 5), ajouterCours);


// Routes

// Ajouter un cours avec fichiers
// Ajouter un cours (sécurisé)
router.post("/", verifyToken, upload.array("fichiers", 10), ajouterCours);

// Récupérer tous les cours d'un professeur
router.get("/prof", verifyToken ,getCoursParProfesseur);

// Récupérer tous les cours d'une classe
router.get("/classe/:classeId", verifyToken, getCoursParClasse);

router.get("/test", (req, res) => {
  res.send("Route cours OK");
});

// Supprimer un cours (sécurisé)
router.delete("/:id", protect, supprimerCours);

export default router;
