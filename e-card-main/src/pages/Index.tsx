import { Link } from "react-router-dom";
import { GraduationCap, ShoppingCart, Briefcase, Heart, Monitor, Tractor, Wrench, BookOpen, Users, Rocket, Phone, ArrowRight, Star, Zap, Globe, Target, MapPin } from "lucide-react";

const BRAND_LOGO_SRC = "/SVCDA%20AGENCY%20(1).png";

const sectors = [
  { key: "education", icon: GraduationCap, title: "Education Sector", desc: "Schools, Colleges, Skill Courses & Books", path: "/education", color: "bg-sector-education" },
  { key: "grocery", icon: ShoppingCart, title: "Home Grocery Store", desc: "Online Grocery, Home Delivery, Daily Discounts", path: "/grocery", color: "bg-sector-grocery" },
  { key: "business", icon: Briefcase, title: "Business Sector", desc: "Startup Support, Local Market, Networking", path: "/business", color: "bg-sector-business" },
  { key: "health", icon: Heart, title: "Health Services", desc: "Doctor Consult, Medicines, Hospitals", path: "/health", color: "bg-sector-health" },
  { key: "electronics", icon: Monitor, title: "Electronics Sector", desc: "Repair & Buy Electronics", path: "/electronics", color: "bg-sector-electronics" },
  { key: "agriculture", icon: Tractor, title: "Agriculture Sector", desc: "Farming Tips, Crop Market, Seeds & Machinery", path: "/agriculture", color: "bg-sector-agriculture" },
  { key: "services", icon: Wrench, title: "Services Sector", desc: "Electricians, Plumbers, Labour Services", path: "/services", color: "bg-sector-services" },
  { key: "training", icon: BookOpen, title: "Skill Development", desc: "VCDA Shiksha Mission, Job Courses, Women Empowerment", path: "/training", color: "bg-sector-training" },
  { key: "employment", icon: Users, title: "Employment Sector", desc: "Job Alerts, Daily Wage Jobs, Registration", path: "/employment", color: "bg-sector-employment" },
];

