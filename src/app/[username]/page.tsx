
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/config';
import SideBar from '@/components/SideBar';
import PerfilS from '@/components/PerfilS';
import Link from 'next/link';
import MoreMenu from '@/components/MoreMenu';
import More2 from '../public/More2';
// Tipo para los datos de usuario
interface PageProps {
  params: {
    username: string;
  };
}
interface User {
  id: string;
  photoURL: string;
  displayName: string;
}
// Función para obtener datos del usuario desde Firebase
async function getUserData(uid: string): Promise<User | null> {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('uid', '==', uid));
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
export default async function UserPage({ params }:  PageProps) {
  const user = await getUserData(params.username);
  const abrir =false
  const login = true
  if (!user) {
    return <div>Usuario no encontrado</div>;
  } 

  return (
    <section className="overflow-hidden">
      <header>
        <article className="relative">
          
          <nav className="flex justify-between mediaNavU fixed px-4 items-center bg-transparent w-full py-4 h-14">
            {login ? (
              <article className="mediaArticleNav">
                <Link className="mt-[15px] hover:scale-[1.07] transition-all  ml-[5px] mediaLogoNav" href={"/web"}>
                  <picture>
                    <button>
                      <svg aria-label="Threads" fill="white" height="34" role="img" viewBox="0 0 192 192" width="34" xmlns="http://www.w3.org/2000/svg">
                        <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z">
                        </path>
                      </svg>
                    </button>


                  </picture>
                </Link>
                <section className="stc mediaMoreNav opacity-0  hidden cursor-pointer relative bg-transparent mr-[6px] justify-center items-center w-full rounded-lg h-12">
                  <More2 />
                  <MoreMenu login={login} active={abrir} />

                </section>
              </article>

            ) : (
              <Link className="mt-[15px] hover:scale-[1.07] transition-all mediaLogoNav ml-[5px]" href={"/"}>
                <picture>
                  <button>
                    <svg aria-label="Threads" fill="white" height="34" role="img" viewBox="0 0 192 192" width="34" xmlns="http://www.w3.org/2000/svg">
                      <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z">
                      </path>
                    </svg>
                  </button>

                </picture>
              </Link>)}
            <section className="mediaSubNav">
              {login ? (
                <article className="">

                  <Link className=" mediaSubNav" href={"/login"}>
                    <button className={`w-[77.8px] h-[34px] mediaLogueNav opacity-0 hover:bg-opacity-90 bg-white rounded-xl text-black mt-[25px] mr-2 font-semibold text-lg fs-1`}>Entrar</button>
                  </Link>
                </article>


              ) : (

                <Link className="mediaSubNav" href={"/login"}>
                  <button className={`w-[77.8px] mediaLogueNav h-[34px] opacity-100 hover:bg-opacity-90 bg-white rounded-xl text-black mt-[25px] mr-2 font-semibold text-lg fs-1`}>Entrar</button>
                </Link>


              )

              }


            </section>
          </nav>
        </article>
      </header>
      <SideBar web={false} login={true} webS={false} webH={false} webP={false} webST={false} activeS={false} activeH={false} activeP={false} activeT={false} activeST={false} />
      <article className="w-full background-2 h-[80%] mediaArtContMain mt-[19.6svh] ml-[26%] overflow-hidden">
        <section className='flex flex-col items-center overflow-y-auto overflow-x-hidden rounded-t-3xl background-3  w-[46.8vw] mediaContMain border min-w-[500px] border-white border-opacity-10 h-[80svh]'>
          <PerfilS displayName={user.displayName} url={user.photoURL} id={user.id} />
        </section>
      </article>
    </section>
  );
}