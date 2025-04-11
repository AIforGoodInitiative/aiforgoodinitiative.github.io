import { Form } from "@remix-run/react";
import { useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { FaArrowRight, FaGoogle, FaGithub } from "react-icons/fa";
import { useNavigate } from "@remix-run/react";

const pixelFont = "'Pixelify Sans', monospace";
const monoFont = "'IBM Plex Mono', monospace";
const serifFont = "'Libre Baskerville', serif";
const accentColor = "#00ffff";

export const meta: MetaFunction = () => [
  { title: "AI FOR GOOD :: Authenticate" },
  {
    name: "description",
    content: "Sign up or sign in to join the AI for Good Initiative. Contribute to open-source AI solutions for social impact.",
  },
];

export default function Auth() {
  const [isDark, setIsDark] = useState(true);
  const [isSignup, setIsSignup] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const intent = formData.get("intent")?.toString();

    const newErrors: { email?: string; password?: string; general?: string } = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (password && password.length < 8) newErrors.password = "Password must be at least 8 characters";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call (replace with your auth service)
      console.log(`${intent} attempt:`, { email, password });
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
      navigate("/"); // Redirect to homepage without refresh
    } catch (error) {
      setErrors({ general: "Authentication failed. Please try again." });
      setIsSubmitting(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsSubmitting(true);
    setErrors({});
    try {
      // Replace with Google OAuth logic (e.g., Firebase, Supabase)
      console.log(`Attempting ${isSignup ? "signup" : "signin"} with Google`);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
      navigate("/"); // Redirect to homepage
    } catch (error) {
      setErrors({ general: "Google authentication failed." });
      setIsSubmitting(false);
    }
  };

  const handleGitHubAuth = async () => {
    setIsSubmitting(true);
    setErrors({});
    try {
      // Replace with GitHub OAuth logic (e.g., Firebase, Supabase)
      console.log(`Attempting ${isSignup ? "signup" : "signin"} with GitHub`);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
      navigate("/"); // Redirect to homepage
    } catch (error) {
      setErrors({ general: "GitHub authentication failed." });
      setIsSubmitting(false);
    }
  };

  const theme = isDark ? "bg-black text-white" : "bg-white text-black";
  const accentTextClass = `text-[${accentColor}]`;
  const hoverBgClass = "hover:bg-white";
  const hoverTextClass = "hover:text-black";
  const currentBorderClass = "border-current";
  const accentBorderClass = `border-[${accentColor}]`;

  return (
    <div
      className={`min-h-screen ${theme} font-mono transition-colors duration-500 overflow-x-hidden relative cursor-crosshair`}
      style={{ fontFamily: monoFont, fontWeight: 500 }}
    >
      <div
        className="fixed inset-0 w-full h-full bg-noise pointer-events-none z-[999]"
        style={{ opacity: 0.05, backgroundSize: "150px" }}
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 w-full h-full bg-grid pointer-events-none z-[1]"
        style={{ opacity: 0.1, "--grid-color": isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)" }}
        aria-hidden="true"
      />

      <header
        className={`fixed top-0 left-0 right-0 border-b-4 ${accentBorderClass} p-3 flex justify-between items-center text-xs tracking-widest z-50 ${
          isDark ? "bg-black/80" : "bg-white/80"
        } backdrop-blur-sm`}
      >
        <div className="flex items-center gap-3">
          <span className={`font-bold ${accentTextClass}`}>[AI_FOR_GOOD_AUTH]</span>
          <span className="hidden md:inline">
            // STATUS: <span className="text-green-400">{isSignup ? "REGISTRATION" : "AUTHENTICATION"}</span> //
          </span>
        </div>
        <div className="flex gap-3 items-center">
          <button
            onClick={() => setIsDark(!isDark)}
            className={`uppercase border-2 ${currentBorderClass} px-3 py-1 ${hoverBgClass} ${hoverTextClass} transition-all duration-150 font-bold text-[10px]`}
          >
            {isDark ? "MODE:LIGHT" : "MODE:DARK"}
          </button>
          <button
            onClick={() => setIsSignup(!isSignup)}
            className={`uppercase border-2 ${currentBorderClass} px-3 py-1 ${hoverBgClass} ${hoverTextClass} transition-all duration-150 font-bold text-[10px]`}
          >
            {isSignup ? "SIGN_IN" : "SIGN_UP"}
          </button>
        </div>
      </header>

      <main className="pt-20 flex items-center justify-center min-h-screen">
        <section
          className={`p-8 md:p-12 max-w-md w-full border-8 ${currentBorderClass} ${
            isDark ? "bg-black/90" : "bg-white/90"
          } relative z-[5]`}
        >
          <h1
            className={`text-5xl md:text-7xl mb-8 tracking-tight ${accentTextClass}`}
            style={{ fontFamily: serifFont, fontWeight: 900, letterSpacing: "-0.05em" }}
          >
            {isSignup ? "SIGN_UP" : "SIGN_IN"}
          </h1>

          <div>
            <Form onSubmit={handleSubmit} className="space-y-6">
              <input type="hidden" name="intent" value={isSignup ? "signup" : "signin"} />
              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm uppercase font-bold mb-2 ${accentTextClass}`}
                  style={{ fontFamily: pixelFont }}
                >
                  EMAIL:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className={`w-full p-2 bg-transparent border-4 ${currentBorderClass} focus:border-[${accentColor}] focus:outline-none font-mono text-sm placeholder-opacity-50`}
                  placeholder="user@domain.com"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className={`block text-sm uppercase font-bold mb-2 ${accentTextClass}`}
                  style={{ fontFamily: pixelFont }}
                >
                  PASSWORD:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className={`w-full p-2 bg-transparent border-4 ${currentBorderClass} focus:border-[${accentColor}] focus:outline-none font-mono text-sm placeholder-opacity-50`}
                  placeholder="********"
                />
                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
              </div>
              {errors.general && <p className="text-red-400 text-sm">{errors.general}</p>}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full uppercase border-4 ${accentBorderClass} ${accentTextClass} px-6 py-3 font-bold tracking-wider hover:bg-white hover:text-black transition-all duration-150 flex items-center justify-center gap-2`}
              >
                {isSubmitting ? "PROCESSING..." : isSignup ? "REGISTER" : "AUTHENTICATE"}
                <FaArrowRight />
              </button>
            </Form>

            {/* Google and GitHub Signin/Signup Section */}
            <div className="mt-8 space-y-4">
              <p
                className={`text-sm uppercase font-bold text-center ${accentTextClass}`}
                style={{ fontFamily: pixelFont }}
              >
                // OR {isSignup ? "SIGN UP" : "SIGN IN"} WITH //
              </p>
              <button
                onClick={handleGoogleAuth}
                disabled={isSubmitting}
                className={`w-full uppercase border-4 ${accentBorderClass} ${accentTextClass} px-6 py-3 font-bold tracking-wider hover:bg-white hover:text-black transition-all duration-150 flex items-center justify-center gap-2`}
              >
                <FaGoogle /> {isSignup ? "SIGN UP" : "SIGN IN"} WITH GOOGLE
              </button>
              <button
                onClick={handleGitHubAuth}
                disabled={isSubmitting}
                className={`w-full uppercase border-4 ${accentBorderClass} ${accentTextClass} px-6 py-3 font-bold tracking-wider hover:bg-white hover:text-black transition-all duration-150 flex items-center justify-center gap-2`}
              >
                <FaGithub /> {isSignup ? "SIGN UP" : "SIGN IN"} WITH GITHUB
              </button>
            </div>

            <p className="mt-4 text-sm opacity-70 text-center" style={{ fontFamily: pixelFont }}>
              // {isSignup ? "Already registered?" : "Need an account?"}{" "}
              <button
                onClick={() => setIsSignup(!isSignup)}
                className={`underline ${accentTextClass} transition-colors duration-150 px-1`}
              >
                {isSignup ? "Sign In" : "Sign Up"}
              </button>{" "}
              //
            </p>
          </div>
        </section>
      </main>

      <footer
        className={`text-xs border-t-8 border-dashed ${accentBorderClass} p-4 text-center mt-12 relative z-[0]`}
      >
        <p className="mb-4">
          // AI FOR GOOD INITIATIVE // Non-Profit Collective // {new Date().getFullYear()} //
        </p>
        <p className="mt-3 opacity-50">// END_TRANSMISSION //</p>
      </footer>
    </div>
  );
}