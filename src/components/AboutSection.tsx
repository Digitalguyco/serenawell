import Image from 'next/image';

const AboutSection = () => {
  return (
    <section id="about" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-heading text-4xl font-bold text-royal-leaf-green mb-6">About SerenaWell</h2>
          <div className="w-20 h-1 bg-sunbeam-yellow mx-auto mb-8"></div>
        </div>
        
        <div className="lg:flex lg:items-center lg:gap-16">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image 
                src="/images/slide1.png" 
                alt="SerenaWell products displayed in a natural setting"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-royal-leaf-green/10"></div>
            </div>
          </div>
          
          <div className="lg:w-1/2 font-body text-deep-charcoal space-y-5">
            <p>
              At SerenaWell, we believe that wellness should feel natural, intentional, and beautiful — for everyone. Our journey began with a simple mission: to provide high-quality, plant-inspired supplements that support the health of both children and adults.
            </p>
            
            <p>
              As we grow, so does our vision. SerenaWell is expanding into clean skincare and wholesome natural snacks — always with the same promise: honest ingredients, thoughtful formulas, and products that fit into your daily rhythm.
            </p>
            
            <p>
              We&apos;re not just building a wellness brand — we&apos;re cultivating a lifestyle of calm, care, and confidence.
            </p>
            
            <p className="font-heading text-xl text-royal-leaf-green italic">
              Feel better. Live well. The SerenaWell way.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 