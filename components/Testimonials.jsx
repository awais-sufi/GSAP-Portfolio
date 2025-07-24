"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

gsap.registerPlugin(Draggable);

const testimonials = [
  {
    name: "Emily R.",
    role: "Product Manager, TechSoft",
    quote: "Amazing work! Highly recommended.",
    avatar: "https://i.pravatar.cc/100?img=1",
    rating: 5,
  },
  {
    name: "Jason M.",
    role: "CEO, StartupHub",
    quote: "Very professional and detail-oriented.",
    avatar: "https://i.pravatar.cc/100?img=2",
    rating: 4,
  },
  {
    name: "Sophia L.",
    role: "Design Lead, CreativeCo",
    quote: "Stellar communication and skills.",
    avatar: "https://i.pravatar.cc/100?img=3",
    rating: 5,
  },
  {
    name: "David K.",
    role: "Marketing Director, BrandBoost",
    quote: "Exceeded all expectations. Fantastic!",
    avatar: "https://i.pravatar.cc/100?img=4",
    rating: 5,
  },
  {
    name: "Olivia P.",
    role: "Founder, InnovateX",
    quote: "A true partner in success. Highly recommend.",
    avatar: "https://i.pravatar.cc/100?img=5",
    rating: 5,
  },
];

export default function Testimonials() {
  const carouselRef = useRef(null);
  const wrapperRef = useRef(null);
  const titleRef = useRef(null);

  const cardWidth = 400;
  const gap = 32;
  const totalCardWidth = cardWidth + gap;

  useLayoutEffect(() => {
    const container = carouselRef.current;
    const wrapper = wrapperRef.current;
    const title = titleRef.current;

    if (container && wrapper) {
      const contentWidth = container.scrollWidth;
      const viewWidth = wrapper.offsetWidth;

      const draggable = Draggable.create(container, {
        type: "x",
        bounds: { minX: -(contentWidth - viewWidth), maxX: 0 },
        inertia: true,
        edgeResistance: 0.85,
        cursor: "grab",
        activeCursor: "grabbing",
      });

      return () => {
        draggable[0]?.kill();
      };
    }

    if (title) {
      gsap.fromTo(
        title,
        { opacity: 0, y: -40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
        }
      );
    }
  }, []);

  return (
    <section className="min-h-screen py-20 px-4 md:px-10 flex flex-col items-center text-neutral-900 font-inter">
      <h2
        ref={titleRef}
        className="text-xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent"
      >
        <span className="text-xl sm:text-2xl font-semibold text-white">
          TESTIMONIALS
        </span>
        <br />
        <span className="text-5xl sm:text-6xl font-extrabold">
          Word on the street about me
        </span>
      </h2>

      <div
        ref={wrapperRef}
        className="relative w-full max-w-6xl overflow-hidden"
      >
        <div
          ref={carouselRef}
          className="flex gap-8"
          style={{
            width: `${testimonials.length * totalCardWidth}px`,
          }}
        >
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="min-w-[300px] md:min-w-[400px] p-6 rounded-3xl border border-white/10 backdrop-blur-md transition-transform duration-300 hover:scale-[1.02] flex-shrink-0"
              style={{ backgroundColor: "transparent" }}
            >
              <div className="flex items-center mb-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover mr-4"
                />
                <div>
                  <motion.p
                    initial={{ opacity: 0, y: 20, color: "#aaa" }}
                    animate={{ opacity: 1, y: 0, color: "#ffffff" }}
                    transition={{ delay: 0.2 * index, duration: 0.6 }}
                    className="font-semibold text-lg"
                  >
                    {t.name}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20, color: "#888" }}
                    animate={{ opacity: 1, y: 0, color: "#cccccc" }}
                    transition={{ delay: 0.25 * index, duration: 0.6 }}
                    className="text-sm"
                  >
                    {t.role}
                  </motion.p>
                </div>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 20, color: "#aaa" }}
                animate={{ opacity: 1, y: 0, color: "#f3f3f3" }}
                transition={{ delay: 0.3 * index, duration: 0.6 }}
                className="italic text-lg mb-4"
              >
                &ldquo;{t.quote}&rdquo;
              </motion.p>
              <div className="flex space-x-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar
                    key={i}
                    className={`${
                      i < t.rating ? "text-yellow-500" : "text-gray-300"
                    } text-xl`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
