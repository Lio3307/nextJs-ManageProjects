import CallToAction from "@/components/home-components/call-to-action";
import ContentSection from "@/components/home-components/content-4";
import FAQs from "@/components/home-components/faqs";
import Features from "@/components/home-components/features-3";
import FooterSection from "@/components/home-components/footer";
import HeroSection from "@/components/home-components/hero-section";
import { ThemeProvider } from "@/components/dashboard-components/theme/theme-provider";

export default async function Home() {

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <HeroSection/>
      <ContentSection/>
      <Features/>
      <FAQs/>
      <CallToAction/>
      <FooterSection/>
    </ThemeProvider>
  );
}
