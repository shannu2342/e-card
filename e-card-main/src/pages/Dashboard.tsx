import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { GraduationCap, ShoppingCart, Briefcase, Heart, Monitor, Tractor, Wrench, BookOpen, Users, LayoutDashboard, Zap } from "lucide-react";

const sectorLinks = [
  { icon: GraduationCap, label: "Education", path: "/education", color: "text-sector-education" },
  { icon: ShoppingCart, label: "Grocery", path: "/grocery", color: "text-sector-grocery" },
  { icon: Briefcase, label: "Business", path: "/business", color: "text-sector-business" },
  { icon: Heart, label: "Health", path: "/health", color: "text-sector-health" },
  { icon: Monitor, label: "Electronics", path: "/electronics", color: "text-sector-electronics" },
  { icon: Tractor, label: "Agriculture", path: "/agriculture", color: "text-sector-agriculture" },
  { icon: Wrench, label: "Services", path: "/services", color: "text-sector-services" },
  { icon: BookOpen, label: "Training", path: "/training", color: "text-sector-training" },
  { icon: Users, label: "Employment", path: "/employment", color: "text-sector-employment" },
];

const Dashboard = () => {
  const { user, isAdmin } = useAuth();

  if (!user) {
    return (
      <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-lg text-muted-foreground">Please login to access the dashboard.</p>
        <Link to="/login" className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground">Login</Link>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <LayoutDashboard className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Welcome, {user.name}! <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{user.role}</span>
          </p>
        </div>
      </div>

      {isAdmin && (
        <div className="mb-8 rounded-xl border-2 border-secondary/30 bg-secondary/5 p-6">
          <h2 className="mb-2 font-bold text-secondary flex items-center gap-1"><Zap className="h-4 w-4" /> Admin Panel</h2>
          <p className="text-sm text-muted-foreground">You have admin access. Visit any sector page to add, edit, or delete content.</p>
          <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5">
            <div className="rounded-lg bg-card p-3 text-center shadow-sm">
              <p className="text-2xl font-bold text-primary">5</p>
              <p className="text-xs text-muted-foreground">Courses</p>
            </div>
            <div className="rounded-lg bg-card p-3 text-center shadow-sm">
              <p className="text-2xl font-bold text-sector-grocery">6</p>
              <p className="text-xs text-muted-foreground">Products</p>
            </div>
            <div className="rounded-lg bg-card p-3 text-center shadow-sm">
              <p className="text-2xl font-bold text-sector-health">4</p>
              <p className="text-xs text-muted-foreground">Doctors</p>
            </div>
            <div className="rounded-lg bg-card p-3 text-center shadow-sm">
              <p className="text-2xl font-bold text-sector-services">4</p>
              <p className="text-xs text-muted-foreground">Services</p>
            </div>
            <div className="rounded-lg bg-card p-3 text-center shadow-sm">
              <p className="text-2xl font-bold text-sector-employment">5</p>
              <p className="text-xs text-muted-foreground">Jobs</p>
            </div>
          </div>
        </div>
      )}

      <h2 className="mb-4 text-lg font-bold">Quick Access</h2>
      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-3">
        {sectorLinks.map(s => (
          <Link key={s.path} to={s.path} className="sector-card flex items-center gap-3">
            <s.icon className={`h-6 w-6 ${s.color}`} />
            <span className="font-medium">{s.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
