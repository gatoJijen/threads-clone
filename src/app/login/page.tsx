"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import ContinuarL from '../public/ContinuarL';
import FooterAll from '@/components/FooterAll';
import { auth, db, provider } from '@/firebase/config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { doc, setDoc } from 'firebase/firestore';

const Page: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [user, setUser] = useState<any>(null);
    const [displayName, setDisplayName] = useState<string>("");
    const [url, setUrl] = useState<string>("https://www.instagram.com/static/images/text_app/profile_picture/profile_pic.png/72f3228a91ee.png");

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const saveUserToFirestore = async (uid: string, displayName: string, photoURL: string) => {
        try {
            const userRef = doc(db, "users", uid); // Crea un documento con el UID del usuario
            await setDoc(userRef, {
                displayName,
                photoURL,
                email,
            });
            console.log("Usuario guardado en Firestore");
        } catch (err) {
            console.error("Error al guardar el usuario en Firestore:", err);
        }
    };

    const handleRegisterWithEmail = async () => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Actualiza el perfil del usuario en Firebase Authentication
            const defaultDisplayName = email.split("@")[0]; // Nombre por defecto si no se proporciona uno
            const defaultPhotoURL = user.photoURL || "https://www.instagram.com/static/images/text_app/profile_picture/profile_pic.png/72f3228a91ee.png";
            
            await updateProfile(user, {
                displayName: defaultDisplayName,
                photoURL: defaultPhotoURL,
            });

            // Guarda el usuario en Firestore
            await saveUserToFirestore(user.uid, defaultDisplayName, defaultPhotoURL);

            router.push("/web");
        } catch (err: any) {
            // Si el error es que la cuenta ya existe, intenta iniciar sesión
            if (err.code === "auth/email-already-in-use") {
                try {
                    const userCredential = await signInWithEmailAndPassword(auth, email, password);
                    const user = userCredential.user;
    
                    // Redirige al usuario después de iniciar sesión
                    router.push("/web");
                } catch (loginErr: any) {
                    setError(loginErr.message || "Error al iniciar sesión con el usuario existente");
                }
            } else {
                setError(err.message || "Error al registrar el usuario");
            }
        } finally {
            setLoading(false);
        }}

    const googleRegister = async () => {
        setLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            if (!user) throw new Error("No se pudo obtener el usuario.");

            // Usa los datos del usuario proporcionados por Google
            const displayName = user.displayName || "Usuario Google";
            const photoURL = user.photoURL || "https://www.instagram.com/static/images/text_app/profile_picture/profile_pic.png/72f3228a91ee.png";

            // Guarda el usuario en Firestore
            await saveUserToFirestore(user.uid, displayName, photoURL);

            router.push("/web");
        } catch (err: any) {
            setError(err.message || "Error al registrar con Google");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Por favor, completa todos los campos.");
            return;
        }
        await handleRegisterWithEmail();
    };

    // Efecto para manejar el estado de autenticación
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                //setDisplayName(user.displayName || "");
                //setUrl(user.photoURL || "https://www.instagram.com/static/images/text_app/profile_picture/profile_pic.png/72f3228a91ee.png");
                //handlePostRequest2(); // Llamamos a la función cada vez que se actualiza el usuario
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
                        onChange={(e) => setPassword(e.target.value)}
                        className='px-4 w-[370px] py-4 placeholder:text-white placeholder:text-opacity-40 rounded-[12px] background-4 fs-1 border border-white border-opacity-0 focus:border-opacity-15 focus:outline-none'
                        placeholder='Contraseña'
                        type="password"
                        value={password}
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
                        className={`bg-white px-4 w-[370px] py-4 text-black text-base font-bold rounded-[12px] ${loading || !email || !password ? 'cursor-not-allowed opacity-50' : ''}`}
                        disabled={loading || !email || !password}  // Deshabilitar el botón si está cargando o si los campos están vacíos
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
