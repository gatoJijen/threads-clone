import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import ContMain from "./ContMain";

interface MainProps {
    activeT: boolean;
    activeS: boolean;
    activeH:boolean;
    activeP: boolean;
}

const Main:React.FC<MainProps> =({activeT, activeS, activeH, activeP})=>{
    return(
        <>  
            <header>
                <NavBar title="Inicio"/>
            </header>
            <section className="flex w-full h-full items-center gap-8 justify-between">
                <SideBar activeS={activeS} activeH={activeH} activeP={activeP} activeT={activeT}/>
                <article className="w-full h-full mt-[118px] ml-[355px]">
                    <ContMain/>
                </article>
            </section>
        </>
    )
}

export default Main