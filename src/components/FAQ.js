"use client";

import { useState, useEffect } from 'react';

const faqs = [
  {
    question: "What is a hackathon?",
    answer: "A hackathon is an intensive event where innovators come together to solve challenges and build amazing projects in a limited time. It's about learning, collaborating, and creating something meaningful."
  },
  {
    question: "Do I need to be an experienced programmer?",
    answer: "Not at all! We welcome participants of all skill levels. What matters most is your enthusiasm to learn and create. We'll have mentors to guide you throughout the event."
  },
  {
    question: "What should I bring?",
    answer: "Bring your laptop, charger, and any other devices you might need. We'll provide the workspace, internet, meals, and plenty of coffee to keep you going!"
  },
  {
    question: "How are teams formed?",
    answer: "You can form your own team of up to 4 members or join our team formation session where you'll meet other participants. We'll help you find the perfect team match!"
  },
  {
    question: "What kind of projects can I build?",
    answer: "You have the freedom to build any type of project that interests you - whether it's a web app, mobile app, game, or hardware hack. We encourage innovation and creativity!"
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('faq-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="py-24 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,_rgba(16,185,129,0.05)_0%,_transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,_rgba(16,185,129,0.05)_0%,_transparent_50%)]"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <h2 
          className={`
            text-4xl md:text-5xl font-bold text-center mb-16
            transform transition-all duration-1000
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
          `}
        >
          <span className="text-white">Common </span>
          <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 inline-block text-transparent bg-clip-text">
            Questions
          </span>
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`
                transform transition-all duration-1000 delay-${index * 100}
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
              `}
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full group"
              >
                <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
                  {/* Question */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white pr-8">{faq.question}</h3>
                    <div 
                      className={`
                        w-6 h-6 rounded-full border-2 border-emerald-500/50 flex items-center justify-center
                        transition-transform duration-300
                        ${activeIndex === index ? 'rotate-180 bg-emerald-500/20' : ''}
                      `}
                    >
                      <svg 
                        className="w-4 h-4 text-emerald-400" 
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
                    </div>
                  </div>

                  {/* Answer */}
                  <div 
                    className={`
                      overflow-hidden transition-all duration-300 ease-in-out
                      ${activeIndex === index ? 'max-h-48 mt-4' : 'max-h-0'}
                    `}
                  >
                    <p className="text-white/60">{faq.answer}</p>
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-emerald-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ; 