export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#" className={`flex items-center gap-2.5 ${className}`}>
      <div className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl bg-[image:var(--gradient-brand)] shadow-glow">
        <span className="font-display text-xl font-black text-brand-foreground leading-none">E</span>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent" />
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-display text-lg font-black tracking-tight text-foreground">
          Ecom<span className="text-brand">.</span>
        </span>
        <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Solutions
        </span>
      </div>
    </a>
  );
}
