import { Fill } from "@/components/Placeholder";
import { Section } from "@/components/Section";
import { homeTestimonial, isPlaceholder } from "@/lib/site";

/** Home §7. Hidden entirely until an approved quote exists. */
export function Testimonial() {
  const ready = !isPlaceholder(homeTestimonial.quote) && !isPlaceholder(homeTestimonial.attribution);
  if (!ready) return null;
  return (
    <Section aria-label="Testimonial" className="bg-light-50">
      <figure className="px-6 py-16 md:px-10 md:py-24">
        <blockquote className="display max-w-[28ch] text-3xl md:text-[40px] md:leading-[1.1]">
          &ldquo;<Fill text={homeTestimonial.quote} />&rdquo;
        </blockquote>
        <figcaption className="mt-8 text-[15px] text-light-900">
          <Fill text={homeTestimonial.attribution} />
        </figcaption>
      </figure>
    </Section>
  );
}
