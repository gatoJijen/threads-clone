"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import ContinuarL from '../public/ContinuarL'
import FooterAll from '@/components/FooterAll'
import { auth } from '@/firebase/config'
import { AuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth'

const page = () => {
    const [user, setUser] = useState("")
    const [error, setError] = useState(true)
    const login = (provider:AuthProvider) => {
        signInWithPopup(auth, provider)
          .then((result) => {
            const loggedInUser = result.user;
            setUser({
              displayName: loggedInUser.displayName,
              email: loggedInUser.email,
              photoURL: loggedInUser.photoURL,
            });
            setError(false); // Resetea errores si el inicio de sesión es exitoso
          })
          .catch((error) => {
            setError(error.message);
            console.error('Error de inicio de sesión:', error);
          });
      };
    
      const loginWithFb = () => {
        const provider = new FacebookAuthProvider();
        login(provider);
      };
    return (
        <section className='z-[99] background-1 absolute w-full h-svh'>
            <header className='absolute h-full w-full z-[99]'>
                <nav className='w-full relative h-full overflow-hidden cursor-default'>
                    <picture className='absolute top-[-145px] w-full scale-[130%] pointer-events-none'>

                        <Image src="https://static.cdninstagram.com/rsrc.php/yD/r/eIJhnL1FtGH.webp" alt='' width={2000} height={2000} />
                    </picture>
                </nav>
            </header>
            <article className='flex flex-col gap-1 justify-center h-full w-full pb-[44px] items-center z-[999]'>
                <header className='mb-2 z-[999]'>
                    <h1 className='text-white text-base font-bold'>Inicia sesion con tu cuenta de instagram</h1>
                </header>
                <section className='flex flex-col items-center w-full gap-2 z-[999]'>
                    <input className=' px-4 w-[370px] py-4 placeholder:text-white placeholder:text-opacity-40 rounded-[12px] background-4 fs-1 border border-white border-opacity-0 focus:border-opacity-15 focus:outline-none' placeholder='Nombre de usuario, teléfono o correo electrónico' type="text" />
                    <input className=' px-4 w-[370px] py-4 placeholder:text-white placeholder:text-opacity-40 rounded-[12px] background-4 fs-1 border border-white border-opacity-0 focus:border-opacity-15 focus:outline-none' placeholder='Contraseña' type="text" />
                    <button className='bg-white cursor-not-allowed px-4 w-[370px] py-4 text-black text-base font-bold text-opacity-40 rounded-[12px]'>
                        <p className='cursor-not-allowed'>Iniciar sesión</p>
                    </button>
                </section>
                <footer className='flex flex-col mt-3 w-full h-20 justify-between items-center gap-5 z-[999]'>
                    <Link href={"/"}><p className='opacity-40 fs-1'>¿Has olvidado la contraseña?</p></Link>

                    <div className='flex justify-center items-center gap-4 text-white text-opacity-30 fs-1'><div className='w-6 h-[1px] border-t opacity-25'></div>o<div className='w-6 h-[1px] border-t opacity-25'></div></div>
                    <button className='background-1 flex gap-4 items-center justify-between border border-white border-opacity-20 px-4 w-[370px] py-4 rounded-[12px] fs-1'>
                        <picture className='background-image-1 w-[45px] h-[45px] inline-block'>
                        </picture>
                        <h2 className='text-base font-bold'>Continuar con Instagram</h2>
                        <article className='rotate-180'><ContinuarL /></article>
                    </button>
                    <div className='mt-[44px]'>
                        <FooterAll/>
                    </div>
                </footer>
            </article>
        </section>
    )
}

export default page