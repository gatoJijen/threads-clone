import Main from "@/components/Main";

const page = () => {
    return (
        <section>

            <article className="flex background-2 w-full h-svh">
                <Main activeT={false} activeH={false} activeP={false} web={false} activeS={false} webH={false} webP={true} webS={false} webST={false} activeST={false} login={true}/>
            </article>
        </section>
    )
}

export default page