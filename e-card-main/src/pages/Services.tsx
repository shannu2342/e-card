import { useState } from "react";
import SectorHeader from "@/components/SectorHeader";
import PaymentConfirmation from "@/components/PaymentConfirmation";
import SearchFilter from "@/components/SearchFilter";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/dummyData";
import { Wrench, Zap, Pipette as Pipe, Hammer, Paintbrush, HardHat, CalendarCheck, Star, Clock, Phone, Settings, ClipboardList, ChevronRight, ArrowLeft } from "lucide-react";

const mainTabs = [
  { key: "Electricians", label: "Electricians", icon: Zap },
  { key: "Plumbers", label: "Plumbers", icon: Pipe },
  { key: "Carpenters", label: "Carpenters", icon: Hammer },
  { key: "House Painters", label: "House Painters", icon: Paintbrush },
  { key: "Daily Wage Labours", label: "Daily Wage Labours", icon: HardHat },
  { key: "Booking System", label: "Booking System", icon: ClipboardList },
];

const subSections: Record<string, string[]> = {
  "Booking System": ["Schedule Service", "Ratings & Reviews"],
};

const Services = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [payment, setPayment] = useState<{ open: boolean; title: string; amount?: string; details: { label: string; value: string }[]; type: "payment" | "booking" | "registration" }>({
    open: false, title: "", details: [], type: "booking",
  });

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setActiveSub(null);
    setSearch("");
  };

  const handleBookService = (s: typeof services[0]) => {
    setPayment({
      open: true,
      title: "Service Booking",
      amount: s.rate.replace("/day", "").replace("₹", ""),
      details: [
        { label: "Provider", value: s.name },
        { label: "Trade", value: s.trade },
        { label: "Rate", value: s.rate },
      ],
      type: "booking",
    });
  };

  const activeSubsections = activeTab ? subSections[activeTab] || [] : [];
  const hasSubsections = activeSubsections.length > 0;
  const currentSub = activeSub;
  const canShowData = Boolean(activeTab && (!hasSubsections || currentSub));

  return (
    <div className="container py-8">
      <SectorHeader
        icon={Wrench}
        title="Services Sector"
        subtitle="Professional Trade Services & Local Providers"
        color="bg-sector-services"
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
          {activeSubsections.map(sub => (
            <button
              key={sub}
              onClick={() => setActiveSub(sub)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                currentSub === sub
                  ? "bg-sector-services text-white shadow-md ring-2 ring-sector-services/20"
                  : "bg-background border hover:bg-muted text-muted-foreground"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {canShowData && activeTab !== "Booking System" && (
        <SearchFilter value={search} onChange={setSearch} placeholder={`Search in ${activeTab}...`} />
      )}

      <div className="mt-8">
        {canShowData && (activeTab === "Booking System" ? (
          <div className="space-y-6">
             {currentSub === "Schedule Service" ? (
                <div className="rounded-2xl border bg-gradient-to-br from-sector-services/5 to-primary/5 p-12 text-center max-w-2xl mx-auto">
                   <CalendarCheck className="mx-auto mb-4 h-12 w-12 text-sector-services" />
                   <h3 className="text-xl font-bold mb-2">Book a Skilled Professional</h3>
                   <p className="text-muted-foreground text-sm mb-8 italic">Choose your trade above to schedule a service with our verified providers.</p>
                   <div className="flex flex-wrap justify-center gap-3">
                      {["Electricians", "Plumbers", "Carpenters", "House Painters"].map(t => (
                        <Button key={t} variant="outline" size="sm" onClick={() => setActiveTab(t)}>{t}</Button>
                      ))}
                   </div>
                </div>
             ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                   {services.slice(0, 4).map(s => (
                      <div key={s.id} className="sector-card border-l-4 border-amber-500">
                         <div className="flex items-center justify-between mb-3 border-b pb-2">
                            <h3 className="font-bold">{s.name}</h3>
                            <div className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-amber-600 font-bold text-xs"><Star className="h-3 w-3 fill-amber-500" /> {s.rating}</div>
                         </div>
                         <p className="text-xs text-muted-foreground font-medium italic">"Exceptional work, very professional and arrived on time. Highly recommended for {s.trade} work."</p>
                      </div>
                   ))}
                </div>
             )}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
             {services.filter(s => s.trade === activeTab && s.name.toLowerCase().includes(search.toLowerCase())).map(s => (
                <div key={s.id} className="sector-card">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sector-services/10 text-sector-services mb-4 shadow-sm border border-sector-services/5">
                    {activeTab === "Electricians" ? <Zap className="h-6 w-6" /> : activeTab === "Plumbers" ? <Pipe className="h-6 w-6" /> : activeTab === "Carpenters" ? <Hammer className="h-6 w-6" /> : activeTab === "House Painters" ? <Paintbrush className="h-6 w-6" /> : <HardHat className="h-6 w-6" />}
                  </div>
                  <h3 className="font-bold text-lg">{s.name}</h3>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs font-bold text-primary italic uppercase tracking-wider">{s.rate}</span>
                    <span className="text-xs text-muted-foreground tracking-tighter opacity-70 border-l pl-2">{s.experience} Exp</span>
                  </div>
                  <Button className="mt-4 w-full shadow-lg hover:shadow-primary/20" onClick={() => handleBookService(s)}>Book Now</Button>
                </div>
             ))}
          </div>
        ))}
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

export default Services;
