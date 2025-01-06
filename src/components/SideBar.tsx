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
import { useRouter } from "next/navigation"

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
    return (
        <nav className="flex flex-col items-center fixed justify-between bg-transparent h-svh w-[76px]">
            <section></section>
            <section className="flex flex-col w-full gap-4 mt-[68px] p-2">
                <button className="bg-white bg-opacity-0  w-full flex justify-center items-center h-12 rounded-lg hover:bg-opacity-5">
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
                <button className="bg-white bg-opacity-0 flex justify-center items-center w-full rounded-lg h-12 hover:bg-opacity-5">
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
                <button className="bg-white bg-opacity-5 flex justify-center items-center w-full rounded-lg h-12">
                    <New />
                </button>
                <button className="bg-white bg-opacity-0 flex justify-center items-center w-full rounded-lg h-12 hover:bg-opacity-5">
                    {login ? (
                        webH ? (
                            <HeartActive />
                        ) : (
                            <Link href={"/web/favoritos"}>
                                <HeartInactive />
                            </Link>
                        )
                    ) : (
                        activeH ? (
                            <HeartActive />
                        ) : (
                            <Link href={"/favoritos"}>
                                <HeartInactive />
                            </Link>
                        )
                    )}
                </button>
                <button className="bg-white bg-opacity-0 flex justify-center items-center w-full rounded-lg h-12 hover:bg-opacity-5">
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
                            <Link href={"/perfil"}>
                                <ProfileInactive />
                            </Link>
                        )
                    )}
                </button>
            </section>
            <footer className="flex flex-col justify-center mb-[17px] gap-[10px] items-center w-full p-2">
                <button className="bg-white bg-opacity-0 flex justify-center items-center w-full rounded-lg h-12 hover:bg-opacity-5 stc">
                    {login || activeST || webST? (
                        <StickActive />
                    ) : (

                        <StickActive />

                    )}
                </button>
                <section onClick={()=>change()} className="stc cursor-pointer relative bg-transparent mr-[6px] flex justify-center items-center w-full rounded-lg h-12">
                    <More />
                    <MoreMenu login={login} active={abrir}/>
                    
                </section>
            </footer>
        </nav>
    )
}

export default SideBar