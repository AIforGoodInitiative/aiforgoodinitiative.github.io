import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import type { MetaFunction } from "@remix-run/node";
import { FaArrowRight, FaGithub } from "react-icons/fa";
import { useForm, ValidationError } from '@formspree/react';
import { Link } from "@remix-run/react";

const pixelFont = "'Pixelify Sans', monospace";
const monoFont = "'IBM Plex Mono', monospace";
const serifFont = "'Libre Baskerville', serif";
const accentColor = "#00ffff";
const glitchChars = "▓▒░█▄▀!?#@$&*";

export const meta: MetaFunction = () => [
  { title: "AI FOR GOOD :: Democratizing AI Impact" },
  {
    name: "description",
    content:
      "A non-profit initiative building open-source AI solutions for underrepresented communities. We empower volunteers and provide resources to create socially impactful AI.",
  },
];

const randomChar = () => glitchChars[Math.floor(Math.random() * glitchChars.length)];

const glitchText = (text: string, amount: number = 0.1) => {
  return text
    .split("")
    .map((char) => (char === ' ' ? ' ' : (Math.random() < amount ? randomChar() : char)))
    .join("");
};

export default function Index() {
  const [dark, setDark] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [heroText, setHeroText] = useState("AI FOR GOOD INITIATIVE");
  const [currentTime, setCurrentTime] = useState(new Date());

  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const gridOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.1, 0.05, 0.05, 0]);
  const noiseOpacity = useTransform(scrollYProgress, [0, 1], [0.08, 0.03]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const updateMotion = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', updateMotion);
    return () => mediaQuery.removeEventListener('change', updateMotion);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setHeroText("AI FOR GOOD INITIATIVE");
      return;
    }
    const glitchInterval = setInterval(() => {
      setHeroText(glitchText("AI FOR GOOD INITIATIVE", 0.05));
    }, 150);
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(clockInterval);
    }
  }, [reducedMotion]);

  const [state, handleSubmit] = useForm("mnnpwaew");

  const theme = dark ? "bg-black text-white" : "bg-white text-black";
  const accentTextClass = `text-[${accentColor}]`;
  const hoverBgClass = "hover:bg-white";
  const hoverTextClass = "hover:text-black";
  const currentBorderClass = "border-current";
  const accentBorderClass = `border-[${accentColor}]`;

  const letterVariants = {
    initial: { opacity: 0, rotateX: -90, x: 0 },
    animate: (i: number) => ({
      opacity: 1,
      rotateX: 0,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.8, 0.3, 1],
        delay: reducedMotion ? 0 : 0.3 + i * 0.025,
      },
    }),
  };

  const slideUpHard = {
    initial: { y: '100%', opacity: 0 },
    animate: { y: '0%', opacity: 1, transition: { duration: 0.6, ease: [0.7, 0, 0.3, 1] } },
  };

  const fadeInBrutal = {
    initial: { opacity: 0, scale: 1.05 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.1 } },
  };

  const lineGrow = {
    initial: { scaleX: 0 },
    animate: { scaleX: 1, transition: { duration: 0.8, ease: 'circOut', delay: 0.5 } },
  };

  const volunteerFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSfAWULjYZYB_W6Vh_SZcKnMmGUlCGJrg47mYI_tzIjHHWfWaQ/viewform?usp=header";
  const submissionFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSf2NTBzsvb-Cl1PRTcqyRQMfs1PSgm7J5fZsMH6_WILfXV7Ig/viewform?usp=header";
  const githubURL = "https://github.com/aiforgoodinitiative";

  return (
    <div
      ref={scrollRef}
      className={`min-h-screen ${theme} font-mono transition-colors duration-500 overflow-x-hidden relative cursor-crosshair`}
      style={{ fontFamily: monoFont, fontWeight: 500 }}
    >
      <motion.div
        className="fixed inset-0 w-full h-full bg-noise pointer-events-none z-[999]"
        style={{ opacity: noiseOpacity, backgroundSize: '150px' }}
        aria-hidden="true"
      />
      <motion.div
        className="fixed inset-0 w-full h-full bg-grid pointer-events-none z-[1]"
        style={{ opacity: gridOpacity, '--grid-color': dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' }}
        aria-hidden="true"
      />

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 border-b-4 ${accentBorderClass} p-3 flex justify-between items-center text-xs tracking-widest z-50 ${dark ? 'bg-black/80' : 'bg-white/80'} backdrop-blur-sm`}
      >
        <div className="flex items-center gap-3">
          <span className={`font-bold ${accentTextClass}`}>[AI_FOR_GOOD_INITIATIVE]</span>
          <span className="hidden md:inline">// STATUS: <span className="text-green-400">RECRUITING_NEW_VOLUNTEERS</span> //</span>
        </div>
        <div className="flex gap-3 items-center">
          <span style={{ fontFamily: pixelFont }} className="text-yellow-400 hidden sm:inline">SYS_TIME: {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}</span>
          <button
            onClick={() => setDark(!dark)}
            className={`uppercase border-2 ${currentBorderClass} px-3 py-1 ${hoverBgClass} ${hoverTextClass} transition-all duration-150 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[${accentColor}] font-bold text-[10px]`}
          >
            {dark ? "MODE:LIGHT" : "MODE:DARK"}
          </button>
          <Link
            to="/auth"
            className={`uppercase border-2 ${currentBorderClass} px-3 py-1 ${hoverBgClass} ${hoverTextClass} transition-all duration-150 font-bold text-[10px]`}
          >
            ACCOUNTS
          </Link>
          <a href={githubURL} target="_blank" rel="noopener noreferrer" className={`uppercase border-2 ${currentBorderClass} px-3 py-1 ${hoverBgClass} ${hoverTextClass} transition-all duration-150 font-bold text-[10px] flex items-center gap-1`}><FaGithub /> GITHUB</a>
        </div>
      </motion.header>

      <main className="pt-20">

        <section className={`p-8 md:p-16 border-b-8 ${currentBorderClass} text-left relative overflow-visible -mb-8 z-[5]`}>
          <motion.div variants={lineGrow} initial="initial" animate="animate" className={`absolute top-1/4 left-0 h-1 w-2/3 bg-[${accentColor}] origin-left z-0`} />
          <motion.div variants={lineGrow} initial="initial" animate="animate" transition={{ delay: 0.7 }} className={`absolute bottom-1/4 right-0 h-1 w-1/2 bg-current origin-right z-0`} />

          <motion.h1
            className="text-[clamp(4rem,20vw,18rem)] leading-[0.85] relative z-10 break-words min-h-[30vh] md:min-h-[40vh] flex flex-col justify-center"
            style={{ fontFamily: serifFont, fontWeight: 900, letterSpacing: "-0.07em" }}
            onHoverStart={!reducedMotion ? () => setHeroText(glitchText("AI FOR GOOD INITIATIVE", 0.3)) : undefined}
            onHoverEnd={!reducedMotion ? () => setHeroText(glitchText("AI FOR GOOD INITIATIVE", 0.05)) : undefined}
            aria-label="AI FOR GOOD INITIATIVE"
          >
            {(() => {
              const words = heroText.split(" ");
              const lines = [
                words.slice(0, 2).join(" "),
                words[2],
                words[3]
              ];

              return lines.map((line, lineIndex) => (
                <div key={lineIndex}>
                  {line.split("").map((char, i) => (
                    <motion.span
                      key={`${char}-${lineIndex}-${i}`}
                      custom={lineIndex * 20 + i}
                      variants={letterVariants}
                      initial="initial"
                      animate="animate"
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
              ));
            })()}
          </motion.h1>
          <motion.p
            variants={slideUpHard}
            initial="initial"
            animate="animate"
            className="mt-4 md:mt-8 max-w-lg text-lg md:text-xl tracking-wider relative z-10 font-semibold"
          >
            A non-profit collective building & deploying open-source AI for social good. Enabling volunteers, providing resources, and serving underrepresented communities globally.
          </motion.p>
        </section>

        <motion.div
          variants={fadeInBrutal} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }}
          className={`relative p-12 md:p-24 z-[4] border-t-8 ${accentBorderClass} border-b-8 ${currentBorderClass} ${dark ? 'bg-black' : 'bg-white'} rotate-[-1deg] md:rotate-[-2deg] scale-[1.01]`}
        >
          <span className="absolute left-4 bottom-4 text-xs uppercase writing-mode-vertical-rl transform rotate-180 opacity-50" style={{ fontFamily: pixelFont }} aria-hidden="true">SECTION :: CORE_MISSION</span>
          <div className="md:flex md:items-start md:gap-12 rotate-[1deg] md:rotate-[2deg]">
            <h2
              className={`text-4xl md:text-6xl mb-6 md:mb-0 md:w-1/3 flex-shrink-0 ${accentTextClass}`}
              style={{ fontFamily: serifFont, fontWeight: 700, lineHeight: '1.1' }}
            >
              OUR_ PURPOSE:
            </h2>
            <p className="max-w-none md:w-2/3 text-xl md:text-2xl font-medium">
              To democratize AI development and access. We build practical, open-source AI tools addressing critical needs in <span className="border-b-2 border-dashed border-current pb-1">underserved communities</span> globally. We promote a collaborative ecosystem where volunteers learn, build, and deploy AI for tangible social impact. AI for <span className={`${accentTextClass} font-bold`}>everyone</span>, built by <span className={`${accentTextClass} font-bold`}>everyone</span>.
            </p>
          </div>
          <div className={`mt-12 text-center text-lg ${accentTextClass} opacity-60`} aria-hidden="true">
            ▓▓▓▓▓▓▒▒▒▒▒▒░░░░░░ {'>'} INITIATIVE ONLINE {'<'} ░░░░░░▒▒▒▒▒▒▓▓▓▓▓▓
          </div>
        </motion.div>

        <section className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 border-b-8 border-current relative z-[3] -mt-4 bg-gradient-to-b from-transparent via-transparent to-current/5">
          <h3 className="absolute top-4 right-4 text-xs uppercase" style={{ fontFamily: pixelFont }} aria-hidden="true">// FOCUS_AREAS //</h3>
          {[
            { title: "//EQUITABLE_ACCESS", desc: "AI tools enhancing healthcare, education, and essential services in low-resource settings." },
            { title: "//COMMUNITY_AI", desc: "Co-designing AI solutions directly with communities to address their self-identified needs." },
            { title: "//OPEN_RESOURCES", desc: "Providing datasets, models, and educational materials for social good AI development." },
          ].map((item, idx) => (
            <motion.div
              key={item.title}
              variants={fadeInBrutal} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.3 }} transition={{ delay: idx * 0.1 }}
              whileHover={reducedMotion ? {} : {
                scale: 1.05, rotate: idx === 1 ? 0 : (idx % 2 === 0 ? -2 : 2), zIndex: 10, boxShadow: `8px 8px 0px ${accentColor}`, transition: { duration: 0.15 }
              }}
              className={`p-6 border-4 border-dashed ${currentBorderClass} bg-inherit group cursor-pointer`}
            >
              <h2
                className={`text-2xl md:text-3xl mb-4 ${accentTextClass} group-hover:text-inherit transition-colors duration-200`}
                style={{ fontFamily: serifFont, fontWeight: 700 }}
              >
                {item.title}
              </h2>
              <p className="text-lg md:text-xl">{item.desc}</p>
            </motion.div>
          ))}
        </section>

        <section className={`p-12 border-b-8 ${currentBorderClass} relative z-[2] overflow-hidden`}>
          <motion.h3
            initial={{ x: '-100%' }} whileInView={{ x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: 'circOut' }}
            className={`text-4xl md:text-5xl mb-8 text-left inline-block ${accentTextClass} bg-current px-4 py-1`}
            style={{ fontFamily: serifFont, fontWeight: 700 }}
          >
            GET_INVOLVED:
          </motion.h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: "VOLUNTEER", span: "lg:col-span-1", href: "#volunteer-execute" },
              { label: "SUBMIT IDEA", span: "lg:col-span-1", href: "#submit-op" },
              { label: "DONATE", span: "lg:col-span-1", href: "#fund-relay" },
              { label: "PARTNER", span: "lg:col-span-1", href: "#partner-req" },
            ].map((item, idx) => (
              <motion.a
                key={item.label}
                href={item.href}
                variants={slideUpHard} initial="initial" whileInView="animate" viewport={{ once: true }} transition={{ delay: idx * 0.05 }}
                whileHover={{
                  scale: reducedMotion ? 1 : 1.03, y: reducedMotion ? 0 : -3, backgroundColor: accentColor, color: "#000000", borderColor: accentColor, boxShadow: `4px 4px 0px ${dark ? '#fff' : '#000'}`, transition: { duration: 0.1 }
                }}
                whileTap={{ scale: 0.97, y: 0 }}
                className={`uppercase border-4 ${currentBorderClass} p-4 transition-all duration-100 focus-visible:outline focus-visible:outline-4 focus-visible:outline-[${accentColor}] focus-visible:outline-offset-2 min-h-[100px] flex items-center justify-center text-center text-sm md:text-base font-bold tracking-wider ${item.span}`}
                aria-label={item.label}
              >
                {item.label}
              </motion.a>
            ))}
          </div>
        </section>

        <motion.section
          id="volunteer-execute"
          variants={fadeInBrutal} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.1 }}
          className={`relative p-12 md:p-16 border-b-8 ${currentBorderClass} z-[1] -mt-4 pt-12 md:pt-20 skew-y-[-1deg] bg-gradient-to-b ${dark ? 'from-black/50 to-black' : 'from-white/50 to-white'}`}
        >
          <div className="skew-y-[1deg]">
            <span className="absolute top-4 right-4 text-xs uppercase opacity-50" style={{ fontFamily: pixelFont }} aria-hidden="true">// NODE: VOLUNTEER //</span>
            <h3 className={`text-4xl md:text-6xl mb-8 inline-block border-b-4 ${accentBorderClass} pb-2`} style={{ fontFamily: serifFont, fontWeight: 700 }}>
              VOLUNTEER_WITH_US
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <p className="text-lg md:text-xl mb-6 tracking-wide">
                  Join a global network of developers, designers, researchers, and domain experts building AI for good. Contribute your skills to impactful projects, learn new technologies, and collaborate within independent, community-led teams. Remote and flexible.
                </p>
                <h4 className={`text-2xl mb-4 ${accentTextClass} font-semibold`}>SKILLS_NEEDED:</h4>
                <ul className="list-['>//_'] list-inside text-lg space-y-1 mb-8">
                  <li>AI/ML Engineering (PyTorch, TensorFlow, Scikit-learn)</li>
                  <li>Data Science & Analysis (Pandas, SQL, Stats)</li>
                  <li>Full-Stack Development (Python/JS/React/Node)</li>
                  <li>UX/UI Design (Figma, Accessibility Standards)</li>
                  <li>Project Management (Agile, Remote Teams)</li>
                  <li>Technical Writing & Documentation</li>
                  <li>Community Outreach & Support</li>
                  <li>Domain Expertise (Healthcare, Education, Climate, etc.)</li>
                  <li>DevOps & MLOps (Docker, K8s, Cloud Platforms)</li>
                </ul>
                <p className="text-lg md:text-xl mb-6 tracking-wide">
                  See current needs on <a href="#active-projects" className={`underline ${accentTextClass} hover:bg-[${accentColor}] transition-colors duration-150 px-1`}>Active Projects</a> or register your general interest below.
                </p>
              </div>
              <div className="md:col-span-1 flex flex-col justify-between">
                <div>
                  <h4 className="block text-sm uppercase font-bold mb-4" style={{ fontFamily: pixelFont }}>REGISTER_YOUR_INTEREST:</h4>
                  <p className="mb-4 text-base">Ready to contribute? Fill out our quick registration form to tell us about your skills and interests.</p>
                  <motion.a
                    href={volunteerFormURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03, x: 3, transition: { duration: 0.1 } }} whileTap={{ scale: 0.97 }}
                    className={`w-full uppercase border-4 ${accentBorderClass} ${accentTextClass} px-6 py-3 font-bold tracking-wider hover:bg-[${accentColor}] transition-all duration-150 flex items-center justify-center gap-2`}
                  >
                    Volunteer Registration Form <FaArrowRight />
                  </motion.a>
                </div>
                <div className={`mt-6 text-xs text-center opacity-60 border-t border-dashed ${currentBorderClass} pt-3`} style={{ fontFamily: pixelFont }}>
                  Current Volunteers: <span className={accentTextClass}>Recruiting</span> // Collaboration: <span className="text-green-400">ACTIVE</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="submit-op"
          variants={fadeInBrutal} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.1 }}
          className={`relative p-12 md:p-16 border-b-8 ${currentBorderClass} z-[0] -mt-4 pt-12 md:pt-20 rotate-[0.5deg] bg-gradient-to-b ${dark ? 'from-black/30 via-black/80 to-black' : 'from-white/30 via-white/80 to-white'}`}
        >
          <div className="rotate-[-0.5deg]">
            <pre className={`absolute top-4 left-4 text-[10px] leading-none ${accentTextClass} opacity-40 hidden md:block`} aria-hidden="true">{`
 IDEA >>>> [REVIEW] >>>> {SCOPING} >>>> //BUILD//
  ||           ||            ||            ||
  V            V             V             V
 [INPUT]---->[COMMUNITY]--->[TEAM_UP]----->[IMPACT]
            `}</pre>
            <span className="absolute bottom-4 right-4 text-xs uppercase writing-mode-vertical-rl transform rotate-180 opacity-50" style={{ fontFamily: pixelFont }} aria-hidden="true">PIPELINE :: SUBMIT_IDEA</span>
            <h3 className={`text-4xl md:text-6xl mb-8 text-right border-b-4 border-dashed ${accentBorderClass} pb-2`} style={{ fontFamily: serifFont, fontWeight: 700 }}>
              SUBMIT_YOUR_IDEA
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <p className="text-lg md:text-xl mb-6 tracking-wide">
                  Have an idea for an AI application that can create positive social change? Propose a project targeting needs in underserved communities. We focus on open-source, ethical, and impactful solutions.
                </p>
                <h4 className={`text-2xl mb-4 ${accentTextClass} font-semibold`}>WHAT_TO_INCLUDE:</h4>
                <ul className="list-['>>'] list-inside text-lg space-y-2 mb-6">
                  <li>The specific problem your idea addresses.</li>
                  <li>How AI could provide a solution.</li>
                  <li>The target community or beneficiaries.</li>
                  <li>Potential positive impact.</li>
                  <li>Any existing resources or data (optional).</li>
                </ul>
                <p className="text-sm opacity-70">// Ideas are reviewed by the community. Feasible projects are scoped and volunteer teams formed. //</p>
              </div>
              <div>
                <h4 className="block text-sm uppercase font-bold mb-4" style={{ fontFamily: pixelFont }}>SUBMIT_VIA_GOOGLE_FORM:</h4>
                <p className="mb-4 text-base">Use our form to outline your project proposal. We'll review it and get back to you if it aligns with our mission and capacity.</p>
                <motion.a
                  href={submissionFormURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, x: -3, transition: { duration: 0.1 } }} whileTap={{ scale: 0.97 }}
                  className={`w-full uppercase border-4 ${accentBorderClass} ${accentTextClass} px-6 py-3 font-bold tracking-wider hover:bg-[${accentColor}] transition-all duration-150 flex items-center justify-center gap-2`}
                >
                  Idea Submission Form <FaArrowRight />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="active-projects"
          variants={fadeInBrutal} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.1 }}
          className={`relative p-12 md:p-16 border-b-8 ${currentBorderClass} z-[0] -mt-4 pt-12 md:pt-20 bg-current/5`}
        >
          <span className="absolute top-4 right-4 text-xs uppercase opacity-50" style={{ fontFamily: pixelFont }} aria-hidden="true">// STATUS: ACTIVE_PROJECTS //</span>
          <h3 className={`text-4xl md:text-6xl mb-10 text-center`} style={{ fontFamily: serifFont, fontWeight: 700 }}>
            ACTIVE_<span className={accentTextClass}>PROJECTS</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {[
              { title: "HEALTH_ACCESS_AI", desc: "AI-powered diagnostic assistance for remote clinics.", roles: ["ML Engineer (CV)", "Full-Stack Dev (Remix)", "Medical Knowledge"] },
              { title: "ERP_AUTO", desc: "AI automation for mundane tasks in ERP settings.", roles: ["Data Scientist", "Full-Stack Dev", "ERP Specialist"] },
              { title: "LLM_REASONING", desc: "Symbolic reasoning models to solve complex problems.", roles: ["NLP Specialist", "AI Researcher", "Mathematician"] },
            ].map((proj, idx) => (
              <motion.div
                key={proj.title}
                variants={fadeInBrutal} initial="initial" whileInView="animate" viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className={`border-4 ${idx % 2 === 0 ? currentBorderClass : accentBorderClass} p-6 flex flex-col justify-between hover:scale-[1.02] hover:rotate-[1deg] transition-transform duration-150`}
              >
                <div>
                  <h4 className={`text-2xl mb-3 ${idx % 2 !== 0 ? accentTextClass : ''}`} style={{ fontFamily: serifFont, fontWeight: 700 }}>{proj.title}</h4>
                  <p className="text-base mb-4">{proj.desc}</p>
                  <p className="text-sm font-semibold mb-1">// SEEKING //</p>
                  <ul className="list-['+'] list-inside text-sm space-y-1">
                    {proj.roles.map(r => <li key={r}>{r}</li>)}
                  </ul>
                </div>
                <a href={volunteerFormURL} target="_blank" rel="noopener noreferrer" className={`inline-block mt-5 uppercase text-xs font-bold tracking-widest border-b-2 ${accentBorderClass} ${accentTextClass} self-start hover:bg-[${accentColor}] pb-0.5 transition-all duration-200`}>VOLUNTEER_FOR_THIS</a>
              </motion.div>
            ))}
          </div>
          <p className="text-center mt-10 text-lg">Help us build the next generation of impactful AI. <a href={submissionFormURL} target="_blank" rel="noopener noreferrer" className={`underline ${accentTextClass} hover:bg-[${accentColor}] transition-colors duration-150 px-1`}>Submit your idea</a>.</p>
        </motion.section>

        <motion.section
          id="fund-relay"
          variants={fadeInBrutal} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.1 }}
          className={`relative p-12 md:p-16 border-b-8 ${currentBorderClass} z-[0] -mt-4 pt-12 md:pt-20 ${dark ? 'bg-gradient-radial from-cyan-900/30 via-black to-black' : 'bg-gradient-radial from-cyan-300/30 via-white to-white'}`}
        >
          <span className="absolute top-4 left-4 text-xs uppercase opacity-50" style={{ fontFamily: pixelFont }} aria-hidden="true">// STREAM: SUPPORT //</span>
          <h3 className={`text-4xl md:text-6xl mb-8 text-center ${accentTextClass}`} style={{ fontFamily: serifFont, fontWeight: 700 }}>
            SUPPORT_OUR_WORK
          </h3>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg md:text-xl mb-6 tracking-wide">
              As a non-profit, we rely on community support to sustain our operations. Your donation directly funds server costs, deployment resources for underserved areas, open-source tool development, and volunteer coordination efforts. Help us build and deploy AI where it's needed most.
            </p>
            <h4 className={`text-2xl mb-4 font-semibold`}>WHERE_FUNDS_GO:</h4>
            <ul className="list-none space-y-1 mb-8 text-lg inline-block text-left">
              <li><span className={accentTextClass}>{'->'}</span> Cloud Infrastructure & Compute Time</li>
              <li><span className={accentTextClass}>{'->'}</span> Hardware for Edge AI Deployments</li>
              <li><span className={accentTextClass}>{'->'}</span> Open Dataset Curation & Hosting</li>
              <li><span className={accentTextClass}>{'->'}</span> Volunteer Tools & Platform Costs</li>
              <li><span className={accentTextClass}>{'->'}</span> Accessibility & Localization Efforts</li>
            </ul>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
              {[25, 50, 100, 'OTHER'].map(amount => (
                <motion.a key={amount} href="#" whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.1 } }} whileTap={{ scale: 0.95 }} className={`uppercase border-4 ${currentBorderClass} p-4 py-6 transition-all duration-150 focus-visible:outline focus-visible:outline-4 focus-visible:outline-[${accentColor}] focus-visible:outline-offset-2 flex flex-col items-center justify-center text-center font-bold tracking-wider ${hoverBgClass} ${hoverTextClass}`}>
                  <span className="text-2xl md:text-4xl" style={{ fontFamily: serifFont }}>{amount !== 'OTHER' ? `$${amount}` : '...'}</span>
                  <span className="text-xs mt-1">{amount === 'OTHER' ? 'CUSTOM_AMOUNT' : 'DONATE_NOW'}</span>
                </motion.a>
              ))}
            </div>
            <h4 className={`text-2xl mb-4 font-semibold mt-12`}>DONATION_PLATFORMS:</h4>
            <div className="flex flex-wrap justify-center gap-6 items-center">
              <a href="#" className={`border-2 border-dashed ${currentBorderClass} p-3 ${hoverBgClass} ${hoverTextClass} transition-colors duration-150`}>
                <span className="font-bold text-sm">[OPEN_COLLECTIVE]</span>
              </a>
              <a href="#" className={`border-2 border-dashed ${currentBorderClass} p-3 ${hoverBgClass} ${hoverTextClass} transition-colors duration-150`}>
                <span className="font-bold text-sm">[CRYPTO_ETH]</span>
              </a>
            </div>
            <p className="mt-8 text-sm opacity-70">// We'll soon be accepting sponsorships. //</p>
          </div>
        </motion.section>

        <motion.section
          id="partner-req"
          variants={fadeInBrutal} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.1 }}
          className={`relative p-12 md:p-16 border-b-8 ${accentBorderClass} z-[0] -mt-4 pt-12 md:pt-20 overflow-hidden`}
        >
          <span className="absolute top-1/4 left-4 text-sm uppercase writing-mode-vertical-rl transform rotate-180 opacity-60" style={{ fontFamily: pixelFont }} aria-hidden="true">REQ :: PARTNERSHIP</span>
          <span className="absolute bottom-1/4 right-4 text-sm uppercase writing-mode-vertical-rl opacity-60" style={{ fontFamily: pixelFont }} aria-hidden="true">TYPE :: COLLABORATION</span>
          <h3 className={`text-4xl md:text-6xl mb-10`} style={{ fontFamily: serifFont, fontWeight: 700 }}>
            PARTNER_<span className={accentTextClass}>WITH_US</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
            <div className="md:col-span-3">
              <p className="text-lg md:text-xl mb-6 tracking-wide">
                Collaborate with us to amplify impact. We partner with NGOs, research labs, universities, ethical companies, and community organizations who share our vision of equitable AI. Let's build impactful solutions together.
              </p>
              <h4 className={`text-2xl mb-4 font-semibold`}>WAYS_TO_PARTNER:</h4>
              <ul className="list-['//'] list-inside text-lg space-y-2 mb-8">
                <li><span className="font-bold">Project Collaboration:</span> Co-develop and deploy AI solutions.</li>
                <li><span className="font-bold">Resource Sharing:</span> Provide data, compute, or tools.</li>
                <li><span className="font-bold">Research Partnerships:</span> Joint studies on AI ethics and impact.</li>
                <li><span className="font-bold">Community Integration:</span> Connect us with communities needing AI solutions.</li>
                <li><span className="font-bold">Pro Bono Expertise:</span> Offer specialized technical or domain support.</li>
              </ul>
              <p className="text-base opacity-70">// Partnerships focus on mutual benefit, open collaboration, and measurable social outcomes. //</p>
              <div className="mt-10 border-t border-dashed border-current pt-6">
                <h5 className="text-sm uppercase mb-4 opacity-80" style={{ fontFamily: pixelFont }}>// CURRENT_COLLABORATORS //</h5>
                <div className="flex flex-wrap gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
                  {['AVINU_AI', 'UNIVERSITY_OF_ISFAHAN', 'OPTICORE'].map(logo => (
                    <div key={logo} className={`border ${currentBorderClass} px-3 h-12 flex items-center justify-center text-xs ${hoverBgClass} ${hoverTextClass} bg-current/10`}>{logo}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="md:col-span-2">
              <h4 className={`text-2xl mb-4 font-semibold text-right ${accentTextClass}`}>INITIATE_DIALOGUE:</h4>
              <form className="space-y-4 border-l-4 border-dashed pl-6" onSubmit={handleSubmit}>
                <label htmlFor="partner-org-name" className="block text-sm uppercase font-bold" style={{ fontFamily: pixelFont }}>ORGANIZATION:</label>
                <input type="text" id="partner-org-name" name="org" required className={`w-full p-2 bg-transparent border-b-2 ${currentBorderClass} focus:border-[${accentColor}] focus:outline-none font-mono`} />
                <label htmlFor="partner-contact-name" className="block text-sm uppercase font-bold mt-3" style={{ fontFamily: pixelFont }}>CONTACT_NAME:</label>
                <input type="text" id="partner-contact-name" name="contact_person" required className={`w-full p-2 bg-transparent border-b-2 ${currentBorderClass} focus:border-[${accentColor}] focus:outline-none font-mono`} />
                <label htmlFor="partner-contact-email" className="block text-sm uppercase font-bold mt-3" style={{ fontFamily: pixelFont }}>CONTACT_EMAIL:</label>
                <input type="email" id="partner-contact-email" name="email" required className={`w-full p-2 bg-transparent border-b-2 ${currentBorderClass} focus:border-[${accentColor}] focus:outline-none font-mono`} />
                <label htmlFor="partner-area-interest" className="block text-sm uppercase font-bold mt-3" style={{ fontFamily: pixelFont }}>INTEREST_AREA:</label>
                <select id="partner-area-interest" name="interest" required className={`w-full p-2 bg-transparent border-2 ${currentBorderClass} focus:border-[${accentColor}] focus:outline-none focus:ring-1 focus:ring-[${accentColor}] font-mono text-sm appearance-none`}>
                  <option value="">-- Select Partnership Type --</option>
                  <option value="project">Project Collaboration</option>
                  <option value="resource">Resource Sharing</option>
                  <option value="research">Research Partnership</option>
                  <option value="community">Community Integration</option>
                  <option value="probono">Pro Bono Expertise</option>
                  <option value="other">Other</option>
                </select>
                <label htmlFor="partner-proposal" className="block text-sm uppercase font-bold mt-3" style={{ fontFamily: pixelFont }}>BRIEF_PROPOSAL:</label>
                <textarea id="partner-proposal" name="message" rows={4} placeholder="// How can we collaborate effectively?" required className={`w-full p-2 bg-transparent border-2 ${currentBorderClass} focus:border-[${accentColor}] focus:outline-none focus:ring-1 focus:ring-[${accentColor}] font-mono text-sm`} />
                <motion.button type="submit" whileHover={{ scale: 1.03, x: -3, transition: { duration: 0.1 } }} whileTap={{ scale: 0.97 }} className={`w-full uppercase border-4 ${accentBorderClass} ${accentTextClass} px-6 py-3 font-bold tracking-wider hover:bg-[${accentColor}] transition-all duration-150 flex items-center justify-center gap-2 mt-6`} disabled={state.submitting || state.succeeded}>
                  {state.submitting ? "Submitting..." : "Request Collaboration"}{" "}
                  {state.submitting && <FaArrowRight />}
                </motion.button>
                {state.succeeded && (
                  <p className="mt-4 font-bold">
                    Thanks for showing your interest! We'll get back to you soon.
                  </p>
                )}
              </form>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="faq-stream"
          variants={slideUpHard} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }}
          className={`p-12 border-b-8 ${currentBorderClass} -mt-4 pt-16 bg-current/5`}
        >
          <h3 className="text-4xl md:text-5xl mb-10 text-center" style={{ fontFamily: serifFont, fontWeight: 700 }}>
            COMMON_QUERIES
          </h3>
          <div className="space-y-8 max-w-3xl mx-auto">
            {[
              { q: "Q: How are projects selected?", a: "A: Projects are selected based on alignment with our mission, potential impact, feasibility, community need, and available volunteer resources. Idea submissions are reviewed by the community." },
              { q: "Q: Is programming experience required to volunteer?", a: "A: No! While technical skills are valuable, we also need project managers, designers, researchers, writers, community organizers, and domain experts. All passionate individuals are welcome." },
              { q: "Q: How is the initiative funded?", a: "A: Primarily through individual donations, grants, and sponsorships from ethical organizations. We prioritize transparency in our funding and spending." },
              { q: "Q: What does 'open-source' mean for your projects?", a: `A: All code, models (where feasible), and documentation developed are publicly available under permissive licenses (e.g., MIT, Apache 2.0) on our GitHub. We encourage reuse and collaboration.` }
            ].map((faq, idx) => (
              <motion.div
                key={faq.q}
                variants={fadeInBrutal} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.5 }} transition={{ delay: idx * 0.1 }}
                className={`border-l-4 ${accentBorderClass} pl-4 py-2`}
              >
                <h4 className="text-xl md:text-2xl mb-2 font-bold tracking-wider">{faq.q}</h4>
                <p className="text-lg md:text-xl opacity-90">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.footer
          variants={slideUpHard}
          initial="initial"
          animate="animate"
          className={`text-xs border-t-8 border-dashed ${accentBorderClass} p-4 text-center mt-12 relative z-[0]`}
        >
          <p className="mb-3 opacity-70" style={{ fontFamily: pixelFont }}>// CONNECTION_TERMINATED //</p>
          <p className="mb-4">// AI FOR GOOD INITIATIVE // Non-Profit Collective // {new Date().getFullYear()} //</p>
          <div className="flex justify-center gap-4">
            {[
              { label: "REGISTER", href: volunteerFormURL, target: "_blank" },
              { label: "SUBMIT IDEA", href: submissionFormURL, target: "_blank" },
              { label: "GITHUB", href: githubURL, target: "_blank" },
              { label: "DONATE", href: "#fund-relay" }
            ].map(link => (
              <a key={link.label} href={link.href} target={link.target} rel={link.target ? "noopener noreferrer" : undefined} className={`font-bold border-2 border-current px-2 py-0.5 ${hoverBgClass} ${hoverTextClass} transition-all duration-150`}>
                [{link.label}]
              </a>
            ))}
          </div>
          <p className="mt-3 opacity-50">// END_TRANSMISSION //</p>
        </motion.footer>

      </main>
    </div>
  );
}