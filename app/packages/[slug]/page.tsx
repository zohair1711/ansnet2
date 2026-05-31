import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, ChevronRight, MessageCircle, PhoneCall } from "lucide-react";
import { buildPackageWhatsAppText, getPackageBySlug, packages } from "@/lib/packages";

const contactPhoneDisplay = "0509696486";
const contactPhoneWhatsApp = contactPhoneDisplay.startsWith("0")
  ? `966${contactPhoneDisplay.slice(1)}`
  : contactPhoneDisplay;
const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? contactPhoneWhatsApp;

export const dynamicParams = false;

export function generateStaticParams() {
  return packages.map((pkg) => ({ slug: pkg.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) return {};

  return {
    title: pkg.name,
    description: `${pkg.name} — ${pkg.price} ريال/شهر — تحميل ${pkg.speed} ${pkg.speedUnit} — رفع ${pkg.uploadSpeed} ${
      pkg.speedUnit === "Gbps" ? "Mbps" : pkg.speedUnit
    }`,
    alternates: {
      canonical: `/packages/${pkg.slug}`,
    },
  };
}

export default async function PackagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) notFound();

  const message = buildPackageWhatsAppText(pkg);
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <main dir="rtl" className="min-h-screen bg-slate-950 px-5 pb-24 pt-24 text-white">
      <div className="mx-auto max-w-5xl">
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm font-black text-slate-200 transition hover:bg-white/12"
        >
          <ChevronRight className="h-4 w-4" />
          الرجوع للرئيسية
        </a>

        <div className="mt-6 overflow-hidden rounded-[2.2rem] border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-start">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs font-black text-slate-200">
                {pkg.badge}
              </div>

              <h1 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">{pkg.name}</h1>
              <p className="mt-4 text-base leading-8 text-slate-300">{pkg.desc}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                  <p className="text-xs font-bold text-slate-400">السعر</p>
                  <p className="mt-2 text-3xl font-black">
                    {pkg.price} <span className="text-sm font-bold text-slate-300">ريال/شهر</span>
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                  <p className="text-xs font-bold text-slate-400">التحميل</p>
                  <p className="mt-2 text-3xl font-black">
                    {pkg.speed} <span className="text-sm font-bold text-slate-300">{pkg.speedUnit}</span>
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                  <p className="text-xs font-bold text-slate-400">الرفع</p>
                  <p className="mt-2 text-3xl font-black">
                    {pkg.uploadSpeed}{" "}
                    <span className="text-sm font-bold text-slate-300">
                      {pkg.speedUnit === "Gbps" ? "Mbps" : pkg.speedUnit}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full max-w-sm">
              <div className="rounded-[1.8rem] border border-white/10 bg-black/20 p-5">
                <p className="text-xs font-bold text-slate-400">التواصل والطلب</p>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-cyan-300 to-blue-600 px-6 py-4 text-sm font-black text-white shadow-2xl shadow-cyan-500/25 transition hover:scale-[1.02]"
                >
                  <MessageCircle className="h-4 w-4" />
                  اطلب عبر واتساب
                </a>

                <a
                  href={`tel:${contactPhoneDisplay}`}
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-6 py-4 text-sm font-black text-white backdrop-blur-xl transition hover:bg-white/15"
                >
                  <PhoneCall className="h-4 w-4" />
                  اتصال مباشر
                </a>

                <p className="mt-4 text-center text-xs text-slate-400">{contactPhoneDisplay}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm font-black text-white">تفاصيل الباقة</p>
              <div className="mt-4 space-y-2.5">
                {pkg.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.045] px-4 py-3"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-300 text-slate-950">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium text-slate-200">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm font-black text-white">الاشتراكات الرقمية (حسب الباقة)</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {pkg.subscriptions.map((name) => (
                  <span
                    key={name}
                    className="rounded-full border border-white/10 bg-white/8 px-3 py-2 text-xs font-bold text-slate-200"
                  >
                    {name}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs leading-6 text-slate-400">
                قد تختلف الاشتراكات ومدة الإتاحة حسب العرض ومدة الالتزام وسياسة المزود.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
