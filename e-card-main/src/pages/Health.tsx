import { useState } from "react";
import SectorHeader from "@/components/SectorHeader";
import PaymentConfirmation from "@/components/PaymentConfirmation";
import SearchFilter from "@/components/SearchFilter";
import { Button } from "@/components/ui/button";
import { doctors, hospitals, medicines, healthTips } from "@/lib/dummyData";
import { Heart, Stethoscope, Building2, Pill, Activity, Phone, MapPin, Calendar, Star, Info, Package, Pill as PillIcon, GlassWater, Bandage, ShoppingCart, ChevronRight, Video, UserCheck, AlertCircle, ArrowLeft } from "lucide-react";

const mainTabs = [
  { key: "appointments", label: "Doctor Appointments", icon: Stethoscope },
  { key: "hospitals", label: "Hospitals & Clinics", icon: Building2 },
  { key: "medicines", label: "Medicine Orders", icon: Pill },
  { key: "awareness", label: "Health Awareness", icon: Activity },
];

const subSections: Record<string, string[]> = {
  appointments: ["Online Consultation", "Clinic Visits"],
  hospitals: ["Nearby Search", "Emergency Services"],
  medicines: ["Home Delivery"],
  awareness: ["Campaigns", "Tips & Articles"],
};

const iconMap: Record<string, any> = {
  Pill: PillIcon, GlassWater: GlassWater, Bandage: Bandage,
};

const Health = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<typeof medicines>([]);
  const [payment, setPayment] = useState<{ open: boolean; title: string; amount?: string; details: { label: string; value: string }[]; type: "payment" | "booking" | "registration" }>({
    open: false, title: "", details: [], type: "booking",
  });

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setActiveSub(null);
    setSearch("");
  };

  const handleBookDoctor = (d: typeof doctors[0]) => {
     setPayment({
       open: true,
       title: "Appointment Booking",
       amount: d.fee.replace("₹", ""),
       details: [
         { label: "Doctor", value: d.name },
         { label: "Specialty", value: d.specialty },
         { label: "Hospital", value: d.hospital },
         { label: "Type", value: d.consultationType },
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
        icon={Heart}
        title="Health Services"
        subtitle="Doctor Appointments, Hospitals & Medicine Orders"
        color="bg-sector-health"
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
                  ? "bg-sector-health text-white shadow-md ring-2 ring-sector-health/20"
                  : "bg-background border hover:bg-muted text-muted-foreground"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {canShowData && activeTab !== "awareness" && (
        <SearchFilter value={search} onChange={setSearch} placeholder={`Search in ${currentSub || activeTab}...`} />
      )}

      <div className="mt-8">
        {activeTab === "appointments" && currentSub && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
               {doctors.filter(d => d.consultationType === currentSub && d.name.toLowerCase().includes(search.toLowerCase())).map(d => (
                   <div key={d.id} className="sector-card border-l-4 border-sector-health">
                      {d.consultationType === "Online Consultation" ? <Video className="h-5 w-5 text-sector-health mb-2" /> : <UserCheck className="h-5 w-5 text-sector-health mb-2" />}
                      <h3 className="font-bold text-lg">{d.name}</h3>
                      <p className="text-sm font-medium text-sector-health/80">{d.specialty}</p>
                      <p className="mt-1 text-xs text-muted-foreground italic"><Building2 className="inline h-3 w-3" /> {d.hospital}</p>
                      <p className="mt-3 text-sm font-bold text-primary">Fee: {d.fee}</p>
                      <Button size="sm" className="mt-3 w-full" onClick={() => handleBookDoctor(d)}>{d.available ? "Book Appointment" : "Consult Later"}</Button>
                   </div>
               ))}
            </div>
        )}

        {activeTab === "hospitals" && currentSub && (
            <div className="grid gap-4 sm:grid-cols-2">
                {hospitals.filter(h => h.section === currentSub).map(h => (
                   <div key={h.id} className="sector-card flex items-start justify-between">
                       <div className="flex gap-4 items-center">
                          <div className={`h-12 w-12 flex items-center justify-center rounded-xl ${h.emergency ? "bg-red-500 text-white" : "bg-sector-health/10 text-sector-health"}`}>
                             <Building2 className="h-6 w-6" />
                          </div>
                          <div>
                             <h3 className="font-bold text-lg">{h.name}</h3>
                             <p className="text-xs text-muted-foreground"><MapPin className="inline h-3 w-3" /> {h.location}</p>
                          </div>
                       </div>
                       <Button size="sm" variant="outline" className="mt-4"><Phone className="mr-1 h-3 w-3" /> Emergency Call</Button>
                   </div>
                ))}
            </div>
        )}

        {activeTab === "medicines" && currentSub && (
            <div className="space-y-6">
                <div className="flex items-center justify-between border-b pb-4">
                  <h2 className="text-xl font-bold">Medicines (Home Delivery)</h2>
                  <Button variant="outline" size="sm" disabled={cart.length === 0} onClick={() => setPayment({ open: true, title: "Medicine Order", details: cart.map(m => ({ label: m.name, value: `₹${m.price}` })), type: "payment", amount: `₹${cart.reduce((s, m) => s + m.price, 0)}` })}>
                    <ShoppingCart className="mr-2 h-4 w-4" /> Cart ({cart.length})
                  </Button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {medicines.filter(m => m.name.toLowerCase().includes(search.toLowerCase())).map(m => {
                    const Icon = iconMap[m.iconName || ""] || PillIcon;
                    return (
                      <div key={m.id} className="sector-card text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sector-health/10 text-sector-health mb-3"><Icon className="h-7 w-7" /></div>
                        <h3 className="font-bold text-sm h-10 overflow-hidden">{m.name}</h3>
                        <p className="mt-1 text-xs text-muted-foreground uppercase">{m.category}</p>
                        <p className="mt-2 text-lg font-bold text-primary">₹{m.price}</p>
                        <Button size="sm" variant={cart.some(x => x.id === m.id) ? "default" : "outline"} className="mt-3 w-full" onClick={() => setCart([...cart, m])} disabled={cart.some(x => x.id === m.id)}>
                          {cart.some(x => x.id === m.id) ? "In Cart" : "Add to Order"}
                        </Button>
                      </div>
                    );
                  })}
                </div>
            </div>
        )}

        {activeTab === "awareness" && currentSub && (
            <div className="grid gap-4 sm:grid-cols-2">
                {healthTips.filter(t => t.category === currentSub).map(t => (
                  <div key={t.id} className="sector-card">
                     <div className="flex items-center gap-3 mb-3">
                        <Info className="h-5 w-5 text-sector-health" />
                        <h3 className="font-bold text-lg">{t.title}</h3>
                     </div>
                     <p className="text-sm text-muted-foreground">{t.content}</p>
                     <Button size="sm" variant="ghost" className="mt-4 p-0 text-sector-health font-bold">Read Full Guide →</Button>
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

export default Health;
