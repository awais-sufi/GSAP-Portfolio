"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Mail, Linkedin, Github, Send } from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const headingRef = useRef(null);
  const contactSectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
      });

      gsap.to(headingRef.current, {
        backgroundPosition: "200% center",
        duration: 8,
        repeat: -1,
        ease: "linear",
      });

      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 40,
            rotateX: -15,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            delay: i * 0.2,
            duration: 0.8,
            ease: "back.out(1.7)",
          }
        );
      });
    }, contactSectionRef);

    return () => ctx.revert();
  }, []);

  const contactItems = [
    {
      icon: <Mail size={32} />,
      title: "Email Me",
      desc: "Reach out anytime and I’ll get back within 24 hours.",
      action: "mailto:awais6javaid@gmail.com",
    },
    {
      icon: <Linkedin size={32} />,
      title: "LinkedIn",
      desc: "Let’s connect professionally and talk opportunities.",
      action: "https://www.linkedin.com/in/awaisjavaid",
    },
    {
      icon: <Github size={32} />,
      title: "GitHub",
      desc: "Explore my work, open source projects, and contributions.",
      action: "https://github.com/awaisjavaid",
    },
  ];

  return (
    <section
      ref={contactSectionRef}
      className="relative min-h-screen px-6 py-24 flex flex-col items-center justify-center text-neutral-900"
    >
      <h2
        ref={headingRef}
        className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-fuchsia-500 via-orange-400 to-yellow-500 text-transparent bg-clip-text bg-[length:200%_auto]"
      >
        Let’s Build Something Great Together
      </h2>

      <div
        ref={containerRef}
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl"
      >
        {contactItems.map((item, i) => (
          <a
            key={item.title}
            ref={(el) => (cardsRef.current[i] = el)}
            href={item.action}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-2xl shadow-xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full bg-gradient-to-br from-indigo-200 to-pink-200 group-hover:from-indigo-300 group-hover:to-pink-300 text-indigo-700 transition-all duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-indigo-700 group-hover:text-pink-600 transition-colors">
                {item.title}
              </h3>
            </div>
            <p className="text-neutral-200 text-sm group-hover:text-white transition-colors">
              {item.desc}
            </p>
          </a>
        ))}
      </div>

      <motion.a
        href="mailto:awais6javaid@gmail.com"
        whileHover={{ scale: 1.08, rotate: -2 }}
        whileTap={{ scale: 0.95 }}
        className="mt-20 inline-flex items-center gap-3 px-7 py-4 bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-pink-600 hover:to-yellow-500 text-white text-lg font-semibold rounded-full transition-all duration-300 shadow-2xl"
      >
        <Send size={20} /> Get in Touch
      </motion.a>
    </section>
  );
};

export default Contact;
