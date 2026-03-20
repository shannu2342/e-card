import { type LucideIcon } from "lucide-react";

interface SubcategoryTab {
  key: string;
  label: string;
  icon: LucideIcon;
}

interface SectorHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  color: string;
  tabs: SubcategoryTab[];
  activeTab: string;
  onTabChange: (key: string) => void;
}

const SectorHeader = ({ icon: Icon, title, subtitle, color, tabs, activeTab, onTabChange }: SectorHeaderProps) => {
  return (
    <div className="mb-8">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${color} text-primary-foreground shadow-lg`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
              activeTab === tab.key
                ? `${color} text-primary-foreground shadow-lg scale-[1.02]`
                : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground hover:shadow-md"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SectorHeader;
