import React, { useEffect, useState } from 'react'
import Social from './Social';
import Image from 'next/image';
import { arrayRemove, arrayUnion, collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { auth, db } from '@/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

interface PostSProps {
    url: string;
    displayName: string;
    image: string;
    id: string;
    contenido: string;
    like: number;
    comment: number;
    user: string;
    rePost: number;
    share: number;
}
const PostS: React.FC<PostSProps> = ({ url, displayName, contenido, image, rePost, share }) => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const [likeF, setLikeF] = useState(false); // Si el usuario dio like
    const [commentF, setCommentF] = useState(false); // Si el usuario dio like
    const [rePostF, setRePostF] = useState(false); // Si el usuario dio like
    const [userF, setUserF] = useState<any>(null); // Usuario autenticado
    const [likeCount, setLikeCount] = useState<number | null>(null); // Conteo de likes
    const [commentCount, setCommentCount] = useState<number | null>(null); // Conteo de likes
    const [rePostCount, setRepostCount] = useState<number | null>(null); // Conteo de likes
    const [shareCount, setShareCount] = useState<number | null>(null); // Conteo de likes
    const [loading, setLoading] = useState<boolean>(true); // Estado de carga

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserF(user);
                checkLike(user.uid);
            }
        });

        fetchLikes();

        return () => unsubscribe();
    }, [contenido]); // Solo se ejecuta cuando `contenido` cambia

    const checkLike = async (uid: string) => {
        try {
            const postsRef = collection(db, "post");
            const q = query(postsRef, where("contenido", "==", contenido));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const postDoc = querySnapshot.docs[0];
                const postData = postDoc.data();

                if (Array.isArray(postData.like) && postData.like.includes(uid)) {
                    setLikeF(true); // El usuario ya dio like
                }
            }
        } catch (error) {
            console.error("Error verificando likes:", error);
        }
    };

    const fetchLikes = async () => {
        try {
            const postsRef = collection(db, "post");
            const q = query(postsRef, where("contenido", "==", contenido));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const postDoc = querySnapshot.docs[0];
                const postData = postDoc.data();

                const count = Array.isArray(postData.like) ? postData.like.length : 0;
                setLikeCount(count);
            } else {
                console.log("Documento no encontrado");
                setLikeCount(null);
            }
        } catch (error) {
            console.error("Error al obtener el conteo de likes:", error);
            setLikeCount(null);
        } finally {
            setLoading(false);
        }
    };

    const addLike = async () => {
        if (!userF) return; // Asegúrate de que el usuario esté autenticado
        if (likeF) {
            try {
                const postsRef = collection(db, "post");
                const q = query(postsRef, where("contenido", "==", contenido));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const postDoc = querySnapshot.docs[0];
                    const postData = postDoc.data();

                    if (Array.isArray(postData.like) && postData.like.includes(userF.uid)) {
                        await updateDoc(postDoc.ref, {
                            like: arrayRemove(userF.uid), // Elimina la UID del usuario del array "like"
                        });

                        setLikeF(false); // Actualizamos el estado a "like no dado"
                        setLikeCount((prev) => (prev !== null && prev > 0 ? prev - 1 : 0)); // Reducimos el conteo
                        console.log(`Like eliminado por el usuario con ID ${userF.uid}.`);
                    } else {
                        console.log("El usuario no había dado like a este contenido.");
                    }
                }
            } catch (error) {
                console.error("Error al eliminar like:", error);
            }
        } else {
            try {
                const postsRef = collection(db, "post");
                const q = query(postsRef, where("contenido", "==", contenido));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const postDoc = querySnapshot.docs[0];
                    const postData = postDoc.data();

                    if (Array.isArray(postData.like) && !postData.like.includes(userF.uid)) {
                        await updateDoc(postDoc.ref, {
                            like: arrayUnion(userF.uid),
                        });

                        setLikeF(true); // Actualizamos el estado a "like dado"
                        setLikeCount((prev) => (prev !== null ? prev + 1 : 1)); // Incrementamos el conteo
                        console.log(`Like agregado por el usuario con ID ${userF.uid}.`);
                    } else {
                        console.log("El usuario ya dio like a este contenido.");
                    }
                }
            } catch (error) {
                console.error("Error al agregar like:", error);
            }
        }



    };
    const addComment = async () => {
        if (!userF) return; // Asegúrate de que el usuario esté autenticado
        if (commentF) {
            try {
                const postsRef = collection(db, "post");
                const q = query(postsRef, where("contenido", "==", contenido));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const postDoc = querySnapshot.docs[0];
                    const postData = postDoc.data();

                    if (Array.isArray(postData.comment) && postData.comment.includes(userF.uid)) {
                        await updateDoc(postDoc.ref, {
                            comment: arrayRemove(userF.uid), // Elimina la UID del usuario del array "like"
                        });

                        setCommentF(false); // Actualizamos el estado a "like no dado"
                        setCommentCount((prev) => (prev !== null && prev > 0 ? prev - 1 : 0)); // Reducimos el conteo
                        console.log(`Like eliminado por el usuario con ID ${userF.uid}.`);
                    } else {
                        console.log("El usuario no había dado like a este contenido.");
                    }
                }
            } catch (error) {
                console.error("Error al eliminar like:", error);
            }
        } else {
            try {
                const postsRef = collection(db, "post");
                const q = query(postsRef, where("contenido", "==", contenido));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const postDoc = querySnapshot.docs[0];
                    const postData = postDoc.data();

                    if (Array.isArray(postData.comment) && !postData.comment.includes(userF.uid)) {
                        await updateDoc(postDoc.ref, {
                            comment: arrayUnion(userF.uid),
                        });

                        setCommentF(true); // Actualizamos el estado a "like dado"
                        setCommentCount((prev) => (prev !== null ? prev + 1 : 1)); // Incrementamos el conteo
                        console.log(`Like agregado por el usuario con ID ${userF.uid}.`);
                    } else {
                        console.log("El usuario ya dio like a este contenido.");
                    }
                }
            } catch (error) {
                console.error("Error al agregar like:", error);
            }
        }



    };
    /* eslint-disable @typescript-eslint/no-explicit-any */
    /* eslint-disable @typescript-eslint/no-unused-vars */


    return (
        <article className={`bg-transparent pt-2 flex flex-col items-start justify-between  gap-2  w-full border-b border-white border-opacity-20`}>
            <section className='flex w-full gap-2 px-6'>
                <section className='rounded-full mt-[8px] w-[44px] h-10 bg-transparent'>
                    <Image className='rounded-full' src={url} alt='user photo' width={1000} height={1000} />
                </section>

                <section className='flex justify-between w-full pr-5'>
                    <aside className='w-full'>
                        <h1 className='hover:underline'>{displayName}</h1>
                        <article className='w-full'>
                            <p>{contenido}</p>
                            {image.length >= 1 ? (
                                <footer>
                                    <h1>image</h1>
                                </footer>
                            ) : (
                                <h1 className='hidden opacity-0 absolute'></h1>
                            )}
                        </article>
                    </aside>


                </section>
            </section>

            <footer className='flex mb-3 justify-start ml-16 w-10/12 gap-2'>
                <Social activeC={false} activeH={true} activeR={false} activeS={false} likeF={likeF} cantidad={likeCount} action={addLike} />
                <Social activeC={true} activeH={false} activeR={false} activeS={false} likeF={false} cantidad={commentCount} action={addComment} />
                <Social activeC={false} activeH={false} activeR={true} activeS={false} likeF={false} cantidad={rePost} action={() => { }} />
                <Social activeC={false} activeH={false} activeR={false} activeS={true} likeF={false} cantidad={share} action={() => { }} />

            </footer>
        </article>
    )
}

export default PostS