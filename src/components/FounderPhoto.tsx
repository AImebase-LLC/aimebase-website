import Image from "next/image";
import { site } from "@/lib/site";

export const hasFounderPhoto = () => site.founderPhoto !== "";

export function FounderPhoto({ className = "" }: { className?: string }) {
  if (!hasFounderPhoto()) return null;
  return (
    <div className={`relative overflow-hidden rounded-md bg-light-600 ${className}`}>
      <Image src={site.founderPhoto} alt={`${site.founder}, founder of AImbase`} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
    </div>
  );
}
