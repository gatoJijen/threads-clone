import ContinuarL from '@/app/public/ContinuarL';
import { auth, provider } from '@/firebase/config';
import { signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

interface ModalProps {
    active: boolean
}

const LogueModal: React.FC<ModalProps> = ({ active }) => {
    const router = useRouter();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error, setError] = useState("");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loading, setLoading] = useState(false); // Estado para manejar la carga
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const googleRegister = async () => {
            try {
                const result = await signInWithPopup(auth, provider);
                const user = result.user;
    
                if (!user) {
                    throw new Error("No se pudo obtener el usuario.");
                }
    
                const token = await user.getIdToken();
    
                // Enviar el token a la API para el backend
                const res = await fetch("/api/auth/google", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ token }),
                });
    
                const data = await res.json();
    
                if (data.success) {
                    // Guarda el token y otros datos en el localStorage
                    localStorage.setItem("authToken", data.token);
                    localStorage.setItem("userEmail", data.email);
    
                    // Redirige al usuario a la página principal
                    router.push("/web");
                } else {    
                    throw new Error(data.error || "Error desconocido");
                }
            } catch (error: any) {
                console.error("Error al iniciar sesión con Google:", error.message || error);
            }
        };
        /* eslint-disable @typescript-eslint/no-explicit-any */
    return (
        <div className='w-[200vw] absolute z-40 h-svh'>


            {active ? (
                <article className='background-1 z-[9999] rounded-xl w-[520px] h-[313px] absolute top-[25%] right-[18%] flex flex-col gap-4 items-center justify-center p-4'>
                    <header className='flex flex-col justify-center z-[9999999] items-center gap-2'>
                        <h1 className=' text-white text-3xl font-bold'>
                            Di más con Threads
                        </h1>
                        <p className='text-center text-white text-opacity-30 w-[360px]'>Únete a Threads para compartir ideas, enterarte de lo que pasa, seguir a tu gente y mucho más.</p>
                    </header>
                    <button
                        onClick={googleRegister}
                        className='background-1 mt-6 flex gap-4 items-center justify-between border border-white border-opacity-20 px-4 w-[370px] py-4 rounded-[12px] fs-1'
                        disabled={loading}
                    >
                        <picture className='background-image-1 w-[45px] h-[45px] inline-block'></picture>
                        <h2 className='text-base font-bold'>Continuar con Instagram</h2>
                        <article className='rotate-180'>
                            <ContinuarL />
                        </article>
                    </button>
                </article>) : ("")

            }
        </div>
    )
}

export default LogueModal