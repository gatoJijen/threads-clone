import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "@/firebase/config"; // Configuración de Firebase
import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";

// Tipos para el cuerpo de la solicitud
interface RequestBody {
    token: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }

    try {
        const { token } = req.body as RequestBody;

        if (!token) {
            console.error("Token de autenticación faltante");
            return res.status(400).json({ error: "Falta el token de autenticación" });
        }

        console.log("Token recibido:", token);

        // Crear credenciales con el token proporcionado
        const credential = GoogleAuthProvider.credential(token);

        console.log("Credenciales generadas:", credential);

        // Iniciar sesión con las credenciales obtenidas
        const userCredential = await signInWithCredential(auth, credential);
        const user = userCredential.user;

        if (!user) {
            console.error("No se pudo obtener el usuario");
            return res.status(400).json({ error: "No se pudo obtener el usuario." });
        }

        console.log("Usuario autenticado:", user);

        // Obtener el token de ID del usuario autenticado
        const idToken = await user.getIdToken();

        console.log("ID Token generado:", idToken);

        // Respuesta exitosa con los datos del usuario
        return res.status(200).json({
            success: true,
            token: idToken,
            email: user.email || "",
            displayName: user.displayName || "",
        });
    } catch (error: unknown) {
        console.error("Error en la autenticación con Google:", error);

        // Manejo de errores más seguro
        const errorMessage =
            error instanceof Error ? error.message : "Error interno en la autenticación";

        return res.status(500).json({ error: errorMessage });
    }
};

export default handler;
