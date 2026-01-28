import { Mail, Phone, MapPin } from "lucide-react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useRef, useState } from "react";
import emailjs from "emailjs-com";

const ContactUs = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,     
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,    
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY      
      )
      .then(
        () => {
          setSuccess("Message sent successfully 🚀");
          setLoading(false);
          formRef.current.reset();
        },
        (error) => {
          console.error(error);
          setSuccess("Something went wrong ❌");
          setLoading(false);
        }
      );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-slate-900 to-black text-white">
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow px-6 py-16 mt-25 mb-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

          {/* Left */}
          <div>
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-slate-400 mb-8">
              Have questions or want to work with AlgoAI?  
              We’d love to hear from you.
            </p>

            <div className="space-y-5 text-slate-300">
              <div className="flex items-center gap-3">
                <Mail className="text-cyan-400" />
                <span>support@algoai.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-cyan-400" />
                <span>+91 7248973985</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-cyan-400" />
                <span>India</span>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <form
            ref={formRef}
            onSubmit={sendEmail}
            className="bg-slate-900/60 border border-slate-800 rounded-xl p-8 space-y-4"
          >
            <input
              name="name"
              required
              className="w-full bg-black/40 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none"
              placeholder="Your Name"
            />

            <input
              name="email"
              type="email"
              required
              className="w-full bg-black/40 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none"
              placeholder="Email Address"
            />

            <textarea
              name="message"
              rows="4"
              required
              className="w-full bg-black/40 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none"
              placeholder="Your Message"
            ></textarea>

            <button
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {success && (
              <p className="text-sm text-center text-green-400 mt-2">
                {success}
              </p>
            )}
          </form>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactUs;
