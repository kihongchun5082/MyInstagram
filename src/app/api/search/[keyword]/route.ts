import  { searchUsers } from "@/service/user";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: { keyword: string}
}
export async function GET(_: NextRequest, context: Props) {
  return searchUsers(context.params.keyword).then((data) => NextResponse.json(data))
  
}