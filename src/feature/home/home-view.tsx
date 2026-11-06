import AboutPage from "./sections/about-section";
import BlogSection from "./sections/blogs";
import CTAPage from "./sections/cta";
import FAQSection from "./sections/faq";
import LawyerHero from "./sections/hero";
import IntroSection from "./sections/intro-section";
import PracticesSection from "./sections/practise-section";

export default function HomeView() {
  return (
    <main>
      <LawyerHero />
      <IntroSection />
      <PracticesSection />
      <AboutPage />
      <BlogSection />
      <FAQSection />
      {/* <CTAPage /> */}
    </main>
  );
}
