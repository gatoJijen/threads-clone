"use client"
import LoadingMain from "@/components/LoadingMain";
import Main from "@/components/Main";
import { auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Web() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // Estado para indicar que estamos cargando

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
        router.push("/");
      }
    });

    // Simula un retraso en la carga para este ejemplo
    const timer = setTimeout(() => {
      setIsLoading(false); // Cambia el estado de carga después de 2 segundos
    }, 2000);

    // Limpia el temporizador y el listener cuando el componente se desmonte
    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, [router]); // El efecto solo depende de router
  return (
    <section>
      {isLoading ? (
        <LoadingMain />
      ) : (
        <article className="flex background-2 w-full h-svh">
          <Main activeT={false} webH={false} webP={false} webS={false} webST={false} activeH={false} activeP={false} web={true} activeS={false} activeST={false} login={true}/>
        </article>
      )}
    </section>
  );
}