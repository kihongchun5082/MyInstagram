import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { addComment } from "@/service/posts";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
  const session = await getServerSession(authOptions)
  const me = session?.user

  if (!me) {
    return new Response('Authentication Error', { status: 401 })
  }

  const { id, comment } = await req.json();

  if (!id || comment === undefined ) {
    return new Response('Bad Request', { status: 400 })
  }

  return addComment(id, me.id, me.image ?? '', comment)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}