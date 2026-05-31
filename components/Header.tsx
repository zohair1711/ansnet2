"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Lottie from "lottie-react";
import { Menu, X, Wifi, Phone, Zap } from "lucide-react";
import fiberAnimation from "../public/animations/fiber.json";

const navLinks = [
  { label: "الرئيسية", href: "#home" },
  { label: "الباقات", href: "#packages" },
  { label: "المميزات", href: "#features" },
  { label: "التغطية", href: "#coverage" },
  { label: "تواصل معنا", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      id="home"
      dir="rtl"
      className="relative min-h-screen overflow-hidden bg-slate-950 text-white"
    >
      {/* خلفيات فاخرة */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.35),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(147,51,234,0.30),transparent_35%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(15,23,42,0.35),rgba(15,23,42,0.95))]" />

      {/* خطوط إضاءة */}
      <div className="absolute right-0 top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute bottom-10 left-0 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />

      {/* Navbar */}
      <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
        {/* Logo */}
        <motion.a
          href="#home"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-2xl shadow-blue-500/20 backdrop-blur-xl">
            <Wifi className="h-6 w-6 text-cyan-300" />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-wide">
              فايبر بلس
            </h1>
            <p className="text-xs text-slate-300">
              إنترنت أسرع لحياة أذكى
            </p>
          </div>
        </motion.a>

        {/* Desktop Links */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-2 backdrop-blur-2xl lg:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-5 py-2 text-sm text-slate-200 transition hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </motion.div>

        {/* CTA Desktop */}
        <motion.a
          href="https://wa.me/966500000000"
          target="_blank"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden items-center gap-2 rounded-full bg-gradient-to-l from-cyan-400 to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-2xl shadow-blue-500/30 transition hover:scale-105 lg:flex"
        >
          <Phone className="h-4 w-4" />
          اطلب الآن
        </motion.a>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-30 mx-5 rounded-3xl border border-white/10 bg-slate-900/85 p-4 shadow-2xl backdrop-blur-2xl lg:hidden"
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm text-slate-200 transition hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </a>
            ))}

            <a
              href="https://wa.me/966500000000"
              target="_blank"
              className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-cyan-400 to-blue-600 px-5 py-3 text-sm font-bold text-white"
            >
              <Phone className="h-4 w-4" />
              اطلب الآن
            </a>
          </div>
        </motion.div>
      )}

      {/* Hero Content */}
      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-92px)] max-w-7xl items-center gap-10 px-5 pb-16 pt-8 lg:grid-cols-2 lg:px-8">
        {/* Text */}
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100 backdrop-blur-xl"
          >
            <Zap className="h-4 w-4 text-cyan-300" />
            عروض فايبر وإنترنت منزلي بسرعات عالية
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-7xl"
          >
            إنترنت أسرع.
            <br />
            <span className="bg-gradient-to-l from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              تجربة أفخم.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg"
          >
            اختر باقتك المناسبة من عروض الفايبر والإنترنت المنزلي، بسرعة
            عالية، استقرار ممتاز، وتركيب سريع يناسب بيتك أو مكتبك.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-9 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="#packages"
              className="rounded-full bg-white px-8 py-4 text-center text-sm font-extrabold text-slate-950 shadow-2xl shadow-white/10 transition hover:scale-105"
            >
              شاهد الباقات
            </a>

            <a
              href="https://wa.me/966500000000"
              target="_blank"
              className="rounded-full border border-white/15 bg-white/10 px-8 py-4 text-center text-sm font-extrabold text-white backdrop-blur-xl transition hover:bg-white/15"
            >
              تواصل واتساب
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 grid grid-cols-3 gap-3 sm:max-w-lg"
          >
            <div className="rounded-3xl border border-white/10 bg-white/8 p-4 text-center backdrop-blur-xl">
              <p className="text-2xl font-black text-white">500+</p>
              <p className="mt-1 text-xs text-slate-400">ميجا</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/8 p-4 text-center backdrop-blur-xl">
              <p className="text-2xl font-black text-white">24/7</p>
              <p className="mt-1 text-xs text-slate-400">دعم</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/8 p-4 text-center backdrop-blur-xl">
              <p className="text-2xl font-black text-white">سريع</p>
              <p className="mt-1 text-xs text-slate-400">التركيب</p>
            </div>
          </motion.div>
        </div>

        {/* Lottie */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative mx-auto w-full max-w-lg"
        >
          <div className="absolute inset-6 rounded-full bg-cyan-400/20 blur-3xl" />

          <div className="relative rounded-[2.5rem] border border-white/10 bg-white/8 p-6 shadow-2xl shadow-blue-950/50 backdrop-blur-2xl">
            <Lottie
              animationData={fiberAnimation}
              loop
              autoplay
              className="mx-auto h-[320px] w-full sm:h-[420px]"
            />
          </div>

          <div className="absolute -bottom-5 right-6 rounded-3xl border border-white/10 bg-slate-900/80 px-5 py-4 shadow-2xl backdrop-blur-xl">
            <p className="text-sm text-slate-300">سرعة تبدأ من</p>
            <p className="text-2xl font-black text-cyan-300">199 ريال</p>
          </div>
        </motion.div>
      </section>
    </header>
  );
}