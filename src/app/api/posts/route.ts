import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { createPost, getFollowingPostsOf } from "@/service/posts"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  const session = await getServerSession(authOptions)
  const user = session?.user
  // console.log('postsApiUser;',user)
  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }
  return (
    getFollowingPostsOf(user.username)
      .then((data) => NextResponse.json(data))
  ) 
}

export async function POST(req:NextRequest) {
  const session = await getServerSession(authOptions)
  const me = session?.user

  if (!me) {
    return new Response('Authentication Error', { status: 400 })
  }
  
  const form = await req.formData()
  const text = form.get('text')?.toString()
  const file = form.get('file') as Blob

  if (!text || !file) {
    return new Response('Bad Request', { status: 401})
  }

  return createPost(me.id, text, file)
    .then(data => NextResponse.json(data))
}