import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  action?: { href: string; label: string };
  aside?: React.ReactNode;
}

export default function SectionHeading({ index, eyebrow, title, subtitle, action, aside }: SectionHeadingProps) {
  return (
    <div className="border-t border-zinc-800 pt-5 mb-12 sm:mb-14">
      <p className="eyebrow eyebrow-plain mb-8">
        <span className="text-zinc-500">{index}</span>
        <span className="text-zinc-700">/</span>
        {eyebrow}
      </p>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-5xl font-black text-white leading-[1.02]">{title}</h2>
          {subtitle && <p className="text-zinc-400 mt-4 max-w-xl leading-relaxed">{subtitle}</p>}
        </div>
        {action && (
          <Link href={action.href} className="link-arrow group shrink-0">
            {action.label}
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        )}
        {aside}
      </div>
    </div>
  );
}
