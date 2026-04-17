// import { BannerVideo } from "@/components/02_bannerVideo/BannerVideo";
import { CompanyIntroVideo } from "@/components/02_company_intro_video/CompanyIntroVideo";
import IntroVanglorian from "@/components/03_introVanglorian/IntroVanglorian";
import { CompanyIdentityVideo } from "@/components/04_companyIdentityVideo/CompanyIdentityVideo";
import { ProjectsShowcase } from "@/components/05_projectsShowcase/ProjectsShowcase";
import DiferenciVanglorian from "@/components/06_diferencVanglorian/DiferenciVanglorian";
import { AboutUs } from "@/components/07_aboutUs/AboutUs";

export default function Home() {
  return (
    <main>
      <CompanyIntroVideo/>
      {/* <BannerVideo /> */}
      <IntroVanglorian />
      <CompanyIdentityVideo />
      <ProjectsShowcase />
      <DiferenciVanglorian />
      <AboutUs />
    </main>
  );
}
