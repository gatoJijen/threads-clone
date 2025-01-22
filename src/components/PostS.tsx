import React from 'react'
import Social from './Social';
import Image from 'next/image';

interface PostSProps {
    url: string;
    displayName: string;
    image: string;
    uid:string;
    contenido: string;
    like: number;
    comment: number;
    rePost: number;
    share: number;
}

const PostS: React.FC<PostSProps> = ({url, displayName, contenido, image, like, comment, rePost, share}) => {
    return (
        <article className={`bg-transparent pt-2 flex flex-col items-start justify-between  gap-2  w-full border-b border-white border-opacity-20`}>
            <section className='flex w-full gap-2 px-6'>
                <section className='rounded-full mt-[8px] w-[44px] h-10 bg-transparent'>
                    <Image className='rounded-full' src={url} alt='user photo' width={1000} height={1000}/>
                </section>
                
                <section className='flex justify-between w-full pr-5'>
                    <aside className='w-full'>
                            <h1 className='hover:underline'>{displayName}</h1>
                        <article className='w-full'>
                            <p>{contenido}</p>
                            {image.length >= 1  ? (
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
                <Social activeC={false} activeH={true} activeR={false} activeS={false} cantidad={like} />
                <Social activeC={true} activeH={false} activeR={false} activeS={false} cantidad={comment} />
                <Social activeC={false} activeH={false} activeR={true} activeS={false} cantidad={rePost} />
                <Social activeC={false} activeH={false} activeR={false} activeS={true} cantidad={share} />

            </footer>
        </article>
    )
}

export default PostS