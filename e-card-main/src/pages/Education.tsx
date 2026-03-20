import { useState } from "react";
import SectorHeader from "@/components/SectorHeader";
import PaymentConfirmation from "@/components/PaymentConfirmation";
import SearchFilter from "@/components/SearchFilter";
import { Button } from "@/components/ui/button";
import { schools, stationery, courses, ebooks } from "@/lib/dummyData";
import { GraduationCap, School, ShoppingBag, BookOpen, Laptop, Download, MapPin, Notebook, PenTool, Palette, Backpack, File, Book as BookIcon, Clock, ChevronRight, ArrowLeft } from "lucide-react";

const mainTabs = [
  { key: "schools", label: "Schools & Colleges", icon: School },
  { key: "stationery", label: "Stationery", icon: ShoppingBag },
  { key: "courses", label: "Skill Courses", icon: BookOpen },
  { key: "digital", label: "Digital Learning", icon: Laptop },
];

const subSections: Record<string, string[]> = {
  schools: ["Admissions Info", "Nearby Institutions"],
  stationery: ["Books", "Notebooks", "School Supplies"],
  courses: ["Online Courses", "Offline Training Centers", "Certification Programs"],
  digital: ["eBooks"],
};

const Education = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [payment, setPayment] = useState<{ open: boolean; title: string; amount?: string; details: { label: string; value: string }[]; type: "payment" | "booking" | "registration" }>({
    open: false, title: "", details: [], type: "registration",
  });

  // Reset sub-tab when main tab changes
  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setActiveSub(null);
    setSearch("");
  };

  const handleAdmission = (school: typeof schools[0]) => {
    setPayment({
      open: true,
      title: "Admission Registration",
      amount: school.fees === "Free" ? undefined : school.fees.replace("/yr", ""),
      details: [
        { label: "Institution", value: school.name },
        { label: "Type", value: school.type },
        { label: "Location", value: school.location },
        { label: "Medium", value: school.medium },
      ],
      type: school.fees === "Free" ? "registration" : "payment",
    });
  };

  const handleBuyStationery = (item: typeof stationery[0]) => {
    setPayment({
      open: true,
      title: "Order Stationery",
      amount: `₹${item.price}`,
      details: [
        { label: "Item", value: item.name },
        { label: "Category", value: item.category },
      ],
      type: "payment",
    });
  };

  const handleEnrollCourse = (course: typeof courses[0]) => {
    setPayment({
      open: true,
      title: "Course Enrollment",
      amount: course.fee,
      details: [
        { label: "Course", value: course.name },
        { label: "Institution", value: course.institution },
        { label: "Duration", value: course.duration },
        { label: "Type", value: course.type },
        { label: "Certification", value: course.certification ? "Yes" : "No" },
      ],
      type: "payment",
    });
  };

  const handleDownloadEbook = (ebook: typeof ebooks[0]) => {
    setPayment({
      open: true,
      title: ebook.price === "Free" ? "Download eBook" : "Purchase eBook",
      amount: ebook.price === "Free" ? undefined : ebook.price,
      details: [
        { label: "Title", value: ebook.name },
        { label: "Author", value: ebook.author },
        { label: "Pages", value: String(ebook.pages) },
        { label: "Format", value: ebook.format },
      ],
      type: ebook.price === "Free" ? "registration" : "payment",
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
        title="Education Sector"
        subtitle="Schools, Colleges, Skill Courses & Digital Learning"
        color="bg-sector-education"
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

      {/* Sub-Tabs (Tree Structure UI) */}
      {activeTab && (
        <div className="mb-6 flex flex-wrap gap-3 animate-in slide-in-from-left duration-300">
          <div className="flex items-center gap-1 rounded-lg bg-muted/30 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <ChevronRight className="h-3 w-3" /> Options
          </div>
          {activeSubsections.map(sub => (
            <button
              key={sub}
              onClick={() => {
                setActiveSub(sub);
                setSearch("");
              }}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                currentSub === sub
                  ? "bg-primary text-primary-foreground shadow-sm ring-2 ring-primary/20 ring-offset-2"
                  : "bg-background border hover:bg-muted text-muted-foreground"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {canShowData && (
        <SearchFilter value={search} onChange={setSearch} placeholder={`Search in ${currentSub}...`} />
      )}

      <div className="mt-8">
        {!activeTab && (
          <div className="rounded-2xl border border-dashed bg-card p-8 text-center text-sm text-muted-foreground">
            Step 1: Choose one option above.
          </div>
        )}

        {activeTab && !currentSub && (
          <div className="rounded-2xl border border-dashed bg-card p-8 text-center text-sm text-muted-foreground">
            Step 2: Select an option to continue.
          </div>
        )}

        {activeTab === "schools" && currentSub && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {schools
              .filter(s => s.section === currentSub && (s.name.toLowerCase().includes(search.toLowerCase()) || s.type.toLowerCase().includes(search.toLowerCase())))
              .map(s => (
                <div key={s.id} className="sector-card">
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold">{s.name}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${s.admissionOpen ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                      {s.admissionOpen ? "Admissions Open" : "Closed"}
                    </span>
                  </div>
                  <span className="mt-1 inline-block rounded-full bg-sector-education/10 px-2 py-0.5 text-xs font-medium text-sector-education">{s.type}</span>
                  <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                    <p className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {s.location}</p>
                    <p>Grades: {s.grades}</p>
                    <p>Medium: {s.medium}</p>
                  </div>
                  <p className="mt-2 text-sm font-bold text-primary">Fees: {s.fees}</p>
                  {s.admissionOpen && (
                    <Button size="sm" className="mt-3 w-full" onClick={() => handleAdmission(s)}>Apply for Admission</Button>
                  )}
                </div>
              ))}
          </div>
        )}

        {activeTab === "stationery" && currentSub && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stationery
              .filter(s => s.category === currentSub && (s.name.toLowerCase().includes(search.toLowerCase())))
              .map(s => {
                const Icon = Palette; // Simplified for now
                return (
                  <div key={s.id} className="sector-card text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sector-education/10">
                      <Icon className="h-8 w-8 text-sector-education" />
                    </div>
                    <h3 className="mt-3 font-bold text-sm h-10 overflow-hidden">{s.name}</h3>
                    <p className="mt-2 text-lg font-bold text-primary">₹{s.price}</p>
                    <Button size="sm" className="mt-3 w-full" onClick={() => handleBuyStationery(s)}>Buy Now</Button>
                  </div>
                );
              })}
          </div>
        )}

        {activeTab === "courses" && currentSub && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {courses
              .filter(c => c.section === currentSub && (c.name.toLowerCase().includes(search.toLowerCase())))
              .map(c => (
                <div key={c.id} className="sector-card">
                  <span className="inline-block rounded-full bg-sector-education/10 px-2 py-0.5 text-xs font-medium text-sector-education">{c.type}</span>
                  <h3 className="mt-2 font-bold">{c.name}</h3>
                  <p className="text-sm text-muted-foreground">{c.institution}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-muted px-2 py-1 flex items-center gap-1"><Clock className="h-3 w-3" /> {c.duration}</span>
                    <span className="rounded-full bg-primary/10 px-2 py-1 font-medium text-primary">{c.fee}</span>
                    {c.certification && <span className="rounded-full bg-primary/10 px-2 py-1 text-primary">Certified</span>}
                  </div>
                  <Button size="sm" className="mt-4 w-full" onClick={() => handleEnrollCourse(c)}>Enroll Now</Button>
                </div>
              ))}
          </div>
        )}

        {activeTab === "digital" && currentSub && (
          <div className="grid gap-4 sm:grid-cols-2">
            {ebooks
              .filter(e => e.name.toLowerCase().includes(search.toLowerCase()) || e.author.toLowerCase().includes(search.toLowerCase()))
              .map(e => (
                <div key={e.id} className="sector-card flex items-start gap-4">
                  <div className="flex h-16 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-sector-education/10 text-sector-education">
                    <BookIcon className="h-7 w-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">{e.name}</h3>
                    <p className="text-sm text-muted-foreground">{e.author}</p>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full bg-muted px-2 py-1">{e.pages} pages</span>
                      <span className="rounded-full bg-muted px-2 py-1">{e.format}</span>
                      <span className={`rounded-full px-2 py-1 font-medium ${e.price === "Free" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"}`}>{e.price}</span>
                    </div>
                    <Button size="sm" className="mt-3" onClick={() => handleDownloadEbook(e)}>
                      <Download className="mr-1 h-3 w-3" /> {e.price === "Free" ? "Download Free" : "Purchase & Download"}
                    </Button>
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

export default Education;
