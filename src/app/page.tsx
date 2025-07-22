import { HeaderNavigation } from "@/components/01_header_navigation/HeaderNavigation";
import { CompanyIntroVideo } from "@/components/02_company_intro_video/CompanyIntroVideo";
import IntroVanglorian from "@/components/03_introVanglorian/IntroVanglorian";
import { CompanyIdentityVideo } from "@/components/04_companyIdentityVideo/CompanyIdentityVideo";

export default function Home() {
  return (
    <main>
      <HeaderNavigation />
      <CompanyIntroVideo />
      <IntroVanglorian />
      <CompanyIdentityVideo />
    </main>
  );
}
