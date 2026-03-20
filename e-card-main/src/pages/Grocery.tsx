import { useState } from "react";
import SectorHeader from "@/components/SectorHeader";
import PaymentConfirmation from "@/components/PaymentConfirmation";
import SearchFilter from "@/components/SearchFilter";
import { Button } from "@/components/ui/button";
import { localStores, products, groceryOffers } from "@/lib/dummyData";
import { ShoppingCart, Store, Package, Truck, CalendarClock, Tag, Plus, Minus, Star, Phone, MapPin, Wheat, Scroll, Droplets, Candy, Milk, Soup, Sparkles, Cookie, Pizza, Nut, ChevronRight, ArrowLeft } from "lucide-react";

const mainTabs = [
  { key: "stores", label: "Local Stores Listing", icon: Store },
  { key: "orders", label: "Online Ordering", icon: Package },
  { key: "categories", label: "Categories", icon: ShoppingCart },
  { key: "delivery", label: "Home Delivery", icon: Truck },
  { key: "subscription", label: "Subscription Orders", icon: CalendarClock },
  { key: "offers", label: "Offers & Discounts", icon: Tag },
];

const subSections: Record<string, string[]> = {
  categories: ["Grains & Paper aisle", "Beauty Products", "Dairys", "Snacks"],
};

const iconMap: Record<string, any> = {
  Wheat: Wheat, Scroll: Scroll, Droplets: Droplets, Candy: Candy, Milk: Milk, Soup: Soup, Sparkles: Sparkles, Cookie: Cookie, Pizza: Pizza, Nut: Nut,
};

