import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { HeroHeader } from "./header";

export default async function HeroSession(){
    const session = await auth.api.getSession({
        headers: await headers()
    })

    const isLoggedIn = session ? true : false 

    return <HeroHeader isLoggedIn={isLoggedIn}/>
}