"use client";

import AdditionalFeatures from "@/components/Homepage/AdditionalFeatures";
import FileUploader from "@/components/Homepage/df";
import Features from "@/components/Homepage/Features";
import HeroSection from "@/components/Homepage/Hero";
import UploadSection from "@/components/Homepage/UploadSection";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
        {/* hero section */}
        <HeroSection />
        {/* Upload Section */}
        <UploadSection />
        <FileUploader/>

        {/* Features Section */}
        <Features />

        {/* Additional Features */}
        <AdditionalFeatures />
      </div>
    </>
  );
}
