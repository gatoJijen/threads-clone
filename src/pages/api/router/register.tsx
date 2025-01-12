
import { auth } from "@/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { email, contraseña } = req.body;

      if (!email || !contraseña) {
        return res.status(400).json({ error: "Faltan datos" });
      }

      // Guardar en la colección 'post' de Firebase Firestore
      const docRef =await createUserWithEmailAndPassword(auth, email, contraseña)


      return res.status(201).json({ success: true}), docRef;
    } catch (error) {
      console.error("Error en el servidor:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  return res.status(405).json({ error: "Método no permitido" });
};

export default handler;
