import { GetServerSideProps } from 'next';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '@/firebase/config';
import Main from '@/components/Main';

// Tipo para los datos de usuario
interface User {
  id: string;
  photoURL: string;
  displayName: string;
}

// `getServerSideProps` para obtener los datos del usuario según el nombre
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username } = context.params!;
  console.time('Firebase query time');

  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('displayName', '==', username as string), limit(1));
    const querySnapshot = await getDocs(q);

    console.timeEnd('Firebase query time'); // Marca el tiempo de la consulta

    if (querySnapshot.empty) {
      return { notFound: true };
    }

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    return {
      props: {
        user: {
          id: userDoc.id,
          photoURL: userData.photoURL || '',
          displayName: userData.displayName || '',
        },
      },
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    console.timeEnd('Firebase query time');
    return { notFound: true };
  }
};



// Componente para la página de usuario
const UserPage = ({ user }: { user: User }) => {
  console.log('User data:', user);
  if (!user) {
    return <div>Error: Usuario no encontrado o datos incompletos.</div>;
  }

  return (
    <Main
      activeH={false}
      activeP={true}
      activeS={false}
      activeST={false}
      activeT={false}
      login={false}
      web={false}
      webH={false}
      webP={false}
      webS={false}
      webST={false}
    />
  );
};

export default UserPage;
