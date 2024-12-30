import Link from 'next/link'
import React from 'react'
import Social from './Social'

interface PostProps {
    image: boolean
}

const Post: React.FC<PostProps> = ({ image }) => {
    return (
        <article className='bg-transparent border-b pl-6 pt-3 pb-2 border-b-white flex flex-col items-start justify-start gap-2 w-full border-opacity-20'>
            <section className='flex w-full gap-2'>
                <Link href={"/"} className='rounded-full mt-[8px] w-10 h-10 bg-white'>
                    <picture className=''>foto</picture>
                </Link>
                <section className='flex justify-between w-full pr-5'>
                    <aside>
                        <header>
                        <Link href={"/"}>
                            <h1 className='hover:underline'>title</h1>
                        </Link>
                        <p></p>
                    </header>
                    <article>
                        <header>
                            contenido
                        </header>
                        {image ? (
                            <footer>
                                <h1>image</h1>
                            </footer>
                        ) : (
                            <h1 className='hidden opacity-0 absolute'></h1>
                        )}
                    </article>
                    </aside>
                    <aside>
                        <h1>options</h1>
                    </aside>

                </section>
            </section>

            <footer className='flex mt-2 mb-2 gap-2 ml-[36px]'>
                <Social activeC={false} activeH={true} activeR={false} activeS={false} cantidad='115'/>
                <Social activeC={true} activeH={false} activeR={false} activeS={false} cantidad='2'/>
                <Social activeC={false} activeH={false} activeR={true} activeS={false} cantidad='16'/>
                <Social activeC={false} activeH={false} activeR={false} activeS={true} cantidad='4'/>
            </footer>
        </article>
    )
}

export default Post