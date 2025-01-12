import { auth } from "@/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { email, contraseña } = req.body;

      if (!email || !contraseña) {
        return res.status(400).json({ error: "Faltan datos" });
      }

      // Intentar iniciar sesión con Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, contraseña);

      // El objeto 'userCredential' contiene la información del usuario
      const user = userCredential.user;
      
      // Devuelve la información del usuario (incluyendo el token)
      const token = await user.getIdToken();
      
      return res.status(200).json({ 
        success: true,
        user: { 
          uid: user.uid, 
          email: user.email, 
          token: token // Agrega el token de usuario en la respuesta
        }
      });
    } catch (error) {
      console.error("Error en el servidor:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  return res.status(405).json({ error: "Método no permitido" });
};

export default handler;
