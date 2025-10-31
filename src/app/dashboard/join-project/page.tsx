import InviteProject from "@/components/invite-project/invite-project";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


export default async function JoinProject() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if(!session) return redirect('/login');

    return (
      <InviteProject userId={session.user.id}/>
    )
}