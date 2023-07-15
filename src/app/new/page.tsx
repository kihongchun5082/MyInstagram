import NewPost from "@/components/NewPost";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: '새로운 사진',
  description: '새 사진 등록하기'
}
export default async function NewPostPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    redirect('/auth/signin')
   }
  return (
    <>
      <NewPost me={session.user}/>
    </>
  );
}

