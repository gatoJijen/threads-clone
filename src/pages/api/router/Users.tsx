import { db } from "@/firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { displayName, url } = req.body;

      // Validar que los campos obligatorios estén presentes
      //if (!displayName) {
      //  return res.status(400).json({ error: "Faltan datos. 'displayName' es requerido." });
      //}

      // Guardar en la colección 'post' de Firebase Firestore
      const docRef = await addDoc(collection(db, "users"), {
        displayName,
        url,
        createdAt: new Date(),
      });

      // Retornar la respuesta con éxito y el ID del nuevo documento
      return res.status(201).json({ success: true, message: "Publicación creada", id: docRef.id });
    } catch (error) {
      console.error("Error en el servidor:", error);
      return res.status(500).json({ error: "Error interno del servidor. Intente nuevamente más tarde." });
    }
  }

  return res.status(405).json({ error: "Método no permitido" });
};

export default handler;
