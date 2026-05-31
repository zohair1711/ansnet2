"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import {
  Wifi,
  Zap,
  Router,
  Phone,
  PhoneCall,
  MessageCircle,
  FileText,
  Lock,
  HelpCircle,
  ShieldCheck,
  Gauge,
  Sparkles,
  ArrowLeft,
  Check,
  Crown,
  RadioTower,
  ChevronLeft,
} from "lucide-react";
import { buildPackageWhatsAppText, packages, type PackageItem } from "@/lib/packages";
import { tunnelNavigate } from "@/components/RouteTunnelTransition";

const contactPhoneDisplay = "0509696486";
const contactPhoneWhatsApp = contactPhoneDisplay.startsWith("0")
  ? `966${contactPhoneDisplay.slice(1)}`
  : contactPhoneDisplay;
const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? contactPhoneWhatsApp;
const whatsappHref = `https://wa.me/${whatsappNumber}`;
const zainLogoUrl = "https://eshop.sa.zain.com/wp-content/uploads/Zain-Logo-300px-2020.png";
const heroAdImages = [
  {
    src: "https://eshop.sa.zain.com/wp-content/uploads/2023/08/Group-1321317488-768x953.png",
    alt: "إعلان باقات زين فايبر بلس",
  },
  {
    src: "https://eshop.sa.zain.com/wp-content/uploads/2023/08/Group-1321317469-copy-768x953.png",
    alt: "إعلان باقات زين فايبر بريميوم",
  },
  {
    src: "https://eshop.sa.zain.com/wp-content/uploads/2023/08/Group-1321317471-768x953.png",
    alt: "إعلان باقات زين فايبر بلاك",
  },
] as const;
const subscriptionApps = [
  {
    name: "YouTube Premium",
    iconUrl: "https://www.google.com/s2/favicons?domain=youtube.com&sz=64",
    fallback: "YT",
  },
  {
    name: "Shahid VIP",
    iconUrl: "https://www.google.com/s2/favicons?domain=shahid.mbc.net&sz=64",
    fallback: "شاهد",
  },
  {
    name: "OSN+",
    iconUrl: "https://www.google.com/s2/favicons?domain=osnplus.com&sz=64",
    fallback: "OSN",
  },
  {
    name: "StarzPlay",
    iconUrl: "https://www.google.com/s2/favicons?domain=starzplay.com&sz=64",
    fallback: "SP",
  },
  {
    name: "Anghami",
    iconUrl: "https://www.google.com/s2/favicons?domain=anghami.com&sz=64",
    fallback: "A",
  },
  {
    name: "Disney+",
    iconUrl: "https://www.google.com/s2/favicons?domain=disneyplus.com&sz=64",
    fallback: "D+",
  },
  {
    name: "Amazon Prime",
    iconUrl: "https://www.google.com/s2/favicons?domain=primevideo.com&sz=64",
    fallback: "Prime",
  },
] as const;

