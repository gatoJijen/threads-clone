
import Image from 'next/image';
import React from 'react'

interface PerfilSProps {
    displayName: string;
    url: string;
    id: string
}
const PerfilS:React.FC<PerfilSProps> = ({displayName, url,id}) => {

    return (
        <section className='w-full px-6 mt-[14px]'>
            <header className='flex w-full justify-between py-2  items-center'>
                <section>
                    <h1 className='text-white font-semibold text-opacity-85 text-xl'>{displayName}</h1>
                </section>
                <section>
                    <picture className='w-[84px] h-[84px]'>
                        
                            <Image
                                className="rounded-full"
                                src={url}
                                width={100}
                                height={100}
                                alt="usuario"
                            />
                        

                        
                    </picture>
                </section>
            </header>
            <article className='flex flex-col gap-4'>
                <p className='text-white fs-1 text-opacity-30'>
                    0 seguidores
                </p>
                <p className='text-white fs-1 text-opacity-30'>
                    id: {id}
                </p>

            </article>
            
        </section>
    )
}

export default PerfilS