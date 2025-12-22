import AnimatedBackground from "@/components/AnimatedBackground";
import { AnimatedText } from "@/components/TextBlock";
import React, { useEffect, useMemo, useState } from "react";
import logo from "@/assets/logo.json";
import Lottie from "lottie-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import NavbarLaunch from "@/components/NavbarLaunch";
import EventHero from "@/components/section/EventHero";
const RatingGroup = ({ name, value, onChange, ariaLabel }) => {
  // stars 5..1 (right-to-left visual)
  const stars = [5, 4, 3, 2, 1];
  return (
    <div
      className="flex flex-row-reverse justify-start gap-1"
      role="radiogroup"
      aria-label={ariaLabel}
    >
      {stars.map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-checked={value === n}
          role="radio"
          className={`w-6 h-6 transition-all ${
            value >= n ? "text-purple-400" : "text-cyan-400/40"
          }`}
          title={`${n} star${n > 1 ? "s" : ""}`}
        >
          {/* lucide star svg */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill={value >= n ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      ))}
    </div>
  );
};

export default function PixelEvent() {
  // steps: 0..4
  const totalSteps = 5;
  const [step, setStep] = useState(0);
  const [toast, setToast] = useState("");
  const xp = useMemo(() => Math.round((step / (totalSteps - 1)) * 100), [step]);

  // form state
  const [playerHandle, setPlayerHandle] = useState("");
  const [company, setCompany] = useState("");

  // step 2 (eatery)
  const [atmosphere, setAtmosphere] = useState(null);
  const [food, setFood] = useState(null);
  const [favoriteItem, setFavoriteItem] = useState("");
  const [beer, setBeer] = useState(null);
  const [menuSuggestions, setMenuSuggestions] = useState("");
  const [service, setService] = useState(null);

  // step 3 (arcade)
  const [uniqueness, setUniqueness] = useState(null);
  const [appealFamilies, setAppealFamilies] = useState(null);
  const [appealTourists, setAppealTourists] = useState(null);
  const [appealCouples, setAppealCouples] = useState(null);
  const [gameSuggestions, setGameSuggestions] = useState("");

  // step 4 (haven)
  const [havenImpression, setHavenImpression] = useState(null);
  const [synergy, setSynergy] = useState(null);
  const [complexSuggestions, setComplexSuggestions] = useState("");

  // step 5 (final)
  const [generalComments, setGeneralComments] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 1500);
  };

  const validateStep = (targetStep) => {
    // only validate when moving forward
    if (targetStep <= step) return true;

    if (step === 0) {
      // playerHandle or company are optional — skip validation to keep flow quick
      return true;
    }
    if (step === 1) {
      return atmosphere && food && beer && service
        ? true
        : (alert("Please rate all required items."), false);
    }
    if (step === 2) {
      return uniqueness && appealFamilies && appealTourists && appealCouples
        ? true
        : (alert("Please complete all ratings for Arcade Vision."), false);
    }
    if (step === 3) {
      return havenImpression && synergy
        ? true
        : (alert("Please rate Haven impression and Pixel–Haven synergy."),
          false);
    }
    return true;
  };

  const goNext = () => {
    if (step < totalSteps - 1 && validateStep(step + 1)) {
      const next = step + 1;
      setStep(next);
      if (next > 0) showToast(`+${Math.round(100 / (totalSteps - 1))} XP!`);
    }
  };
  const goPrev = () => setStep((s) => Math.max(0, s - 1));
  // add near other state
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    // step 1
    setPlayerHandle("");
    setCompany("");

    // step 2 (eatery)
    setAtmosphere(null);
    setFood(null);
    setFavoriteItem("");
    setBeer(null);
    setMenuSuggestions("");
    setService(null);

    // step 3 (arcade)
    setUniqueness(null);
    setAppealFamilies(null);
    setAppealTourists(null);
    setAppealCouples(null);
    setGameSuggestions("");

    // step 4 (haven)
    setHavenImpression(null);
    setSynergy(null);
    setComplexSuggestions("");

    // step 5 (final)
    setGeneralComments("");

    // reset flow/progress
    setStep(0);
    setToast("");
  };

  const endpoint =
    "https://script.google.com/macros/s/AKfycbzqVNXsb8nOQPCIYZpv2CujK-7dJTtuAGd7DCgQvWioTAjk-mrg5-ynRtA2E3rstpFH/exec?key=xxx";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      playerHandle,
      company,
      eatery: {
        atmosphere,
        food,
        favoriteItem,
        beer,
        menuSuggestions,
        service,
      },
      arcade: {
        uniqueness,
        appeals: {
          families: appealFamilies,
          tourists: appealTourists,
          couples: appealCouples,
        },
        gameSuggestions,
      },
      haven: { havenImpression, synergy, complexSuggestions },
      generalComments,
    };

    try {
      setIsSubmitting(true);

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({ ok: res.ok }));
      if (!res.ok || data.ok === false) throw new Error(data.error || "Failed");

      // ✅ clear everything on success
      resetForm();
      showToast("Submitted! 🎉");
    } catch (err) {
      console.error(err);
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Pixel Event – Level Up & Launch</title>
        <meta
          name="description"
          content="Join us for Pixel's exclusive preview night at Haven Community Shopping Complex – games, food, drinks, and fun!"
        />
        <meta property="og:title" content="Pixel Event – Level Up & Launch" />
        <meta
          property="og:description"
          content="Games, dining, nightlife – experience the future of entertainment at Pixel in Koh Samui."
        />
        {/* <meta property="og:image" content="/path/to/share-image.jpg" /> */}
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <NavbarLaunch />
      <div className="min-h-screen flex flex-col items-center p-4">
        <AnimatedBackground />
        {/* inline safety for Tailwind CDN users */}

        {/* XP toast */}
        {toast && (
          <div
            className="fixed top-5 skew-x-[-12deg] rounded-lg right-5 z-[1000] px-5 py-3  text-slate-900 shadow-lg animate-fadeUp"
            style={{
              background: "linear-gradient(90deg, #a2dadd, #8a68ad)",
              fontFamily: '"Press Start 2P", cursive',
            }}
          >
            <span className=" inline-block">{toast}</span>
          </div>
        )}

        {/* Header */}
        <header className="w-full max-w-4xl mx-auto mb-12 z-20 text-center mt-10 md:mt-0">
          {/* <div className="flex items-center justify-center gap-2 md:gap-4 mb-4">
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
          </div> */}
          <EventHero />
          <h2 className="text-lg md:text-xl text-slate-400 font-semibold mt-4">
            Presents
          </h2>

          <h3
            style={{ fontFamily: '"Press Start 2P", cursive' }}
            className="text-3xl md:text-5xl font-bold mt-2 text-cyan-400"
          >
            <AnimatedText text="Level Up & Launch" />
          </h3>
        </header>

        <main className="w-full max-w-4xl mx-auto z-30 space-y-12">
          {/* Details */}
          <section className="p-6 bg-slate-900/60  z-20 sm:p-8  shadow-lg border-2 border-purple-400">
            <h4
              style={{ fontFamily: '"Press Start 2P", cursive' }}
              className="text-xl font-bold text-slate-100 mb-4"
            >
              WELCOME EVERYONE!
            </h4>
            <p className="text-slate-300 mb-4">
              Thank you for joining us for this exclusive preview of Pixel. We
              are thrilled to welcome you and showcase the future of
              entertainment, dining, and nightlife in Chaweng.
            </p>
            <div className="space-y-2">
              <p className="text-slate-200">
                <span className="font-bold text-cyan-400">Date:</span> Sunday,
                13th December 2025
              </p>
              <p className="text-slate-200">
                <span className="font-bold text-cyan-400">Time:</span> 1700
                onwards
              </p>
              <p className="text-slate-200">
                <span className="font-bold text-cyan-400 ">Location:</span>{" "}
                Pixel, Haven Community Shopping Complex, Chaweng, Koh Samui
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Haven+Community+Shopping+Complex+Chaweng"
              target="_blank"
              rel="noreferrer"
              className="bg-cyan-400 skew-x-[-12deg] rounded-lg hover:bg-purple-400 inline-block px-3 py-2 text-sm font-bold transition-colors duration-300 mt-5"
              style={{ fontFamily: '"Press Start 2P", cursive' }}
            >
              <span className="inline-block skew-x-[12deg] text-black">
                Get Directions
              </span>
            </a>
          </section>

          {/* Schedule */}
          {/* <section className="bg-slate-900/60 p-6 sm:p-8  shadow-lg border-2 border-purple-400">
            <h4
              className="text-xl font-bold text-slate-100 mb-4"
              style={{ fontFamily: '"Press Start 2P", cursive' }}
            >
              The Evening&apos;s Schedule
            </h4>
            <div className="relative pl-6 border-l-2 border-cyan-400/40">
              {[
                {
                  t: "6:00 PM - 6:30 PM: Game Start (Arrival & Welcome)",
                  d: "Enjoy welcome drinks, arcade-style nibbles, and a brief welcome speech.",
                },
                {
                  t: "6:30 PM - 7:00 PM: Group Tours & Tasting",
                  d: "Group A: Guided tour of the future Pixel arcade & Haven complex. Group B: In-depth tasting of Pixel's hot dogs and beer collection.",
                },
                {
                  t: "7:00 PM - 7:30 PM: Switch!",
                  d: "Groups swap to experience both tour and tasting.",
                },
                {
                  t: "7:30 PM - 8:00 PM: Victory Lap (Conclusion & Networking)",
                  d: "Final words, followed by open networking with the management teams.",
                },
              ].map((item, idx) => (
                <div key={idx} className="mb-6">
                  <div className="flex items-center text-cyan-400">
                    <span className="absolute -left-3.5 flex h-7 w-7 items-center justify-center  bg-slate-900 border-2 border-purple-400 font-bold">
                      {idx + 1}
                    </span>
                    <p className="font-semibold ml-4">{item.t}</p>
                  </div>
                  <p className="text-slate-400 ml-4 mt-2">{item.d}</p>
                </div>
              ))}
            </div>
          </section> */}

          {/* Press Kit */}
          <section className="bg-slate-900/60 p-6 sm:p-8 shadow-lg border-2 border-purple-400">
            <h4
              style={{ fontFamily: '"Press Start 2P", cursive' }}
              className="text-xl font-bold text-slate-100 mb-4"
            >
              Digital Press Kit
            </h4>
            <p className="text-slate-300 mb-4">
              All the resources you need to learn more about Pixel and Haven.
            </p>
            <div className="flex flex-col space-y-4">
              <a
                className="bg-cyan-400 skew-x-[-12deg] rounded-lg hover:bg-purple-400 inline-block px-3 py-2 text-sm font-bold transition-colors duration-300 mt-5"
                style={{ fontFamily: '"Press Start 2P", cursive' }}
                href="#"
              >
                <span className="inline-block skew-x-[12deg] text-black">
                  Download Pixel Press Release
                </span>
              </a>
              <a
                className="bg-cyan-400 skew-x-[-12deg] rounded-lg hover:bg-purple-400 inline-block px-3 py-2 text-sm font-bold transition-colors duration-300 mt-5"
                style={{ fontFamily: '"Press Start 2P", cursive' }}
                href="/pixel-media-kit.pdf"
                download
              >
                <span className="inline-block skew-x-[12deg] text-black">
                  Download Press Kit
                </span>
              </a>

              <a
                className="bg-cyan-400 skew-x-[-12deg] rounded-lg hover:bg-purple-400 inline-block px-3 py-2 text-sm font-bold transition-colors duration-300 mt-5"
                style={{ fontFamily: '"Press Start 2P", cursive' }}
                href="#"
              >
                <span className="inline-block skew-x-[12deg] text-black">
                  View High-Res Concept Art
                </span>
              </a>
            </div>
          </section>

          {/* Survey */}
          <section className="bg-slate-900/60 p-6 sm:p-8  shadow-lg border-2 border-purple-400">
            <h4
              style={{ fontFamily: '"Press Start 2P", cursive' }}
              className="text-xl font-bold text-slate-100 mb-6"
            >
              The Pixel XP Survey: Your Feedback Fuels Our XP!
            </h4>

            {/* Progress */}
            <div className="w-full h-8 bg-slate-800 skew-x-[-12deg] rounded-lg  mb-8 relative overflow-hidden">
              <div
                className="h-full  transition-all duration-500 ease-in-out"
                style={{
                  width: `${xp}%`,
                  background: "linear-gradient(90deg, #22d3ee, #8a68ad)",
                }}
              />
              <p
                style={{ fontFamily: '"Press Start 2P", cursive' }}
                className="absolute inset-0 text-center text-[10px] sm:text-xs font-bold text-slate-900 flex items-center justify-center"
              >
                <span className="skew-x-[12deg] inline-block">
                  XP: {xp}/100
                </span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* STEP 1 */}
              {step === 0 && (
                <div>
                  <h5
                    style={{ fontFamily: '"Press Start 2P", cursive' }}
                    className="text-lg font-bold text-slate-100 mb-2"
                  >
                    Level 1: Player Stats
                  </h5>
                  <p className="text-slate-400 mb-6">
                    Tell us about yourself to begin your quest.
                  </p>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-slate-300 mb-2">
                        Player Handle
                      </label>
                      <input
                        value={playerHandle}
                        onChange={(e) => setPlayerHandle(e.target.value)}
                        className="w-full px-4 py-3  bg-slate-800 text-slate-200 outline-none ring-2 ring-transparent focus:ring-cyan-400"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-2">
                        Guild / Company
                      </label>
                      <input
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full px-4 py-3  bg-slate-800 text-slate-200 outline-none ring-2 ring-transparent focus:ring-cyan-400"
                        placeholder="Awesome Hotels Inc."
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={goNext}
                    className="bg-cyan-400 hover:bg-purple-400 inline-block  text-black px-3 py-2 skew-x-[-12deg] rounded-lg text-sm font-bold transition-colors duration-300 mt-5 w-full"
                    style={{ fontFamily: '"Press Start 2P", cursive' }}
                  >
                    <span className=" skew-x-[12deg] inline-block">
                      {" "}
                      Next: The Eatery Quest
                    </span>
                  </button>
                </div>
              )}

              {/* STEP 2 */}
              {step === 1 && (
                <div>
                  <h5
                    style={{ fontFamily: '"Press Start 2P", cursive' }}
                    className="text-lg font-bold text-slate-100 mb-2"
                  >
                    Level 2: The Eatery Quest
                  </h5>
                  <p className="text-slate-400 mb-6">
                    Rate your experience of our food, drinks, and vibe.
                  </p>

                  <div className="space-y-6">
                    <div className="md:flex justify-between items-center">
                      <div>
                        <p className="text-slate-300 mb-2 font-semibold">
                          The Vibe & Atmosphere
                        </p>
                        <p className="text-xs text-slate-400 mb-2">
                          How well does the atmosphere capture the “high-energy
                          arcade”?
                        </p>
                      </div>
                      <RatingGroup
                        name="atmosphere"
                        value={atmosphere}
                        onChange={setAtmosphere}
                        ariaLabel="Atmosphere rating"
                      />
                    </div>

                    <div className="md:flex justify-between items-center">
                      <p className="text-slate-300 mb-2 font-semibold">
                        The Quality of Food & Nibbles
                      </p>
                      <RatingGroup
                        name="food"
                        value={food}
                        onChange={setFood}
                        ariaLabel="Food rating"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-2">
                        Which food item was your personal favorite, and why?
                      </label>
                      <textarea
                        rows={2}
                        value={favoriteItem}
                        onChange={(e) => setFavoriteItem(e.target.value)}
                        className="w-full px-4 py-3  bg-slate-800 text-slate-200 outline-none ring-2 ring-transparent focus:ring-cyan-400"
                        placeholder="I loved the Samui Spicy Dog because..."
                      />
                    </div>

                    <div className="md:flex justify-between items-center">
                      <div>
                        <p className="text-slate-300 mb-2 font-semibold">
                          Variety of Beer on Tap
                        </p>
                        <p className="text-xs text-slate-400 mb-2">
                          Does the variety feel unique for Koh Samui and meet
                          expectations?
                        </p>
                      </div>
                      <RatingGroup
                        name="beer"
                        value={beer}
                        onChange={setBeer}
                        ariaLabel="Beer variety rating"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-2">
                        What other dishes or drinks would you suggest?
                      </label>
                      <textarea
                        rows={2}
                        value={menuSuggestions}
                        onChange={(e) => setMenuSuggestions(e.target.value)}
                        className="w-full px-4 py-3  bg-slate-800 text-slate-200 outline-none ring-2 ring-transparent focus:ring-cyan-400"
                        placeholder="We should consider adding..."
                      />
                    </div>

                    <div className="md:flex justify-between items-center">
                      <p className="text-slate-300 mb-2 font-semibold">
                        Service & Staff Engagement
                      </p>
                      <RatingGroup
                        name="service"
                        value={service}
                        onChange={setService}
                        ariaLabel="Service rating"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button
                      type="button"
                      onClick={goPrev}
                      className="bg-slate-400 w-full skew-x-[-12deg] rounded-lg  hover:bg-purple-400 inline-block  text-black px-3 py-2 text-sm font-bold transition-colors duration-300 mt-5"
                      style={{ fontFamily: '"Press Start 2P", cursive' }}
                    >
                      <span className=" skew-x-[12deg] inline-block">Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      className="bg-cyan-400 hover:bg-purple-400 inline-block  text-black px-3 py-2 skew-x-[-12deg] rounded-lg text-sm font-bold transition-colors duration-300 w-full mt-5"
                      style={{ fontFamily: '"Press Start 2P", cursive' }}
                    >
                      <span className="skew-x-[12deg] inline-block">
                        Next: Arcade Vision
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 2 && (
                <div>
                  <h5
                    style={{ fontFamily: '"Press Start 2P", cursive' }}
                    className="text-lg font-bold text-slate-100 mb-2"
                  >
                    Level 3: The Arcade Vision
                  </h5>
                  <p className="text-slate-400 mb-6">
                    Based on the concept art and discussion, how do you see the
                    future arcade?
                  </p>

                  <div className="space-y-6">
                    <div className="md:flex justify-between items-center">
                      <p className="text-slate-300 mb-2 font-semibold">
                        Uniqueness of the Pixel Arcade Concept
                      </p>
                      <RatingGroup
                        name="uniqueness"
                        value={uniqueness}
                        onChange={setUniqueness}
                        ariaLabel="Uniqueness rating"
                      />
                    </div>

                    <div>
                      <p className="text-slate-300 mb-2 font-semibold">
                        Appeal to Target Demographics
                      </p>
                      <div className="space-y-3 mt-3">
                        <div className="flex items-center gap-3">
                          <span className="w-28 text-slate-300 text-xs sm:text-sm">
                            Families
                          </span>
                          <RatingGroup
                            name="families"
                            value={appealFamilies}
                            onChange={setAppealFamilies}
                            ariaLabel="Appeal to families rating"
                          />
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="w-28 text-slate-300 text-xs sm:text-sm">
                            Tourists
                          </span>
                          <RatingGroup
                            name="tourists"
                            value={appealTourists}
                            onChange={setAppealTourists}
                            ariaLabel="Appeal to tourists rating"
                          />
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="w-28 text-slate-300 text-xs sm:text-sm">
                            Couples
                          </span>
                          <RatingGroup
                            name="couples"
                            value={appealCouples}
                            onChange={setAppealCouples}
                            ariaLabel="Appeal to couples rating"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-2">
                        What specific games or types of games are most
                        appealing?
                      </label>
                      <textarea
                        rows={2}
                        value={gameSuggestions}
                        onChange={(e) => setGameSuggestions(e.target.value)}
                        className="w-full px-4 py-3  bg-slate-800 text-slate-200 outline-none ring-2 ring-transparent focus:ring-cyan-400"
                        placeholder="Leaderboards, VR, rhythm games…"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button
                      type="button"
                      onClick={goPrev}
                      className="bg-slate-400 skew-x-[-12deg] rounded-lg hover:bg-purple-400 inline-block  text-black px-3 py-2 text-sm font-bold transition-colors duration-300 w-full mt-5"
                      style={{ fontFamily: '"Press Start 2P", cursive' }}
                    >
                      <span className="skew-x-[12deg] inline-block">Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      className="bg-cyan-400 hover:bg-purple-400 inline-block  text-black px-3 py-2 text-sm skew-x-[-12deg] rounded-lg font-bold transition-colors duration-300 w-full mt-5"
                      style={{ fontFamily: '"Press Start 2P", cursive' }}
                    >
                      <span className="skew-x-[12deg] inline-block">
                        Next: Haven Exploration
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4 */}
              {step === 3 && (
                <div>
                  <h5
                    style={{ fontFamily: '"Press Start 2P", cursive' }}
                    className="text-lg font-bold text-slate-100 mb-2"
                  >
                    Level 4: The Haven Complex
                  </h5>
                  <p className="text-slate-400 mb-6">
                    How does the Haven Community Shopping Complex impress you?
                  </p>

                  <div className="space-y-6">
                    <div className="md:flex justify-between items-center">
                      <p className="text-slate-300 mb-2 font-semibold">
                        Overall Impression of Haven
                      </p>
                      <RatingGroup
                        name="havenImpression"
                        value={havenImpression}
                        onChange={setHavenImpression}
                        ariaLabel="Haven impression rating"
                      />
                    </div>

                    <div className="md:flex justify-between items-center">
                      <p className="text-slate-300 mb-2 font-semibold">
                        Synergy between Pixel & Haven
                      </p>
                      <RatingGroup
                        name="synergy"
                        value={synergy}
                        onChange={setSynergy}
                        ariaLabel="Synergy rating"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-2">
                        What aspects of Haven will appeal most to tourists?
                      </label>
                      <textarea
                        rows={2}
                        value={complexSuggestions}
                        onChange={(e) => setComplexSuggestions(e.target.value)}
                        className="w-full px-4 py-3  bg-slate-800 text-slate-200 outline-none ring-2 ring-transparent focus:ring-cyan-400"
                        placeholder="Dining variety, nightlife, walkability…"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button
                      type="button"
                      onClick={goPrev}
                      className="bg-slate-400 hover:bg-purple-400 inline-block  text-black px-3 py-2 skew-x-[-12deg] rounded-lg text-sm font-bold transition-colors duration-300 w-full mt-5"
                      style={{ fontFamily: '"Press Start 2P", cursive' }}
                    >
                      <span className="skew-x-[12deg] inline-block">Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      className="bg-cyan-400 hover:bg-purple-400 inline-block  text-black px-3 py-2 text-sm skew-x-[-12deg] rounded-lg font-bold transition-colors duration-300 w-full mt-5"
                      style={{ fontFamily: '"Press Start 2P", cursive' }}
                    >
                      <span className="skew-x-[12deg] inline-block">
                        Next: Final Boss
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 5 */}
              {step === 4 && (
                <div>
                  <h5
                    style={{ fontFamily: '"Press Start 2P", cursive' }}
                    className="text-lg font-bold text-slate-100 mb-2"
                  >
                    Level 5: Final Boss
                  </h5>
                  <p className="text-slate-400 mb-6">
                    You&apos;ve reached the final stage! Leave your victory
                    comments below.
                  </p>

                  <div>
                    <label className="block text-slate-300 mb-2">
                      Any final comments to help us on our quest?
                    </label>
                    <textarea
                      rows={4}
                      value={generalComments}
                      onChange={(e) => setGeneralComments(e.target.value)}
                      className="w-full px-4 py-3  bg-slate-800 text-slate-200 outline-none ring-2 ring-transparent focus:ring-cyan-400"
                      placeholder="Your thoughts here..."
                    />
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button
                      type="button"
                      onClick={goPrev}
                      className="bg-slate-400 hover:bg-purple-400 inline-block  text-black px-3 py-2 text-sm skew-x-[-12deg] rounded-lg font-bold transition-colors duration-300 w-full mt-5"
                      style={{ fontFamily: '"Press Start 2P", cursive' }}
                    >
                      <span className="skew-x-[12deg] inline-block">Back</span>
                    </button>
                    <button
                      type="submit"
                      className="bg-cyan-400 hover:bg-purple-400 inline-block  text-black px-3 py-2 text-sm font-bold transition-colors duration-300 skew-x-[-12deg] rounded-lg w-full mt-5"
                      style={{ fontFamily: '"Press Start 2P", cursive' }}
                    >
                      <span className="skew-x-[12deg] inline-block">
                        Submit & Claim Your Legendary Loot!
                      </span>
                    </button>
                  </div>

                  <p className="text-center text-xs text-slate-400 mt-6">
                    Victory! Your Pixel Access Card has been upgraded. Bonus
                    tokens await on opening night!
                  </p>
                </div>
              )}
            </form>
          </section>
        </main>

        {/* Footer */}
        <footer className="w-full z-20 max-w-4xl mx-auto text-center mt-12 p-4 border-t border-slate-700">
          <p className="text-slate-400">
            Don&apos;t forget to hold on to your Pixel Access Card! It&apos;s
            your ticket to a complimentary starter pack of tokens on our grand
            arcade opening night.
          </p>
          <p className="text-[10px] sm:text-xs text-slate-500 mt-4">
            &copy; 2025 Pixel &amp; Haven. All Rights Reserved.
          </p>
        </footer>

        {/* tiny animation keyframes for the toast */}
        <style>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(8px); }
          20% { opacity: 1; transform: translateY(0); }
          80% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-6px); }
        }
        .animate-fadeUp { animation: fadeUp 1.5s ease forwards; }
      `}</style>
      </div>
    </>
  );
}
