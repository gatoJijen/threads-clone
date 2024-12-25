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
import StickInactive from "@/app/public/StickInactive"
import { useState } from "react"

interface SideProps{
    activeT:boolean; 
    activeS:boolean; 
    activeH:boolean;
    activeP:boolean
}

const SideBar:React.FC<SideProps> = ({activeT, activeS,activeH, activeP}) => {

    return (
        <nav className="flex flex-col gap-4 items-center fixed justify-between bg-transparent h-svh w-[76px]">
            <section></section>
            <section className="flex flex-col w-full gap-4 p-2">
                <button className="bg-white bg-opacity-0  w-full flex justify-center items-center h-12 rounded-lg hover:bg-opacity-10">
                    {activeT?(
                        <HouseActive/>
                    ):(
                        <HouseInactive/>
                    )}
                </button>
                <button className="bg-white bg-opacity-0 flex justify-center items-center w-full rounded-lg h-12 hover:bg-opacity-10">
                {activeS?(
                        <SearchActive/>
                    ):(
                        <SearchInactive/>
                    )}
                </button>
                <button className="bg-white bg-opacity-10 flex justify-center items-center w-full rounded-lg h-12">
                    <New/>
                </button>
                <button className="bg-white bg-opacity-0 flex justify-center items-center w-full rounded-lg h-12 hover:bg-opacity-10">
                {activeH?(
                        <HeartActive/>
                    ):(
                        <HeartInactive/>
                    )}
                </button>
                <button className="bg-white bg-opacity-0 flex justify-center items-center w-full rounded-lg h-12 hover:bg-opacity-10">
                {activeP?(
                        <ProfileActive/>
                    ):(
                        <ProfileInactive/>
                    )}
                </button>
            </section>
            <footer className="flex flex-col w-full gap-4 p-2">
                <button className="bg-white bg-opacity-0 flex justify-center items-center w-full rounded-lg h-12 hover:bg-opacity-10">
                {activeP?(
                        <StickActive/>
                    ):(
                        <StickInactive/>
                    )}
                </button>
                <button className="bg-white bg-opacity-0 flex justify-center items-center w-full rounded-lg h-12 hover:bg-opacity-10">
                    <More/>
                </button>
            </footer>
        </nav>
    )
}

export default SideBar