import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import type { MetaFunction } from "@remix-run/node";
import { FaArrowRight, FaGithub } from "react-icons/fa";
import { useForm, ValidationError } from '@formspree/react';
import { Link, useNavigate } from "@remix-run/react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const pixelFont = "'Pixelify Sans', monospace";
const monoFont = "'IBM Plex Mono', monospace";
const serifFont = "'Libre Baskerville', serif";
const accentColor = "#ffffff";


const About = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [contactFormState, handleSubmit] = useForm("mzbryvya");
  const [message, setMessage] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoggedIn(!!currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (contactFormState.succeeded) {
      setMessage('Thank you for your message! We will get back to you soon.');
      setTimeout(() => setMessage(''), 5000); // Clear message after 5 seconds
    }
  }, [contactFormState.succeeded]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div style={{ backgroundColor: '#000', color: accentColor, padding: '2rem', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: `2px solid ${accentColor}`, paddingBottom: '1rem' }}>
        <h1 style={{ fontFamily: pixelFont, fontSize: '2rem', fontWeight: 'normal' }}>
          <Link to="/" style={{ textDecoration: 'none', color: accentColor }}>AI for Good</Link>
        </h1>
        <nav>
          <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem' }}>
            <li><Link to="/about" style={{ textDecoration: 'none', color: accentColor, fontFamily: monoFont }}>About</Link></li>
            {isLoggedIn && (
              <>
                <li><Link to="/dashboard" style={{ textDecoration: 'none', color: accentColor, fontFamily: monoFont }}>Dashboard</Link></li>
                <li><button onClick={handleSignOut} style={{ background: 'none', border: 'none', color: accentColor, cursor: 'pointer', fontFamily: monoFont }}>Sign Out</button></li>
              </>
            )}
            {!isLoggedIn && (
              <li><Link to="/auth" style={{ textDecoration: 'none', color: accentColor, fontFamily: monoFont }}>Sign In</Link></li>
            )}
          </ul>
        </nav>
      </header>

      {/* Main Heading */}
      <h1 style={{ fontFamily: pixelFont, fontSize: '3rem', fontWeight: 'normal', textAlign: 'center', marginBottom: '2rem' }}>
        AI for Good Initiative
      </h1>

      {/* Introduction */}
      <section style={{ marginBottom: '3rem', padding: '1rem', border: `1px dashed ${accentColor}` }}>
        <p style={{ fontFamily: serifFont, fontSize: '1.2rem', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto' }}>
          We are a collective of researchers and developers dedicated to leveraging Artificial Intelligence for societal benefit.
          Our work focuses on creating impactful solutions for global challenges, promoting ethical AI practices, and ensuring equitable access to technology.
        </p>
      </section>

      {/* Our Mission */}
      <motion.section style={{ marginBottom: '3rem', padding: '1rem', border: `1px dotted ${accentColor}` }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <h2 style={{ fontFamily: pixelFont, fontSize: '2rem', fontWeight: 'normal', marginBottom: '1rem' }}>Our Mission</h2>
        <p style={{ fontFamily: serifFont, fontSize: '1.2rem', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto' }}>
          Our mission is to harness the power of AI to address pressing global issues such as climate change, healthcare disparities, poverty, and inequality.
          We strive to develop innovative and ethical AI solutions that are accessible to all, fostering a more sustainable and equitable future.
        </p>
      </motion.section>

      {/* Our Vision */}
      <motion.section style={{ marginBottom: '3rem', padding: '1rem', border: `1px solid ${accentColor}` }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <h2 style={{ fontFamily: pixelFont, fontSize: '2rem', fontWeight: 'normal', marginBottom: '1rem' }}>Our Vision</h2>
        <p style={{ fontFamily: serifFont, fontSize: '1.2rem', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto' }}>
          We envision a world where AI is a force for good, driving positive change and improving the lives of people everywhere.
          Our long-term goals include creating a global network of AI for Good initiatives, influencing policy and ethical standards in AI development,
          and ensuring that AI benefits are shared by all communities, especially those most in need.
        </p>
      </motion.section>

      {/* What We Do */}
      <section style={{ marginBottom: '3rem', padding: '1rem', border: `2px dashed ${accentColor}` }}>
        <h2 style={{ fontFamily: pixelFont, fontSize: '2rem', fontWeight: 'normal', marginBottom: '1rem' }}>What We Do</h2>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p style={{ fontFamily: serifFont, fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '1rem' }}>
            We engage in a variety of activities and projects, including:
          </p>          <motion.ul style={{ listStyle: 'disc', marginLeft: '2rem' }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
            <motion.li style={{ fontFamily: serifFont, fontSize: '1.2rem', lineHeight: '1.6' }}
            whileHover={{ scale: 1.05 }}>              Research and development of AI solutions for specific global challenges.
            </motion.li>            <motion.li style={{ fontFamily: serifFont, fontSize: '1.2rem', lineHeight: '1.6' }}
            whileHover={{ scale: 1.05 }}>              Collaborations with organizations and communities to implement and scale AI projects.
            </motion.li>            <motion.li style={{ fontFamily: serifFont, fontSize: '1.2rem', lineHeight: '1.6' }}
            whileHover={{ scale: 1.05 }}>              Advocacy for ethical AI practices and responsible technology development.
            </motion.li>            <motion.li style={{ fontFamily: serifFont, fontSize: '1.2rem', lineHeight: '1.6' }}
            whileHover={{ scale: 1.05 }}>              Educational programs and workshops to promote AI literacy and skills.
            </motion.li>            <motion.li style={{ fontFamily: serifFont, fontSize: '1.2rem', lineHeight: '1.6' }}
            whileHover={{ scale: 1.05 }}>              Open-source initiatives and knowledge sharing to accelerate AI innovation.
            </motion.li>          </motion.ul>


        </div>
      </section>

      {/* Our Impact */}
      <section style={{ marginBottom: '3rem', padding: '1rem', border: `2px dotted ${accentColor}` }}>
        <h2 style={{ fontFamily: pixelFont, fontSize: '2rem', fontWeight: 'normal', marginBottom: '1rem' }}>Our Impact</h2>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p style={{ fontFamily: serifFont, fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '1rem' }}>
            Our work has led to significant advancements and positive outcomes, including:
          </p>
          <ul style={{ listStyle: 'disc', marginLeft: '2rem' }}>
            <motion.li style={{ fontFamily: serifFont, fontSize: '1.2rem', lineHeight: '1.6' }}
            whileHover={{ scale: 1.05 }}>              Development of an AI-powered early warning system for natural disasters, reducing response times by 30%.
            </motion.li>            <motion.li style={{ fontFamily: serifFont, fontSize: '1.2rem', lineHeight: '1.6' }}
            whileHover={{ scale: 1.05 }}>              Implementation of AI-driven diagnostic tools in underserved communities, improving healthcare access for over 10,000 people.
            </motion.li>            <motion.li style={{ fontFamily: serifFont, fontSize: '1.2rem', lineHeight: '1.6' }}
            whileHover={{ scale: 1.05 }}>              Creation of an AI platform to optimize resource allocation in humanitarian aid, increasing efficiency by 25%.
            </motion.li>            <motion.li style={{ fontFamily: serifFont, fontSize: '1.2rem', lineHeight: '1.6' }}
            whileHover={{ scale: 1.05 }}>              Launch of an educational program that has trained 500 individuals from diverse backgrounds in AI skills.
            </motion.li>
          </ul>
        </div>
      </section>

      {/* Team and Advisors */}
      <section style={{ marginBottom: '3rem', padding: '1rem', border: `2px solid ${accentColor}` }}>
        <h2 style={{ fontFamily: pixelFont, fontSize: '2rem', fontWeight: 'normal', marginBottom: '1rem' }}>Team and Advisors</h2>
        <motion.div style={{ maxWidth: '800px', margin: '0 auto' }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
          <motion.h3 style={{ fontFamily: pixelFont, fontSize: '1.5rem', fontWeight: 'normal', marginBottom: '0.5rem' }}
          initial={{ x: -50 }} animate={{ x: 0 }} transition={{ duration: 0.3 }}>Our Team</motion.h3>          <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1rem' }}>
            <motion.li style={{ fontFamily: serifFont, fontSize: '1.2rem', lineHeight: '1.6' }}
            whileHover={{ x: 5 }}>              <strong>Dr. Anya Sharma</strong> - Lead Researcher
            </motion.li>            <motion.li style={{ fontFamily: serifFont, fontSize: '1.2rem', lineHeight: '1.6' }}
            whileHover={{ x: 5 }}>              <strong>Ben Carter</strong> - Senior Developer
            </motion.li>            <motion.li style={{ fontFamily: serifFont, fontSize: '1.2rem', lineHeight: '1.6' }}
            whileHover={{ x: 5 }}>              <strong>Maria Rodriguez</strong> - Community Outreach
            </motion.li>          </ul>

          <motion.h3 style={{ fontFamily: pixelFont, fontSize: '1.5rem', fontWeight: 'normal', marginBottom: '0.5rem' }}
          initial={{ x: -50 }} animate={{ x: 0 }} transition={{ duration: 0.3 }}>Our Advisors</motion.h3>          <ul style={{ listStyle: 'none', padding: 0 }}>
            <motion.li style={{ fontFamily: serifFont, fontSize: '1.2rem', lineHeight: '1.6' }}
            whileHover={{ x: 5 }}>              <strong>Dr. Kenji Tanaka</strong> - AI Ethics Advisor
            </motion.li>            <motion.li style={{ fontFamily: serifFont, fontSize: '1.2rem', lineHeight: '1.6' }}
            whileHover={{ x: 5 }}>              <strong>Dr. Ingrid Dubois</strong> - Global Health Advisor
            </motion.li>            <motion.li style={{ fontFamily: serifFont, fontSize: '1.2rem', lineHeight: '1.6' }}
            whileHover={{ x: 5 }}>              <strong>Mr. Javier Hernandez</strong> - Sustainable Development Advisor
            </motion.li>          </ul>

        </motion.div>


      </section>

      {/* Partners and Collaborators */}
      <section style={{ marginBottom: '3rem', padding: '1rem', border: `3px dashed ${accentColor}` }}>
        <h2 style={{ fontFamily: pixelFont, fontSize: '2rem', fontWeight: 'normal', marginBottom: '1rem' }}>Partners and Collaborators</h2>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p style={{ fontFamily: serifFont, fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '1rem' }}>
            We are proud to collaborate with the following organizations:          </p>          <motion.ul style={{ listStyle: 'none', padding: 0 }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.8 }}>
            <motion.li style={{ fontFamily: serifFont, fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '0.5rem' }}
            whileHover={{ x: 5 }}>              <strong>Global Tech Initiative</strong> - Technology partner providing infrastructure and expertise.
            </motion.li>            <motion.li style={{ fontFamily: serifFont, fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '0.5rem' }}
            whileHover={{ x: 5 }}>              <strong>Health for All Foundation</strong> - Collaborator on AI solutions for healthcare access.
            </motion.li>            <motion.li style={{ fontFamily: serifFont, fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '0.5rem' }}
            whileHover={{ x: 5 }}>              <strong>Climate Action Network</strong> - Partner on AI applications for climate change mitigation.
            </motion.li>          </motion.ul>


        </div>
      </section>

      {/* Contact Us */}
      <section style={{ marginBottom: '3rem', padding: '1rem', border: `3px dotted ${accentColor}` }}>
        <h2 style={{ fontFamily: pixelFont, fontSize: '2rem', fontWeight: 'normal', marginBottom: '1rem' }}>Contact Us</h2>
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          {message && <p style={{ color: 'green', fontFamily: monoFont, marginBottom: '1rem' }}>{message}</p>}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="email" style={{ fontFamily: monoFont, marginBottom: '0.5rem' }}>Email:</label>
            <input
              id="email"
              type="email"
              name="email"
              style={{ fontFamily: monoFont, marginBottom: '1rem', padding: '0.5rem', background: '#333', color: accentColor, border: 'none' }}
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={contactFormState.errors}
            />
            <label htmlFor="message" style={{ fontFamily: monoFont, marginBottom: '0.5rem' }}>Message:</label>
            <textarea
              id="message"
              name="message"
              style={{ fontFamily: monoFont, marginBottom: '1rem', padding: '0.5rem', background: '#333', color: accentColor, border: 'none', minHeight: '100px' }}
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={contactFormState.errors}
            />
            <button type="submit" disabled={contactFormState.submitting} style={{ fontFamily: pixelFont, padding: '0.5rem 1rem', background: accentColor, color: '#000', border: 'none', cursor: 'pointer' }}>
              Submit
            </button>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '1rem', border: `1px dashed ${accentColor}` }}>
        <h2 style={{ fontFamily: pixelFont, fontSize: '2rem', fontWeight: 'normal', marginBottom: '1rem' }}>FAQ</h2>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ marginBottom: '1rem' }}>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 1 }}>
              <h3 style={{ fontFamily: pixelFont, fontSize: '1.5rem', fontWeight: 'normal', marginBottom: '0.5rem' }}>
                What is the AI for Good Initiative?
              </h3>
              <p style={{ fontFamily: serifFont, fontSize: '1.2rem', lineHeight: '1.6' }}>
                The AI for Good Initiative is a collective focused on using Artificial Intelligence to address global challenges and promote ethical technology practices.
              </p>
            </motion.div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 1.2 }}>
              <h3 style={{ fontFamily: pixelFont, fontSize: '1.5rem', fontWeight: 'normal', marginBottom: '0.5rem' }}>
                How can I get involved?
              </h3>
              <p style={{ fontFamily: serifFont, fontSize: '1.2rem', lineHeight: '1.6' }}>
                We welcome contributions from researchers, developers, and anyone passionate about using AI for positive impact. Please visit our "Get Involved" page or contact us for more information.
              </p>
            </motion.div>
          </div>
          <div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 1.4 }}>
              <h3 style={{ fontFamily: pixelFont, fontSize: '1.5rem', fontWeight: 'normal', marginBottom: '0.5rem' }}>                Is the initiative open source?
              </h3>              <p style={{ fontFamily: serifFont, fontSize: '1.2rem', lineHeight: '1.6' }}>                Many of our projects are open source to encourage collaboration and accelerate innovation. Check out our GitHub repository for more details.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ marginTop: '4rem', borderTop: `2px solid ${accentColor}`, paddingTop: '1rem', textAlign: 'center' }}>
        <p style={{ fontFamily: monoFont }}>
          © {new Date().getFullYear()} AI for Good Initiative
        </p>
      </footer>
    </div>
  );
};

export default About;