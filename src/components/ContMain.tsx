"use client"
import React, { useEffect, useState } from 'react'
import Search from './Search';
import Perfil from './Perfil';
import Post from './Post';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/config';
import PostS from './PostS';
import UserS from './UserS';

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
type Message = {
  id: string;
  url: string;
  displayName: string;
  contenido: string;
  like: number;
  comment: number;
  rePost: number;
  share: number;
};
type Users = {
  id: string;
  url: string;
  displayName: string;
};

const ContMain: React.FC<ContMainProps> = ({ activeH, activeP, web, activeS, activeST, activeT, webH, webP, webS, webST }) => {

  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<Users[]>([])

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "post"), // Cambia "messages" por el nombre de tu colección
      (snapshot) => {
        const updatedMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Message[];
        setMessages(updatedMessages);
      }
    );

    const unsubscribe2 = onSnapshot(
      collection(db, "users"), // Cambia "messages" por el nombre de tu colección
      (snapshot) => {
        const updatedUsers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Users[];
        setUsers(updatedUsers);
      }
    )

    // Limpieza al desmontar el componente
    return () => { unsubscribe(); unsubscribe2() }
  }, []);
  return (
    <section className='flex flex-col items-center overflow-y-auto overflow-x-hidden rounded-t-3xl background-3 w-[640px] border border-white border-opacity-10 h-[102%]'>
      {web ? (
        <section>
          <Post />
          {messages.map((message) => (
            <article key={message.id}>
              <PostS url={message.url} contenido={message.contenido} displayName={message.displayName} like={message.like} image='' comment={message.comment} rePost={message.rePost} share={message.share} />
            </article>
          ))}
        </section>
      ) : (
        <h1 className='absolute opacity-0 hidden'></h1>
      )}
      {webS ? (
        <section>
          <Search />
          {users.map((users) => (
            <article key={users.id}>
              <UserS url={users.url} user={users.displayName}/>
            </article>
          ))}
        </section>

      ) : (
        <h1 className='absolute opacity-0 hidden'></h1>
      )}
      {webH ? (
        <h1>Favoritos</h1>
      ) : (
        <h1 className='absolute opacity-0 hidden'></h1>
      )}
      {webP ? (
        <Perfil />
      ) : (
        <h1 className='absolute opacity-0 hidden'></h1>
      )}
      {webST ? (
        <h1>Guardados</h1>
      ) : (
        <h1 className='absolute opacity-0 hidden'></h1>
      )}
      {activeT ? (
        <section className='w-full mt-3'>
          {messages.map((message) => (
            <article key={message.id}>
              <PostS url={message.url} contenido={message.contenido} displayName={message.displayName} like={message.like} image='' comment={message.comment} rePost={message.rePost} share={message.share} />
            </article>
          ))}
        </section>
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
        <Perfil />
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