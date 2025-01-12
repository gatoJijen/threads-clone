import { auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App() {
  const router = useRouter();

  useEffect(() => {
    // Primero, comprueba si ya existe un token de autenticación en localStorage
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      // Si hay un token de autenticación, redirige al usuario a /web
      router.push("/web");
      return;
    }

    // Si no hay token, observa el estado de autenticación con Firebase
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Si el usuario está autenticado, guarda el token y el email en localStorage
        user.getIdToken().then((token) => {
          localStorage.setItem("authToken", token);
          localStorage.setItem("userEmail", user.email || "");
          router.push("/web");
        });
      } else {
        // Si el usuario no está autenticado, redirige a /login
        router.push("/login");
      }
    });

    // Limpia el listener al desmontar
    return () => unsubscribe();
  }, [router]);

  return null; // No es necesario renderizar nada, ya que las redirecciones ocurren en el useEffect
}
