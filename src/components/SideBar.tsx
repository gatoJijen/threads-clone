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

interface SideProps{
    activeT:boolean; 
    activeS:boolean; 
    activeH:boolean;
    activeP:boolean
}

const SideBar:React.FC<SideProps> = ({activeT, activeS,activeH, activeP}) => {

    return (
        <nav className="flex flex-col items-center fixed justify-between bg-transparent h-svh w-[76px]">
            <section></section>
            <section className="flex flex-col w-full gap-4 mt-[68px] p-2">
                <button className="bg-white bg-opacity-0  w-full flex justify-center items-center h-12 rounded-lg hover:bg-opacity-5">
                    {activeT?(
                        <HouseActive/>
                    ):(
                        <HouseInactive/>
                    )}
                </button>
                <button className="bg-white bg-opacity-0 flex justify-center items-center w-full rounded-lg h-12 hover:bg-opacity-5">
                {activeS?(
                        <SearchActive/>
                    ):(
                        <SearchInactive/>
                    )}
                </button>
                <button className="bg-white bg-opacity-5 flex justify-center items-center w-full rounded-lg h-12">
                    <New/>
                </button>
                <button className="bg-white bg-opacity-0 flex justify-center items-center w-full rounded-lg h-12 hover:bg-opacity-5">
                {activeH?(
                        <HeartActive/>
                    ):(
                        <HeartInactive/>
                    )}
                </button>
                <button className="bg-white bg-opacity-0 flex justify-center items-center w-full rounded-lg h-12 hover:bg-opacity-5">
                {activeP?(
                        <ProfileActive/>
                    ):(
                        <ProfileInactive/>
                    )}
                </button>
            </section>
            <footer className="flex flex-col justify-center mb-[17px] gap-[10px] items-center w-full p-2">
                <button className="bg-white bg-opacity-0 flex justify-center items-center w-full rounded-lg h-12 hover:bg-opacity-5">
                {activeP?(
                        <StickActive/>
                    ):(
                        <StickInactive/>
                    )}
                </button>
                <button className="bg-transparent mr-[6px] flex justify-center items-center w-full rounded-lg h-12">
                    <More/>
                </button>
            </footer>
        </nav>
    )
}

export default SideBar