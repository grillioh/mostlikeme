// app/join/page.tsx
"use client";

import { useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export const dynamic = "force-dynamic"; // keep it simple for now

export default function JoinPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      {/* Top bar */}
      <div className="mb-10 flex items-center justify-between">
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

      {/* Logged-out content */}
      <SignedOut>
        <section className="rounded-2xl border p-8">
          <h2 className="mb-2 text-xl font-medium">Welcome!</h2>
          <p className="mb-6 text-sm text-gray-600">
            To take the quiz and find your “Most Like Me” match, create a free
            account (so we can save your progress privately).
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

      {/* Logged-in onboarding */}
      <SignedIn>
        <OnboardingForm />
      </SignedIn>
    </main>
  );
}

/* ----------------------------- Form component ---------------------------- */

function OnboardingForm() {
  const router = useRouter();
  const { user } = useUser();

  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [wantsUpdates, setWantsUpdates] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [okMsg, setOkMsg] = useState<string | null>(null);

  const handleContinue = async () => {
    setErrorMsg(null);
    setOkMsg(null);

    if (!user?.id) {
      setErrorMsg("You must be signed in.");
      return;
    }
    if (!name.trim() || !country.trim()) {
      setErrorMsg("Please enter your preferred name and country/region.");
      return;
    }

    setSaving(true);
    try {
      // Store or update profile row for this Clerk user
      const { error } = await supabase
        .from("profiles")
        .upsert(
          [
            {
              clerk_user_id: user.id,
              preferred_name: name.trim(),
              country: country.trim(),
              wants_updates: wantsUpdates,
            },
          ],
          { onConflict: "clerk_user_id" }
        );

      if (error) {
        setErrorMsg(error.message);
      } else {
        setOkMsg("Saved! Redirecting to the quiz…");
        // TODO: replace with your first question route when ready
        router.push("/questions");
      }
    } catch (err: any) {
      setErrorMsg(err?.message ?? "Unexpected error saving your info.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="rounded-2xl border p-8">
      <h2 className="mb-2 text-xl font-medium">Quick onboarding</h2>
      <p className="mb-6 text-sm text-gray-600">
        Two tiny steps before the quiz: how we should address you and where you
        live. This helps us personalize emails and time zones. You can change it
        later.
      </p>

      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          handleContinue();
        }}
      >
        <div>
          <label className="mb-1 block text-sm font-medium">
            Preferred name
          </label>
          <input
            type="text"
            placeholder="e.g., Adam"
            className="w-full rounded-xl border px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="given-name"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Country / Region
          </label>
          <input
            type="text"
            placeholder="e.g., United States"
            className="w-full rounded-xl border px-3 py-2"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            autoComplete="country-name"
          />
        </div>

        <div className="flex items-start gap-2">
          <input
            id="updates"
            type="checkbox"
            className="mt-1"
            checked={wantsUpdates}
            onChange={(e) => setWantsUpdates(e.target.checked)}
          />
          <label htmlFor="updates" className="text-sm text-gray-600">
            Yes—email me when a strong match is found and occasional updates
            about my quiz.
          </label>
        </div>

        {errorMsg && (
          <p className="text-sm text-red-600" role="alert">
            {errorMsg}
          </p>
        )}
        {okMsg && (
          <p className="text-sm text-green-600" role="status">
            {okMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-[#5946B2] px-5 py-2 text-white disabled:opacity-60"
        >
          {saving ? "Saving…" : "Continue → Start the quiz"}
        </button>
      </form>
    </section>
  );
}