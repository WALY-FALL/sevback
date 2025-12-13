import Cours from "../models/coursmodel.js";
import Prof from "../models/profmodel.js";

// Ajouter un cours
export const ajouterCours = async (req, res) => {


  try {
    const { titre, description, contenu, classeId, profId } = req.body;

    //const fichiers = req.files?.map(f => f.path); // URL Cloudinary !!!
    const fichiers = req.files?.map(f => ({
      //url: f.path,        // l’URL Cloudinary
      url: f.secure_url || f.path, // priorite à secure_url
      nom: f.originalname // nom du fichier
    }));
    
    console.log(req.files);
    console.log("📁 FILE UPLOADED:", req.files);
    const cours = await Cours.create({
      titre,
      description,
      contenu,
      classeId,
      profId,
      fichiers,
    });

    res.status(201).json(cours);

  } catch (err) {
    console.error("Erreur Cloudinary :", err);
    res.status(500).json({ message: "Erreur serveur lors de la création du cours" });
  }
};

// Récupérer tous les cours d'un professeur
export const getCoursParProfesseur = async (req, res) => {
  try {
    const profId = req.prof.id; // récupéré depuis le token
    const cours = await Cours.find({ profId: profId });
    res.json(cours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCoursParClasse = async (req, res) => {
  try {
    const { classeId } = req.params;
    console.log("📥 [getCoursParClasse] Classe ID reçu :", classeId);

    // Vérifie si la classeId est bien reçue
    if (!classeId) {
      console.log("⚠️ Aucun classeId reçu !");
      return res.status(400).json({ message: "Classe ID manquant" });
    }

    // Récupération des cours
    const cours = await Cours.find({ classeId });
    console.log("🔍 Cours trouvés :", cours.length);

    // Vérifie les données des cours
    if (cours.length > 0) {
      console.log("📄 Exemple du premier cours :", cours[0]);
    }

    // Peuplement
    const coursPopulated = await Cours.find({ classeId }).populate("profId", "nom prenom");
    console.log("✅ Après populate :", coursPopulated.length);

    res.status(200).json(coursPopulated);
  } catch (error) {
    console.error("❌ Erreur backend complète :", error);
    res.status(500).json({
      message: "Erreur lors de la récupération des cours de la classe",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const supprimerCours = async (req, res) => {
  try {
    const coursId = req.params.id;
    const profId = req.prof.id; // depuis le token

    const cours = await Cours.findById(coursId);

    if (!cours) {
      return res.status(404).json({ message: "Cours introuvable" });
    }

    // 🔐 Sécurité : seul le prof propriétaire peut supprimer
    if (cours.profId.toString() !== profId) {
      return res.status(403).json({ message: "Action non autorisée" });
    }

    await cours.deleteOne();

    res.status(200).json({ message: "Cours supprimé avec succès", coursId });
  } catch (err) {
    console.error("❌ Suppression cours :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
