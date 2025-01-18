"use client"
import Main from "@/components/Main";
import { auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const page = () => {
    const router = useRouter()
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
              router.push("/web/search");
            });
          } else {
            // Si el usuario no está autenticado, redirige a /login
            router.push("/search");
          }
        });
    
        // Limpia el temporizador y el listener cuando el componente se desmonte
        return () => {
          unsubscribe();
        };
      }, [router]); // El efecto solo depende de router
    return (
        <section>

            <article className="flex background-2 w-full h-svh">
                <Main activeT={false} activeH={false} webH={false} webP={false} webS={false} webST={false} activeP={false} web={false} activeS={true} activeST={false} login={false}/>
            </article>
        </section>
    )
}

export default page