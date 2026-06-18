import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

const schema = z.object({
  fullName: z.string().trim().min(2, "Name required").max(80),
  email: z.string().trim().email("Valid email required").max(120),
  phone: z.string().trim().min(5, "Phone/WhatsApp required").max(40),
  city: z.string().trim().min(1, "City required").max(60),
  country: z.string().trim().min(1, "Country required").max(60),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
  creditLimit: z.string().min(1, "Select a credit card limit"),
});

const existingAccounts = ["Amazon Seller Account", "Walmart Seller Account", "Facebook/Meta Shop", "eBay Seller Account"];
const services = [
  "Amazon Dropshipping Automation",
  "Amazon FBA Automation",
  "Walmart Dropshipping Automation",
  "Facebook or Meta Shop Automation",
  "eBay Dropshipping Automation",
];
const trafficSources = ["Search Engine (Google, Bing, etc.)", "Referral (from a friend)", "Social (Facebook, Instagram, LinkedIn)"];

export function ApplyForm({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [svc, setSvc] = useState<string[]>([]);
  const [traffic, setTraffic] = useState<string[]>([]);
  const [credit, setCredit] = useState("");

  const toggle = (arr: string[], v: string, set: (a: string[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      fullName: String(fd.get("fullName") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      city: String(fd.get("city") ?? ""),
      country: String(fd.get("country") ?? ""),
      message: String(fd.get("message") ?? ""),
      creditLimit: credit,
    };
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setDone(true);
    toast.success("Thank You! We will contact you within 12 hours");
  };

  const reset = () => {
    setDone(false);
    setAccounts([]); setSvc([]); setTraffic([]); setCredit("");
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) reset(); }}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-2xl">
        {done ? (
          <div className="py-10 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand/10 text-brand">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="mt-6 font-display text-2xl font-black text-foreground">Thank You!</h3>
            <p className="mt-2 text-muted-foreground">We will contact you within 12 hours.</p>
            <Button className="mt-6 rounded-full" onClick={() => setOpen(false)}>Close</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl font-black">Apply for a Store</DialogTitle>
              <DialogDescription>Tell us about you and we'll match you with the right service.</DialogDescription>
            </DialogHeader>
            <form onSubmit={onSubmit} className="mt-2 space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full Name"><Input name="fullName" required maxLength={80} /></Field>
                <Field label="Email"><Input name="email" type="email" required maxLength={120} /></Field>
                <Field label="Phone / WhatsApp"><Input name="phone" required maxLength={40} /></Field>
                <Field label="City"><Input name="city" required maxLength={60} /></Field>
                <Field label="Country"><Input name="country" required maxLength={60} /></Field>
              </div>
              <Field label="Message">
                <Textarea name="message" maxLength={1000} placeholder="Anything you'd like us to know…" />
              </Field>

              <Group title="Existing Accounts (select all that apply)">
                {existingAccounts.map((a) => (
                  <CheckRow key={a} label={a} checked={accounts.includes(a)} onChange={() => toggle(accounts, a, setAccounts)} />
                ))}
              </Group>

              <Group title="Services Interested In">
                {services.map((a) => (
                  <CheckRow key={a} label={a} checked={svc.includes(a)} onChange={() => toggle(svc, a, setSvc)} />
                ))}
              </Group>

              <Group title="Credit Card Limit">
                <RadioGroup value={credit} onValueChange={setCredit} className="grid gap-2 sm:grid-cols-2">
                  {["Under $5000", "$5000 - $20000", "$20000 - $50000", "Above $50000"].map((v) => (
                    <label key={v} className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-card/50 px-3 py-2.5 text-sm transition hover:border-brand">
                      <RadioGroupItem value={v} id={v} />
                      <span>{v}</span>
                    </label>
                  ))}
                </RadioGroup>
              </Group>

              <Group title="How did you hear about us?">
                {trafficSources.map((a) => (
                  <CheckRow key={a} label={a} checked={traffic.includes(a)} onChange={() => toggle(traffic, a, setTraffic)} />
                ))}
              </Group>

              <Button type="submit" disabled={submitting} size="lg" className="w-full rounded-full bg-[image:var(--gradient-brand)] py-6 text-base font-semibold text-brand-foreground shadow-glow hover:opacity-95">
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Submit Information <ArrowRight className="ml-1 h-4 w-4" /></>}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2.5">
      <div className="text-xs font-bold uppercase tracking-[0.15em] text-brand">{title}</div>
      <div className="grid gap-2 sm:grid-cols-2">{children}</div>
    </div>
  );
}
function CheckRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-border bg-card/50 px-3 py-2.5 text-sm transition hover:border-brand">
      <Checkbox checked={checked} onCheckedChange={onChange} />
      <span>{label}</span>
    </label>
  );
}