function PremiumPackageCard({ item, index }: { item: PackageItem; index: number }) {
  const Icon = item.icon;
  const whatsappText = buildPackageWhatsAppText(item);
  const orderHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 70,
        scale: 0.92,
        rotateX: 12,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
      }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.75,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileTap={{
        scale: 0.985,
      }}
      className={[
        "group relative cursor-pointer overflow-hidden rounded-[2rem] border p-[1px]",
        "shadow-2xl",
        item.glow,
        item.featured
          ? "border-cyan-300/40 bg-gradient-to-b from-cyan-300/40 via-white/10 to-white/5"
          : "border-white/10 bg-gradient-to-b from-white/18 via-white/8 to-white/5",
      ].join(" ")}
      onClick={(e) => {
        if ((e.target as HTMLElement | null)?.closest("a")) return;
        tunnelNavigate(`/packages/${item.slug}`);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") tunnelNavigate(`/packages/${item.slug}`);
      }}
      tabIndex={0}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.22),transparent_35%)] opacity-70" />

      <motion.div
        animate={{
          x: ["120%", "-120%"],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "linear",
          delay: index * 0.5,
        }}
        className="absolute top-0 h-px w-2/3 bg-gradient-to-l from-transparent via-cyan-200 to-transparent"
      />

      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-400/15 blur-3xl transition duration-500 group-hover:bg-cyan-400/25" />
      <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-blue-500/15 blur-3xl transition duration-500 group-hover:bg-blue-500/25" />

      <div className="relative z-10 rounded-[calc(2rem-1px)] bg-slate-950/72 p-5 backdrop-blur-2xl sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div
            className={[
              "inline-flex items-center gap-2 rounded-full bg-gradient-to-l px-3 py-2 text-xs font-black text-slate-950",
              item.gradient,
            ].join(" ")}
          >
            {item.featured ? <Crown className="h-3.5 w-3.5" /> : <RadioTower className="h-3.5 w-3.5" />}
            {item.badge}
          </div>

          <div className="rounded-full border border-white/10 bg-white/8 px-3 py-2 text-[11px] font-bold text-slate-300">
            {item.tag}
          </div>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl">{item.name}</h3>

            <p className="mt-2 text-sm leading-7 text-slate-300">{item.desc}</p>
          </div>

          <motion.div
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.4,
            }}
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl"
          >
            <Icon className="h-7 w-7 text-cyan-300" />
          </motion.div>
        </div>

        <div className="mt-7 rounded-[1.6rem] border border-white/10 bg-white/[0.06] p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">سرعة الباقة</span>
            <span className="text-xs font-bold text-cyan-200">Fiber Speed</span>
          </div>

          <div className="flex items-end gap-2">
            <span className="text-6xl font-black leading-none text-white sm:text-7xl">{item.speed}</span>
            <span className="mb-2 text-sm font-bold text-slate-300">{item.speedUnit}</span>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ width: "0%" }}
              whileInView={{
                width:
                  item.speed === "300" ? "72%" : item.speed === "500" ? "92%" : item.speed === "1" ? "100%" : "60%",
              }}
              viewport={{ once: true }}
              transition={{
                duration: 1.2,
                delay: 0.35 + index * 0.12,
                ease: "easeOut",
              }}
              className={["h-full rounded-full bg-gradient-to-l", item.gradient].join(" ")}
            />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-2.5">
          {item.features.map((feature, featureIndex) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: 0.45 + featureIndex * 0.08,
              }}
              className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.045] px-3.5 py-3"
            >
              <span
                className={[
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-l text-slate-950",
                  item.gradient,
                ].join(" ")}
              >
                <Check className="h-3.5 w-3.5" />
              </span>

              <span className="text-sm font-medium text-slate-200">{feature}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 rounded-[1.6rem] border border-white/10 bg-black/20 p-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-slate-400">يبدأ السعر من</p>

              <div className="mt-1 flex items-end gap-2">
                <span className="text-5xl font-black leading-none text-white">{item.price}</span>
                <span className="mb-1.5 text-sm font-bold text-slate-300">ريال/شهر</span>
              </div>
            </div>

            {item.oldPrice ? (
              <div className="text-left">
                <p className="text-xs text-slate-500">بدلًا من</p>
                <p className="text-lg font-black text-slate-500 line-through">{item.oldPrice}</p>
              </div>
            ) : null}
          </div>
        </div>

        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          href={orderHref}
          target="_blank"
          rel="noreferrer"
          onClick={() => {
            navigator.clipboard?.writeText?.(whatsappText).catch(() => {});
          }}
          className={[
            "mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-l px-6 py-4 text-sm font-black text-slate-950 shadow-2xl transition",
            item.gradient,
          ].join(" ")}
        >
          اطلب هذه الباقة
          <ChevronLeft className="h-4 w-4" />
        </motion.a>

        <p className="mt-4 text-center text-[11px] leading-5 text-slate-500">
          سيتم تحويلك للواتساب لإكمال الطلب والتحقق من التغطية.
        </p>
      </div>
    </motion.article>
  );
}

