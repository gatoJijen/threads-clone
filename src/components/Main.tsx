import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import ContMain from "./ContMain";

interface MainProps {
    activeT: boolean;
    activeS: boolean;
    activeH:boolean;
    activeP: boolean;
    login:boolean;
    web:boolean;
    webS:boolean;
    webH:boolean;
    webP:boolean;
    webST:boolean;
    activeST: boolean;
}

const Main:React.FC<MainProps> =({activeT,web, activeS,login, activeH,webH, activeP, activeST, webP, webS, webST})=>{
    return(
        <>  
            <header>
                {activeT?(
                    <NavBar login={login} title="Inicio"/>
                ):(
                    <h1 className="opacity-0 hidden absolute"></h1>
                )}
                {activeS?(
                    <NavBar login={login} title="Buscar"/>
                ):(
                    <h1 className="opacity-0 hidden absolute"></h1>
                )}
                {activeH?(
                    <NavBar login={login} title="Actividad"/>
                ):(
                    <h1 className="opacity-0 hidden absolute"></h1>
                )}
                {activeP?(
                    <NavBar login={login} title="Perfil"/>
                ):(
                    <h1 className="opacity-0 hidden absolute"></h1>
                )}
                {activeST?(
                    <NavBar login={login} title="Guardados"/>
                ):(
                    <h1 className="opacity-0 hidden absolute"></h1>
                )}
                {web?(
                    <NavBar login={login} title="Inicio"/>
                ):(
                    <h1 className="opacity-0 hidden absolute"></h1>
                )}
                {webS?(
                    <NavBar login={login} title="Buscar"/>
                ):(
                    <h1 className="opacity-0 hidden absolute"></h1>
                )}
                {webH?(
                    <NavBar login={login} title="Actividad"/>
                ):(
                    <h1 className="opacity-0 hidden absolute"></h1>
                )}
                {webP?(
                    <NavBar login={login} title="Perfil"/>
                ):(
                    <h1 className="opacity-0 hidden absolute"></h1>
                )}
                {webST?(
                    <NavBar login={login} title="Guardados"/>
                ):(
                    <h1 className="opacity-0 hidden absolute"></h1>
                )}
            </header>
            <section className="flex w-full h-full items-center gap-8 justify-between">
                <SideBar web={web} login={login} webS={webS} webH={webH} webP={webP} webST={webST} activeS={activeS} activeH={activeH} activeP={activeP} activeT={activeT} activeST={activeST}/>
                <article className="w-full background-2 h-full mt-[118px] ml-[355px]">
                    <ContMain web={web} webS={webS} webH={webH} webP={webP} webST={webST} activeS={activeS} activeH={activeH} activeP={activeP} activeT={activeT} activeST={activeST}/>
                </article>
            </section>
        </>
    )
}

export default Main