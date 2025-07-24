"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

// Icons
import { FaBrain, FaUsers, FaBook, FaHeart } from "react-icons/fa";

export default function AboutPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(
        ".content-card, .lottie-card, .tech-badges-card"
      );

      gsap.set(cards, { opacity: 0, y: 30 });

      gsap.to(cards, {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });

      // Animate tech badges individually
      const badges = gsap.utils.toArray(".tech-badge");
      gsap.set(badges, { opacity: 0, y: 20, scale: 0.95 });

      gsap.to(badges, {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.08,
        delay: 0.8,
        duration: 0.6,
        ease: "power2.out",
      });

      badges.forEach((badge) => {
        const tl = gsap.timeline({ paused: true });
        tl.to(badge, {
          scale: 1.1,
          boxShadow: "0px 0px 12px rgba(255,255,255,0.2)",
          duration: 0.3,
          ease: "power1.out",
        });

        const onEnter = () => tl.play();
        const onLeave = () => tl.reverse();

        badge.addEventListener("mouseenter", onEnter);
        badge.addEventListener("mouseleave", onLeave);

        return () => {
          badge.removeEventListener("mouseenter", onEnter);
          badge.removeEventListener("mouseleave", onLeave);
        };
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const tiles = [
    {
      title: "About Me",
      content:
        "Creative Full-Stack Developer crafting animated UIs with Next.js, and GSAP, backed by scalable Node.js and API-driven architectures..",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Philosophy",
      content:
        "For me, the web is a canvas for interaction, motion, and storytelling—crafted to feel alive and immersive.",
      color: "from-cyan-500 to-blue-500",
    },
    {
      title: "Experience",
      content:
        "Experienced Full-Stack Developer with 5+ years crafting high-performance, interactive web applications.",
      color: "from-emerald-500 to-teal-400",
    },
    {
      title: "Stack",
      content:
        "React, Next.js, Node.js, Express.js, GSAP, Tailwind CSS, TypeScript and more.",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  const values = [
    { label: "Problem Solver", icon: FaBrain, color: "text-purple-400" },
    { label: "Team Player", icon: FaUsers, color: "text-cyan-400" },
    { label: "Lifelong Learner", icon: FaBook, color: "text-emerald-400" },
    { label: "Empathetic", icon: FaHeart, color: "text-pink-400" },
  ];

  return (
    <section className="min-h-screen w-full px-6 md:px-20 py-24 bg-transparent text-white">
      <div
        ref={containerRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {tiles.map((tile, idx) => (
          <div
            key={idx}
            className="group content-card p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-lg transition-all duration-300 shadow-md cursor-pointer"
          >
            <h3
              className={`text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r ${tile.color}`}
            >
              {tile.title}
            </h3>
            <p className="text-white/80 text-sm leading-relaxed">
              {tile.content}
            </p>
          </div>
        ))}

        {/* Lottie Card 1 */}
        <div className="group lottie-card content-card col-span-1 sm:col-span-2 lg:col-span-2 p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-lg transition-all duration-300 shadow-md cursor-pointer">
          <div className="flex flex-col items-center justify-center h-full">
            <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              Web animation is my passion.
            </h3>
            <iframe
              src="https://lottie.host/embed/c685d801-c945-45f9-81f4-f3f43d7555f0/UQKcr7lhQL.lottie"
              title="Lottie animation showcasing web animation passion"
              className="w-48 h-48 rounded-xl border border-white/10 shadow-xl"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>

        {/* Lottie Card 2 */}
        <div className="group lottie-card content-card col-span-1 sm:col-span-2 lg:col-span-2 p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-lg transition-all duration-300 shadow-md cursor-pointer">
          <div className="flex flex-col items-center justify-center h-full">
            <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
              Speed. Precision. Delight.
            </h3>
            <lottie-player
              src="https://assets10.lottiefiles.com/packages/lf20_bpqri9y8.json"
              background="transparent"
              speed="1"
              style={{ width: "192px", height: "192px" }}
              loop
              autoplay
              hover
            ></lottie-player>
          </div>
        </div>

        {/* Tech badges section */}
        <div className="tech-badges-card col-span-1 sm:col-span-2 lg:col-span-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-8 flex flex-wrap justify-center gap-4 backdrop-blur-lg shadow-md content-card">
          {values.map((trait, idx) => {
            const Icon = trait.icon;
            return (
              <div
                key={idx}
                className="tech-badge flex items-center space-x-2 px-4 py-2 bg-gradient-to-br from-white/10 to-black/30 rounded-full border border-white/10 shadow-md transition"
              >
                <Icon size={20} className={`${trait.color}`} />
                <span className={`text-sm font-medium ${trait.color}`}>
                  {trait.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
