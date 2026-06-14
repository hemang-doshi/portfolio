export function FooterTerminal() {
  return (
    <footer className="border-t border-lead/10 bg-midnight-slate/60 px-4 py-5 backdrop-blur-sm sm:px-6">
      <div className="mx-auto flex max-w-[var(--page-max-width)] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[length:var(--text-body-sm)] tracking-[0.03em] text-silver">
          hemang@portfolio:~$ Building systems. Shipping value. Staying curious.
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-[length:var(--text-caption)] uppercase tracking-[0.16em] text-silver">
          <span>India</span>
          <span>IST</span>
          <span>Available selectively</span>
        </div>
      </div>
    </footer>
  );
}
