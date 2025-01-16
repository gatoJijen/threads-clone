"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import ContinuarL from '../public/ContinuarL';
import FooterAll from '@/components/FooterAll';
import { auth, provider } from '@/firebase/config';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const Page: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [user, setUser] = useState<any>(null);
    const [displayName, setDisplayName] = useState<string>("");
    const [url, setUrl] = useState<string>("https://www.instagram.com/static/images/text_app/profile_picture/profile_pic.png/72f3228a91ee.png");
    const [email, setEmail] = useState<string>("");
    const [contraseña, setContraseña] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handlePostRequest2 = async () => {
        try {
            // Aquí guardamos displayName y url (la foto del perfil) en la base de datos
            const response = await fetch("/api/router/Users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ displayName, url }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Mensaje guardado:", data);
            } else {
                console.error("Error en la API:", await response.json());
            }
        } catch (error) {
            console.error("Error de red:", error);
        }
    };

    const googleRegister = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            if (!user) {
                throw new Error("No se pudo obtener el usuario.");
            }

            setUser(user);
            setDisplayName(user.displayName || "x2356");
            setUrl(user.photoURL || "https://www.instagram.com/static/images/text_app/profile_picture/profile_pic.png/72f3228a91ee.png");

            // Obtener el token de usuario
            const token = await user.getIdToken();
            if (!token) {
                throw new Error("No se pudo obtener el token de autenticación.");
            }

            // Guardar el token en el localStorage
            localStorage.setItem("authToken", token);
            localStorage.setItem("userEmail", user.email || "");

            
            if (user) {
                await handlePostRequest2(); // Llamamos a la función para guardar datos en la base de datos
                router.push("/web"); // Redirigimos al usuario después de un inicio de sesión exitoso
            } else {
                throw new Error( "Error desconocido al procesar la respuesta del backend.");
            }
        } catch (error: any) {
            console.error("Error al iniciar sesión con Google:", error.message);
            setError(error.message || "Error desconocido");
        }
    };

    const handlePostRequest = async (url: string, data: object) => {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                return await response.json(); // Devuelve los datos de la respuesta
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || "Error desconocido");
            }
        } catch (error: any) {
            setError(error.message || "Error de red");
            throw error; // Lanza el error para que se maneje en el nivel superior
        }
    };
    const register = async () => {
        try {
            if (email === "" || contraseña === "") {
                throw new Error("Ambos campos deben estar completos.");
            }

            const existingUser = await handlePostRequest("/api/router/login", { email, contraseña })
                .then(() => true)
                .catch(() => false);

            if (existingUser) {
                console.log("Usuario ya registrado, realizando login...");
                await login();
                await handlePostRequest2(); // Llamamos a la función después de login
            } else {
                console.log("Registrando nuevo usuario...");
                await handlePostRequest("/api/router/register", { email, contraseña });
                await handlePostRequest2(); // Llamamos a la función después de registro
                router.push("/web");
            }
        } catch (err: any) {
            console.error("Error al registrar o iniciar sesión:", err.message);
            setError(err.message);
        }
    };

    const login = async () => {
        try {
            const userCredential = await handlePostRequest("/api/router/login", { email, contraseña });
            const { user, token } = userCredential;

            localStorage.setItem("authToken", token);
            localStorage.setItem("userEmail", user.email || "");

            router.push("/web");
        } catch (err: any) {
            console.error("Error al iniciar sesión:", err.message);
            setError(err.message);
        }
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // Limpiar errores
        setLoading(true); // Activar estado de carga
        await register(); // Llama a la función de registro o login según corresponda
        setLoading(false); // Desactivar estado de carga después de completar
    };

    // Efecto para manejar el estado de autenticación
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setDisplayName(user.displayName || "");
                setUrl(user.photoURL || "https://www.instagram.com/static/images/text_app/profile_picture/profile_pic.png/72f3228a91ee.png");
                handlePostRequest2(); // Llamamos a la función cada vez que se actualiza el usuario
                router.push("/web");
            } else {
                router.push("/login");
            }
        });

        return () => unsubscribe(); // Limpia el listener cuando el componente se desmonta
    }, [router]);
    /* eslint-disable @typescript-eslint/no-explicit-any */
    return (
        <section className='z-[99] background-1 absolute w-full h-full'>
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