export default function FiberTimeTunnel() {
  const heroSceneRef = useRef<HTMLDivElement | null>(null);
  const [heroAdIndex, setHeroAdIndex] = useState(0);

  useEffect(() => {
    const intervalMs = 9000;
    const id = window.setInterval(() => {
      setHeroAdIndex((current) => (current + 1) % heroAdImages.length);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, []);

  const { scrollY, scrollYProgress: heroProgress } = useScroll({
    target: heroSceneRef,
    offset: ["start start", "end start"],
  });

  const heroScale = useTransform(scrollY, [0, 40, 120, 260], [1, 1.25, 1.9, 2.7]);

  const heroOpacity = useTransform(scrollY, [0, 20, 80, 160], [1, 0.55, 0.12, 0]);

  const heroAdOpacity = useTransform(heroOpacity, (value) => value * 0.18);
  const heroBlur = useTransform(
    scrollY,
    [0, 40, 120, 220],
    ["blur(0px)", "blur(5px)", "blur(16px)", "blur(28px)"]
  );
  const heroY = useTransform(scrollY, [0, 60, 160, 260], [0, -60, -160, -260]);

  const tunnelScale = useTransform(heroProgress, [0, 0.5], [0.8, 3.8]);
  const tunnelOpacity = useTransform(heroProgress, [0.05, 0.3, 0.55], [0.1, 0.75, 0]);

  return (
    <main
      dir="rtl"
      className="relative min-h-screen overflow-clip bg-slate-950 text-white"
    >
      {/* الخلفية العامة */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.35),transparent_35%),radial-gradient(circle_at_20%_80%,rgba(124,58,237,0.28),transparent_35%),linear-gradient(180deg,#020617,#020617_55%,#07111f)]" />

      {/* النفق الضوئي */}
      <motion.div
        style={{
          scale: tunnelScale,
          opacity: tunnelOpacity,
        }}
        className="fixed left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/20 bg-cyan-300/5 shadow-[0_0_120px_rgba(34,211,238,0.35)]"
      />

      <motion.div
        style={{
          scale: tunnelScale,
          opacity: tunnelOpacity,
        }}
        className="fixed left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/30 bg-blue-500/10 shadow-[0_0_90px_rgba(59,130,246,0.45)]"
      />

      
      <motion.nav
        style={{ opacity: heroOpacity }}
        className="fixed left-0 right-0 top-0 z-50 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8"
      >
        <a href="#" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl">
            <img src={zainLogoUrl} alt="Zain السعودية" className="h-7 w-auto" />
          </div>
          <div>
            <p className="text-lg font-black">باقات زين فايبر</p>
            <p className="text-xs text-slate-300">عروض فايبر المنزلية في السعودية</p>
          </div>
        </a>

        <div className="hidden rounded-full border border-white/10 bg-white/10 px-3 py-2 backdrop-blur-2xl md:flex">
          {[
            { label: "الرئيسية", href: "#home" },
            { label: "الباقات", href: "#packages" },
            { label: "المميزات", href: "#features" },
            { label: "التغطية", href: "#coverage" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-5 py-2 text-sm text-slate-200 transition hover:bg-white/10"
            >
              {item.label}
            </a>
          ))}
        </div>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="hidden items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black text-slate-950 shadow-2xl transition hover:scale-105 md:flex"
        >
          <Phone className="h-4 w-4" />
          اطلب الآن
        </a>
      </motion.nav>

      <div id="home" ref={heroSceneRef} className="relative h-[calc(100svh+220px)]">
        {/* المشهد الأول: الهيدر */}
        <section className="sticky top-0 z-20 flex h-[100svh] items-center justify-center overflow-hidden px-5">
          <motion.div
            style={{ opacity: heroAdOpacity }}
            className="pointer-events-none absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(56,189,248,0.18),transparent_55%),radial-gradient(circle_at_20%_80%,rgba(124,58,237,0.14),transparent_55%)]" />
            <div className="absolute inset-0">
              <AnimatePresence initial={false} mode="wait">
                <motion.img
                  key={heroAdImages[heroAdIndex]?.src}
                  src={heroAdImages[heroAdIndex]?.src}
                  alt={heroAdImages[heroAdIndex]?.alt}
                  initial={{ opacity: 0, scale: 1.08, y: 18 }}
                  animate={{
                    opacity: 1,
                    scale: [1.06, 1.02, 1.06],
                    y: [12, -6, 12],
                  }}
                  exit={{ opacity: 0, scale: 1.02, y: -8 }}
                  transition={{ duration: 0.95, ease: "easeInOut" }}
                  className="absolute left-1/2 top-1/2 w-[560px] max-w-[92vw] -translate-x-1/2 -translate-y-1/2 rotate-6 select-none mix-blend-screen opacity-90 blur-[0.3px] saturate-150 contrast-125"
                  draggable={false}
                />
              </AnimatePresence>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/85" />
          </motion.div>

          <motion.div
            style={{
              scale: heroScale,
              opacity: heroOpacity,
              filter: heroBlur,
              y: heroY,
            }}
            className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 pt-24 lg:grid-cols-2"
          >
            <div className="relative z-10 max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100 backdrop-blur-xl"
              >
                <Sparkles className="h-4 w-4 text-cyan-300" />
                تجربة إنترنت تدخل بك إلى مستوى جديد
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl font-black leading-tight tracking-tight sm:text-6xl lg:text-8xl"
              >
                ادخل عالم
                <br />
                <span className="bg-gradient-to-l from-cyan-200 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                  الفايبر الحقيقي
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
                className="mt-7 max-w-xl text-lg leading-9 text-slate-300"
              >
                باقات إنترنت وفايبر بتجربة بصرية مختلفة، سرعة عالية، ثبات ممتاز، وتركيب يناسب
                بيتك أو مكتبك.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="mt-10 flex flex-col gap-4 sm:flex-row"
              >
                <a
                  href="#packages"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-l from-cyan-300 to-blue-600 px-8 py-4 text-sm font-black text-white shadow-2xl shadow-cyan-500/25 transition hover:scale-105"
                >
                  استكشف الباقات
                  <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
                </a>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/15 bg-white/10 px-8 py-4 text-center text-sm font-black text-white backdrop-blur-xl transition hover:bg-white/15"
                >
                  تواصل واتساب
                </a>
              </motion.div>
            </div>

            {/* جسم بصري بدل اللوتي */}
            <div className="relative mx-auto hidden h-[520px] w-full max-w-lg items-center justify-center lg:flex">
              <div className="absolute h-[420px] w-[420px] rounded-full border border-cyan-300/20 bg-cyan-300/5 shadow-[0_0_100px_rgba(34,211,238,0.25)]" />
              <div className="absolute h-[300px] w-[300px] rounded-full border border-blue-400/25 bg-blue-400/10" />
              <div className="absolute h-[190px] w-[190px] rounded-full border border-violet-400/25 bg-violet-400/10" />

              <motion.div
                animate={{
                  y: [0, -18, 0],
                  rotate: [0, 4, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10 rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-2xl"
              >
                <Router className="h-28 w-28 text-cyan-300" />
                <div className="mt-6 text-center">
                  <p className="text-4xl font-black">500 Mbps</p>
                  <p className="mt-2 text-sm text-slate-300">سرعة فايبر مستقرة</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            style={{ opacity: heroOpacity }}
            className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-center text-xs text-slate-400"
          >
            اسحب للأعلى للدخول إلى الباقات
          </motion.div>
        </section>
      </div>

      
      <section
        id="packages"
        className="relative z-30 -mt-[12svh] min-h-screen px-5 pb-28"
      >
        <motion.div
          initial={{ opacity: 0, y: 22, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-7xl rounded-[2.2rem] border border-white/10 bg-slate-950/70 p-3 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:rounded-[3rem] sm:p-8 lg:p-12"
        >
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100">
              <Zap className="h-4 w-4 text-cyan-300" />
              اختر سرعتك المناسبة
            </div>

            <h2 className="text-3xl font-black leading-tight sm:text-5xl lg:text-6xl">
              باقات ليست مجرد أسعار
              <br />
              <span className="bg-gradient-to-l from-cyan-200 to-blue-500 bg-clip-text text-transparent">
                بل تجربة كاملة
              </span>
            </h2>
          </div>

          <div className="mt-10 grid gap-5 sm:mt-14 lg:grid-cols-3">
            {packages.map((item, index) => (
              <PremiumPackageCard key={item.slug} item={item} index={index} />
            ))}
          </div>
        </motion.div>
      </section>

      <section id="features" className="relative z-30 bg-slate-950 px-5 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100">
              <ShieldCheck className="h-4 w-4 text-cyan-300" />
              مميزات فايبر زين
            </div>

            <h2 className="text-3xl font-black leading-tight sm:text-5xl">
              اشتراكات مجانية وخدمة
              <br />
              <span className="bg-gradient-to-l from-cyan-200 to-blue-500 bg-clip-text text-transparent">
                راحة بال من أول يوم
              </span>
            </h2>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {[
              {
                title: "إنترنت لا محدود",
                desc: "تصفح ومشاهدة ولعب بدون القلق من استهلاك البيانات.",
                icon: Wifi,
              },
              {
                title: "راوتر وتركيب مجاني",
                desc: "تجهيز البيت سريع وبأجهزة مخصصة للفايبر.",
                icon: Router,
              },
              {
                title: "مقوّيات WiFi",
                desc: "تغطية أفضل داخل البيت خصوصًا للأدوار والغرف البعيدة.",
                icon: RadioTower,
              },
              {
                title: "دعم فني 24/7",
                desc: "مساعدة متاحة على مدار الساعة عند الحاجة.",
                icon: Phone,
              },
              {
                title: "IP عالمي ديناميكي",
                desc: "مناسب لتجارب أكثر استقرارًا لبعض الخدمات المتقدمة.",
                icon: Gauge,
              },
              {
                title: "اشتراكات رقمية مجانية",
                desc: "اختر اشتراكاتك المجانية حسب الباقة ومدة الالتزام.",
                icon: Sparkles,
              },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] p-5 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-6"
                >
                  <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
                  <div className="relative z-10">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                      <Icon className="h-6 w-6 text-cyan-300" />
                    </div>
                    <h3 className="text-xl font-black text-white">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-300">{feature.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.99 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/10 via-white/[0.045] to-white/[0.03] p-[1px] shadow-2xl shadow-black/30 backdrop-blur-2xl"
          >
            <div className="relative overflow-hidden rounded-[calc(2rem-1px)] bg-slate-950/55 p-5 sm:p-6">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_0%,rgba(34,211,238,0.20),transparent_40%),radial-gradient(circle_at_80%_90%,rgba(124,58,237,0.14),transparent_45%)]" />
              <motion.div
                aria-hidden="true"
                animate={{ x: ["120%", "-120%"] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: "linear" }}
                className="pointer-events-none absolute top-0 h-px w-2/3 bg-gradient-to-l from-transparent via-cyan-200 to-transparent opacity-70"
              />

              <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-black text-white">اشتراكات مجانية بأشهر التطبيقات</p>
                  <p className="mt-1 text-sm text-slate-300">
                    اختر اشتراكين مجانًا (حسب الباقة ومدة الالتزام).
                  </p>
                </div>

                <a
                  href="#packages"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-l from-cyan-300 to-blue-600 px-6 py-3 text-sm font-black text-white shadow-2xl shadow-cyan-500/25 transition hover:scale-105"
                >
                  شاهد الباقات
                  <ChevronLeft className="h-4 w-4" />
                </a>
              </div>

              <div className="relative z-10 mt-5 grid grid-cols-4 gap-3 sm:grid-cols-7">
                {subscriptionApps.map((app) => (
                  <div
                    key={app.name}
                    title={app.name}
                    className="group relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/8 shadow-2xl shadow-black/30 transition hover:border-white/20 hover:bg-white/12"
                  >
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.18),transparent_55%)]" />
                    <span className="absolute inset-0 flex items-center justify-center px-2 text-center text-[10px] font-black text-white/80">
                      {app.fallback}
                    </span>
                    <img
                      src={app.iconUrl}
                      alt={app.name}
                      className="relative z-10 h-9 w-9 rounded-lg opacity-95 transition group-hover:opacity-100"
                      onLoad={(e) => {
                        const fallback = e.currentTarget.previousElementSibling as HTMLElement | null;
                        if (fallback) fallback.style.opacity = "0";
                      }}
                      onError={(e) => {
                        const fallback = e.currentTarget.previousElementSibling as HTMLElement | null;
                        if (fallback) fallback.style.opacity = "1";
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                ))}
              </div>

              <p className="relative z-10 mt-4 text-xs leading-6 text-slate-400">
                قائمة التطبيقات أعلاه للتوضيح وقد تختلف حسب الباقة وتوفر العرض.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="coverage" className="relative z-30 bg-slate-950 px-5 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.99 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-2xl sm:p-8"
        >
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <p className="text-sm font-black text-white">تحقق من التغطية قبل الطلب</p>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-300">
                تقدر تتأكد من تغطية زين فايبر عن طريق رقم صندوق الفايبر (ODB) حسب موقعك.
              </p>
            </div>
            <a
              href="https://eshop.sa.zain.com/odb-coverage/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-black text-white backdrop-blur-xl transition hover:bg-white/15"
            >
              افتح خريطة التغطية
              <ChevronLeft className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </section>

      <div className="relative z-30 -mt-10 bg-slate-950 px-5 pb-2">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.99 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl sm:p-8"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.20),transparent_40%),radial-gradient(circle_at_80%_90%,rgba(124,58,237,0.14),transparent_45%)]" />
            <motion.div
              aria-hidden="true"
              animate={{ x: ["120%", "-120%"] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute top-0 h-px w-2/3 bg-gradient-to-l from-transparent via-cyan-200 to-transparent"
            />
            <div className="relative z-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-black text-white">جاهز تكمل للخطوة الأخيرة؟</p>
                <p className="mt-1 text-sm text-slate-300">
                  تواصل معنا الآن، وراح نساعدك بالتغطية ونحدد موعد التركيب.
                </p>
              </div>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-l from-cyan-300 to-blue-600 px-6 py-3 text-sm font-black text-white shadow-2xl shadow-cyan-500/25 transition hover:scale-105"
              >
                <MessageCircle className="h-4 w-4" />
                واتساب
                <span className="text-white/80">{contactPhoneDisplay}</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <footer id="footer" className="relative z-30 bg-slate-950 px-5 pb-24 pt-10">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="grid gap-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl sm:p-10 lg:grid-cols-12"
          >
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/10">
                  <img src={zainLogoUrl} alt="Zain السعودية" className="h-7 w-auto" />
                </div>
                <div>
                  <p className="text-lg font-black text-white">عروض زين فايبر</p>
                  <p className="text-xs text-slate-300">باقات زين المنزلية — أسعار واضحة وتجربة طلب سريعة</p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-7 text-slate-300">
                الأسعار تشمل ضريبة القيمة المضافة 15% حسب تفاصيل الباقات. العروض والاشتراكات الرقمية قد تتغير حسب
                سياسة المزود وفترة العرض.
              </p>
              <p className="mt-3 text-xs leading-6 text-slate-500">
                شعار Zain وعلامتها التجارية مملوك لشركة زين السعودية. هذا الموقع غير تابع رسميًا لزين ويعرض معلومات
                وعروضًا لأغراض التعريف والمقارنة. قد تتغير الأسعار والعروض حسب سياسة زين وفترة العرض.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-l from-cyan-300 to-blue-600 px-6 py-3 text-sm font-black text-white shadow-2xl shadow-cyan-500/25 transition hover:scale-105"
                >
                  <MessageCircle className="h-4 w-4" />
                  تواصل واتساب
                  <span className="text-white/80">{contactPhoneDisplay}</span>
                </a>

                <a
                  href={`tel:${contactPhoneDisplay}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-black text-white backdrop-blur-xl transition hover:bg-white/15"
                >
                  <PhoneCall className="h-4 w-4" />
                  اتصال مباشر
                </a>
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3">
              <div>
                <p className="text-sm font-black text-white">روابط سريعة</p>
                <div className="mt-4 flex flex-col gap-2 text-sm text-slate-300">
                  <a href="#packages" className="transition hover:text-white">
                    الباقات
                  </a>
                  <a href="#features" className="transition hover:text-white">
                    المميزات
                  </a>
                  <a href="#coverage" className="transition hover:text-white">
                    التغطية
                  </a>
                </div>
              </div>

              <div>
                <p className="text-sm font-black text-white">الدعم</p>
                <div className="mt-4 flex flex-col gap-2 text-sm text-slate-300">
                  <div className="inline-flex items-center gap-2">
                    <Phone className="h-4 w-4 text-cyan-300" />
                    <span>خدمة العملاء: {contactPhoneDisplay}</span>
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-cyan-300" />
                    <span>دعم فني 24/7</span>
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-cyan-300" />
                    <span>استفسارات وتركيب</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-black text-white">قانوني</p>
                <div className="mt-4 flex flex-col gap-2 text-sm text-slate-300">
                  <div className="inline-flex items-center gap-2">
                    <FileText className="h-4 w-4 text-cyan-300" />
                    <span>الشروط والأحكام عند الطلب</span>
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <Lock className="h-4 w-4 text-cyan-300" />
                    <span>سياسة الخصوصية</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="mt-6 flex flex-col gap-2 text-center text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-right">
            <p>© {new Date().getFullYear()} عروض زين فايبر. جميع الحقوق محفوظة.</p>
            <p>المملكة العربية السعودية</p>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-3 left-0 right-0 z-50 px-4 md:hidden">
        <div className="mx-auto flex max-w-md items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-950/75 p-3 shadow-2xl shadow-black/40 backdrop-blur-2xl">
          <div className="min-w-0">
            <p className="truncate text-xs font-black text-white">تواصل سريع</p>
            <p className="truncate text-[11px] text-slate-300">{contactPhoneDisplay}</p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={`tel:${contactPhoneDisplay}`}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 text-xs font-black text-white"
            >
              <PhoneCall className="h-4 w-4" />
              اتصال
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-cyan-300 to-blue-600 px-4 text-xs font-black text-white shadow-2xl shadow-cyan-500/25"
            >
              <MessageCircle className="h-4 w-4" />
              واتساب
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
