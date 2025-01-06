import Main from "@/components/Main";

const page = () => {
    return (
        <main>

            <article className="flex background-2 w-full h-svh">
                <Main activeT={false} activeH={false} webH={false} webP={false} webS={false} webST={false} activeP={false} web={false} activeS={true} activeST={false} login={false}/>
            </article>
        </main>
    )
}

export default page