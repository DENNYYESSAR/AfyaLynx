import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import ClinicFinderPreview from "@/components/clinic-finder-preview";
import TestimonialsSection from "@/components/testimonials-section";
import BlogPreview from "@/components/blog-preview";
import CTASection from "@/components/cta-section";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ClinicFinderPreview />
        <TestimonialsSection />
        <BlogPreview />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
