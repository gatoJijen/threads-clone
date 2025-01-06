import Main from "@/components/Main";

const page = () => {
    return (
        <section>

            <article className="flex background-2 w-full h-svh">
                <Main activeT={false} activeH={false} webH={false} webP={false} webS={true} webST={false} activeP={false} web={false} activeS={false} activeST={false} login={true}/>
            </article>
        </section>
    )
}

export default page