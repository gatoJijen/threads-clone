import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '@/firebase/config';
import NavBar from '@/components/NavBar';
import SideBar from '@/components/SideBar';
import PerfilS from '@/components/PerfilS';

// Tipo para los datos de usuario
interface User {
  id: string;
  photoURL: string;
  displayName: string;
}

// Función para obtener datos del usuario desde Firebase
async function getUserData(username: string): Promise<User | null> {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('displayName', '==', username));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null; // Usuario no encontrado
    }

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    return {
      id: userDoc.id,
      photoURL: userData.photoURL || '',
      displayName: userData.displayName || '',
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}

// Página para mostrar los datos del usuario
export default async function UserPage({ params }: { params: { username: string } }) {
  const user = await getUserData(params.username);

  if (!user) {
    return <div>Usuario no encontrado</div>;
  }

  return (
    <section className="overflow-hidden">
      <header>
      <NavBar login={true} title={user.displayName} />

      </header>
      <SideBar web={false} login={true} webS={false} webH={false} webP={false} webST={false} activeS={false} activeH={false} activeP={false} activeT={false} activeST={false} />
      <article className="w-full background-2 h-[80%] mt-[118px] ml-[355px] overflow-hidden">
        <section className='flex flex-col items-center overflow-y-auto overflow-x-hidden rounded-t-3xl background-3 w-[640px] border border-white border-opacity-10 h-[536px]'>

          <PerfilS displayName={user.displayName} url={user.photoURL} id={user.id} />
        </section>
      </article>

    </section>
  );
}