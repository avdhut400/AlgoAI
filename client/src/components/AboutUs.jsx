import Navbar from "./Navbar";
import Footer from "./Footer";
import { Brain, ShieldCheck, Rocket } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-slate-900 to-black text-white">
      <Navbar />

      <main className="flex-grow px-6 py-20 mt-25 mb-20">
        <div className="max-w-5xl mx-auto text-center">

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-cyan-400">AlgoAI</span>
          </h1>

          <p className="text-slate-400 text-lg leading-relaxed mb-12">
            AlgoAI is a modern AI-powered SaaS platform built to simplify
            creativity, productivity, and automation using cutting-edge
            artificial intelligence.
          </p>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <Brain className="text-cyan-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
              <p className="text-slate-400">
                Make AI tools accessible, simple, and useful for everyone.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <Rocket className="text-cyan-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
              <p className="text-slate-400">
                Build the future of AI-powered SaaS platforms.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <ShieldCheck className="text-cyan-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-2">Our Values</h3>
              <p className="text-slate-400">
                Innovation, Security, Transparency, and Scalability.
              </p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
