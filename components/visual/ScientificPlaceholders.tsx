import { Activity, Brain, CircleDot, Microscope, Network } from "lucide-react";

export function ScientificHeroCanvas() {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-[var(--border)] bg-white p-5 shadow-[var(--shadow-soft)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_10%,rgba(88,124,183,0.22),transparent_34%),radial-gradient(circle_at_80%_80%,rgba(95,158,160,0.18),transparent_32%)]" />
      <svg className="relative z-0 h-[420px] w-full" viewBox="0 0 520 420" aria-hidden="true">
        <defs>
          <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.1" fill="#587CB7" opacity=".25" />
          </pattern>
        </defs>
        <rect width="520" height="420" fill="url(#dots)" />
        <path d="M52 310C130 170 260 110 468 132" fill="none" stroke="#587CB7" strokeWidth="1.5" opacity=".45" />
        <path d="M72 126c102 114 206 166 378 142" fill="none" stroke="#5F9EA0" strokeWidth="1.5" opacity=".42" />
        <ellipse cx="260" cy="210" rx="168" ry="92" fill="none" stroke="#274D84" strokeWidth="1" opacity=".22" />
        <ellipse cx="260" cy="210" rx="92" ry="168" fill="none" stroke="#274D84" strokeWidth="1" opacity=".16" transform="rotate(34 260 210)" />
        {[
          [122, 268],
          [206, 155],
          [326, 137],
          [390, 256],
          [260, 210],
        ].map(([cx, cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="6" fill="#587CB7" />)}
      </svg>
      <div className="absolute inset-x-8 bottom-8 rounded-2xl border border-[var(--border)] bg-white/88 p-5 backdrop-blur">
        <div className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-[var(--aima-deep-blue)]">
          <CircleDot className="h-4 w-4" /> Scientific figure placeholder
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="h-20 rounded-xl bg-[var(--aima-soft-blue)]" />
          <div className="h-20 rounded-xl bg-[var(--scientific-teal-soft)]" />
          <div className="h-20 rounded-xl bg-[var(--surface-muted)]" />
        </div>
        <p className="mt-3 text-sm text-[var(--text-secondary)]">Preview placeholder. Replace with authentic research figures when available.</p>
      </div>
    </div>
  );
}

function PlaceholderFrame({ title, icon: Icon }: { title: string; icon: typeof Brain }) {
  return (
    <div className="subtle-grid relative flex aspect-[4/3] min-h-56 overflow-hidden rounded-2xl border border-[var(--border)] bg-white p-5">
      <div className="absolute right-5 top-5 rounded-full bg-[var(--aima-soft-blue)] p-3 text-[var(--aima-deep-blue)]"><Icon className="h-5 w-5" /></div>
      <div className="mt-auto">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--aima-deep-blue)]">Placeholder visual</p>
        <h3 className="mt-2 text-lg font-black">{title}</h3>
      </div>
    </div>
  );
}

export function ScientificFigurePlaceholder() { return <PlaceholderFrame title="Scientific figure" icon={Activity} />; }
export function FrameworkDiagramPlaceholder() { return <PlaceholderFrame title="Framework diagram" icon={Network} />; }
export function MedicalImagePlaceholder() { return <PlaceholderFrame title="Medical image panel" icon={Microscope} />; }
export function ResearchThemeVisualPlaceholder() { return <PlaceholderFrame title="Research theme visual" icon={Brain} />; }
export function PublicationThumbnailPlaceholder() { return <PlaceholderFrame title="Publication thumbnail" icon={CircleDot} />; }
