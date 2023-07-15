'use client'

import { ClientSafeProvider, signIn } from "next-auth/react"

type Props = {
  providers: Record<string, ClientSafeProvider>
  callbackUrl: string
}

export default function SignIn({ providers, callbackUrl }: Props) {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div className=" bg-red-500" key={provider.name}>
          <button onClick={() => signIn(provider.id, { callbackUrl })}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  )
}