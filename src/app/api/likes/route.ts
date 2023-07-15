import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { disLikePost, likePost } from '@/service/posts';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const me = session?.user;

  if (!me) {
    return new Response('Authentification Error', { status: 401 });
  }
  
  const { id, like } = await req.json();
  
  // console.log('likes_route_id-like;', id, like);
  
  if (!id || like === undefined) {
    return new Response('Bad Request', { status: 400 });
  }

  const request = like ? likePost : disLikePost;

  return request(id, me.id)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}