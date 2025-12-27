import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutSection } from "@/components/AboutSection";
import { AchievementsSection } from "@/components/AchievementsSection";
import { EnrollmentSection } from "@/components/EnrollmentSection";

export const HomePage = () => {
  return (
    <main data-testid="home-page">
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <AchievementsSection />
      <EnrollmentSection />
    </main>
  );
};
