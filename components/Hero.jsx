"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ExternalLink } from "lucide-react"; // Icon added here
import Link from "next/link";

export default function Hero() {
  const titleRef = useRef(null);
  const buttonRef = useRef(null);
  const [typedText, setTypedText] = useState("");

  const fullText =
    `I'm <span class='text-pink-500 font-semibold'>Awais Ali</span> — ` +
    `a full-stack developer crafting seamless user experiences with the ` +
    `<span class='text-green-400 font-semibold'>MERN </span> stack and building ` +
    `high-performance mobile apps using <span class='text-blue-400 font-semibold'>React Native</span>.`;

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

    tl.fromTo(
      titleRef.current,
      { x: -120, opacity: 0 },
      { x: 0, opacity: 1 }
    ).fromTo(
      buttonRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1 },
      "-=0.6"
    );

    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 25);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center bg-transparent px-6 text-center">
      <div className="max-w-4xl space-y-8">
        <h1
          ref={titleRef}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text"
        >
          Transforming Ideas into <br />
          Stunning Digital Realities
        </h1>

        <p
          className="text-lg text-gray-300 max-w-xl mx-auto leading-relaxed"
          dangerouslySetInnerHTML={{
            __html:
              typedText +
              "<span class='text-white animate-pulse ml-1'>|</span>",
          }}
        />

        <a
          href="https://drive.google.com/file/d/1IrAmaGfWkPp5Ldq9EyPo-In9_qKzazR8/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-base font-semibold px-6 py-3 rounded-lg border border-pink-500 text-pink-400 hover:text-white hover:bg-pink-500 transition duration-300 transform hover:-translate-y-1 hover:shadow-lg cursor-pointer"
        >
          View <span className="text-white font-bold">Resume</span>
          <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </a>
      </div>
    </section>
  );
}
