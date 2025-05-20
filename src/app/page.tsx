import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-royal-leaf-green mb-4">Welcome to SerenaWell</h2>
          <p className="font-body max-w-2xl mx-auto text-deep-charcoal">
            Discover our premium collection of health supplements designed to enhance your well-being with natural, high-quality ingredients.
          </p>
        </div>
      </section>
      <FeaturedProducts />
      <AboutSection />
      <ContactSection />
    </div>
  );
}
