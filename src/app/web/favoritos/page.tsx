"use client"
import Main from "@/components/Main";


const page = () => {

    return (
        <section>
            <article className="flex background-2 w-full h-svh">
                <Main activeT={false} activeH={false} web={false} webH={true} webP={false} webS={false} webST={false} activeP={false} activeS={false} activeST={false} login={true}/>
            </article>
        </section>
    )
}

export default page