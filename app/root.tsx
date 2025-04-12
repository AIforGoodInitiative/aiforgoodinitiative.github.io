import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import "./tailwind.css";
import "./global.css"
import { motion } from "framer-motion";
import React from "react";

const TEXT = "INIT";
const FONT_CLASS = "font-mono";
const TEXT_SIZE = "text-[25vw] sm:text-[30vw] md:text-[35vw] lg:text-[40vw]";
const JITTER_AMOUNT = 3;
const FLICKER_SPEED = 0.06;

export function HydrateFallback() {
  const noiseVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: [1, 0],
      transition: {
        duration: 0.05,
        repeat: Infinity,
        times: [0, 1],
        ease: "linear",
        delay: Math.random() * 0.05,
      },
    },
  };

  const strobeVariants = {
      initial: { opacity: 0 },
      animate: {
          opacity: [0, 1, 0]
      },
      transition: {
          duration: 0.1,
          repeat: Infinity,
          times: [0, 0.5, 1],
          ease: "linear"
      }
  }

  const barKeyframes = ["-100%", "-50%", "0%", "50%", "100%", "100%"];
  const barTimes = [0, 0.25, 0.5, 0.75, 1, 1];

  const frameKeyframes = {
      opacity: [0, 1, 1, 0],
      scale:   [1.1, 1, 1, 1.1]
  };
  const frameTimes = [0, 0.01, 0.99, 1];

  return (
    <div className={`min-h-screen bg-black text-white flex items-center justify-center ${FONT_CLASS} overflow-hidden relative cursor-wait`}>

      <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-0 opacity-70">
        {[...Array(64)].map((_, i) => (
          <motion.div
            key={`noise-${i}`}
            className="bg-white w-full h-full"
            variants={noiseVariants}
            initial="initial"
            animate="animate"
          />
        ))}
      </div>

       <motion.div
           className="absolute inset-0 bg-white"
           variants={strobeVariants}
           initial="initial"
           animate="animate"
       />

        <motion.div
            className="absolute top-0 left-1/4 w-1/4 h-full bg-black"
            initial={{ y: "-100%" }}
            animate={{ y: barKeyframes }}
            transition={{
                duration: 0.2, repeat: Infinity, times: barTimes,
                ease: "linear", delay: 0.05
            }}
        />
         <motion.div
            className="absolute top-0 left-3/4 w-1/4 h-full bg-black"
            initial={{ y: "-100%" }}
            animate={{ y: barKeyframes }}
            transition={{
                duration: 0.2, repeat: Infinity, times: barTimes,
                ease: "linear", delay: 0.15
            }}
        />

      <motion.div className="relative z-10 mix-blend-difference">
        <motion.p
           className={`${TEXT_SIZE} font-black uppercase leading-none break-all text-center text-white`}
           initial={{ opacity: 1 }}
           animate={{
              opacity: [1, 0.6, 1, 0.8, 1],
              x: [0, JITTER_AMOUNT, -JITTER_AMOUNT, 0],
              y: [0, -JITTER_AMOUNT, JITTER_AMOUNT, 0],
           }}
            transition={{
             duration: FLICKER_SPEED, ease: "linear", repeat: Infinity,
           }}
        >
          {TEXT}
        </motion.p>
      </motion.div>

       <motion.div
            className="absolute inset-0 border-[15px] md:border-[25px] border-white pointer-events-none"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={frameKeyframes}
            transition={{
                duration: 0.25,
                repeat: Infinity,
                times: frameTimes,
                ease: "linear",
                delay: 0.08
            }}
       />

    </div>
  );
}

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "icon", href: "~/assets/favicon.ico", type: "image/ico"},
  { rel: "apple-touch-icon", href: "~/assets/apple-touch-icon.png" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
