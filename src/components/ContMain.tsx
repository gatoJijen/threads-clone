import React from 'react'
import Search from './Search';
import Post from './Post';

interface ContMainProps{
    activeT: boolean;
    activeS: boolean;
    activeH:boolean;
    activeP: boolean;
    activeST: boolean;
}

const ContMain:React.FC<ContMainProps> = ({activeH, activeP, activeS, activeST, activeT}) => {
  return (
    <section className='flex flex-col items-center rounded-3xl background-3 w-[640px] border border-white border-opacity-10 h-full'>
        {activeT?(
          <Post image={false}/>
        ):(
          <h1 className='absolute opacity-0 hidden'></h1>
        )}
        {activeS?(
          <Search/>
        ):(
          <h1 className='absolute opacity-0 hidden'></h1>
        )}
        {activeH?(
          <h1>Favoritos</h1>
        ):(
          <h1 className='absolute opacity-0 hidden'></h1>
        )}
        {activeP?(
          <h1>Perfil</h1>
        ):(
          <h1 className='absolute opacity-0 hidden'></h1>
        )}
        {activeST?(
          <h1>Guardados</h1>
        ):(
          <h1 className='absolute opacity-0 hidden'></h1>
        )}
    </section>
  )
}

export default ContMain