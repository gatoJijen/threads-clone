
import { auth, db } from '@/firebase/config';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import Borradores from '@/app/public/Borradores';
import NewPostOption from '@/app/public/NewPostOption';
import { addDoc, collection } from 'firebase/firestore';

interface NewModalProps {
    close: () => void;
    p1: boolean
}

const NewModal: React.FC<NewModalProps> = ({ close, p1 }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [image, setImage] = useState(false)
    const [contenido, setContenido] = useState("")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [user, setUser] = useState<any>(null);
    const [displayName, setDisplayName] = useState("");
    const url = user?.photoURL ? user.photoURL : "https://www.instagram.com/static/images/text_app/profile_picture/profile_pic.png/72f3228a91ee.png"
    const like = 0
    const comment = 0
    const rePost = 0
    const share = 0

   const add = async () => {
       // Add a new document with a generated id.
       const docRef = await addDoc(collection(db, "post"), {
           url: url,
           displayName: displayName,
           contenido: contenido,
           like: like,
           comment: comment,
           rePost: rePost,
           share: share,
       });
       console.log("Document written with ID: ", docRef.id);
   }
   // eslint-disable-next-line @typescript-eslint/no-explicit-any

   useEffect(() => {
       const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
           setUser(currentUser);
           setDisplayName(currentUser.displayName.replace(/\s+/g, ''));
       });

       return () => unsubscribe();
   }, []);

   const handleUpdateDisplayName = async () => {
       if (user) {
           try {
               await updateProfile(user, { displayName });
               alert("Nombre actualizado correctamente");
               // Refrescar el usuario
               setUser({ ...user, displayName });
           } catch (error) {
               console.error("Error al actualizar el nombre", error);
               alert("Hubo un error al actualizar el nombre.");
           }
       }
   };
    
    return (
        <article className={`background-3 rounded-xl absolute top-[30%]  ${p1 ? "right-[26.5vw]" : "right[100vw]"}  flex flex-col items-start justify-between  gap-2 h-[226px] w-[620px] border border-white border-opacity-20 z-[99999]`}>
            <nav className='flex justify-between w-full border-b h-[56px] px-6 py-4 items-center border-b-white border-opacity-20'>
                <button onClick={close}>
                    <p>Cancelar</p>
                </button>
                <section>
                    <p className='text-white font-semibold text-opacity-85 text-base'>Nuevo hilo</p>
                </section>
                <section className='flex gap-4'>
                    <button><Borradores /></button>
                    <button><NewPostOption /></button>
                </section>
            </nav>
            <section className='flex w-full gap-2 px-6'>
                <section className='rounded-full mt-[8px] w-[44px] h-10 bg-transparent'>
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
                            className='rounded-full w-full h-full'
                            width={1500}
                            height={1500}
                            alt='usuario'
                            src={"https://www.instagram.com/static/images/text_app/profile_picture/profile_pic.png/72f3228a91ee.png"} />
                    )

                    }

                </section>
                <section className='flex justify-between w-full pr-5'>
                    <aside className='w-full'>
                        <header>

                            <h1 className='text-white font-semibold text-opacity-85 fs-1'>{user?.displayName || ""}</h1>
                            {

                            }
                            {displayName.length >= 1 ?
                                (
                                    <div className='hidden absolute opacity-0'></div>
                                ) : (
                                    <input
                                        type="text"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        placeholder="Escribe tu nombre"
                                        className="w-full text-white bg-transparent focus:outline-none"
                                    />
                                )

                            }


                        </header>
                        <article className='w-full'>
                            <input className='w-full text-white bg-transparent focus:outline-none' onChange={(e) => { setContenido(e.target.value) }} placeholder='¿Qué hay de nuevo?' type="text" />
                            {image ? (
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

            <footer className='flex mb-3 justify-end ml-20 w-10/12 gap-2'>

                {contenido.length >= 1 && displayName.length >= 1 ? (
                    <section>
                        <button onClick={() => { add();
                            //handlePostRequest();
                             close()
                        }} className='rounded-xl border border-white text-white text-opacity-85 w-20 h-10 bg-transparent font-semibold border-opacity-60 flex justify-center items-center fs-1'>
                            Publicar
                        </button>
                    </section>
                ) : (
                    <section>
                        <button className='cursor-not-allowed rounded-xl border border-white text-white text-opacity-85 opacity-40 w-20 h-10 bg-transparent font-semibold border-opacity-60 flex justify-center items-center fs-1'>
                            Publicar
                        </button>

                    </section>
                )

                }
                {displayName.length >= 1 ? (
                    <button onClick={handleUpdateDisplayName} className="hidden absolute opacity-0">
                        Actualizar Nombre
                    </button>) : (<button onClick={handleUpdateDisplayName} className="rounded-xl border border-white text-white text-opacity-85 w-20 h-10 bg-transparent font-semibold border-opacity-60 flex justify-center items-center fs-1">
                        Actualizar Nombre
                    </button>)

                }
                {
                    //<Social activeC={false} activeH={true} activeR={false} activeS={false} cantidad='115' />
                    //<Social activeC={true} activeH={false} activeR={false} activeS={false} cantidad='2' />
                    //<Social activeC={false} activeH={false} activeR={true} activeS={false} cantidad='16' />
                    //<Social activeC={false} activeH={false} activeR={false} activeS={true} cantidad='4' />
                }
            </footer>
        </article>
    )
}

export default NewModal