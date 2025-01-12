"use client"
import { auth } from '@/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import PerfilComplet from './PerfilComplet';
import EditPerfilModal from './EditPerfilModal';

const Perfil = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any 
    const [user, setUser] = useState<any>(null);
    const [displayName, setDisplayName] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setDisplayName(currentUser?.displayName || "");
        });

        return () => unsubscribe();
    }, []);
    const [abrir4, setAbrir4] = useState(false)
    const change4 = () => {
        setAbrir4((estadoActual) => !estadoActual); // Cambia el estado al opuesto
    };

    return (
        <section className='w-full px-6 mt-[14px]'>
            {abrir4 ? (
                <section className="w-[200vw] top-0 right-0 fixed  h-svh">
                    <section onClick={change4} className='bg-black flex z-[9] justify-center items-center bg-opacity-80 w-full h-svh'>
                        
                    </section>
                    <EditPerfilModal close={change4}/>
                </section>
            ) : (<div className="hidden absolute opacity-0"></div>)

            }
            <header className='flex w-full justify-between py-2  items-center'>
                <section>
                    <h1 className='text-white font-semibold text-opacity-85 text-xl'>{user?.displayName || ""}</h1>
                </section>
                <section>
                    <picture className='w-[84px] h-[84px]'>
                        {user?.photoURL ? (
                            <Image
                                className="rounded-full"
                                src={user.photoURL}
                                width={100}
                                height={100}
                                alt="usuario"
                            />
                        ) : (

                            <Image
                                className='w-[84px] h-[84px]'
                                width={1500}
                                height={1500}
                                alt='usuario'
                                src={"https://www.instagram.com/static/images/text_app/profile_picture/profile_pic.png/72f3228a91ee.png"} />
                        )

                        }
                    </picture>
                </section>
            </header>
            <article className='flex flex-col gap-4'>
                <section className='text-white fs-1 text-opacity-30'>
                    0 seguidores
                </section>
                <button onClick={change4} className='border border-white border-opacity-20 rounded-lg py-1 text-white fs-1 font-semibold'>
                    Editar perfil
                </button>
            </article>
            {user?.photoURL && displayName.length >= 1?(<div className='hidden opacity-0 absolute'></div>)
            :(<footer className='flex flex-col w-full gap-4 mt-6'>
                <header>
                    <h2 className='text-white fs-1 font-semibold'>Finaliza tu perfil</h2>
                </header>
                <section className='w-full flex gap-2'>
                    {user?.photoURL ? (
                        <div className='hidden opacity-0 absolute'></div>
                    ) : (

                        <PerfilComplet añadir={change4} image={true} title={"Añadir foto de perfil"} content={"Facilita que los demas te reconozcan"} />
                    )}
                    {displayName.length >= 1 ? (
                        <div className='hidden opacity-0 absolute'></div>
                    ) : (

                        <PerfilComplet añadir={change4} image={false} title={"Añadir foto de perfil"} content={"Facilita que los demas te reconozcan"} />
                    )

                    }
                </section>

            </footer>)

            }
            
        </section>
    )
}

export default Perfil