import { ParticleTextEffect } from "@/widgets/particle-text-effect";

export default function Home() {
  return (
    <div
      className="
        flex flex-col items-center justify-center
        min-h-screen
        p-8 pb-20
        font-[family-name:var(--font-geist-sans)]
      "
      style={{ gap: '2rem' }}
    >
      <div className="w-full flex-grow">
        <ParticleTextEffect />
      </div>
    </div>
  );
}