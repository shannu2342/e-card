import { useState } from "react";
import SectorHeader from "@/components/SectorHeader";
import PaymentConfirmation from "@/components/PaymentConfirmation";
import SearchFilter from "@/components/SearchFilter";
import { Button } from "@/components/ui/button";
import { businesses, businessEvents, fundingGuides } from "@/lib/dummyData";
import { Briefcase, Building2, TrendingUp, Rocket, Users, FileText, Share2, Lightbulb, UserPlus, ChevronRight, MapPin, Phone, Star, Mail, Award, Calendar, ArrowLeft } from "lucide-react";

const mainTabs = [
  { key: "register", label: "Business Registration", icon: Building2 },
  { key: "promotion", label: "Local Market Promotion", icon: TrendingUp },
  { key: "startup", label: "Startup Support", icon: Rocket },
  { key: "networking", label: "Business Networking", icon: Users },
];

const subSections: Record<string, string[]> = {
  promotion: ["Ads", "Featured Listings"],
  startup: ["Funding Guidance", "Mentorship"],
  networking: ["Events", "Partnerships"],
};

const Business = () => {
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

  const handlePromotionAction = (title: string, amount: string, b: typeof businesses[0]) => {
     setPayment({
       open: true,
       title: "Promotion Campaign",
       amount: amount,
       details: [
         { label: "Business", value: b.name },
         { label: "Location", value: b.location },
         { label: "Contact", value: b.contact },
         { label: "Action", value: title },
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
        icon={Briefcase}
        title="Business Sector"
        subtitle="Business Registration, Market Promotion & Startup Support"
        color="bg-sector-business"
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
                   ? "bg-sector-business text-white shadow-md ring-2 ring-sector-business/20"
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
        {activeTab === "register" && canShowData && (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border bg-card p-8 shadow-sm">
               <FileText className="h-10 w-10 text-sector-business mb-4" />
               <h2 className="text-xl font-bold mb-2">Register Your Business</h2>
               <p className="text-muted-foreground text-sm mb-6">Register your enterprise with SVCDA to access government schemes, funding opportunities, and market visibility.</p>
               <div className="space-y-4">
                  <div><label className="text-xs font-bold text-muted-foreground uppercase">Business Name</label><input className="w-full mt-1 p-2 border rounded-lg" placeholder="Shop/Startup name" /></div>
                  <div><label className="text-xs font-bold text-muted-foreground uppercase">Owner Name</label><input className="w-full mt-1 p-2 border rounded-lg" placeholder="Contact person" /></div>
               </div>
               <Button className="w-full mt-6" onClick={() => setPayment({ open: true, title: "Business Registration", amount: "₹499", details: [{ label: "Registration Type", value: "New Business" }], type: "payment" })}>Submit for Review</Button>
            </div>
            <div className="space-y-4">
               <div className="sector-card flex items-center gap-4"><UserPlus className="h-6 w-6 text-sector-business" /> <div><h3 className="font-bold">GST Registration Assistance</h3><p className="text-xs text-muted-foreground">Expert help in applying for GST and Udyam Aadhar.</p></div></div>
               <div className="sector-card flex items-center gap-4"><Share2 className="h-6 w-6 text-sector-business" /> <div><h3 className="font-bold">Digital Identity Creation</h3><p className="text-xs text-muted-foreground">Get your business listed on our digital directory and maps.</p></div></div>
            </div>
          </div>
        )}

        {activeTab === "promotion" && currentSub && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
                {businesses.filter(b => b.section === currentSub && b.name.toLowerCase().includes(search.toLowerCase())).map(b => (
                   <div key={b.id} className="sector-card border-l-4 border-sector-business">
                      <div className="flex items-start justify-between">
                         <h3 className="font-bold text-lg">{b.name}</h3>
                         <span className="rounded-full bg-sector-business/10 px-2 py-0.5 text-xs font-bold text-sector-business uppercase tracking-tighter">Verified</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1"><MapPin className="inline h-3 w-3" /> {b.location}</p>
                      <div className="mt-4 flex gap-2">
                         <Button size="sm" variant={currentSub === "Ads" ? "default" : "outline"} className="w-full" onClick={() => handlePromotionAction(currentSub === "Ads" ? "Run Campaign" : "Boost Listing", "₹499/mo", b)}>{currentSub === "Ads" ? "Run Campaign" : "Boost Listing"}</Button>
                         <Button size="sm" variant="ghost" className="w-full"><Mail className="mr-1 h-3 w-3" /> Contact</Button>
                      </div>
                   </div>
                ))}
            </div>
        )}

        {activeTab === "startup" && currentSub && (
            <div className="space-y-8">
                {currentSub === "Funding Guidance" ? (
                    <div className="grid gap-4">
                        {fundingGuides.map(f => (
                          <div key={f.id} className="sector-card">
                             <div className="flex items-center gap-3 mb-2"><Award className="h-5 w-5 text-sector-business" /> <h3 className="font-bold">{f.title}</h3></div>
                             <p className="text-sm text-muted-foreground">{f.description}</p>
                             <p className="mt-2 text-xs font-bold text-primary italic">Eligibility: {f.eligibility}</p>
                             <Button size="sm" variant="outline" className="mt-4 w-full"><BookOpen className="mr-1 h-3 w-3" /> Read Full Guide</Button>
                          </div>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border bg-card p-12 text-center max-w-lg mx-auto">
                        <Users className="h-12 w-12 mx-auto text-sector-business mb-4 opacity-50" />
                        <h3 className="text-xl font-bold mb-2 text-sector-business">Mentorship Programs</h3>
                        <p className="text-muted-foreground text-sm mb-6">Expert guidance from seasoned entrepreneurs to help you scale your startup from zero to one.</p>
                        <Button onClick={() => setPayment({ open: true, title: "Mentorship Registration", details: [{ label: "Mentor Session", value: "30-Min Consultation" }], type: "registration" })}>Book Session</Button>
                    </div>
                )}
            </div>
        )}

        {activeTab === "networking" && currentSub && (
            <div className="grid gap-4">
                {businessEvents.filter(e => e.section === currentSub).map(e => (
                    <div key={e.id} className="sector-card flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-sector-business/10 text-sector-business font-display text-xs flex-col">
                             <span className="font-bold text-lg">{e.date.split("-")[2]}</span>
                             <span>APR</span>
                          </div>
                          <div>
                             <h3 className="font-bold">{e.title}</h3>
                             <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><Calendar className="h-3 w-3" /> {e.location}</p>
                          </div>
                       </div>
                       <Button size="sm" variant="outline" onClick={() => setPayment({ open: true, title: "Event Registration", details: [{ label: "Event", value: e.title }], type: "registration" })}>Register</Button>
                    </div>
                ))}
                {businessEvents.filter(e => e.section === currentSub).length === 0 && (
                    <div className="text-center py-12 border-2 border-dashed rounded-2xl text-muted-foreground font-medium uppercase tracking-widest text-xs">
                        No active {currentSub.toLowerCase()} at this moment. Stay tuned.
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

export default Business;
