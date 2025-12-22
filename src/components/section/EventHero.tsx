// Hero.tsx
import React from "react";
import qrCode from "@/assets/qr.jpg";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import logo from "@/assets/logo.json";
export default function EventHero() {
  return (
    <section className="relative min-h-screen w-full  text-white">
      {/* Soft glow background */}

      {/* Content */}
      <div className="relative z-10 mx-auto flex  min-h-screen max-w-7xl  flex-col-reverse items-center justify-center px-6 py-12 md:flex-row-reverse md:items-center md:justify-between gap-12">
        {/* Left side. QR card */}
        <div className="w-full md:w-[30%] flex justify-center md:justify-start">
          <div className="space-y-4 text-center md:text-left">
            <p
              className="text-xs font-semibold tracking-[0.35em] text-cyan-300 uppercase text-center"
              style={{ fontFamily: '"Press Start 2P", cursive' }}
            >
              scan to join
            </p>

            <div className="relative inline-block">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-cyan-400 via-purple-400 to-fuchsia-400 opacity-80 blur-xl" />
              <div className="relative rounded-3xl p-2 border shadow-xl shadow-cyan-500/30">
                <div className="h-64 w-64 rounded-2xl bg-black/40 flex items-center justify-center">
                  <img
                    src={qrCode}
                    alt="Scan QR"
                    className="h-full w-full rounded-2xl object-contain"
                  />
                </div>
              </div>
            </div>

            <p className="text-sm text-cyan-100/80 text-center">
              Open the Pixel event page.
              <br />
              Save your spot for the grand opening.
            </p>
          </div>
        </div>

        {/* Right side. Event info */}
        <div className="w-full md:w-[55%] text-center md:text-left space-y-6">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 md:gap-4 mb-4">
            <Link to="/">
              <Lottie
                animationData={logo}
                className="md:w-24 md:h-24 w-16 h-16 cursor-pointer"
              />
            </Link>
            <span className="text-3xl text-slate-400">|</span>
            <p
              style={{ fontFamily: '"Press Start 2P", cursive' }}
              className="text-sm md:text-xl font-semibold text-slate-300"
            >
              Haven Community Shopping Complex
            </p>
          </div>

          {/* Invite text */}
          <div className="space-y-1">
            <p className="text-sm tracking-[0.35em] text-cyan-300 font-semibold">
              invites you
            </p>
            <p
              className="text-[0.7rem] tracking-[0.4em] text-purple-300 font-semibold uppercase"
              style={{ fontFamily: '"Press Start 2P", cursive' }}
            >
              to our opening
            </p>
          </div>

          {/* Main heading */}
          <div className="space-y-2">
            <p
              className="text-lg text-cyan-100/80 uppercase"
              style={{ fontFamily: '"Press Start 2P", cursive' }}
            >
              grand opening night
            </p>
            <p
              className="text-xl lg:text-2xl font-extrabold tracking-[0.15em] text-cyan-300"
              style={{ fontFamily: '"Press Start 2P", cursive' }}
            >
              13 december 2025
            </p>
            <p className="text-base tracking-[0.25em] text-purple-300 uppercase">
              from 5pm
            </p>
          </div>

          {/* Location */}
          <div className="space-y-1 text-sm text-purple-200">
            <p className="font-semibold text-cyan-200">Haven Community Mall</p>
            <p>Chaweng Rd, Koh Samui</p>
          </div>

          {/* CTA */}
          <div className="pt-2">
            <button
              className="inline-block skew-x-[-12deg] rounded-lg bg-cyan-400 px-6 py-3 text-xs font-bold uppercase tracking-[0.25em] text-black transition hover:bg-purple-400"
              style={{ fontFamily: '"Press Start 2P", cursive' }}
            >
              come play with us
            </button>
          </div>

          {/* Small note */}
          <p className="text-xs text-purple-300/80">
            Bring your friends. Experience Pixel in full neon mode.
          </p>
        </div>
      </div>
    </section>
  );
}
