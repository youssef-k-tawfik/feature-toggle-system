import AuditLogs from "@/components/AuditLogs/AuditLogs";
import FeaturesControl from "@/components/FeaturesControllers/FeaturesControllers";
import FeaturesList from "@/components/FeaturesList/FeaturesList";
import FilteredFeatures from "@/components/FilteredFeatures/FilteredFeatures";
import Link from "next/link";
import { TiHome } from "react-icons/ti";
import LogoutButton from "@/components/LogoutButton/LogoutButton";

export default function Dashboard() {
  return (
    <div className="mx-auto p-4 max-w-screen-lg">
      <div className="flex flex-wrap justify-between gap-4 md:gap-0">
        <div className="w-full md:w-7/12 bg-[#1b1f23] rounded-lg border border-gray-500 relative">
          <FeaturesList />
          <FeaturesControl />
        </div>
        <div className="w-full md:w-4/12 ">
          <FilteredFeatures enabled={true} />
          <FilteredFeatures enabled={false} />
        </div>
      </div>

      {/* AuditLogs */}
      <AuditLogs />

      {/* Go to Home page */}
      <LogoutButton />
      <Link
        href="/"
        className="fixed bottom-4 end-4 bg-[#1b1f23] p-2 rounded-full text-xl"
      >
        <TiHome />
      </Link>
    </div>
  );
}
