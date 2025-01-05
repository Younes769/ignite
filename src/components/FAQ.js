"use client";

import { useState } from 'react';

const faqs = [
  {
    question: "What is DevImpact Hackathon?",
    answer: "A 72-hour coding adventure where you'll turn caffeine into code and dreams into reality! It's like a marathon, but instead of running, you're typing... and instead of getting tired legs, you get tired eyes! 👀"
  },
  {
    question: "Why should I participate?",
    answer: "Why did the programmer quit his job? Because he didn't get arrays! 😄 But seriously, you'll get to build amazing projects, network with fellow developers, and maybe win some cool prizes. Plus, free food! 🍕"
  },
  {
    question: "Do I need to be an expert programmer?",
    answer: "Not at all! Even a programmer who puts 'Hello World' on their resume is welcome! We welcome all skill levels, from 'I just learned what HTML stands for' to 'I debug in my sleep'. 💻"
  },
  {
    question: "What should I bring?",
    answer: "Your laptop, charger, and enthusiasm! And maybe a rubber duck for debugging - it's like a therapist, but cheaper! 🦆"
  },
  {
    question: "How does team formation work?",
    answer: "Why did the two functions stop calling each other? Because they had constant arguments! 😅 You can either form a team beforehand or find teammates during the event. Max team size is 4 members."
  },
  {
    question: "What kind of projects can we build?",
    answer: "Anything! From web apps to mobile apps to AI and more. Just remember: there are 10 types of projects in the world - those that work and those that don't! (Get it? Binary joke! 🤓)"
  },
  {
    question: "Is there food provided?",
    answer: "Yes! We'll keep you fueled with food and drinks. After all, a programmer's stomach is like a stack - it's always pushing for more! 🍔"
  },
  {
    question: "What's the judging criteria?",
    answer: "Projects will be judged on innovation, technical complexity, and impact. And no, 'It works on my machine' is not a valid defense! 😉"
  },
  {
    question: "Will there be mentors?",
    answer: "Yes! Our mentors are like a guide for your project - they'll help you navigate through challenges and ensure you're on the right track! 🧐"
  },
  {
    question: "How can I make the most of this event?",
    answer: "Collaborate, network, and have fun! Meet fellow developers, share ideas. Remember: networking is just socializing with better variable names! 🤝"
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          <span className="text-white">Frequently Asked </span>
          <span className="relative inline-block">
            <span className="absolute -inset-1 bg-emerald-500/20 blur-xl rounded-full"></span>
            <span className="relative bg-gradient-to-r from-emerald-400 to-emerald-300 text-transparent bg-clip-text">
              Questions
            </span>
          </span>
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="relative group"
            >
              {/* Background glow effect */}
              <div 
                className={`
                  absolute -inset-px bg-gradient-to-r from-emerald-500/20 to-emerald-500/0 
                  rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
                  ${openIndex === index ? 'opacity-100' : ''}
                `}
              />
              
              {/* FAQ Item */}
              <div className="relative bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between"
                >
                  <span className="text-white font-medium">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-white/60 transform transition-transform duration-200 ${
                      openIndex === index ? 'rotate-180' : ''
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
                    ${openIndex === index ? 'max-h-96 pb-4' : 'max-h-0'}
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