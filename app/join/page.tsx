
'use client'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export default function Join() {
  return (
    <div className="container-pro py-24">
      <div className="max-w-xl card p-8 mx-auto text-center">
        <h2 className="text-3xl font-bold">Join Most Like Me</h2>
        <p className="mt-4 text-ash">
          Create a secure account to start your questionnaire. We support email link, Google, and Apple sign-in.
        </p>
        <div className="mt-6">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="button-primary w-full">Continue</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center justify-center gap-3">
              <UserButton />
              <Link href="/questions" className="button-primary">Start the questions</Link>
            </div>
          </SignedIn>
        </div>
      </div>
    </div>
  )
}
