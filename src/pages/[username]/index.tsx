import { GetServerSideProps } from 'next';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username } = context.params!;

  try {
    // Referencia al documento del usuario
    const userRef = doc(db, 'users', username as string);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return {
        notFound: true, // Devuelve un 404 si el usuario no existe
      };
    }

    const userData = userSnap.data();

    return {
      props: {
        user: {
          username,
          ...userData,
        },
      },
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    return {
      notFound: true,
    };
  }
};

const UserPage = ({ user }: { user: { username: string; photoURL: string; name: string } }) => {
  return (
    <div>
      <img src={user.photoURL} alt={`${user.name}'s profile picture`} />
      <h1>{user.name}</h1>
      <p>@{user.username}</p>
    </div>
  );
};

export default UserPage;
