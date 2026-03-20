import { useState } from "react";
import SectorHeader from "@/components/SectorHeader";
import PaymentConfirmation from "@/components/PaymentConfirmation";
import SearchFilter from "@/components/SearchFilter";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { jobs, awarenessPrograms } from "@/lib/dummyData";
import { Briefcase, Building, Search, UserCheck, HardHat, Info, ExternalLink, MapPin, DollarSign, Users, FileStack, Upload, ChevronRight, ArrowLeft } from "lucide-react";

const mainTabs = [
  { key: "awareness", label: "Awareness Programs", icon: Info },
  { key: "Daily Wage", label: "Daily Wage Jobs", icon: HardHat },
  { key: "Company Jobs", label: "Company Job Updates", icon: Building },
  { key: "register", label: "Employment Registration", icon: UserCheck },
];

const subSections: Record<string, string[]> = {
  "Company Jobs": ["Private Jobs"],
  register: ["Job Seeker Profile", "Resume Upload"],
};

const Employment = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [regForm, setRegForm] = useState({ name: "", email: "", phone: "", experience: "", jobType: "Full-time" });
  const [payment, setPayment] = useState<{ open: boolean; title: string; amount?: string; details: { label: string; value: string }[]; type: "payment" | "booking" | "registration" }>({
    open: false, title: "", details: [], type: "registration",
  });

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setActiveSub(null);
    setSearch("");
  };

  const handleApply = (job: typeof jobs[0]) => {
    setPayment({
      open: true,
      title: "Job Application",
      details: [
        { label: "Job Title", value: job.title },
        { label: "Company", value: job.company },
        { label: "Type", value: job.type },
        { label: "Salary", value: job.salary },
        { label: "Location", value: job.location },
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
        icon={Briefcase}
        title="Employment Sector"
        subtitle="Awareness, Daily Wage, Private Jobs & Registration"
        color="bg-sector-employment"
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
                  ? "bg-sector-employment text-white shadow-md ring-2 ring-sector-employment/20"
                  : "bg-background border hover:bg-muted text-muted-foreground"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {canShowData && activeTab !== "register" && (
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

        {activeTab === "awareness" && canShowData && (
          <div className="grid gap-4 sm:grid-cols-2">
            {awarenessPrograms.map(p => (
              <div key={p.id} className="sector-card border-l-4 border-sector-employment">
                <span className="inline-block rounded-full bg-sector-employment/10 px-2 py-0.5 text-xs font-bold text-sector-employment uppercase tracking-tighter">Orientation</span>
                <h3 className="mt-3 font-bold text-lg">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                <p className="mt-4 flex items-center gap-1 text-[10px] text-muted-foreground uppercase font-black"><Users className="h-4 w-4" /> Location: {p.location}</p>
                <Button size="sm" variant="outline" className="mt-4 w-full shadow-sm" onClick={() => setPayment({
                  open: true,
                  title: "Register for Awareness",
                  details: [{ label: "Program", value: p.title }, { label: "Date", value: p.date }],
                  type: "registration"
                })}>Express Interest</Button>
              </div>
            ))}
          </div>
        )}

        {activeTab && ["Daily Wage", "Company Jobs"].includes(activeTab) && canShowData && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {jobs
                .filter(j => j.category === (activeTab === "Company Jobs" ? currentSub : "Daily Wage Jobs") && (j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase())))
                .map(j => (
                  <div key={j.id} className="sector-card min-h-[14rem] flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-lg">{j.title}</h3>
                      <p className="text-sm text-muted-foreground font-medium opacity-80">{j.company}</p>
                      <div className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                        <p className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {j.location}</p>
                        <p className="flex items-center gap-1 font-bold text-primary"><DollarSign className="h-3 w-3" /> {j.salary}</p>
                      </div>
                    </div>
                    <Button size="sm" className="mt-4 w-full shadow-lg hover:shadow-primary/20" onClick={() => handleApply(j)}>Apply Now</Button>
                  </div>
                ))}
            </div>
        )}

        {activeTab === "register" && currentSub && (
           <div className="space-y-10 animate-fade-in">
             {currentSub === "Job Seeker Profile" ? (
                <div className="max-w-2xl mx-auto rounded-2xl border bg-card p-8 shadow-xl">
                  <UserCheck className="h-10 w-10 text-sector-employment mb-4" />
                  <h2 className="text-xl font-extrabold mb-1">Create Your Profile</h2>
                  <p className="text-xs text-muted-foreground mb-6 uppercase tracking-widest font-bold">Employment Registration</p>
                  <div className="grid gap-4">
                    <div className="space-y-1">
                       <Label className="text-xs font-bold uppercase text-muted-foreground px-1">Full Name</Label>
                       <Input className="rounded-xl p-6 bg-muted/20" placeholder="Your name" value={regForm.name} onChange={e => setRegForm(p => ({ ...p, name: e.target.value }))} />
                    </div>
                    <div className="space-y-1">
                       <Label className="text-xs font-bold uppercase text-muted-foreground px-1">Phone Number</Label>
                       <Input className="rounded-xl p-6 bg-muted/20" placeholder="Contact number" value={regForm.phone} onChange={e => setRegForm(p => ({ ...p, phone: e.target.value }))} />
                    </div>
                  </div>
                  <Button className="mt-8 w-full p-6 text-lg rounded-xl shadow-lg shadow-sector-employment/20" onClick={() => setPayment({ open: true, title: "Profile Creation", details: [{ label: "User", value: regForm.name }], type: "registration" })}>Confirm Registration</Button>
                </div>
             ) : (
                <div className="max-w-xl mx-auto rounded-2xl border border-dashed border-sector-employment/40 bg-sector-employment/5 p-16 text-center shadow-inner">
                  <Upload className="mx-auto h-16 w-16 text-sector-employment mb-4 opacity-70" />
                  <h3 className="text-2xl font-black mb-2 uppercase tracking-tighter">Submit Resume</h3>
                  <p className="text-muted-foreground text-sm mb-8 font-medium">Upload your PDF or Word document to get matched with premium jobs instantly.</p>
                  <Button size="lg" className="px-8 rounded-full shadow-xl">Browse Files</Button>
                </div>
             )}
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

export default Employment;
