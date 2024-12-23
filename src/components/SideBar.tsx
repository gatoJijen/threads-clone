import HouseActive from "@/app/public/HouseActive"
import HouseInactive from "@/app/public/HouseInactive"
import useActive from "@/hooks/useActive"


const SideBar = () => {
    const {active} = useActive()

    return (
        <nav className="flex flex-col gap-4 z-50 justify-between bg-neutral-800 h-full">
            <section></section>
            <section>
                <button className="bg-white bg-opacity-0 focus:bg-opacity-10">
                    {active?(
                        <HouseActive/>
                    ):(
                        <HouseInactive/>
                    )}
                </button>
                <button></button>
                <button></button>
                <button></button>
                <button></button>
            </section>
            <section></section>
        </nav>
    )
}

export default SideBar