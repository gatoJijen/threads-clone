import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";

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
            <section className="flex">
                <SideBar activeS={activeS} activeH={activeH} activeP={activeP} activeT={activeT}/>
            </section>
        </>
    )
}

export default Main