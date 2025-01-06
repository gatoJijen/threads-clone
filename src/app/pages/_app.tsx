import { auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App (){
    const router = useRouter();

    useEffect(() => {
  
  
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            
            if (user) {
              // Usuario autenticado
              router.push("/web");
            } else {
              // Usuario no autenticado
              router.push("/login");
            }
          });
      return () => unsubscribe(); // Limpia el listener al desmontar
    }, [router]);
    return null
}