"use client"
import LoadingMain from "@/components/LoadingMain";
import Main from "@/components/Main";
import useActive from "@/hooks/useActive";
import { useEffect, useState } from "react";
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const {isActive} = useActive()
  useEffect(() => {
    // Simula un retraso en la carga para este ejemplo
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 segundos de "carga"
    return () => clearTimeout(timer);
    isActive()
  }, []);

  return (
    <section>
      {isLoading ? (
        <LoadingMain />
      ) : (
        <article>
          <Main/>
          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </article>
      )}
    </section>
  );
}