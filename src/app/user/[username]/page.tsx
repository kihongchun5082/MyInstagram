import UserProfile from "@/components/UserProfile";
import { SimpleUser } from "@/model/user";
import { getUserForProfile } from "@/service/user";
import notFound from "./notFound";
import UserPost from "@/components/UserPost";
import { Metadata } from "next";
import { cache } from "react";

type Props = {
  params: {username: string}
}

const getUser = cache(async (username: string)=> getUserForProfile(username))

export default async function Userpage({params:{username}}: Props ) {
  const user = await getUser(username)
  if (!user) {
    notFound()
  }
  return (
    <section className=" w-full">
      <UserProfile user={user}/>
      <UserPost user={user}/>
    </section>
  );
}

export async function generateMetadata({params: { username }}: Props): Promise<Metadata> {
  const user = await getUser(username)
  return {
    title: `${user?.name} (@${user?.username}) • 가족 인스타그램 사진`,
    description: `${user?.name}의 모든 사진들`
  }
}

