import AddFoto from '@/app/public/AddFoto'
import { auth } from '@/firebase/config'
import { onAuthStateChanged, updateProfile } from 'firebase/auth'
import React, { useEffect, useState } from 'react'

interface EditPerfilModalProps {
    close: () => void
}

const EditPerfilModal: React.FC<EditPerfilModalProps> = ({ close }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any  
    const [user, setUser] = useState<any>(null);
    const [displayName, setDisplayName] = useState("");

    // Escucha cambios en el usuario autenticado
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setDisplayName(currentUser?.displayName || "");
        });
        return () => unsubscribe();
    }, []);

    // Maneja la actualización del nombre de usuario
    const handleUpdateDisplayName = async () => {
        if (displayName.trim() === "") {
            alert("El nombre no puede estar vacío.");
            return;
        }

        try {
            await updateProfile(user, { displayName });
        } catch (error) {
            console.error("Error al actualizar el nombre:", error);
            alert("Hubo un error al actualizar el nombre.");
        }
    };

    return (
        <article className="background-2 rounded-xl mediaEditModal p-2 absolute top-[5%] right-[30vw] z-[9999999999] flex flex-col items-start justify-between gap-2 h-[600px] w-[518px] border border-white border-opacity-20">
            <header className="flex w-full gap-2 px-6">
                <section className="flex justify-between w-full">
                    <aside className="w-full">
                        <header className="border-b flex w-full flex-col gap-2 border-b-white border-opacity-20">
                            <h2 className="text-white font-semibold">Nombre</h2>
                            <input
                                type="text"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                placeholder="Escribe tu nombre"
                                className="w-full text-white bg-transparent focus:outline-none"
                            />
                        </header>
                    </aside>
                </section>
                <button className="rounded-full mt-[8px] w-[60px] h-[52px] background-3 flex justify-center items-center">
                    <AddFoto />
                </button>
            </header>

            <footer className="flex mb-3 justify-center w-full px-2 gap-2">
                <button
                    onClick={() => {
                        handleUpdateDisplayName();
                        close();
                    }}
                    className="w-full bg-white text-black fs-1 font-semibold rounded-lg py-4"
                >
                    Listo
                </button>
            </footer>
        </article>
    );
};

export default EditPerfilModal;
