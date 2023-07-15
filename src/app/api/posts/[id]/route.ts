import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getPostById } from "@/service/posts";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: {id: string}
}
export async function GET(_: NextRequest, v: Props) {
  const session = await getServerSession(authOptions)
  const user = session?.user
  if (!user) {
    return new Response('Authentication Error', { status: 401 })
  }
return (
  getPostById(v.params.id).then((data) => NextResponse.json(data))
)
}