const Grocery = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<{ id: string, name: string, price: number, qty: number }[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [subscriptionItems, setSubscriptionItems] = useState<string[]>([]);
  const [payment, setPayment] = useState<{ open: boolean; title: string; amount?: string; details: { label: string; value: string }[]; type: "payment" | "booking" | "registration" }>({
    open: false, title: "", details: [], type: "payment",
  });

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setActiveSub(null);
    setSearch("");
  };

  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);

  const activeSubsections = activeTab ? subSections[activeTab] || [] : [];
  const hasSubsections = activeSubsections.length > 0;
  const currentSub = activeSub;
  const canShowData = Boolean(activeTab && (!hasSubsections || currentSub));

  return (
    <div className="container py-8">
      <SectorHeader
        icon={ShoppingCart}
        title="Home Grocery Store"
        subtitle="Local Stores, Online Ordering & Subscriptions"
        color="bg-sector-grocery"
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
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-1 text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-lg text-xs font-bold uppercase">
            <ChevronRight className="h-3 w-3" /> Options
          </div>
          {activeSubsections.map(sub => (
            <button
              key={sub}
              onClick={() => setActiveSub(sub)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                currentSub === sub
                  ? "bg-sector-grocery text-white shadow-md ring-2 ring-sector-grocery/20"
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

        {activeTab === "stores" && canShowData && (
          <div className="grid gap-4 sm:grid-cols-2">
            {localStores.map(s => (
              <div key={s.id} className="sector-card flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-lg">{s.name}</h3>
                  <p className="text-sm text-muted-foreground"><MapPin className="inline h-3 w-3" /> {s.location}</p>
                  {s.delivery && <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary"><Truck className="h-3 w-3" /> Delivery Available</span>}
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 text-amber-500 font-bold"><Star className="h-3 w-3 fill-amber-500" /> {s.rating}</div>
                  <Button size="sm" variant="outline" className="mt-4" onClick={() => (window.location.href = `tel:${s.phone}`)}><Phone className="mr-1 h-3 w-3" /> Call</Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "orders" && canShowData && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <h2 className="text-xl font-bold">Standard Delivery Items</h2>
              <Button variant="outline" size="sm" onClick={() => setShowCart(!showCart)}>
                <ShoppingCart className="mr-2 h-4 w-4" /> Cart ({cart.reduce((s, c) => s + c.qty, 0)})
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {products.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map(p => {
                const Icon = iconMap[p.iconName] || Package;
                return (
                  <div key={p.id} className="sector-card text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-sector-grocery/10 text-sector-grocery mb-3"><Icon className="h-7 w-7" /></div>
                    <h3 className="font-bold text-sm h-10 overflow-hidden">{p.name}</h3>
                    <p className="mt-2 text-lg font-bold text-primary">₹{p.price}</p>
                    <Button size="sm" className="mt-3 w-full" onClick={() => {
                        const existing = cart.find(c => c.id === p.id);
                        if (existing) setCart(cart.map(c => c.id === p.id ? { ...c, qty: c.qty + 1 } : c));
                        else setCart([...cart, { id: p.id, name: p.name, price: p.price, qty: 1 }]);
                    }}>Add to Cart</Button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "categories" && currentSub && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.filter(p => (p.category === currentSub) && p.name.toLowerCase().includes(search.toLowerCase())).map(p => {
                const Icon = iconMap[p.iconName] || Package;
                return (
                  <div key={p.id} className="sector-card text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-sector-grocery/10 text-sector-grocery mb-3"><Icon className="h-7 w-7" /></div>
                    <h3 className="font-bold text-sm h-10 overflow-hidden">{p.name}</h3>
                    <p className="mt-2 text-lg font-bold text-primary">₹{p.price}</p>
                    <Button size="sm" variant="outline" className="mt-3 w-full" onClick={() => setActiveTab("orders")}>Purchase</Button>
                  </div>
                );
            })}
          </div>
        )}

        {activeTab === "delivery" && canShowData && (
            <div className="rounded-2xl border bg-card p-12 text-center max-w-lg mx-auto">
                <Truck className="h-12 w-12 mx-auto text-sector-grocery mb-4 opacity-50" />
                <h3 className="text-xl font-bold mb-2">Track Home Delivery</h3>
                <p className="text-muted-foreground text-sm mb-6">Enjoy free home delivery on all orders above ₹300 within 5km radius.</p>
                <Button onClick={() => setActiveTab("orders")}>Start Ordering</Button>
            </div>
        )}

        {activeTab === "subscription" && canShowData && (
             <div className="space-y-6">
                <div className="flex border-b pb-4"><h2 className="text-xl font-bold">Daily Needs (Subscription)</h2></div>
                <div className="grid gap-3">
                    {products.filter(p => ["Milk 1L", "Curd 500g", "Paneer 200g"].includes(p.name)).map(p => (
                        <div key={p.id} className="sector-card flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-sector-grocery/10"><CalendarClock className="h-5 w-5 text-sector-grocery" /></div>
                                <div><p className="font-bold">{p.name}</p> <p className="text-xs text-muted-foreground">₹{p.price}/day</p></div>
                            </div>
                            <Button size="sm" variant={subscriptionItems.includes(p.id) ? "default" : "outline"} onClick={() => {
                                if (subscriptionItems.includes(p.id)) setSubscriptionItems(subscriptionItems.filter(i => i !== p.id));
                                else setSubscriptionItems([...subscriptionItems, p.id]);
                            }}>{subscriptionItems.includes(p.id) ? "Subscribed" : "Subscribe"}</Button>
                        </div>
                    ))}
                </div>
             </div>
        )}

        {activeTab === "offers" && canShowData && (
            <div className="grid gap-4">
                {groceryOffers.map(o => (
                  <div key={o.id} className="sector-card border-2 border-dashed border-sector-grocery/30 bg-sector-grocery/5">
                    <div className="flex items-center gap-3">
                      <Tag className="h-6 w-6 text-sector-grocery" />
                      <div>
                        <h3 className="font-bold text-lg">{o.title}</h3>
                        <p className="text-sm font-medium text-sector-grocery">Use Code: {o.code}</p>
                        <p className="text-xs text-muted-foreground mt-1 text-uppercase tracking-tighter">Valid till {o.validTill}</p>
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

export default Grocery;
