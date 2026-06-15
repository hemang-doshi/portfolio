import Image from "next/image";

import { cn } from "@/lib/utils";

export function NavMascot({ className }: { className?: string }) {
  return (
    <div className={cn("brand-mascot-shell", className)} aria-hidden="true">
      <Image
        src="/nav-mascot.png"
        alt=""
        fill
        sizes="56px"
        className="brand-mascot brand-mascot-image"
      />
    </div>
  );
}
