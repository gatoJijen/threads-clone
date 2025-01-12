import React from 'react'
import Search from './Search';
import Post from './Post';
import Perfil from './Perfil';

interface ContMainProps {
  activeT: boolean;
  activeS: boolean;
  activeH: boolean;
  activeP: boolean;
  activeST: boolean;
  web: boolean;
  webS: boolean;
  webH: boolean;
  webP: boolean;
  webST: boolean;
}

const ContMain: React.FC<ContMainProps> = ({ activeH, activeP, web, activeS, activeST, activeT, webH, webP, webS, webST }) => {
  return (
    <section className='flex flex-col items-center rounded-3xl background-3 w-[640px] border border-white border-opacity-10 h-full'>
      {web ? (
        <h1 className='absolute opacity-0 hidden'></h1>
      ) : (
        <h1 className='absolute opacity-0 hidden'></h1>
      )}
      {webS ? (
        <Search />
      ) : (
        <h1 className='absolute opacity-0 hidden'></h1>
      )}
      {webH ? (
        <h1>Favoritos</h1>
      ) : (
        <h1 className='absolute opacity-0 hidden'></h1>
      )}
      {webP ? (
        <Perfil/>
      ) : (
        <h1 className='absolute opacity-0 hidden'></h1>
      )}
      {webST ? (
        <h1>Guardados</h1>
      ) : (
        <h1 className='absolute opacity-0 hidden'></h1>
      )}
      {activeT ? (
        <h1 className='absolute opacity-0 hidden'></h1>
      ) : (
        <h1 className='absolute opacity-0 hidden'></h1>
      )}
      {activeS ? (
        <Search />
      ) : (
        <h1 className='absolute opacity-0 hidden'></h1>
      )}
      {activeH ? (
        <h1>Favoritos</h1>
      ) : (
        <h1 className='absolute opacity-0 hidden'></h1>
      )}
      {activeP ? (
        <Perfil/>
      ) : (
        <h1 className='absolute opacity-0 hidden'></h1>
      )}
      {activeST ? (
        <h1>Guardados</h1>
      ) : (
        <h1 className='absolute opacity-0 hidden'></h1>
      )}
    </section>
  )
}

export default ContMain