"use client"
import LoadingMain from "@/components/LoadingMain";
import Main from "@/components/Main";
import useActive from "@/hooks/useActive";
import { useEffect, useState } from "react";
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {

    // Simula un retraso en la carga para este ejemplo
    const timer = setTimeout(() => {
      setIsLoading(false);
      isActive()
        console.log(isActive)
    }, 2000); // 2 segundos de "carga"
    return () => clearTimeout(timer);

  }, []);

  return (
    <section>
      {isLoading ? (
        <LoadingMain />
      ) : (
        <article>
          <Main activeT={true} activeH={false} activeP={false} activeS={false}/>
        </article>
      )}
    </section>
  );
}