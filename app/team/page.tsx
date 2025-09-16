import { FooterSection } from "@/components/layout/sections/footer";
import { TeamSection } from "@/components/layout/sections/team";

export default function Home() {
    return (
        <div className="flex flex-col items-center">
            <TeamSection />
            <FooterSection />
        </div>
    );
}
