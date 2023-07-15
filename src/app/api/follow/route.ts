import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { followYes, unfollow } from "@/service/user";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest) {
  const session = await getServerSession(authOptions)
  const me = session?.user
  if (!me) {
    return new Response('Authtication Error', { status: 401 })
  }

  const { id: targetId, follow1 } = await req.json()

  if (!targetId || follow1 === undefined) {
    return new Response('Bad Request', { status: 400 })
  }

  const request = follow1 ? followYes : unfollow

  return request(me.id, targetId)
    .then( res => NextResponse.json(res))
    .catch(error => new Response(JSON.stringify(error), { status: 500 }))
}