"use client";

import { useRef, useEffect } from "react";
import { FaLaptopCode } from "react-icons/fa";
import gsap from "gsap";

export default function Projects() {
  const cardRefs = useRef([]);
  const containerRef = useRef(null);
  const titleGradientRefs = useRef([]); // New ref for titles
  const descGradientRefs = useRef([]); // New ref for descriptions
  const headingRef = useRef(null);

  const projects = [
    {
      title: "Property-Pulse",
      desc: "Find your perfect rental property with Property Pulse, the leading platform for real estate listings and property management.",
      url: "https://property-pulse-nextjs-seven.vercel.app/",
    },
    {
      title: "Halal-Way",
      desc: "I believe in building a relationship that aligns with Islamic values — with mutual respect, clear intentions, and the goal of marriage (nikah). I value honesty, commitment, and family involvement to keep things halal",
      url: "https://halal-way.vercel.app/",
    },
    {
      title: "Rent-Cars",
      desc: "Find, book and rent a car Easily",
      url: "https://rent-cars-in-react.vercel.app/",
    },
    {
      title: "German-Care-Brigee",
      desc: "Empowerment Through Employment: Launch Your Career in Germany",
      url: "https://german-care-brigee.vercel.app/",
    },
  ];

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  const addToGradientRefs = (el, type) => {
    if (el) {
      if (type === "title" && !titleGradientRefs.current.includes(el)) {
        titleGradientRefs.current.push(el);
      } else if (
        type === "description" &&
        !descGradientRefs.current.includes(el)
      ) {
        descGradientRefs.current.push(el);
      }
    }
  };

  gsap.fromTo(
    headingRef.current,
    {
      opacity: 0,
      y: -50,
      scale: 0.8,
      rotateX: 30,
      transformOrigin: "center",
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      duration: 1.5,
      ease: "expo.out",
      delay: 0.2,
    }
  );

  // Optional: add a subtle repeating shimmer effect
  gsap.to(headingRef.current, {
    backgroundPosition: "200% center",
    duration: 4,
    ease: "linear",
    repeat: -1,
    backgroundSize: "200% 200%",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(cardRefs.current, { opacity: 0, y: 30 });

      gsap.to(cardRefs.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Hover effects
      cardRefs.current.forEach((card) => {
        const tl = gsap.timeline({ paused: true });
        tl.to(card, {
          scale: 1.03,
          y: -5,
          duration: 0.25,
          ease: "power1.out",
        });

        const onEnter = () => tl.play();
        const onLeave = () => tl.reverse();

        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);

        return () => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
        };
      });

      // Animate gradient movement for titles
      gsap.fromTo(
        titleGradientRefs.current,
        { backgroundPosition: "0% 50%" },
        {
          backgroundPosition: "100% 50%",
          duration: 4,
          ease: "linear",
          repeat: -1,
          yoyo: true,
        }
      );

      // Animate gradient movement for descriptions with different colors
      gsap.fromTo(
        descGradientRefs.current,
        { backgroundPosition: "0% 50%" },
        {
          backgroundPosition: "100% 50%",
          duration: 5, // Slightly different duration for variety
          ease: "linear",
          repeat: -1,
          yoyo: true,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="min-h-screen py-24 px-6 md:px-20">
      <div className="max-w-6xl mx-auto" ref={containerRef}>
        <h2
          ref={headingRef}
          className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-[length:200%_200%]"
        >
          Featured Projects
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
          {projects.map((project, i) => (
            <div
              key={i}
              ref={addToRefs}
              className="cursor-pointer p-8 rounded-2xl border border-neutral-200 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <FaLaptopCode className="text-neutral-700 text-2xl" />
                <h3
                  ref={(el) => addToGradientRefs(el, "title")} // Assign to titleGradientRefs
                  className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-[length:200%_200%]"
                >
                  {project.title}
                </h3>
              </div>
              <p
                ref={(el) => addToGradientRefs(el, "description")} // Assign to descGradientRefs
                className="text-sm leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-green-400 to-teal-400 bg-[length:200%_200%] mb-4"
              >
                {project.desc}
              </p>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm font-medium text-blue-600 hover:underline"
              >
                View Project →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
