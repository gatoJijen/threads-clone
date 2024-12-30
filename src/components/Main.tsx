import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import ContMain from "./ContMain";

interface MainProps {
    activeT: boolean;
    activeS: boolean;
    activeH:boolean;
    activeP: boolean;
    activeST: boolean;
}

const Main:React.FC<MainProps> =({activeT, activeS, activeH, activeP, activeST})=>{
    return(
        <>  
            <header>
                {activeT?(
                    <NavBar title="Inicio"/>
                ):(
                    <h1 className="opacity-0 hidden absolute"></h1>
                )}
                {activeS?(
                    <NavBar title="Buscar"/>
                ):(
                    <h1 className="opacity-0 hidden absolute"></h1>
                )}
                {activeH?(
                    <NavBar title="Favoritos"/>
                ):(
                    <h1 className="opacity-0 hidden absolute"></h1>
                )}
                {activeP?(
                    <NavBar title="Perfil"/>
                ):(
                    <h1 className="opacity-0 hidden absolute"></h1>
                )}
                {activeST?(
                    <NavBar title="Guardados"/>
                ):(
                    <h1 className="opacity-0 hidden absolute"></h1>
                )}
            </header>
            <section className="flex w-full h-full items-center gap-8 justify-between">
                <SideBar activeS={activeS} activeH={activeH} activeP={activeP} activeT={activeT} activeST={activeST}/>
                <article className="w-full h-full mt-[118px] ml-[355px]">
                    <ContMain activeS={activeS} activeH={activeH} activeP={activeP} activeT={activeT} activeST={activeST}/>
                </article>
            </section>
        </>
    )
}

export default Main