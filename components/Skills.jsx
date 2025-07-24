"use client";

import { useRef, useEffect } from "react";
import {
  FaReact,
  FaJs,
  FaNode,
  FaCss3Alt,
  FaHtml5,
  FaGitAlt,
  FaGithub,
  FaFigma,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiMongodb,
  SiFirebase,
  SiRedux,
  SiVite,
  SiBootstrap,
  SiExpress,
  SiExpo,
} from "react-icons/si";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    name: "HTML5",
    icon: <FaHtml5 className="text-orange-500 drop-shadow" />,
    color: "text-orange-400",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    name: "CSS3",
    icon: <FaCss3Alt className="text-blue-500 drop-shadow" />,
    color: "text-blue-400",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  {
    name: "JavaScript",
    icon: <FaJs className="text-yellow-400 drop-shadow" />,
    color: "text-yellow-300",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    name: "React",
    icon: <FaReact className="text-cyan-400 drop-shadow" />,
    color: "text-cyan-300",
    url: "https://reactjs.org/",
  },
  {
    name: "Next.js",
    icon: <SiNextdotjs className="text-white drop-shadow" />,
    color: "text-gray-200",
    url: "https://nextjs.org/",
  },
  {
    name: "TypeScript",
    icon: <SiTypescript className="text-blue-400 drop-shadow" />,
    color: "text-blue-300",
    url: "https://www.typescriptlang.org/",
  },
  {
    name: "Figma",
    icon: <FaFigma className="text-pink-500 drop-shadow" />,
    color: "text-pink-400",
    url: "https://figma.com/",
  },
  {
    name: "Bootstrap",
    icon: <SiBootstrap className="text-purple-500 drop-shadow" />,
    color: "text-purple-300",
    url: "https://getbootstrap.com/",
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss className="text-teal-400 drop-shadow" />,
    color: "text-teal-300",
    url: "https://tailwindcss.com/",
  },
  {
    name: "Node.js",
    icon: <FaNode className="text-green-500 drop-shadow" />,
    color: "text-green-400",
    url: "https://nodejs.org/",
  },
  {
    name: "Express",
    icon: <SiExpress className="text-white drop-shadow" />,
    color: "text-gray-200",
    url: "https://expressjs.com/",
  },
  {
    name: "MongoDB",
    icon: <SiMongodb className="text-green-600 drop-shadow" />,
    color: "text-green-500",
    url: "https://www.mongodb.com/",
  },
  {
    name: "Expo",
    icon: <SiExpo className="text-white drop-shadow" />,
    color: "text-gray-100",
    url: "https://expo.dev/",
  },
  {
    name: "Git",
    icon: <FaGitAlt className="text-red-500 drop-shadow" />,
    color: "text-red-400",
    url: "https://git-scm.com/",
  },
  {
    name: "GitHub",
    icon: <FaGithub className="text-white drop-shadow" />,
    color: "text-gray-100",
    url: "https://github.com/",
  },
  {
    name: "Firebase",
    icon: <SiFirebase className="text-yellow-400 drop-shadow" />,
    color: "text-yellow-300",
    url: "https://firebase.google.com/",
  },
  {
    name: "Redux",
    icon: <SiRedux className="text-purple-400 drop-shadow" />,
    color: "text-purple-300",
    url: "https://redux.js.org/",
  },
  {
    name: "Vite",
    icon: <SiVite className="text-purple-500 drop-shadow" />,
    color: "text-purple-300",
    url: "https://vitejs.dev/",
  },
];

export default function SkillIcons() {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const textRef = useRef(null);
  const sauceRef = useRef(null);

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-triggered heading animation
      gsap.from(textRef.current, {
        opacity: 0,
        y: -60,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        },
      });

      // Card entrance animation
      gsap.set(cardRefs.current, { opacity: 0, y: 50, scale: 0.8 });
      gsap.to(cardRefs.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      });

      // Rainbow glow loop for "Sauce"
      gsap.to(sauceRef.current, {
        textShadow: "0 0 2px #ffffaa, 0 0 4px #ccffcc",
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });

      // Hover animation for icons
      cardRefs.current.forEach((el) => {
        const tl = gsap.timeline({ paused: true });
        tl.to(el, {
          scale: 1.1,
          rotateY: 10,
          boxShadow: "0 0 30px rgba(255,255,255,0.3)",
          duration: 0.4,
          ease: "power2.out",
        });

        const onEnter = () => tl.play();
        const onLeave = () => tl.reverse();

        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);

        el._onEnter = onEnter;
        el._onLeave = onLeave;
      });
    }, containerRef);

    return () => {
      cardRefs.current.forEach((el) => {
        if (el?._onEnter && el?._onLeave) {
          el.removeEventListener("mouseenter", el._onEnter);
          el.removeEventListener("mouseleave", el._onLeave);
        }
      });
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen text-white p-10 flex flex-col items-center z-10"
    >
      <h2
        ref={textRef}
        className="text-center mb-12 tracking-tight drop-shadow-md"
      >
        <span className="text-xl sm:text-2xl font-semibold text-white block">
          MY SKILLS
        </span>
        <span className="text-5xl sm:text-6xl font-extrabold text-white">
          The Secret{" "}
          <span
            ref={sauceRef}
            className="glow-text hover:glow-hover bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text animate-gradient"
          >
            Sauce
          </span>
        </span>
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 z-20">
        {skills.map((skill, idx) => (
          <a
            key={idx}
            href={skill.url}
            target="_blank"
            rel="noopener noreferrer"
            ref={addToRefs}
            className="rounded-2xl bg-black/80 backdrop-blur-md p-6 shadow-lg transition-transform duration-300 flex flex-col items-center hover:cursor-pointer"
          >
            <div className="text-5xl mb-3">{skill.icon}</div>
            <p
              className={`text-sm font-semibold tracking-wide text-center ${skill.color}`}
            >
              {skill.name}
            </p>
          </a>
        ))}
      </div>

      {/* Rainbow glow & hover styles */}
      <style jsx>{`
        .glow-text {
          transition: text-shadow 0.3s ease-in-out;
        }
        .hover\\:glow-hover:hover {
          text-shadow: 0 0 10px #fff, 0 0 20px #ff00cc, 0 0 30px #33ccff;
        }
      `}</style>
    </section>
  );
}
