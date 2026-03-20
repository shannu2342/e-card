import { useState } from "react";
import SectorHeader from "@/components/SectorHeader";
import PaymentConfirmation from "@/components/PaymentConfirmation";
import SearchFilter from "@/components/SearchFilter";
import { Button } from "@/components/ui/button";
import { electronics, repairServices } from "@/lib/dummyData";
import { Monitor, Smartphone, Tv, WashingMachine, Cpu, Smartphone as MobIcon, ShoppingCart, Wrench, ChevronRight, Clock, MapPin, Phone, Star, Mail, Zap, ArrowLeft } from "lucide-react";

const mainTabs = [
  { key: "repair", label: "Repair Services", icon: Wrench },
  { key: "buy", label: "Buy Electronics", icon: ShoppingCart },
];

const subSections: Record<string, string[]> = {
  repair: ["Mobile Repair", "TV Repair", "Appliance Repair"],
  buy: ["Mobiles", "Home Appliances", "Accessories"],
};

const Electronics = () => {
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

  const handleBookRepair = (r: typeof repairServices[0]) => {
     setPayment({
       open: true,
       title: "Repair Booking",
       amount: r.price.split("-")[0].replace("₹", ""),
       details: [
         { label: "Item", value: r.name },
         { label: "Category", value: r.category },
         { label: "Turnaround", value: r.turnaround },
       ],
       type: "booking",
     });
  };

  const handleBuyItem = (item: typeof electronics[0]) => {
    setPayment({
      open: true,
      title: "Electronics Purchase",
      amount: `₹${item.price}`,
      details: [
        { label: "Item", value: item.name },
        { label: "Brand", value: item.brand },
      ],
      type: "payment",
    });
  };

  const activeSubsections = activeTab ? subSections[activeTab] || [] : [];
  const hasSubsections = activeSubsections.length > 0;
  const currentSub = activeSub;
  const canShowData = Boolean(activeTab && (!hasSubsections || currentSub));

  return (
    <div className="container py-8">
      <SectorHeader
        icon={Monitor}
        title="Electronics Sector"
        subtitle="Repair Services & Buy Electronics"
        color="bg-sector-electronics"
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
                   ? "bg-sector-electronics text-white shadow-md ring-2 ring-sector-electronics/20"
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
        {activeTab === "repair" && currentSub && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
               {repairServices.filter(r => r.category === currentSub && r.name.toLowerCase().includes(search.toLowerCase())).map(r => (
                  <div key={r.id} className="sector-card flex flex-col justify-between h-40">
                     <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                           <Wrench className="h-5 w-5 text-sector-electronics" />
                           <h3 className="font-bold">{r.name}</h3>
                        </div>
                        <span className="text-xs font-bold text-primary">{r.price}</span>
                     </div>
                     <div className="mt-4 flex flex-col gap-2">
                        <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> Turnaround: {r.turnaround}</p>
                        <Button size="sm" className="mt-2" onClick={() => handleBookRepair(r)}>Book Repair</Button>
                     </div>
                  </div>
               ))}
            </div>
        )}

        {activeTab === "buy" && currentSub && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {electronics.filter(e => e.category === currentSub && e.name.toLowerCase().includes(search.toLowerCase())).map(e => (
                   <div key={e.id} className="sector-card flex flex-col justify-between text-center min-h-[12rem]">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sector-electronics/10 text-sector-electronics mb-3">
                        {e.category === "Mobiles" ? <Smartphone className="h-8 w-8" /> : e.category === "TV Repair" ? <Tv className="h-8 w-8" /> : <WashingMachine className="h-8 w-8" />}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm h-10 overflow-hidden">{e.name}</h3>
                        <p className="mt-1 text-xs text-muted-foreground uppercase">{e.brand}</p>
                        <p className="mt-2 text-lg font-bold text-primary">₹{e.price}</p>
                      </div>
                      <Button size="sm" className="mt-3 w-full" onClick={() => handleBuyItem(e)}>Purchase Now</Button>
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

export default Electronics;
