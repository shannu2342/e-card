import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const BRAND_LOGO_SRC = "/SVCDA%20AGENCY%20(1).png";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "glass shadow-lg" : "bg-transparent border-b border-border/50"}`}>
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="h-10 w-10 overflow-hidden rounded-xl shadow-md shadow-primary/20">
            <img
              src={BRAND_LOGO_SRC}
              alt="SVCDA logo"
              width={40}
              height={40}
              className="h-full w-full origin-center scale-[3.2] object-contain"
              decoding="async"
            />
          </div>
          <div className="hidden sm:block">
            <p className="font-display text-sm font-bold leading-tight text-foreground">Small Village & City</p>
            <p className="text-[11px] text-muted-foreground">Development Agency</p>
          </div>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-3 md:flex">
          <Link to="/" className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">Home</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">Dashboard</Link>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{user.name}</span>
              <Button size="sm" variant="ghost" onClick={() => { logout(); navigate("/"); }} className="rounded-lg">
                <LogOut className="mr-1 h-4 w-4" /> Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login"><Button size="sm" variant="outline" className="rounded-lg">Login</Button></Link>
              <Link to="/register"><Button size="sm" className="rounded-lg shadow-md shadow-primary/20">Register</Button></Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-muted md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="glass border-t p-4 md:hidden animate-fade-in">
          <div className="flex flex-col gap-2">
            <Link to="/" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted">Home</Link>
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted">Dashboard</Link>
                <Button size="sm" variant="ghost" onClick={() => { logout(); navigate("/"); setMobileOpen(false); }} className="justify-start">
                  <LogOut className="mr-1 h-4 w-4" /> Logout
                </Button>
              </>
            ) : (
              <div className="flex gap-2 pt-2">
                <Link to="/login" onClick={() => setMobileOpen(false)} className="flex-1"><Button size="sm" variant="outline" className="w-full rounded-lg">Login</Button></Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="flex-1"><Button size="sm" className="w-full rounded-lg">Register</Button></Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
