import { HeaderNavigation } from "@/components/01_header_navigation/HeaderNavigation";
import { CompanyIntroVideo } from "@/components/02_company_intro_video/CompanyIntroVideo";
import IntroVanglorian from "@/components/03_introVanglorian/IntroVanglorian";
import { CompanyIdentityVideo } from "@/components/04_companyIdentityVideo/CompanyIdentityVideo";
import { ProjectsShowcase } from "@/components/05_projectsShowcase/ProjectsShowcase";
import DiferenciVanglorian from "@/components/06_diferencVanglorian/DiferenciVanglorian";
import { AboutUs } from "@/components/07_aboutUs/AboutUs";
import { Footer } from "@/components/08_footer/Footer";

export default function Home() {
  return (
    <main>
      <HeaderNavigation />
      <CompanyIntroVideo />
      <IntroVanglorian />
      <CompanyIdentityVideo />
      <ProjectsShowcase />
      <DiferenciVanglorian />
      <AboutUs />
      <Footer />
    </main>
  );
}
