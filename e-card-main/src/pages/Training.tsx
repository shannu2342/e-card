import { useState } from "react";
import SectorHeader from "@/components/SectorHeader";
import PaymentConfirmation from "@/components/PaymentConfirmation";
import SearchFilter from "@/components/SearchFilter";
import { Button } from "@/components/ui/button";
import { trainingPrograms } from "@/lib/dummyData";
import { GraduationCap, Laptop, BookOpen, UserCheck, ShieldCheck, Heart, Award, Info, Rocket, Users, Computer, Briefcase, ChevronRight, ArrowLeft } from "lucide-react";

const mainTabs = [
  { key: "mission", label: "VCDA Mahila Shiksha Mission", icon: ShieldCheck },
  { key: "women", label: "Women Development Programs", icon: Heart },
  { key: "courses", label: "Training Courses", icon: Laptop },
  { key: "job", label: "Job-Oriented Programs", icon: UserCheck },
  { key: "certification", label: "Certification Programs", icon: Award },
];

const subSections: Record<string, string[]> = {
  courses: ["Technical Skills", "Vocational Skills"],
};

const tabToCategory: Record<string, string> = {
  mission: "VCDA Mahila Shiksha Mission",
  women: "Women Development Programs",
  job: "Job-Oriented Programs",
  certification: "Certification Programs",
};

const Training = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [payment, setPayment] = useState<{ open: boolean; title: string; amount?: string; details: { label: string; value: string }[]; type: "payment" | "booking" | "registration" }>({
    open: false, title: "", details: [], type: "registration",
  });

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setActiveSub(null);
    setSearch("");
  };

  const handleEnroll = (p: typeof trainingPrograms[0]) => {
    setPayment({
      open: true,
      title: "Program Enrollment",
      amount: "Free",
      details: [
        { label: "Program", value: p.name },
        { label: "Category", value: p.category },
        { label: "Duration", value: p.duration },
      ],
      type: "registration",
    });
  };

  const activeSubsections = activeTab ? subSections[activeTab] || [] : [];
  const hasSubsections = activeSubsections.length > 0;
  const currentSub = activeSub;
  const canShowData = Boolean(activeTab && (!hasSubsections || currentSub));

  return (
    <div className="container py-8">
      <SectorHeader
        icon={GraduationCap}
        title="Skill Development & Training"
        subtitle="VCDA Mission, Training Courses & Certification"
        color="bg-sector-training"
        tabs={mainTabs}
        activeTab={activeTab ?? ""}
        onTabChange={handleTabChange}
      />

      {activeTab && (
        <div className="mb-4 flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              if (hasSubsections && currentSub) {
                setActiveSub(null);
              } else {
                setActiveTab(null);
                setActiveSub(null);
              }
              setSearch("");
            }}
          >
            <ArrowLeft className="mr-1 h-4 w-4" /> Back
          </Button>
        </div>
      )}

      {activeTab && hasSubsections && (
        <div className="flex flex-wrap gap-3 mb-6 animate-in slide-in-from-left duration-300">
          <div className="flex items-center gap-1 text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider">
            <ChevronRight className="h-3 w-3" /> Options
          </div>
          {activeSubsections.map(sub => (
            <button
              key={sub}
              onClick={() => setActiveSub(sub)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                currentSub === sub
                  ? "bg-sector-training text-white shadow-md ring-2 ring-sector-training/20"
                  : "bg-background border hover:bg-muted text-muted-foreground"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {canShowData && (
        <SearchFilter value={search} onChange={setSearch} placeholder={`Search in ${currentSub || activeTab}...`} />
      )}

      <div className="mt-8">
        {!activeTab && (
          <div className="rounded-2xl border border-dashed bg-card p-8 text-center text-sm text-muted-foreground">
            Step 1: Choose one option above.
          </div>
        )}

        {activeTab && hasSubsections && !currentSub && (
          <div className="rounded-2xl border border-dashed bg-card p-8 text-center text-sm text-muted-foreground">
            Step 2: Select an option to continue.
          </div>
        )}

        {canShowData && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trainingPrograms
              .filter(p => {
                const category = activeTab === "courses" ? currentSub : tabToCategory[activeTab!];
                return p.category === category && (p.name.toLowerCase().includes(search.toLowerCase()));
              })
              .map(p => (
                <div key={p.id} className="sector-card min-h-[14rem] flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sector-training/10 text-sector-training mb-4">
                       {activeTab === "mission" ? <ShieldCheck className="h-6 w-6" /> : 
                        activeTab === "women" ? <Heart className="h-6 w-6 text-pink-500" /> : 
                        activeTab === "courses" ? (currentSub === "Technical Skills" ? <Computer className="h-6 w-6" /> : <Briefcase className="h-6 w-6" />) :
                        activeTab === "job" ? <UserCheck className="h-6 w-6" /> : <Award className="h-6 w-6" />}
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-50">{p.duration}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{p.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-3 h-12">{p.description}</p>
                  <Button size="sm" className="mt-4 w-full shadow-lg hover:shadow-sector-training/20" onClick={() => handleEnroll(p)}>Register Now</Button>
                </div>
              ))}
        </div>
        )}
      </div>

      <PaymentConfirmation
        open={payment.open}
        onClose={() => setPayment(p => ({ ...p, open: false }))}
        onConfirm={() => {}}
        title={payment.title}
        amount={payment.amount}
        details={payment.details}
        type={payment.type}
      />
    </div>
  );
};

export default Training;
