"use client"
import HeartActive from "@/app/public/HeartActive"
import HeartInactive from "@/app/public/HeartInactive"
import HouseActive from "@/app/public/HouseActive"
import HouseInactive from "@/app/public/HouseInactive"
import More from "@/app/public/More"
import New from "@/app/public/New"
import ProfileActive from "@/app/public/ProfileActive"
import ProfileInactive from "@/app/public/ProfileInactive"
import SearchActive from "@/app/public/SearchActive"
import SearchInactive from "@/app/public/SearchInactive"
import StickActive from "@/app/public/StickActive"
import Link from "next/link"
import { useState } from "react"
import MoreMenu from "./MoreMenu"
import LogueModal from "./LogueModal"
import NewModal from "./NewModal"

interface SideProps {
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
    login: boolean
}

const SideBar: React.FC<SideProps> = ({ login, activeT, activeS, activeH, activeP, web, activeST, webH, webP, webS, webST }) => {
    const [abrir, setAbrir] = useState(false)

    const change = () => {
        setAbrir((estadoActual) => !estadoActual); // Cambia el estado al opuesto
    };
    const [abrir2, setAbrir2] = useState(false)
    const [abrir3, setAbrir3] = useState(false)


    const change2 = () => {
        setAbrir2((estadoActual) => !estadoActual); // Cambia el estado al opuesto
    };
    const change3 = () => {
        setAbrir3((estadoActual) => !estadoActual); // Cambia el estado al opuesto
    };

    return (
        <>
            {
                abrir ? (<section onClick={change} className='flex absolute bg-transparent justify-center items-center w-[100vw] h-svh'>

                </section>) : (<MoreMenu login={login} active={abrir} />)

            }
            {abrir2 ? (
                <section className="w-[100vw] absolute h-svh">
                    <section onClick={change2} className='bg-black flex z-[999] justify-center items-center bg-opacity-80 w-full h-svh'>
                        <LogueModal active={abrir2} />
                    </section>
                </section>
            ) : (<div className="hidden absolute opacity-0"></div>)

            }
            {abrir3 ? (
                <section className="w-[100vw] mediaSSectionModal absolute h-svh">
                    <section className='bg-black flex z-[999] mediaSectionModal justify-center items-center bg-opacity-80 w-full h-svh'>
                        <NewModal p1={true} close={change3} />
                    </section>
                </section>
            ) : (<div className="hidden absolute opacity-0"></div>)

            }
            <section className="flex mediaSide flex-col items-center fixed justify-between bg-transparent h-svh w-[76px]">


                <section className="mediaSectionSide"></section>
                <section className="flex flex-col mediaContButtonSide w-full gap-4 mt-[68px] p-2">
                    <button className="bg-white bg-opacity-0  w-full flex justify-center items-center h-12 rounded-lg hover:bg-opacity-5 mediaButtonSide">
                        {login ? ((web ? (
                            <HouseActive />
                        ) : (
                            <Link href="/web">
                                <HouseInactive />
                            </Link>
                        )

                        )) : (activeT ? (
                            <HouseActive />
                        ) : (
                            <Link href="/">
                                <HouseInactive />
                            </Link>
                        ))}
                    </button>
                    <button className="bg-white bg-opacity-0 flex justify-center items-center w-full rounded-lg h-12 hover:bg-opacity-5 mediaButtonSide">
                        {login ? (
                            webS ? (

                                <SearchActive />

                            ) : (
                                <Link href={"/web/search"}>
                                    <SearchInactive />
                                </Link>
                            )
                        ) : (
                            activeS ? (

                                <SearchActive />

                            ) : (
                                <Link href={"/search"}>
                                    <SearchInactive />
                                </Link>
                            )
                        )}
                    </button>
                    <section className="bg-white bg-opacity-5 cursor-pointer flex justify-center items-center w-full rounded-lg h-12 mediaButtonSide">
                        {login ? (<button onClick={change3}><New /></button>) : (<button onClick={change2}><New /></button>)

                        }
                    </section>
                    <section className="bg-white cursor-pointer bg-opacity-0 flex justify-center items-center w-full rounded-lg h-12 hover:bg-opacity-5 mediaButtonSide">
                        {login ? (
                            webH ? (
                                <button>
                                    <HeartActive />
                                </button>

                            ) : (
                                <button>
                                    <Link href={"/web/favoritos"}>
                                        <HeartInactive />
                                    </Link>
                                </button>

                            )
                        ) : (
                            activeH ? (
                                <button>
                                    <HeartActive />
                                </button>

                            ) : (
                                <button onClick={change2}>
                                    <HeartInactive />
                                </button>

                            )
                        )}

                    </section>

                    <button className="bg-white cursor-pointer bg-opacity-0 flex justify-center items-center w-full rounded-lg h-12 hover:bg-opacity-5 mediaButtonSide">
                        {login ? (
                            webP ? (
                                <ProfileActive />
                            ) : (
                                <Link href={"/web/perfil"}>
                                    <ProfileInactive />
                                </Link>
                            )
                        ) : (
                            activeP ? (
                                <ProfileActive />
                            ) : (
                                <section onClick={change2}>
                                    <ProfileInactive />
                                </section>
                            )
                        )}
                    </button>
                </section>
                <footer className="flex flex-col mediaMoreSide justify-center mb-[17px] gap-[10px] items-center w-full p-2">
                    <button className="bg-white bg-opacity-0 flex justify-center items-center w-full rounded-lg h-12 hover:bg-opacity-5 stc">
                        {login ?
                            (webST ? (
                                <StickActive />
                            ) : (<StickActive />))
                            : (activeST ? (
                                <section onClick={change2}>
                                    <StickActive />
                                </section>
                            ) : (
                                <section onClick={change2}>
                                    <StickActive />
                                </section>
                            ))}
                    </button>
                    <section onClick={() => change()} className="stc mediaMoreSide cursor-pointer relative bg-transparent mr-[6px] flex justify-center items-center w-full rounded-lg h-12">
                        <More />
                        <MoreMenu login={login} active={abrir} />

                    </section>
                </footer>
            </section >
        </>
    )
}

export default SideBar