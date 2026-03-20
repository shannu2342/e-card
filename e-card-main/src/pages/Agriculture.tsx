import { useState } from "react";
import SectorHeader from "@/components/SectorHeader";
import PaymentConfirmation from "@/components/PaymentConfirmation";
import SearchFilter from "@/components/SearchFilter";
import { Button } from "@/components/ui/button";
import { farmingTips, cropPrices, fertilizers, machinery } from "@/lib/dummyData";
import { Tractor, Sprout, TrendingUp, Shovel, Wrench, ChevronRight, MapPin, Phone, Star, Mail, Info, Clock, DollarSign, CloudRain, ArrowLeft } from "lucide-react";

const mainTabs = [
  { key: "tips", label: "Farming Tips", icon: Sprout },
  { key: "seeds", label: "Fertilizers & Seeds Info", icon: CloudRain },
  { key: "machinery", label: "Machinery", icon: Tractor },
];

const subSections: Record<string, string[]> = {
  tips: ["Seasonal Crops", "Best Practices"],
  machinery: ["Rental Services", "Purchase Options"],
};

const Agriculture = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [payment, setPayment] = useState<{ open: boolean; title: string; amount?: string; details: { label: string; value: string }[]; type: "payment" | "booking" | "registration" }>({
    open: false, title: "", details: [], type: "payment",
  });

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setActiveSub(null);
    setSearch("");
  };

  const handleApplyMachinery = (m: typeof machinery[0]) => {
     setPayment({
       open: true,
       title: "Machinery Booking",
       amount: m.price.replace("₹", "").replace("/hr", "").replace(",", ""),
       details: [
         { label: "Item", value: m.name },
         { label: "Type", value: m.type },
         { label: "Contact", value: m.contact },
       ],
       type: m.type === "Rental Services" ? "booking" : "payment",
     });
  };

  const activeSubsections = activeTab ? subSections[activeTab] || [] : [];
  const hasSubsections = activeSubsections.length > 0;
  const currentSub = activeSub;
  const canShowData = Boolean(activeTab && (!hasSubsections || currentSub));

  return (
    <div className="container py-8">
      <SectorHeader
        icon={Tractor}
        title="Agriculture Sector"
        subtitle="Farming Tips, Fertilizers & Machinery"
        color="bg-sector-agriculture"
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
                   ? "bg-sector-agriculture text-white shadow-md ring-2 ring-sector-agriculture/20"
                   : "bg-background border hover:bg-muted text-muted-foreground"
               }`}
             >
               {sub}
             </button>
           ))}
        </div>
      )}

      {canShowData && activeTab !== "machinery" && (
        <SearchFilter value={search} onChange={setSearch} placeholder={`Search in ${currentSub || activeTab}...`} />
      )}

      <div className="mt-8">
        {activeTab === "tips" && currentSub && (
            <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                   <h2 className="text-xl font-bold flex items-center gap-2"><Sprout className="h-5 w-5 text-sector-agriculture" /> {currentSub}</h2>
                   {farmingTips.filter(t => t.section === currentSub).map(t => (
                      <div key={t.id} className="sector-card border-l-4 border-sector-agriculture">
                          <h3 className="font-bold">{t.title}</h3>
                          <p className="mt-2 text-sm text-muted-foreground">{t.content}</p>
                          <p className="mt-3 text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{t.date}</p>
                      </div>
                   ))}
                </div>
                <div className="rounded-2xl border bg-card p-6 shadow-sm">
                   <h2 className="mb-4 font-bold flex items-center gap-2 text-primary font-display uppercase tracking-widest text-xs border-b pb-2"><TrendingUp className="h-4 w-4" /> Market Prices (Mandi)</h2>
                   <div className="space-y-3">
                      {cropPrices.map((c, i) => (
                         <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                            <span className="font-medium">{c.crop}</span>
                            <span className="font-bold text-primary">{c.price}</span>
                         </div>
                      ))}
                   </div>
                </div>
            </div>
        )}

        {activeTab === "seeds" && canShowData && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {fertilizers.map(f => (
                   <div key={f.id} className="sector-card flex flex-col justify-between">
                      <div className="flex items-start justify-between">
                         <div>
                            <h3 className="font-bold">{f.name}</h3>
                            <p className="text-xs text-muted-foreground mt-1 uppercase tracking-tighter">{f.type}</p>
                         </div>
                         <span className="text-lg font-bold text-primary">{f.price}</span>
                      </div>
                      <p className="mt-4 text-xs text-muted-foreground italic h-10 overflow-hidden line-clamp-2">Usage: {f.usage}</p>
                      <Button size="sm" className="mt-4 w-full" disabled={!f.available} onClick={() => setPayment({ open: true, title: "Fertilizer Order", amount: f.price.replace("₹", "").replace(",", ""), details: [{ label: "Product", value: f.name }], type: "payment" })}>{f.available ? "Order Now" : "Out of Stock"}</Button>
                   </div>
                ))}
            </div>
        )}

        {activeTab === "machinery" && currentSub && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {machinery.filter(m => m.type === currentSub).map(m => (
                   <div key={m.id} className="sector-card min-h-[14rem] flex flex-col justify-between">
                      <div className="flex items-start justify-between">
                         <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sector-agriculture/10 text-sector-agriculture"><Tractor className="h-6 w-6" /></div>
                         <div className="text-right">
                            <span className="text-xs font-bold text-muted-foreground uppercase">{m.availability}</span>
                            <h3 className="font-bold text-lg mt-1">{m.name}</h3>
                         </div>
                      </div>
                      <div className="mt-4 flex flex-col gap-2">
                         <p className="text-sm font-bold text-primary tracking-tight">{m.price}</p>
                         <div className="flex gap-2">
                            <Button size="sm" className="w-full" onClick={() => handleApplyMachinery(m)} disabled={m.availability === "Booked"}>{m.type === "Rental Services" ? "Rent Now" : "Purchase"}</Button>
                            <Button size="sm" variant="ghost" className="w-full"><Phone className="mr-1 h-3 w-3" /> Contact</Button>
                         </div>
                      </div>
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

export default Agriculture;
