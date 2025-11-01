import ContentSection from "@/components/home-components/content-4";
import FAQs from "@/components/home-components/faqs";
import Features from "@/components/home-components/features-3";
import HeroSection from "@/components/home-components/hero-section";

export default async function Home() {

  return (
    <>
    <HeroSection/>
    <ContentSection/>
    <Features/>
    <FAQs/>
    </>
  );
}
