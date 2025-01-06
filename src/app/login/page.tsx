"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import ContinuarL from '../public/ContinuarL';
import FooterAll from '@/components/FooterAll';
import { auth, provider } from '@/firebase/config';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const Page: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // Estado para manejar la carga

    // Función para registrar un usuario
    const register = async () => {
        try {
            if (email === "" || contraseña === "") {
                throw new Error("Ambos campos deben estar completos.");
            }

            // Verificar si el usuario ya está registrado
            const existingUser = await signInWithEmailAndPassword(auth, email, contraseña)
                .then(() => true) // Si se inicia sesión correctamente, el usuario ya existe
                .catch(() => false); // Si falla, es porque el usuario no está registrado

            if (existingUser) {
                console.log("Usuario ya registrado, realizando login...");
                await login(); // Si el usuario ya existe, hacer login
            } else {
                console.log("Registrando nuevo usuario...");
                const response = await createUserWithEmailAndPassword(auth, email, contraseña);
                console.log("Usuario registrado:", response.user);
                router.push("/web"); // Redirige después de registrar
            }
        } catch (err: any) {
            console.error("Error al registrar o iniciar sesión:", err.message);
            setError(err.message); // Establece el error si ocurre
        }
    };

    // Función para iniciar sesión
    const login = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, contraseña);
            const user = userCredential.user;
            console.log("Inicio de sesión exitoso:", user);
            const token = await user.getIdToken();
            localStorage.setItem("authToken", token);
            localStorage.setItem("userEmail", user.email || "");
            router.push("/web");
        } catch (err: any) {
            console.error("Error al iniciar sesión:", err.message);
            setError(err.message); // Establece el error si ocurre
        }
    };

    // Maneja el envío del formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // Limpiar errores
        setLoading(true); // Activar estado de carga
        await register(); // Llama a la función de registro o login según corresponda
        setLoading(false); // Desactivar estado de carga después de completar
    };

    // Función para manejar login con Google
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
        } catch (error: any) {
            console.error("Error al iniciar sesión con Google:", error.message || error);
            setError(error.message || "Error desconocido al iniciar sesión con Google.");
        }
    };

    
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

    return (
        <section className='z-[99] background-1 absolute w-full h-svh'>
            <header className='absolute h-full w-full z-[99]'>
                <nav className='w-full relative h-full overflow-hidden cursor-default'>
                    <picture className='absolute top-[-145px] w-full scale-[130%] pointer-events-none'>
                        <Image priority src="https://static.cdninstagram.com/rsrc.php/yD/r/eIJhnL1FtGH.webp" alt='' width={2000} height={2000} />
                    </picture>
                </nav>
            </header>
            <article className='flex flex-col gap-1 justify-center h-full w-full pb-[44px] items-center z-[999]'>
                <header className='mb-2 z-[999]'>
                    <h1 className='text-white text-base font-bold'>Inicia sesión con tu cuenta de Instagram</h1>
                </header>
                <section className='flex flex-col items-center w-full gap-2 z-[999]'>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        className='px-4 w-[370px] py-4 placeholder:text-white placeholder:text-opacity-40 rounded-[12px] background-4 fs-1 border border-white border-opacity-0 focus:border-opacity-15 focus:outline-none'
                        placeholder='Nombre de usuario, teléfono o correo electrónico'
                        type="email"
                        value={email}
                    />
                    <input
                        onChange={(e) => setContraseña(e.target.value)}
                        className='px-4 w-[370px] py-4 placeholder:text-white placeholder:text-opacity-40 rounded-[12px] background-4 fs-1 border border-white border-opacity-0 focus:border-opacity-15 focus:outline-none'
                        placeholder='Contraseña'
                        type="password"
                        value={contraseña}
                    />
                    {error && (
                        <p className="text-red-500 text-sm">
                            {error === "Firebase: Error (auth/email-already-in-use)."
                                ? "Este correo ya está registrado"
                                : error}
                        </p>
                    )}

                    <button
                        onClick={handleSubmit}  // Llamada correcta a handleSubmit
                        className={`bg-white px-4 w-[370px] py-4 text-black text-base font-bold rounded-[12px] ${loading || !email || !contraseña ? 'cursor-not-allowed opacity-50' : ''}`}
                        disabled={loading || !email || !contraseña}  // Deshabilitar el botón si está cargando o si los campos están vacíos
                    >
                        <p>{loading ? "Cargando..." : "Inicia sesión"}</p>
                    </button>
                </section>
                <footer className='flex flex-col mt-3 w-full h-20 justify-between items-center gap-5 z-[999]'>
                    <Link href={"/"}>
                        <p className='opacity-40 fs-1'>¿Has olvidado la contraseña?</p>
                    </Link>

                    <div className='flex justify-center items-center gap-4 text-white text-opacity-30 fs-1'>
                        <div className='w-6 h-[1px] border-t opacity-25'></div>o<div className='w-6 h-[1px] border-t opacity-25'></div>
                    </div>
                    <button
                        onClick={googleRegister}
                        className='background-1 flex gap-4 items-center justify-between border border-white border-opacity-20 px-4 w-[370px] py-4 rounded-[12px] fs-1'
                        disabled={loading}
                    >
                        <picture className='background-image-1 w-[45px] h-[45px] inline-block'></picture>
                        <h2 className='text-base font-bold'>Continuar con Instagram</h2>
                        <article className='rotate-180'>
                            <ContinuarL />
                        </article>
                    </button>
                    <div className='mt-[44px]'>
                        <FooterAll />
                    </div>
                </footer>
            </article>
        </section>
    );
};

export default Page;
