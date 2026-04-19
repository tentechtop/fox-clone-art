import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProvidersMarquee } from "@/components/ProvidersMarquee";
import { Features } from "@/components/Features";
import { Pricing } from "@/components/Pricing";
import { CtaBanner } from "@/components/CtaBanner";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1" style={{ paddingTop: "45px" }}>
        <Hero />
        <ProvidersMarquee />
        <Features />
        <Pricing />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
