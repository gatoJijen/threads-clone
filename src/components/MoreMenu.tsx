"use client"
import { auth } from '@/firebase/config';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import AspectMenu from "@/app/public/AspectMenu"
import React from 'react'
interface MoreMenuProps {
    active: boolean;
    login: boolean
}

const MoreMenu: React.FC<MoreMenuProps> = ({ active, login }) => {
    const router = useRouter()
    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push("/");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };
    return (
        <div className={`absolute z-50 ${login? 'top-[-255px] ':'top-[-110px]'} right-[-192px]`}>
            {active ? (<section className='background-3 border py-2 border-white border-opacity-10 justify-center items-start  rounded-2xl flex flex-col w-[240px] '>
                <article className='border-b flex flex-col gap-1 justify-center items-center border-b-white p-2 fs-1 border-opacity-10 w-full'>
                    <button className='text-white bg-white flex justify-between items-center pr-2 px-2 bg-opacity-0 hover:bg-opacity-10 w-full h-[48px] rounded-xl text-start font-bold text-opacity-90'><p>Aspecto</p><picture className="rotate-180"><AspectMenu/></picture></button>
                    {login ? (
                        <>
                            <button className='text-white bg-white px-2 bg-opacity-0 hover:bg-opacity-10 w-full h-[48px] rounded-xl text-start font-bold text-opacity-90'><p>Insights</p> </button>
                            <button className='text-white bg-white px-2 bg-opacity-0 hover:bg-opacity-10 w-full h-[48px] rounded-xl text-start font-bold text-opacity-90'>Configuración</button>
                        </>
                    ) : (
                        <div className='hidden opacity-0 absolute'></div>
                    )}

                </article>
                <article className='p-2 flex flex-col gap-1 justify-center items-center w-full'>
                    <button className='text-white fs-1 bg-white px-2 bg-opacity-0 hover:bg-opacity-10 w-full h-[48px] rounded-xl text-start font-bold text-opacity-90'>Informar de un problema</button>
                    {login? (
                        <button onClick={handleLogout} className='text-red-500 fs-1 bg-white px-2 bg-opacity-0 hover:bg-opacity-10 w-full h-[48px] rounded-xl text-start font-bold'>Cerrar sesión</button>
                    ):(<div className='hidden opacity-0 absolute'></div>)

                    }
                    
                </article>
            </section>) : (
                <div></div>
            )

            }
        </div>


    )
}

export default MoreMenu