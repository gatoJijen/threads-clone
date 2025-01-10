import CamaraIco from '@/app/public/CamaraIco'
import NameUserPerfil from '@/app/public/NameUserPerfil';
import React from 'react'

interface PerfilCompletProps {
    image: boolean;
    title: string;
    content: string;
    añadir : ()=> void

}

const PerfilComplet:React.FC<PerfilCompletProps> = ({image,title,content, añadir}) => {
    return (
        <article className='w-6/12 flex justify-center items-center flex-col gap-2 p-4 background-1 rounded-xl'>
            <header className='w-[60px] h-[60px] flex justify-center items-center p-2 rounded-full bg-black'>
                {image?(<CamaraIco />):(<NameUserPerfil/>)

                }
                
            </header>
            <section className='flex flex-col items-center justify-center'>
                <h2 className='text-white fs-1 font-semibold'>{title}</h2>
                <p className='text-white text-sm text-opacity-30 w-[160px] text-center'>{content}</p>
            </section>
            <button onClick={añadir} className='bg-white w-full rounded-lg fs-1 font-semibold text-black py-1'>
                Añadir
            </button>
        </article>
    )
}

export default PerfilComplet