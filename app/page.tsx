"use client";

import {
  Navigation,
  Hero,
  Problem,
  Solution,
  Scanner,
  Integration,
  FAQ,
  Footer,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <Hero />
        <Problem />
        <Solution />
        <Scanner />
        <Integration />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
