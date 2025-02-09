"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What is IGNITE?",
    answer:
      "IGNITE is a unique three-day event combining a startup showcase and ideathon. Day 1 features an interactive startup exhibition, while Days 2-3 are dedicated to an exciting ideathon where participants develop innovative solutions. 🚀",
  },
  {
    question: "How does the startup showcase work?",
    answer:
      "On Day 1, various startups will have dedicated spaces where you can interact with their representatives, learn about their journey, and get inspired by their innovations. It's a great opportunity to network and learn from real-world experiences! 💡",
  },
  {
    question: "What is the ideathon format?",
    answer:
      "The ideathon spans Days 2-3, where participants form teams to develop innovative solutions to real-world challenges. You'll get guidance from mentors, work on your ideas, and present them to judges for a chance to win exciting prizes! 🏆",
  },
  {
    question: "Who can participate in the ideathon?",
    answer:
      "Anyone with innovative ideas is welcome! Whether you're a student, professional, or enthusiast, if you're passionate about creating impactful solutions, IGNITE is for you. No technical expertise required - we value creativity and innovation! ✨",
  },
  {
    question: "How does team formation work?",
    answer:
      "You can either form a team beforehand or find teammates during the event. Teams should have 2-4 members. Don't worry if you don't have a team - we'll help you connect with other participants! 🤝",
  },
  {
    question: "What kind of ideas can we work on?",
    answer:
      "Any innovative solution that addresses real-world problems! Your idea could be related to technology, business, social impact, or any other domain. The key is to think creatively and focus on feasibility and impact. 🌟",
  },
  {
    question: "Will there be food and refreshments?",
    answer:
      "Yes! We'll provide meals and refreshments throughout the event to keep you energized and focused on your ideas! 🍽️",
  },
  {
    question: "What's the judging criteria for the ideathon?",
    answer:
      "Projects will be judged on innovation, feasibility, potential impact, and presentation quality. Our panel of experienced judges will evaluate how well your solution addresses the problem and its potential for real-world implementation. ⭐",
  },
  {
    question: "Will there be mentors available?",
    answer:
      "Absolutely! We have industry experts and experienced mentors who will guide you throughout the ideathon. They'll help you refine your ideas and provide valuable insights for development. 🎯",
  },
  {
    question: "What should I bring?",
    answer:
      "Bring your laptop, charger, and most importantly, your creative mindset! All other materials and resources will be provided at the venue. 💻",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          <span className="text-white">Frequently Asked </span>
          <span className="relative inline-block">
            <span className="absolute -inset-1 bg-orange-500/20 blur-xl rounded-full"></span>
            <span className="relative bg-gradient-to-r from-orange-400 to-orange-500 text-transparent bg-clip-text">
              Questions
            </span>
          </span>
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="relative group">
              {/* Background glow effect */}
              <div
                className={`
                  absolute -inset-px bg-gradient-to-r from-orange-500/20 to-orange-500/0 
                  rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
                  ${openIndex === index ? "opacity-100" : ""}
                `}
              />

              {/* FAQ Item */}
              <div className="relative bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 overflow-hidden">
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full px-6 py-4 text-left flex items-center justify-between"
                >
                  <span className="text-white font-medium">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-white/60 transform transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Answer */}
                <div
                  className={`
                    px-6 overflow-hidden transition-all duration-300 ease-in-out
                    ${openIndex === index ? "max-h-96 pb-4" : "max-h-0"}
                  `}
                >
                  <p className="text-white/60">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