const stats = [
  { label: "Villages Connected", value: "500+", icon: Globe },
  { label: "Active Users", value: "10K+", icon: Users },
  { label: "Services Offered", value: "9", icon: Zap },
  { label: "Success Stories", value: "1200+", icon: Star },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero px-4 py-20 text-primary-foreground md:py-32">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary-foreground/5 floating" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary-foreground/5 floating-delay" />
          <div className="absolute right-1/4 top-1/3 h-40 w-40 rounded-full bg-secondary/10 floating-delay" />
          <div className="absolute left-1/3 bottom-1/4 h-24 w-24 rounded-full bg-primary-foreground/5 floating" />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="container relative z-10 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md shadow-xl pulse-glow">
            <img
              src={BRAND_LOGO_SRC}
              alt="SVCDA logo"
              width={48}
              height={48}
              className="h-12 w-12 rounded-xl object-cover"
              decoding="async"
            />
          </div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-xs font-medium backdrop-blur-sm shadow-inner">
            <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
            Empowering Rural & Urban Communities
          </div>
          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            Small Village & City
            <br />
            <span className="gradient-text drop-shadow-sm">Development Agency</span>
          </h1>
          <p className="mx-auto mb-4 max-w-2xl text-lg font-medium opacity-90 md:text-xl">
            All-in-One Sector Service Hub
          </p>
          <p className="mx-auto mb-10 max-w-lg text-sm opacity-70 md:text-base leading-relaxed">
            Building a digitally connected & empowered community through one platform — bridging villages and cities.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/register" className="group inline-flex items-center gap-2 rounded-xl bg-secondary px-8 py-4 text-sm font-bold text-black shadow-lg shadow-black/10 transition-all hover:bg-white hover:scale-105 active:scale-95">
              Get Started Free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a href="tel:+918978210705" className="inline-flex items-center gap-2 rounded-xl border-2 border-primary-foreground/30 bg-primary-foreground/5 px-8 py-4 text-sm font-semibold backdrop-blur-sm transition-all hover:bg-primary-foreground/10 hover:border-primary-foreground/50">
              <Phone className="h-4 w-4" /> +91 8978210705
            </a>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative z-10 -mt-12 px-4">
        <div className="container">
          <div className="glass mx-auto grid max-w-5xl grid-cols-2 gap-4 rounded-3xl p-8 shadow-2xl md:grid-cols-4 md:gap-8 border border-white/20">
            {stats.map((stat, i) => (
              <div key={stat.label} className={`text-center transition-all hover:scale-105 duration-300 ${i !== stats.length - 1 ? 'md:border-r border-muted/30' : ''}`}>
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <p className="text-3xl font-extrabold text-foreground tracking-tight">{stat.value}</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors Grid */}
      <section className="container py-20 md:py-28">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary border border-primary/20">
            <Zap className="h-3 w-3" /> OUR SECTORS
          </div>
          <h2 className="mb-4 text-3xl font-extrabold md:text-5xl tracking-tight">Everything You Need, One Platform</h2>
          <p className="mx-auto max-w-xl text-muted-foreground text-lg leading-relaxed">9 comprehensive sectors serving rural & urban communities with digital-first solutions</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((s, i) => (
            <Link
              key={s.key}
              to={s.path}
              className="sector-card group relative flex items-start gap-4 p-6 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 stagger-fade-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="absolute top-0 right-0 -mr-8 -mt-8 h-24 w-24 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500" />
              <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${s.color} text-primary-foreground shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                <s.icon className="h-7 w-7" />
              </div>
              <div className="flex-1 relative z-10">
                <h3 className="font-display text-lg font-bold transition-colors group-hover:text-primary">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed h-10 overflow-hidden line-clamp-2">{s.desc}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:gap-2 transition-all">
                    Explore Now <ArrowRight className="h-3 w-3" />
                  </span>
                  <div className="h-1 w-8 rounded-full bg-muted group-hover:bg-primary/30 transition-all duration-500" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="border-t bg-muted/30 py-20 md:py-28">
        <div className="container">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-bold text-black border border-secondary/20">
              <Star className="h-3 w-3" /> WHY CHOOSE US
            </div>
            <h2 className="text-3xl font-extrabold md:text-5xl tracking-tight">Our Purpose & Direction</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
            <div className="group relative rounded-3xl border bg-card p-10 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 overflow-hidden">
              <div className="absolute top-0 right-0 -mr-12 -mt-12 h-40 w-40 rounded-full bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <Target className="h-7 w-7" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-primary">Our Vision</h3>
              <p className="text-base leading-relaxed text-muted-foreground font-medium">
                To build a digitally connected & empowered rural & urban community through one platform — bridging the gap between villages and cities with technology and innovation.
              </p>
            </div>
            <div className="group relative rounded-3xl border bg-card p-10 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 overflow-hidden">
              <div className="absolute top-0 right-0 -mr-12 -mt-12 h-40 w-40 rounded-full bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10 text-secondary transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <Rocket className="h-7 w-7" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-secondary">Our Mission</h3>
              <p className="text-base leading-relaxed text-muted-foreground font-medium">
                Education, Business, Healthcare, Agriculture & Employment Support — all accessible through a single digital platform designed for every citizen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 gradient-hero opacity-95" />
        <div className="absolute inset-0 opacity-[0.05]" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }} />
        <div className="container relative z-10 text-center text-primary-foreground">
          <h2 className="mb-6 text-4xl font-extrabold md:text-5xl lg:text-6xl tracking-tight">Ready to Transform Your Community?</h2>
          <p className="mx-auto mb-10 max-w-xl text-lg opacity-80 leading-relaxed font-medium">
            Join thousands of users already benefiting from our all-in-one service platform. Experience the power of connection.
          </p>
          <Link to="/register" className="group inline-flex items-center gap-3 rounded-2xl bg-white px-10 py-5 text-base font-bold text-black shadow-2xl transition-all hover:bg-secondary hover:scale-105 active:scale-95">
            Join Now — It's Free
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-16">
        <div className="container">
          <div className="flex flex-col items-center gap-8">
            <div className="flex items-center gap-3 scale-110">
              <img
                src={BRAND_LOGO_SRC}
                alt="SVCDA logo"
                width={48}
                height={48}
                className="h-12 w-12 rounded-2xl object-cover shadow-lg shadow-primary/20 rotate-3"
                decoding="async"
              />
              <div>
                <p className="font-display text-lg font-bold tracking-tight">Small Village & City</p>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Development Agency</p>
              </div>
            </div>
            
            <div className="h-px w-full max-w-3xl bg-gradient-to-r from-transparent via-muted-foreground/20 to-transparent" />
            
            <div className="flex flex-col items-center gap-4">
              <p className="font-display text-xl font-bold text-foreground">"One App for Village & City Development" <Rocket className="inline-block h-5 w-5 text-secondary animate-bounce ml-1" /></p>
              <div className="flex items-center gap-6 text-sm font-bold text-muted-foreground">
                <span className="hover:text-primary transition-colors cursor-pointer">© 2026 SVCDA</span>
                <span className="text-muted/30">•</span>
                <a href="tel:+918978210705" className="flex items-center gap-1.5 transition-colors hover:text-primary">
                  <Phone className="h-4 w-4" /> +91 8978210705
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mt-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/30 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all cursor-pointer"><Globe className="h-4 w-4" /></div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/30 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all cursor-pointer"><Zap className="h-4 w-4" /></div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/30 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all cursor-pointer"><Star className="h-4 w-4" /></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
