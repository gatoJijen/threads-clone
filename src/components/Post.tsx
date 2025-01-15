"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Social from './Social'
import OptionsPost from '@/app/public/OptionsPost'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/config'
import Image from 'next/image'
import NewModal from './NewModal'



const Post = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any 
    const [user, setUser] = useState<any>(null);
    const [abrir3, setAbrir3] = useState<boolean>(false)
    const change3 = () => {
        setAbrir3((estadoActual) => !estadoActual); // Cambia el estado al opuesto
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);
    return (


        <article className='bg-transparent border-b pl-6 pt-3 pb-2 border-b-white flex flex-col items-start justify-start gap-2 w-full border-opacity-20 h-20'>
            {abrir3 ? (
                <section className="w-[99vw] absolute top-0 right-[0vw] h-[100svh]">
                    <section className='bg-black flex z-[999999999999] justify-center items-center bg-opacity-80 w-full h-[110svh]'>
                        <NewModal p1={false} close={change3} />
                    </section>
                </section>
            ) : (<div className="hidden absolute opacity-0"></div>)

            }
            <section className='flex h-full w-full gap-4'>
                <article className='rounded-full mt-[8px] w-10 h-1'>
                    <picture className='w-[90px] h-[84px]'>
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
                                className=''
                                width={1500}
                                height={1500}
                                alt='usuario'
                                src={"https://www.instagram.com/static/images/text_app/profile_picture/profile_pic.png/72f3228a91ee.png"} />
                        )

                        }
                    </picture>
                </article>
                <section className='flex items-center h-full  w-full pr-5'>
                    <aside className='flex items-center justify-center'>
                        <p onClick={change3} className='h-10 w-[450px] text-start hover:cursor-text bg-transparent text-white fs-1 mt-4 text-opacity-40' >¿Qué hay de nuevo?</p>
                    </aside>
                    <button onClick={change3} className='bg-transparent text-center font-bold border border-white rounded-lg px-3 py-1 border-opacity-20'>
                        Publicar
                    </button>
                    {//<button className='rounded-full w-8 h-8 bg-white bg-opacity-0 hover:bg-opacity-10 flex justify-center items-center'>
                        //<OptionsPost />
                        //</button>
                    }

                </section>
            </section>

            {
                //<footer className='flex mt-2 mb-2 gap-2 ml-[36px]'>
                //    <Social activeC={false} activeH={true} activeR={false} activeS={false} cantidad='115' />
                //    <Social activeC={true} activeH={false} activeR={false} activeS={false} cantidad='2' />
                //    <Social activeC={false} activeH={false} activeR={true} activeS={false} cantidad='16' />
                //    <Social activeC={false} activeH={false} activeR={false} activeS={true} cantidad='4' />
                //</footer>
            }
        </article>
    )
}

export default Post