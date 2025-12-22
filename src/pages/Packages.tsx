// app/packages/page.tsx

import AnimatedBackground from "@/components/AnimatedBackground";
import NavbarLaunch from "@/components/NavbarLaunch";
import React from "react";

function Divider() {
  return <div className="my-8 h-px w-full bg-white/10" />;
}

function OptionBlock({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div
        style={{ fontFamily: '"Press Start 2P", cursive' }}
        className="text-sm font-semibold tracking-widest text-purple-400"
      >
        {title}
      </div>
      <div className="mt-4 space-y-1 text-base leading-relaxed text-white/80">
        {lines.map((t, i) => (
          <div key={i}>{t}</div>
        ))}
      </div>
    </div>
  );
}

export default function Packages() {
  return (
    <main className="relative min-h-screen overflow-hidden  text-white">
      <NavbarLaunch />
      <AnimatedBackground />

      <div className="relative mx-auto flex max-w-7xl gap-6 px-4 pt-20">
        {/* Left vertical label */}
        <div className="hidden w-16 shrink-0 md:flex md:items-stretch">
          <div className="relative w-full">
            <div className="absolute left-0 top-0 h-full w-full">
              <div className="flex h-full items-center justify-center">
                <div
                  className="select-none text-xl font-extrabold tracking-[0.22em] text-purple-400/90"
                  style={{
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    fontFamily: '"Press Start 2P", cursive',
                  }}
                >
                  LEVEL UP COMBO PACKAGES
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card */}
        <section className="w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/30 p-6 md:p-10">
          {/* LEVEL 1 */}
          <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
            <div
              className="text-xl font-extrabold tracking-tight"
              style={{ fontFamily: '"Press Start 2P", cursive' }}
            >
              <span className="text-cyan-400">LEVEL 1</span>
              <span className="text-white/60"> | </span>
              <span className="text-purple-400">STARTER</span>
            </div>
            <div
              className="text-xl font-extrabold tracking-tight"
              style={{ fontFamily: '"Press Start 2P", cursive' }}
            >
              <span className="text-cyan-400">350 THB</span>
              <span className="text-white/60"> | </span>
              <span className="text-purple-400">PERSON</span>
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <OptionBlock
              title="OPTION A"
              lines={[
                "ALCOHOL",
                "BOWLING",
                "+ 1 ALCOHOLIC DRINK",
                "(BEER OR HOUSE COCKTAIL)",
              ]}
            />
            <OptionBlock
              title="OPTION B"
              lines={[
                "NON-ALCOHOLIC",
                "BOWLING",
                "+ 1 NON-ALCOHOLIC DRINK",
                "+ 1 QUICK BITE",
              ]}
            />
          </div>

          <Divider />

          {/* LEVEL 2 */}
          <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
            <div
              className="text-xl font-extrabold tracking-tight"
              style={{ fontFamily: '"Press Start 2P", cursive' }}
            >
              <span className="text-cyan-400">LEVEL 2</span>
              <span className="text-white/60"> | </span>
              <span className="text-purple-400">PLAYER MODE</span>
            </div>
            <div
              className="text-xl font-extrabold tracking-tight"
              style={{ fontFamily: '"Press Start 2P", cursive' }}
            >
              <span className="text-cyan-400">1,200 THB</span>
              <span className="text-white/60"> | </span>
              <span className="text-purple-400">PERSON</span>
            </div>
          </div>

          <div
            className="mt-3 text-base tracking-tight text-cyan-400"
            style={{ fontFamily: '"Press Start 2P", cursive' }}
          >
            BOWLING + ARCADE + PX 1,500 POINTS
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <OptionBlock
              title="OPTION A"
              lines={["ALCOHOL", "1 ALCOHOLIC DRINK"]}
            />
            <OptionBlock
              title="OPTION B"
              lines={[
                "NON-ALCOHOLIC",
                "1 NON-ALCOHOLIC DRINK",
                "+ 1 QUICK BITE",
              ]}
            />
          </div>

          <Divider />

          {/* LEVEL 3 */}
          <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
            <div
              className="text-xl font-extrabold tracking-tight"
              style={{ fontFamily: '"Press Start 2P", cursive' }}
            >
              <span className="text-cyan-400">LEVEL 3</span>
              <span className="text-white/60"> | </span>
              <span className="text-purple-400">BOSS MODE</span>
            </div>
            <div
              className="text-xl font-extrabold tracking-tight"
              style={{ fontFamily: '"Press Start 2P", cursive' }}
            >
              <span className="text-cyan-400">4,500 THB</span>
              <span className="text-white/60"> | </span>
              <span className="text-purple-400">PERSON</span>
            </div>
          </div>

          <div
            className="mt-3 text-sm  text-purple-400"
            style={{ fontFamily: '"Press Start 2P", cursive' }}
          >
            RECOMMENDED FOR 3-5 PEOPLE (MAXIMUM 8 PEOPLE)
          </div>

          <div
            className="mt-4 space-y-1 text-base  tracking-tight text-cyan-400"
            style={{ fontFamily: '"Press Start 2P", cursive' }}
          >
            <div>2 HOURS BOWLING</div>
            <div>PX 3,000 POINTS</div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <OptionBlock
              title="OPTION A"
              lines={["ALCOHOL", "5 ALCOHOLIC DRINKS", "(NO FOOD INCLUDED)"]}
            />
            <OptionBlock
              title="OPTION B"
              lines={[
                "NON-ALCOHOLIC",
                "5 NON-ALCOHOLIC DRINKS",
                "CHICKEN & FRENCH FRIES",
              ]}
            />
          </div>

          <Divider />

          <div
            style={{ fontFamily: '"Press Start 2P", cursive' }}
            className="text-base tracking-wide text-purple-400"
          >
            PX POINTS CAN BE USED FOR:
          </div>
          <div
            className="mt-2 text-base  text-purple-400"
            style={{ fontFamily: '"Press Start 2P", cursive' }}
          >
            DRINKS · FOOD · ARCADE · GOLF SIMULATOR
          </div>

          <div
            className="mt-8 text-sm  text-purple-400"
            style={{ fontFamily: '"Press Start 2P", cursive' }}
          >
            * 10% OFF FOR OFF PEAK HOURS
          </div>
        </section>
      </div>
    </main>
  );
}
