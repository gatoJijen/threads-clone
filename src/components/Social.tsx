import ComentPost from '@/app/public/ComentPost';
import HeartPost from '@/app/public/HeartPost';
import LikeF from '@/app/public/LikeF';
import Repost from '@/app/public/Repost';
import SharePost from '@/app/public/SharePost';
import React from 'react'

interface SocialProps {
    activeH: boolean;
    activeC: boolean;
    activeR: boolean;
    activeS: boolean;
    likeF: boolean;
    cantidad: number;
    action: ()=> void
}

const Social:React.FC<SocialProps> = ({activeC, activeH, activeR, activeS, cantidad, action, likeF}) => {
    return (
        <aside className='flex items-center justify-center gap-2 bg-white bg-opacity-0 hover:cursor-pointer px-3 py-2 rounded-full transition-1 hover:bg-opacity-5'>
            <button onClick={action} >
                
                {likeF?(
                    <LikeF/>
                ):(
                    activeH?(
                        <HeartPost/>
                    ):(
                        <h1 className='opacity-0 hidden absolute'></h1>
                    )
                )}
                {activeC?(
                    <ComentPost/>
                ):(
                    <h1 className='opacity-0 hidden absolute'></h1>
                )}
                {activeR?(
                    <Repost/>
                ):(
                    <h1 className='opacity-0 hidden absolute'></h1>
                )}
                {activeS?(
                    <SharePost/>
                ):(
                    <h1 className='opacity-0 hidden absolute'></h1>
                )}
            </button>
            <p className='opacity-75 text-sm'>{cantidad}</p>
        </aside>
    )
}

export default Social