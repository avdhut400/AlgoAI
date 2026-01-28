import Navbar from "./Navbar";
import Footer from "./Footer";
import { Check } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "₹0",
      description: "For beginners exploring AI tools",
      features: [
        "Basic AI tools",
        "Limited usage",
        "Community support",
      ],
      highlight: false,
    },
    {
      name: "Pro",
      price: "₹499 / month",
      description: "Best for professionals & creators",
      features: [
        "All AI tools",
        "Higher usage limits",
        "Priority support",
        "Faster processing",
      ],
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For businesses & teams",
      features: [
        "Unlimited usage",
        "Dedicated support",
        "Custom AI solutions",
        "Advanced analytics",
      ],
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-slate-900 to-black text-white">
      <Navbar />

      <main className="flex-grow px-6 py-20  mt-15 mb-15">
        <div className="max-w-6xl mx-auto text-center">

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Pricing Plans
          </h1>
          <p className="text-slate-400 mb-12">
            Choose the plan that fits your needs
          </p>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-xl p-8 border ${
                  plan.highlight
                    ? "border-cyan-500 bg-slate-900/80 scale-105"
                    : "border-slate-800 bg-slate-900/50"
                }`}
              >
                <h3 className="text-xl font-semibold mb-2">
                  {plan.name}
                </h3>

                <p className="text-slate-400 mb-4">
                  {plan.description}
                </p>

                <div className="text-3xl font-bold text-cyan-400 mb-6">
                  {plan.price}
                </div>

                <ul className="space-y-3 text-slate-300 mb-6 text-left">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="text-cyan-400" size={18} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-lg font-semibold ${
                    plan.highlight
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600"
                      : "bg-slate-800 hover:bg-slate-700"
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
