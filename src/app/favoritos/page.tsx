"use client"
import Main from "@/components/Main";


const page = () => {

    return (
        <section>
            <article className="flex background-2 w-full h-svh">
                <Main activeT={false} activeH={true} activeP={false} web={false} webH={false} webP={false} webS={false} webST={false} activeS={false} activeST={false} login={false}/>
            </article>
        </section>
    )
}

export default page