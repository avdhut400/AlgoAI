import Navbar from "./Navbar";
import Footer from "./Footer";
import { PlayCircle } from "lucide-react";

const tools = [
  {
    title: "AI Article Generator",
    desc: "Generate high-quality articles using AI in seconds.",
    video: "/article-demo.mp4", // public folder
  },
  {
    title: "AI Image Generator",
    desc: "Create stunning images from text prompts.",
    video: "/image-demo.mp4",
  },
  {
    title: "Background Remover",
    desc: "Remove image backgrounds with a single click.",
    video: "/bg-remove-demo.mp4",
  },
  {
    title: "Resume Review AI",
    desc: "Get instant AI-powered resume feedback.",
    video: "/resume-demo.mp4",
  },
];

const Showcase = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-slate-900 to-black text-white">
      <Navbar />

      <main className="flex-grow px-6 py-20">
        <div className="max-w-7xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Explore <span className="text-cyan-400">AlgoAI Tools</span>
            </h1>
            <p className="text-slate-400 text-lg">
              Experience AI tools through real-time demos
            </p>
          </div>

          {/* Tool Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="group relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 backdrop-blur-lg hover:border-cyan-500 transition-all"
              >

                {/* Video */}
                <div className="relative h-52 overflow-hidden">
                  <video
                    src={tool.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <PlayCircle size={48} className="text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4">
                    {tool.desc}
                  </p>

                  <button className="text-cyan-400 text-sm font-medium hover:underline">
                    Try this tool →
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Showcase;
