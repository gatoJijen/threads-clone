import { db } from "@/firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { displayName, contenido, url, like, comment,rePost,share } = req.body;

      // Validar que los campos obligatorios estén presentes
      if (!displayName || !contenido) {
        return res.status(400).json({ error: "Faltan datos. 'displayName' y 'contenido' son requeridos." });
      }

      // Guardar en la colección 'post' de Firebase Firestore
      const docRef = await addDoc(collection(db, "post"), {
        displayName,
        contenido,
        url,
        like,
        comment,
        rePost,
        share,
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
