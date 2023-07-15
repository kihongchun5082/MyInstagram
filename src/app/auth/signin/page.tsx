import { getProviders } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { redirect }  from "next/navigation";
import SignIn from "@/components/Signin";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: '로그인 하기',
  description: '가족 인스타그램에 등록하기 혹은 로그인 하기'
}

type Props = {
  searchParams: {
    callbackUrl: string
  }
}
export default async function SignInPage( { searchParams: { callbackUrl }}: Props) {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/')
  } 
  const providers = (await getProviders()) ?? {};
  return <SignIn providers={providers} callbackUrl={callbackUrl ?? '/'} />
}

