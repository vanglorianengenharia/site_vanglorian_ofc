import { CompanyIntroVideo } from "@/components/02_company_intro_video/CompanyIntroVideo";
import { CompanyEssenceSection } from "@/components/03_companyEssenceSection/CompanyEssenceSection";
import { ProjectActivities } from "@/components/05_projectActivities/ProjectActivities";
import DiferenciVanglorian from "@/components/06_diferencVanglorian/DiferenciVanglorian";
import { AboutUs } from "@/components/07_aboutUs/AboutUs";

export default function Home() {
  return (
    <main>
      <CompanyIntroVideo/>
      <CompanyEssenceSection />
      <ProjectActivities />
      <DiferenciVanglorian />
      <AboutUs />
    </main>
  );
}
