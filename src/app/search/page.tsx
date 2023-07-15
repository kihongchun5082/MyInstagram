import UserSearch from "@/components/UserSearch";
import { Metadata } from "next";

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '가족 찾기',
  description: '따라가기 할 님 찾기'
}

export default function Searchpage() {
  return <><UserSearch /></>
}

