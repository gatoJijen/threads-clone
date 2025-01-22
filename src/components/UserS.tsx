import { auth, db } from '@/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { arrayUnion, collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

interface UserSProps {
    url: string;
    user: string;
    id: string;
}


const UserS: React.FC<UserSProps> = ({ url, user }) => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    /* eslint-disable @typescript-eslint/no-unused-vars*/
    const [isFollowing, setIsFollowing] = useState(false); // Estado que indica si ya estamos siguiendo a este usuario

    const [userFT, setUserFT] = useState(false)
    const [tu, setTu] = useState(false)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserF(user);
            }
        });
        // Verificar al cargar si el usuario ya está siendo seguido
        const checkFollowingStatus = async () => {
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('displayName', '==', user));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const userData = userDoc.data();

                if (userData.seguidores && userData.seguidores.includes(userF.uid)) {
                    setIsFollowing(true); // Si ya estamos siguiendo, actualizamos el estado
                } else if (userData.uid == userF.uid) {
                    setTu(true)
                }
            }
        };
        checkFollowingStatus();
        return () => unsubscribe();
    }); // Esto se ejecutará cuando el `user` o `currentUserId` cambien

    const addFollower = async () => {
        try {
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('displayName', '==', user));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const userData = userDoc.data();

                // Verificar si el seguidor ya está en la lista de seguidores
                const isAlreadyFollowing = userData.seguidores && userData.seguidores.includes(userF.uid);

                if (isAlreadyFollowing) {
                    // Si el usuario ya está siguiendo, cambiar el estado userFT a true en la base de datos
                    setUserFT(true)
                    console.log("El usuario ya sigue a este usuario, se ha actualizado userFT a true.");
                } else {
                    // Si no está siguiendo, agregarlo a la lista de seguidores
                    await updateDoc(userDoc.ref, {
                        seguidores: arrayUnion(userF.uid), // Agrega el ID del seguidor al array
                    });
                    console.log(`El usuario con ID ${userF.uid} ahora sigue a ${user}.`);
                }

            }
        } catch (error) {
            console.error("Error al agregar seguidor:", error);
        }
    };
    const [userF, setUserF] = useState<any>(null)

    /* eslint-disable @typescript-eslint/no-explicit-any */
    /* eslint-disable @typescript-eslint/no-unused-vars*/
    return (
        <section className={`w-full flex justify-between items-center border-b ${tu ? "opacity-0 hidden absolute" : ""} border-white border-opacity-10`}>
            <article className='flex items-center justify-start gap-1'>
                
                    <button className='w-[84px] h-[84px] flex justify-center items-center'>
                        <Image className='rounded-full w-[40px] h-[40px]' src={url} alt='user foto' width={100} height={100} />
                    </button>

                    <h1 className='text-xl text-white font-semibold'>{user}</h1>
            </article>
            <article>
                {isFollowing ? (
                    <button className='text-white opacity-60 cursor-default bg-transparent text-center font-bold border border-white rounded-lg px-4 py-1 border-opacity-20'>
                        <p>Siguiendo</p>
                    </button>
                ) : (
                    <button onClick={() => { addFollower() }} className='text-white bg-transparent text-center font-bold border border-white rounded-lg px-4 py-1 border-opacity-20'>
                        <p>Seguir</p>
                    </button>
                )

                }

            </article >
        </section >
    )
}

export default UserS