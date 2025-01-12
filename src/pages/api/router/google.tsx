import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "@/firebase/config"; // Asegúrate de tener la configuración de Firebase
import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";

// Función de manejo de la autenticación con Google
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { token } = req.body;

      if (!token) {
        return res.status(400).json({ error: "Falta el token de autenticación" });
      }

      // Creamos las credenciales con el token proporcionado
      const credential = GoogleAuthProvider.credential(token);

      // Inicia sesión con las credenciales obtenidas
      const userCredential = await signInWithCredential(auth, credential);
      const user = userCredential.user;

      // Si no se encuentra el usuario, retorna un error
      if (!user) {
        return res.status(400).json({ error: "No se pudo obtener el usuario." });
      }

      // Obtén el token de ID
      const idToken = await user.getIdToken();

      // Responde con los datos del usuario y el token de ID
      return res.status(200).json({
        success: true,
        token: idToken,
        email: user.email || "",
        displayName: user.displayName || "",
      });
    } catch (error: any) {
      console.error("Error en la autenticación con Google:", error);
      return res.status(500).json({ error: "Error interno en la autenticación" });
    }
  } else {
    // Si el método no es POST, responde con un error
    return res.status(405).json({ error: "Método no permitido" });
  }
};

export default handler;
