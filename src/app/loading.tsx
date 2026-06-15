export default function Loading() {
  return (
    <main className="loader-goof flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="loader-goof__icon relative mb-6 flex h-28 w-28 items-center justify-center rounded-full border-4 border-aubergine/15 bg-white/70 shadow-[0_18px_50px_rgba(36,0,41,0.12)] backdrop-blur-sm">
        <div className="loader-goof__orbit absolute inset-2 rounded-full border-4 border-dashed border-aubergine/35" />
        <div className="loader-goof__face relative flex h-16 w-16 items-center justify-center rounded-full bg-aubergine text-white shadow-[inset_0_-8px_0_rgba(0,0,0,0.15)]">
          <span className="absolute left-4 top-5 h-2.5 w-2.5 rounded-full bg-glowstick" />
          <span className="absolute right-4 top-5 h-2.5 w-2.5 rounded-full bg-glowstick" />
          <span className="absolute bottom-4 h-3 w-6 rounded-b-full rounded-t-[999px] border-2 border-white border-t-0" />
        </div>
      </div>
      <p className="font-[var(--font-kaio)] text-[length:clamp(1.8rem,4vw,2.6rem)] tracking-[-0.03em] text-aubergine">
        Booting the goofy internet machine
      </p>
      <p className="mt-3 max-w-md text-[length:var(--text-body)] text-aubergine/70">
        Waiting for the Instagram feed, images, and first-load polish before the hero drops in.
      </p>
    </main>
  );
}
