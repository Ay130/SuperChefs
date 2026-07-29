

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Heart, Leaf, Award } from 'lucide-react';

export const metadata = {
  title: 'About Us | Superchefs Limited',
  description: 'Learn about Superchefs Limited and our mission to serve Tastefully Fresh meals daily.',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="bg-background">
        {/* Hero */}
        <div className="bg-gradient-to-br from-primary/20 to-accent/20 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              About Superchefs Limited
            </h1>
            <p className="text-lg text-foreground max-w-2xl">
              Africa's leading bakery and confectioneries company, delivering healthful and quality bread, snacks, and food across Nigeria
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Story Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Story</h2>
              <p className="text-foreground mb-4">
                Established 14 years ago, Superchefs Limited has grown to become a leader in Nigeria's bakery and confectioneries industry. Starting with a vision to deliver quality and authenticity, we now operate 40 joint-venture retail bakeries across major Nigerian supermarket chains and retail outlets.
              </p>
              <p className="text-foreground mb-4">
                Based in Lagos with over 300 dedicated employees, we've built our reputation on the see-through concept - delivering fresh, quality baked goods in modern and pleasant environments. We've also expanded to include our flagship full-service restaurant in Palmgrove and ten Express snack centers across Lagos State.
              </p>
              <p className="text-foreground">
                Our mission goes beyond great taste - we're committed to bringing long-forgotten African foods and snacks to the fore, branded and presented for the modern consumer who values quality and health.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl h-80 flex items-center justify-center border-2 border-primary">
              <div className="text-center">
                <p className="text-foreground font-bold">14 Years of Excellence</p>
                <p className="text-foreground text-2xl font-bold mt-2">40+ Locations</p>
                <p className="text-foreground text-2xl font-bold">300+ Team Members</p>
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="bg-secondary rounded-lg p-8 mb-16">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-3">Our Vision</h2>
              <p className="text-lg text-foreground">
                To be the most admired company in Africa, known for delivering healthful and quality bread, snacks, and food with a happy and dedicated workforce.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-foreground mb-8">
                To consistently deliver pastries and meals of the highest standard in quality and presentation. We partner with leading and emerging supermarket chains to provide fresh-baked goods through our see-through service delivery model, maintaining premium hygiene standards while using modern technology and methods.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div>
                <Leaf className="w-10 h-10 text-primary mb-3" />
                <h3 className="font-bold text-foreground mb-2">Healthful Quality</h3>
                <p className="text-foreground text-sm">
                  We prioritize nutritious ingredients and quality preparation
                </p>
              </div>
              <div>
                <Award className="w-10 h-10 text-accent mb-3" />
                <h3 className="font-bold text-foreground mb-2">Transparent Service</h3>
                <p className="text-foreground text-sm">
                  See-through concept shows our hygiene and quality standards
                </p>
              </div>
              <div>
                <Heart className="w-10 h-10 text-primary mb-3" />
                <h3 className="font-bold text-foreground mb-2">Team Happiness</h3>
                <p className="text-foreground text-sm">
                  We invest in our workforce's happiness and growth
                </p>
              </div>
            </div>
          </div>

          {/* Values */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">Our Core Values</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Quality & Excellence',
                  desc: 'Consistent high standards in recipe composition, presentation, and hygiene',
                },
                {
                  title: 'African Heritage',
                  desc: 'Reviving and modernizing long-forgotten African foods and snacks for contemporary consumers',
                },
                {
                  title: 'Innovation',
                  desc: 'Leading in the use of modern technology and methods in food production',
                },
                {
                  title: 'Transparency',
                  desc: 'Our see-through concept reflects our commitment to hygiene and quality standards',
                },
              ].map((value, i) => (
                <div key={i} className="p-6 bg-card border-2 border-primary rounded-lg">
                  <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="text-foreground">{value.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="bg-gradient-to-r from-primary to-accent text-white rounded-lg p-12 text-center">
            <h3 className="text-2xl font-bold mb-4">Experience Tastefully Fresh</h3>
            <p className="mb-6 max-w-2xl mx-auto">
              Discover why Superchefs is trusted by thousands across Nigeria. From our 40 retail bakeries to our flagship Palmgrove restaurant and Express centers.
            </p>
            <a
              href="/menu"
              className="inline-block px-6 py-3 bg-white text-primary rounded-lg font-semibold hover:opacity-90 transition"
            >
              Browse Menu
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
