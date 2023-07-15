import { searchUsers } from "@/service/user";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function GET() {
  return searchUsers().then((data) => NextResponse.json(data))
  
}