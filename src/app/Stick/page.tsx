import Main from "@/components/Main";

const page = () => {
    return (
        <main>

            <article className="flex background-2 w-full h-svh">
                <Main activeT={false} activeH={false} activeP={false} activeS={false} activeST={true}/>
            </article>
        </main>
    )
}

export default page