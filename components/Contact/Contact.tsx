
"use client";

import React, { useEffect } from "react";
import { useForm } from "@formspree/react";
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import confetti from "canvas-confetti";

export default function Contact() {

  const [state, handleSubmit, reset] = useForm("xgogkkqp");

  useEffect(() => {
    if (state.succeeded) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#9A6F4E", "#E5A97D", "#F6F1EB", "#2C1E1B"],
      });

      reset();
    }
  }, [state.succeeded]);

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-bg-secondary/5">
      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-accent/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-accent/2 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-widest text-accent font-semibold mb-2">Get In Touch</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-text-primary">Contact Me</h3>
          <div className="h-1 bg-accent mx-auto mt-4 rounded-full w-15" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h4 className="text-2xl font-bold text-text-primary">Let&apos;s build something impactful.</h4>
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                Whether you have a project idea, want to discuss AI systems, or simply say hello,
                feel free to reach out.
              </p>
            </div>

            <div className="space-y-6">
              <a href={`mailto:${portfolioData.personal.email}`} className="premium-card rounded-xl p-5 flex items-center gap-4 hover:border-accent group transition-all">
                <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-text-muted tracking-wider">Email me</p>
                  <p className="text-sm font-semibold text-text-primary">{portfolioData.personal.email}</p>
                </div>
              </a>

              <a href={`tel:${portfolioData.personal.phone.replace(/\s+/g, "")}`} className="premium-card rounded-xl p-5 flex items-center gap-4 hover:border-accent group transition-all">
                <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-text-muted tracking-wider">Call me</p>
                  <p className="text-sm font-semibold text-text-primary">{portfolioData.personal.phone}</p>
                </div>
              </a>

              <div className="premium-card rounded-xl p-5 flex items-center gap-4">
                <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-text-muted tracking-wider">Location</p>
                  <p className="text-sm font-semibold text-text-primary">{portfolioData.personal.location}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="glass rounded-3xl p-6 sm:p-10 shadow-premium-lg border border-glass-border">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <input type="text" name="name" required placeholder="Full Name"
                    disabled={state.submitting}
                    className="w-full px-4 py-3 rounded-xl border border-border-color bg-bg-primary/50" />
                  <input type="email" name="email" required placeholder="Email Address"
                    disabled={state.submitting}
                    className="w-full px-4 py-3 rounded-xl border border-border-color bg-bg-primary/50" />
                </div>

                <input type="text" name="subject" placeholder="Subject"
                  disabled={state.submitting}
                  className="w-full px-4 py-3 rounded-xl border border-border-color bg-bg-primary/50" />

                <textarea name="message" rows={5} required placeholder="Your message..."
                  disabled={state.submitting}
                  className="w-full px-4 py-3 rounded-xl border border-border-color bg-bg-primary/50 resize-none" />

                <button type="submit"
                  disabled={state.submitting}
                  className="w-full py-4 rounded-xl bg-accent text-bg-primary font-bold flex justify-center items-center gap-2">
                  {state.submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>

                <AnimatePresence>
                  {state.succeeded && (
                    <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle2 size={18}/> Message sent successfully!
                      </div>
                    </motion.div>
                  )}

                  {state.errors && (
                    <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
                      <div className="flex items-center gap-2 text-red-500">
                        <Sparkles size={18}/> Something went wrong. Please try again.
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
