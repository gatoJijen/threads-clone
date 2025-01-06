"use client"
import LoadingMain from "@/components/LoadingMain";
import Main from "@/components/Main";
import { auth } from "@/firebase/config";
import { getIdTokenResult, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Web() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // Escuchar cambios en el estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          // Verifica la validez del token al iniciar sesión
          try {
            const tokenResult = await getIdTokenResult(user);
            if (!tokenResult.claims) {
              throw new Error("Token inválido");
            }
            // Usuario autenticado: Redirige a la página correspondiente
            router.push("/web");
          } catch (error) {
            console.error("Error al validar el token:", error);
            router.push("/login");
          }
        } else {
          // Usuario no autenticado: Redirige a login
          router.push("/login");
        }
      })
      // Verificación activa cada minuto
      const interval = setInterval(async () => {
        const user = auth.currentUser;
        if (user) {
          try {
            await user.reload(); // Recarga el estado del usuario
            if (!user.emailVerified || user.isAnonymous) {
              throw new Error("Cuenta eliminada o no válida");
            }
          } catch (error) {
            console.error("Usuario inválido:", error);
            router.push("/login");
          }
        }
      }, 10000); // Verifica cada 60 segundos
      // Simula un retraso en la carga para este ejemplo
      const timer = setTimeout(() => {
        setIsLoading(false);
        
      }, 2000); // 2 segundos de "carga"
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      return () => {clearInterval(interval);unsubscribe(), clearTimeout(timer)}
  
    }, [router]);
  

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