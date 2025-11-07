// app/join/page.tsx
"use client";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export const dynamic = "force-dynamic"; // keep it simple for now

export default function JoinPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl font-semibold">Join Most Like Me</h1>
        <div className="flex items-center gap-3">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="rounded-full border px-4 py-2 text-sm">
                Sign in
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="rounded-full bg-[#5946B2] px-4 py-2 text-sm text-white">
                Create account
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>

      {/* Content */}
      <SignedOut>
        <section className="rounded-2xl border p-8">
          <h2 className="mb-2 text-xl font-medium">Welcome!</h2>
          <p className="text-sm text-gray-600 mb-6">
            To take the quiz and find your “Most Like Me” match, create a free account
            (so we can save your progress privately).
          </p>
          <div className="flex gap-3">
            <SignUpButton mode="modal">
              <button className="rounded-full bg-[#5946B2] px-5 py-2 text-white">
                Create account
              </button>
            </SignUpButton>
            <SignInButton mode="modal">
              <button className="rounded-full border px-5 py-2">
                I already have an account
              </button>
            </SignInButton>
          </div>
        </section>
      </SignedOut>

      <SignedIn>
        <section className="rounded-2xl border p-8">
          <h2 className="mb-2 text-xl font-medium">Quick onboarding</h2>
          <p className="text-sm text-gray-600 mb-6">
            Two tiny steps before the quiz: how we should address you and where you live.
            This helps us personalize emails and time zones. You can change it later.
          </p>

          {/* form shell - we’ll wire it to Supabase soon */}
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Preferred name</label>
              <input
                type="text"
                placeholder="e.g., Adam"
                className="w-full rounded-xl border px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Country / Region</label>
              <input
                type="text"
                placeholder="e.g., United States"
                className="w-full rounded-xl border px-3 py-2"
              />
            </div>
            <div className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" />
              <span className="text-sm text-gray-600">
                Yes—email me when a strong match is found and occasional updates about my quiz.
              </span>
            </div>

            <button
              type="button"
              className="rounded-full bg-[#5946B2] px-5 py-2 text-white"
              onClick={() => alert("Saved! Quiz coming next.")}
            >
              Continue → Start the quiz
            </button>
          </form>
        </section>
      </SignedIn>
    </main>
  );
}