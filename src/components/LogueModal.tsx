import ContinuarL from '@/app/public/ContinuarL';
import { auth, provider } from '@/firebase/config';
import { signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

interface ModalProps {
    active: boolean
}

const LogueModal:React.FC<ModalProps> = ({active}) => {
    const router = useRouter();
        const [error, setError] = useState("");
        const [loading, setLoading] = useState(false); // Estado para manejar la carga
    const googleRegister = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            if (!user) {
                throw new Error("No se pudo obtener el usuario.");
            }

            const token = await user.getIdToken();
            localStorage.setItem("authToken", token);
            localStorage.setItem("userEmail", user.email || "");

            console.log("Inicio de sesión con Google exitoso:", user);
            router.push("/web");
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (error: any) {
            console.error("Error al iniciar sesión con Google:", error.message || error);
            setError(error.message || "Error desconocido al iniciar sesión con Google.");
        }
    };
    return (
        <div className='w-[200vw] absolute h-svh'>

        
        {active?(
            <article className='background-1 rounded-xl w-[520px] h-[313px] absolute top-[25%] right-[18%] flex flex-col gap-4 items-center justify-center p-4'>
                <header className='flex flex-col justify-center items-center gap-2'>
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
            </article>):("")

        }
        </div>
    )
}

export default LogueModal