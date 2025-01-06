"use client"
import LoadingMain from "@/components/LoadingMain";
import Main from "@/components/Main";
import { auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Web() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        
      if (user) {
        // Usuario autenticado
        router.push("/web");
      } else {
        // Usuario no autenticado
        router.push("/");
      }
    });
    // Simula un retraso en la carga para este ejemplo
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 segundos de "carga"
    return () => {clearTimeout(timer);unsubscribe();}

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