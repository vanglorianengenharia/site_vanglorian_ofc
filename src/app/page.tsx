import { CompanyIntroVideo } from "@/components/02_company_intro_video/CompanyIntroVideo";
import IntroVanglorian from "@/components/03_introVanglorian/IntroVanglorian";
import { CompanyIdentityVideo } from "@/components/04_companyIdentityVideo/CompanyIdentityVideo";
import { ProjectActivities } from "@/components/05_projectActivities/ProjectActivities";
import DiferenciVanglorian from "@/components/06_diferencVanglorian/DiferenciVanglorian";
import { AboutUs } from "@/components/07_aboutUs/AboutUs";

export default function Home() {
  return (
    <main>
      <CompanyIntroVideo/>
      <IntroVanglorian />
      <CompanyIdentityVideo />
      <ProjectActivities />
      <DiferenciVanglorian />
      <AboutUs />
    </main>
  );
}
