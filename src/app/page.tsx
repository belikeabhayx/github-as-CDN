"use client";

import AdditionalFeatures from "@/components/Homepage/AdditionalFeatures";
import Features from "@/components/Homepage/Features";
import HeroSection from "@/components/Homepage/Hero";
import Homee from "@/components/Homepage/Hero";
import UploadSection from "@/components/Homepage/UploadSection";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  // const { data: session } = useSession();

  // if (session) {
  //   return (
  //     <div>
  //       <p>Welcome, {session.user?.name}!</p>
  //       <button onClick={() => signOut()}>Sign Out</button>
  //     </div>
  //   );
  // }

  return (
    <>
      {/* <div className="mt-44">
        <button onClick={() => signIn("github")}>Sign in with GitHub</button>
      </div> */}
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
        {/* hero section */}
        <HeroSection />
        {/* Upload Section */}
        <UploadSection />

        {/* Features Section */}
        <Features />

        {/* Additional Features */}
        <AdditionalFeatures />
      </div>
    </>
  );
}
