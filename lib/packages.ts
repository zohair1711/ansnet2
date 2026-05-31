import type { ElementType } from "react";
import { Gauge, Router, Wifi } from "lucide-react";

export type PackageItem = {
  slug: string;
  name: string;
  shortName: string;
  speed: string;
  uploadSpeed: string;
  speedUnit: string;
  price: string;
  oldPrice: string;
  tag: string;
  badge: string;
  desc: string;
  internet: string;
  features: string[];
  subscriptions: string[];
  icon: ElementType;
  gradient: string;
  glow: string;
  featured?: boolean;
  black?: boolean;
};

export const packages: PackageItem[] = [
  {
    slug: "fiber-plus",
    name: "فايبر المنزلية بلس",
    shortName: "فايبر بلس",
    speed: "300",
    uploadSpeed: "100",
    speedUnit: "Mbps",
    price: "289",
    oldPrice: "",
    tag: "عرض لفترة محدودة",
    badge: "أفضل بداية",
    desc: "باقة فايبر مناسبة للاستخدام اليومي، التصفح، المشاهدة، والعمل من المنزل بسرعة مستقرة.",
    internet: "لا محدود",
    features: [
      "إنترنت لا محدود",
      "راوتر وتركيب مجاني",
      "اشتراكين مجانًا",
      "2 مقوي شبكة WiFi مجانًا",
      "YouTube Premium لفترة محدودة",
      "شامل ضريبة القيمة المضافة 15%",
    ],
    subscriptions: ["YouTube Premium", "Anghami Plus", "STARZPLAY", "OSN+", "GeForce NOW"],
    icon: Wifi,
    gradient: "from-cyan-300 to-blue-600",
    glow: "shadow-cyan-500/20",
  },
  {
    slug: "fiber-premium",
    name: "فايبر المنزلية بريميوم",
    shortName: "فايبر بريميوم",
    speed: "500",
    uploadSpeed: "200",
    speedUnit: "Mbps",
    price: "399",
    oldPrice: "",
    tag: "عرض لفترة محدودة",
    badge: "الأكثر طلبًا",
    desc: "خيار قوي للعائلات والأجهزة المتعددة، مناسب للبث بجودة عالية والألعاب والعمل.",
    internet: "لا محدود",
    features: [
      "إنترنت لا محدود",
      "راوتر وتركيب مجاني",
      "اشتراكين مجانًا",
      "2 مقوي شبكة WiFi مجانًا",
      "YouTube Premium لفترة محدودة",
      "شامل ضريبة القيمة المضافة 15%",
    ],
    subscriptions: ["YouTube Premium", "Anghami Plus", "STARZPLAY", "OSN+", "GeForce NOW"],
    icon: Router,
    gradient: "from-violet-300 to-blue-600",
    glow: "shadow-blue-500/30",
    featured: true,
  },
  {
    slug: "fiber-black",
    name: "فايبر المنزلية بلاك",
    shortName: "فايبر بلاك",
    speed: "1",
    uploadSpeed: "300",
    speedUnit: "Gbps",
    price: "999",
    oldPrice: "",
    tag: "عرض حصري أونلاين",
    badge: "أعلى أداء",
    desc: "أقوى باقة فايبر لمن يريد سرعة عالية جدًا وتجربة استخدام فاخرة للمنازل والمكاتب.",
    internet: "لا محدود",
    features: [
      "إنترنت لا محدود",
      "راوتر وتركيب مجاني",
      "4 اشتراكات مجانًا",
      "2 مقوي شبكة WiFi مجانًا",
      "سرعة تحميل تصل إلى 1 جيجابت",
      "شامل ضريبة القيمة المضافة 15%",
    ],
    subscriptions: ["YouTube Premium", "Anghami Plus", "STARZPLAY", "OSN+", "GeForce NOW"],
    icon: Gauge,
    gradient: "from-zinc-200 to-cyan-400",
    glow: "shadow-cyan-500/30",
    black: true,
  },
];

export function getPackageBySlug(slug: string) {
  return packages.find((p) => p.slug === slug);
}

export function buildPackageWhatsAppText(item: PackageItem) {
  const speedsLine =
    item.speedUnit === "Gbps"
      ? `السرعة: ${item.speed} ${item.speedUnit} / رفع ${item.uploadSpeed} Mbps`
      : `السرعة: ${item.speed} ${item.speedUnit} / رفع ${item.uploadSpeed} ${item.speedUnit}`;

  const featuresPreview = item.features.slice(0, 4).map((f) => `- ${f}`).join("\n");

  return [
    "السلام عليكم،",
    `أبغى طلب باقة: ${item.name}`,
    `السعر: ${item.price} ريال/شهر`,
    `الإنترنت: ${item.internet}`,
    speedsLine,
    "",
    "مميزات مختصرة:",
    featuresPreview,
    "",
    "الرجاء التحقق من التغطية وتأكيد موعد التركيب.",
  ].join("\n");
}

