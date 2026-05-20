"use client";

import { Archivo_Black, Space_Mono } from "next/font/google";
import { ArrowRight, Users, AlertTriangle, Download } from "lucide-react";

import { getCount } from "@/app/actions";
import { useEffect, useState } from "react";

const archivo = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
});

const mono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function CTABanner() {
  const [userCount, setUserCount] = useState(71);

  useEffect(() => {
    getCount().then((count) => {
      setUserCount(count);
    });
  }, []);

  return (
    <section className="relative mx-4 md:mx-[14px] mb-[14px] mt-24">
      {/* --- MAIN CARD CONTAINER --- */}
      <div
        className="
        relative w-full
        bg-[#D2F843]
        border-4 border-black
        shadow-[8px_8px_0px_0px_#000] md:shadow-[12px_12px_0px_0px_#000]
        overflow-hidden
        flex flex-col md:flex-row
      "
      >
        {/* Hazard Background */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, #000 0, #000 2px, transparent 2px, transparent 12px)",
          }}
        />

        {/* LEFT COLUMN */}
        <div className="flex-1 p-8 md:p-16 flex flex-col justify-center relative z-10">
          {/* Top Label */}
          <div
            className={`flex items-center gap-2 mb-6 text-black font-bold uppercase tracking-widest text-xs md:text-sm ${mono.className}`}
          >
            <AlertTriangle size={16} strokeWidth={3} />
            <span>Download Access</span>
          </div>

          {/* Headline */}
          <h2
            className={`text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-[0.85] tracking-tighter text-black mb-6 ${archivo.className}`}
          >
            START <br />
            <span
              className="text-white drop-shadow-[4px_4px_0px_#000]"
              style={{ WebkitTextStroke: "2px black" }}
            >
              LEARNING
            </span>
          </h2>

          {/* Subtext */}
          <p
            className={`text-base md:text-xl font-bold text-black/90 max-w-lg leading-relaxed ${mono.className}`}
          >
            Your semester survival kit is now live.
            <br />
            <span className="bg-black text-[#D2F843] px-1">
              Join {userCount}+ students
            </span>{" "}
            already using KLAZ.
          </p>
        </div>

        {/* RIGHT COLUMN */}
        <div
          className="
            w-full md:w-1/3
            bg-black text-white
            p-8 md:p-12
            flex flex-col justify-center items-center gap-8
            border-t-4 md:border-t-0 md:border-l-4 border-black
            relative
        "
        >
          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          {/* Download Card */}
          <div className="bg-white text-black p-4 rotate-3 shadow-[4px_4px_0px_0px_#333] border-2 border-dashed border-gray-400 w-full max-w-[280px]">
            <div
              className={`flex justify-between items-center text-xs font-bold uppercase ${mono.className} text-gray-500 mb-2`}
            >
              <span>APP_ID: KLAZ</span>
              <span>ANDROID</span>
            </div>

            <div
              className={`text-2xl font-black uppercase ${archivo.className}`}
            >
              DOWNLOAD ACCESS
            </div>
          </div>

          {/* DOWNLOAD BUTTON */}
          <a
            href="https://play.google.com/store/apps/details?id=com.rvoa.klaz"
            target="_blank"
            rel="noopener noreferrer"
            className="
              w-full max-w-[280px] group
              bg-[#D2F843] text-black
              text-xl font-black uppercase tracking-tight
              py-4 px-6
              border-4 border-transparent
              shadow-[4px_4px_0px_0px_#fff]

              hover:bg-white hover:scale-105 hover:shadow-[6px_6px_0px_0px_#D2F843] hover:rotate-1
              active:scale-95 active:shadow-none active:rotate-0

              transition-all duration-150 ease-out
              flex items-center justify-center gap-3 relative z-10
            "
          >
            <Download
              strokeWidth={3}
              className="group-hover:translate-y-1 transition-transform"
            />

            <span>Download App</span>

            <ArrowRight
              strokeWidth={4}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>

          {/* Social Proof */}
          <div
            className={`flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest ${mono.className}`}
          >
            <Users size={14} />
            <span>Students downloading now...</span>
          </div>
        </div>
      </div>

      {/* STICKER */}
      <div className="absolute -top-6 left-8 md:left-16 rotate-[-6deg] z-20">
        <div className="bg-[#FF90E8] border-4 border-black px-4 py-2 shadow-[4px_4px_0px_0px_#000]">
          <span
            className={`text-sm md:text-lg font-black uppercase text-black ${archivo.className}`}
          >
            START FOR FREE
          </span>
        </div>
      </div>
    </section>
  );
}
