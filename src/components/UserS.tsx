import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

interface UserSProps {
    url: string;
    user: string;
}

const UserS: React.FC<UserSProps> = ({ url, user }) => {
    const router = useRouter();
    const handleClick = () => {
        router.push(`/users/${user}`);
    };
    return (
        <section className='w-full flex justify-between items-center border-b border-white border-opacity-10'>
            <article className='flex items-center justify-start gap-1'>
                <button onClick={handleClick} className='w-[84px] h-[84px] flex justify-center items-center'>
                    <Image className='rounded-full w-[40px] h-[40px]' src={url} alt='user foto' width={100} height={100} />
                </button>
                <h1 className='text-xl text-white font-semibold'>{user}</h1>
            </article>
            <article>
                <button className='text-white bg-transparent text-center font-bold border border-white rounded-lg px-4 py-1 border-opacity-20'>
                    <p>Seguir</p>
                </button>
            </article>
        </section>
    )
}

export default UserS