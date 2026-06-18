import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ArrowRight, Check, CheckCircle2, ChevronDown, Circle, Eye, Facebook, HandCoins, HeartHandshake, Loader2, Mail, MapPin, Menu, MessageCircle, Moon, Package, Phone, ShieldCheck, ShoppingBag, Sparkles, Store, Sun, Tag, Truck, X } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { z } from "zod";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
//#region src/lib/utils.ts
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
//#region src/components/ui/accordion.tsx
var Accordion = AccordionPrimitive.Root;
var AccordionItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Item, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Header, {
	className: "flex",
	children: /* @__PURE__ */ jsxs(AccordionPrimitive.Trigger, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
var AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Content, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ jsx("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
//#endregion
//#region src/components/ui/button.tsx
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ jsx(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
//#endregion
//#region src/components/ui/input.tsx
var Input = React.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ jsx("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
//#endregion
//#region src/assets/hero-team.jpg
var hero_team_default = "/assets/hero-team-D3od1EvO.jpg";
//#endregion
//#region src/components/motion.tsx
function Reveal({ children, className = "", delay = 0 }) {
	const ref = useRef(null);
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const obs = new IntersectionObserver((entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) {
					setTimeout(() => el.classList.add("reveal-in"), delay);
					obs.unobserve(el);
				}
			});
		}, { threshold: .15 });
		obs.observe(el);
		return () => obs.disconnect();
	}, [delay]);
	return /* @__PURE__ */ jsx("div", {
		ref,
		className: `reveal ${className}`,
		children
	});
}
function Counter({ end, suffix = "+" }) {
	const [n, setN] = useState(0);
	const ref = useRef(null);
	const started = useRef(false);
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const obs = new IntersectionObserver((entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting && !started.current) {
					started.current = true;
					const duration = 1800;
					const start = performance.now();
					const tick = (t) => {
						const p = Math.min((t - start) / duration, 1);
						const eased = 1 - Math.pow(1 - p, 3);
						setN(Math.floor(eased * end));
						if (p < 1) requestAnimationFrame(tick);
					};
					requestAnimationFrame(tick);
				}
			});
		}, { threshold: .4 });
		obs.observe(el);
		return () => obs.disconnect();
	}, [end]);
	return /* @__PURE__ */ jsxs("span", {
		ref,
		children: [n, suffix]
	});
}
/** Parallax wrapper — translates child Y based on scroll position */
function Parallax({ children, speed = .3, className = "" }) {
	const ref = useRef(null);
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		let raf = 0;
		const onScroll = () => {
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(() => {
				const rect = el.getBoundingClientRect();
				const center = rect.top + rect.height / 2 - window.innerHeight / 2;
				el.style.transform = `translate3d(0, ${center * -speed}px, 0)`;
			});
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", onScroll);
			cancelAnimationFrame(raf);
		};
	}, [speed]);
	return /* @__PURE__ */ jsx("div", {
		ref,
		className,
		style: { willChange: "transform" },
		children
	});
}
//#endregion
//#region src/components/theme-toggle.tsx
function useTheme() {
	const [theme, setTheme] = useState("light");
	useEffect(() => {
		const initial = (typeof window !== "undefined" && localStorage.getItem("theme")) ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
		setTheme(initial);
		document.documentElement.classList.toggle("dark", initial === "dark");
	}, []);
	const toggle = () => {
		const next = theme === "dark" ? "light" : "dark";
		setTheme(next);
		document.documentElement.classList.toggle("dark", next === "dark");
		try {
			localStorage.setItem("theme", next);
		} catch {}
	};
	return {
		theme,
		toggle
	};
}
function ThemeToggle({ className = "" }) {
	const { theme, toggle } = useTheme();
	return /* @__PURE__ */ jsxs("button", {
		onClick: toggle,
		"aria-label": "Toggle theme",
		className: `relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 backdrop-blur transition-all hover:scale-105 hover:shadow-glow ${className}`,
		children: [/* @__PURE__ */ jsx(Sun, { className: "h-4 w-4 rotate-0 scale-100 text-foreground transition-all dark:-rotate-90 dark:scale-0" }), /* @__PURE__ */ jsx(Moon, { className: "absolute h-4 w-4 rotate-90 scale-0 text-foreground transition-all dark:rotate-0 dark:scale-100" })]
	});
}
//#endregion
//#region src/components/logo.tsx
function Logo({ className = "" }) {
	return /* @__PURE__ */ jsxs("a", {
		href: "#",
		className: `flex items-center gap-2.5 ${className}`,
		children: [/* @__PURE__ */ jsxs("div", {
			className: "relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl bg-[image:var(--gradient-brand)] shadow-glow",
			children: [/* @__PURE__ */ jsx("span", {
				className: "font-display text-xl font-black text-brand-foreground leading-none",
				children: "E"
			}), /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent" })]
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col leading-none",
			children: [/* @__PURE__ */ jsxs("span", {
				className: "font-display text-lg font-black tracking-tight text-foreground",
				children: ["Ecom", /* @__PURE__ */ jsx("span", {
					className: "text-brand",
					children: "."
				})]
			}), /* @__PURE__ */ jsx("span", {
				className: "text-[9px] font-semibold uppercase tracking-[0.2em] text-muted-foreground",
				children: "Solutions"
			})]
		})]
	});
}
//#endregion
//#region src/components/ui/dialog.tsx
var Dialog = DialogPrimitive.Root;
var DialogTrigger = DialogPrimitive.Trigger;
var DialogPortal = DialogPrimitive.Portal;
var DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Overlay, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
var DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [/* @__PURE__ */ jsx(DialogOverlay, {}), /* @__PURE__ */ jsxs(DialogPrimitive.Content, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ jsxs(DialogPrimitive.Close, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ jsx(X, { className: "h-4 w-4" }), /* @__PURE__ */ jsx("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Title, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
var DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Description, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
//#endregion
//#region src/components/ui/textarea.tsx
var Textarea = React.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
//#endregion
//#region src/components/ui/label.tsx
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(LabelPrimitive.Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = LabelPrimitive.Root.displayName;
//#endregion
//#region src/components/ui/checkbox.tsx
var Checkbox = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(CheckboxPrimitive.Root, {
	ref,
	className: cn("grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
	...props,
	children: /* @__PURE__ */ jsx(CheckboxPrimitive.Indicator, {
		className: cn("grid place-content-center text-current"),
		children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" })
	})
}));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
//#endregion
//#region src/components/ui/radio-group.tsx
var RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx(RadioGroupPrimitive.Root, {
		className: cn("grid gap-2", className),
		...props,
		ref
	});
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
var RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx(RadioGroupPrimitive.Item, {
		ref,
		className: cn("aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
		...props,
		children: /* @__PURE__ */ jsx(RadioGroupPrimitive.Indicator, {
			className: "flex items-center justify-center",
			children: /* @__PURE__ */ jsx(Circle, { className: "h-3.5 w-3.5 fill-primary" })
		})
	});
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;
//#endregion
//#region src/components/apply-form.tsx
var schema = z.object({
	fullName: z.string().trim().min(2, "Name required").max(80),
	email: z.string().trim().email("Valid email required").max(120),
	phone: z.string().trim().min(5, "Phone/WhatsApp required").max(40),
	city: z.string().trim().min(1, "City required").max(60),
	country: z.string().trim().min(1, "Country required").max(60),
	message: z.string().trim().max(1e3).optional().or(z.literal("")),
	creditLimit: z.string().min(1, "Select a credit card limit")
});
var existingAccounts = [
	"Amazon Seller Account",
	"Walmart Seller Account",
	"Facebook/Meta Shop",
	"eBay Seller Account"
];
var services$1 = [
	"Amazon Dropshipping Automation",
	"Amazon FBA Automation",
	"Walmart Dropshipping Automation",
	"Facebook or Meta Shop Automation",
	"eBay Dropshipping Automation"
];
var trafficSources = [
	"Search Engine (Google, Bing, etc.)",
	"Referral (from a friend)",
	"Social (Facebook, Instagram, LinkedIn)"
];
function ApplyForm({ trigger }) {
	const [open, setOpen] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [done, setDone] = useState(false);
	const [accounts, setAccounts] = useState([]);
	const [svc, setSvc] = useState([]);
	const [traffic, setTraffic] = useState([]);
	const [credit, setCredit] = useState("");
	const toggle = (arr, v, set) => set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
	const onSubmit = async (e) => {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const data = {
			fullName: String(fd.get("fullName") ?? ""),
			email: String(fd.get("email") ?? ""),
			phone: String(fd.get("phone") ?? ""),
			city: String(fd.get("city") ?? ""),
			country: String(fd.get("country") ?? ""),
			message: String(fd.get("message") ?? ""),
			creditLimit: credit
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
		setAccounts([]);
		setSvc([]);
		setTraffic([]);
		setCredit("");
	};
	return /* @__PURE__ */ jsxs(Dialog, {
		open,
		onOpenChange: (o) => {
			setOpen(o);
			if (!o) reset();
		},
		children: [/* @__PURE__ */ jsx(DialogTrigger, {
			asChild: true,
			children: trigger
		}), /* @__PURE__ */ jsx(DialogContent, {
			className: "max-h-[92vh] overflow-y-auto sm:max-w-2xl",
			children: done ? /* @__PURE__ */ jsxs("div", {
				className: "py-10 text-center",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand/10 text-brand",
						children: /* @__PURE__ */ jsx(CheckCircle2, { className: "h-8 w-8" })
					}),
					/* @__PURE__ */ jsx("h3", {
						className: "mt-6 font-display text-2xl font-black text-foreground",
						children: "Thank You!"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-2 text-muted-foreground",
						children: "We will contact you within 12 hours."
					}),
					/* @__PURE__ */ jsx(Button, {
						className: "mt-6 rounded-full",
						onClick: () => setOpen(false),
						children: "Close"
					})
				]
			}) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, {
				className: "font-display text-2xl font-black",
				children: "Apply for a Store"
			}), /* @__PURE__ */ jsx(DialogDescription, { children: "Tell us about you and we'll match you with the right service." })] }), /* @__PURE__ */ jsxs("form", {
				onSubmit,
				className: "mt-2 space-y-6",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ jsx(Field, {
								label: "Full Name",
								children: /* @__PURE__ */ jsx(Input, {
									name: "fullName",
									required: true,
									maxLength: 80
								})
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Email",
								children: /* @__PURE__ */ jsx(Input, {
									name: "email",
									type: "email",
									required: true,
									maxLength: 120
								})
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Phone / WhatsApp",
								children: /* @__PURE__ */ jsx(Input, {
									name: "phone",
									required: true,
									maxLength: 40
								})
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "City",
								children: /* @__PURE__ */ jsx(Input, {
									name: "city",
									required: true,
									maxLength: 60
								})
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Country",
								children: /* @__PURE__ */ jsx(Input, {
									name: "country",
									required: true,
									maxLength: 60
								})
							})
						]
					}),
					/* @__PURE__ */ jsx(Field, {
						label: "Message",
						children: /* @__PURE__ */ jsx(Textarea, {
							name: "message",
							maxLength: 1e3,
							placeholder: "Anything you'd like us to know…"
						})
					}),
					/* @__PURE__ */ jsx(Group, {
						title: "Existing Accounts (select all that apply)",
						children: existingAccounts.map((a) => /* @__PURE__ */ jsx(CheckRow, {
							label: a,
							checked: accounts.includes(a),
							onChange: () => toggle(accounts, a, setAccounts)
						}, a))
					}),
					/* @__PURE__ */ jsx(Group, {
						title: "Services Interested In",
						children: services$1.map((a) => /* @__PURE__ */ jsx(CheckRow, {
							label: a,
							checked: svc.includes(a),
							onChange: () => toggle(svc, a, setSvc)
						}, a))
					}),
					/* @__PURE__ */ jsx(Group, {
						title: "Credit Card Limit",
						children: /* @__PURE__ */ jsx(RadioGroup, {
							value: credit,
							onValueChange: setCredit,
							className: "grid gap-2 sm:grid-cols-2",
							children: [
								"Under $5000",
								"$5000 - $20000",
								"$20000 - $50000",
								"Above $50000"
							].map((v) => /* @__PURE__ */ jsxs("label", {
								className: "flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-card/50 px-3 py-2.5 text-sm transition hover:border-brand",
								children: [/* @__PURE__ */ jsx(RadioGroupItem, {
									value: v,
									id: v
								}), /* @__PURE__ */ jsx("span", { children: v })]
							}, v))
						})
					}),
					/* @__PURE__ */ jsx(Group, {
						title: "How did you hear about us?",
						children: trafficSources.map((a) => /* @__PURE__ */ jsx(CheckRow, {
							label: a,
							checked: traffic.includes(a),
							onChange: () => toggle(traffic, a, setTraffic)
						}, a))
					}),
					/* @__PURE__ */ jsx(Button, {
						type: "submit",
						disabled: submitting,
						size: "lg",
						className: "w-full rounded-full bg-[image:var(--gradient-brand)] py-6 text-base font-semibold text-brand-foreground shadow-glow hover:opacity-95",
						children: submitting ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxs(Fragment, { children: ["Submit Information ", /* @__PURE__ */ jsx(ArrowRight, { className: "ml-1 h-4 w-4" })] })
					})
				]
			})] })
		})]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ jsx(Label, {
			className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
			children: label
		}), children]
	});
}
function Group({ title, children }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-2.5",
		children: [/* @__PURE__ */ jsx("div", {
			className: "text-xs font-bold uppercase tracking-[0.15em] text-brand",
			children: title
		}), /* @__PURE__ */ jsx("div", {
			className: "grid gap-2 sm:grid-cols-2",
			children
		})]
	});
}
function CheckRow({ label, checked, onChange }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "flex cursor-pointer items-center gap-2.5 rounded-lg border border-border bg-card/50 px-3 py-2.5 text-sm transition hover:border-brand",
		children: [/* @__PURE__ */ jsx(Checkbox, {
			checked,
			onCheckedChange: onChange
		}), /* @__PURE__ */ jsx("span", { children: label })]
	});
}
//#endregion
//#region src/routes/index.tsx?tsr-split=component
var services = [
	{
		icon: ShoppingBag,
		title: "Amazon Dropshipping Automation",
		desc: "Over 50% of Amazon sales come from 3rd-party sellers. We tap that channel for you, end to end."
	},
	{
		icon: Package,
		title: "Amazon FBA Automation",
		desc: "Leverage Amazon's fulfillment centers to scale a truly passive, prime-eligible store."
	},
	{
		icon: Tag,
		title: "eBay Automation",
		desc: "Reach 187M+ active eBay buyers with a fully managed listing, sourcing and support engine."
	},
	{
		icon: Facebook,
		title: "Facebook Shops Automation",
		desc: "Target 240M US consumers inside the world's largest social commerce surface."
	},
	{
		icon: Store,
		title: "Walmart Dropshipping Automation",
		desc: "100M unique monthly visitors. We build your Walmart catalog and run it daily."
	},
	{
		icon: Truck,
		title: "Walmart WFS Automation",
		desc: "Streamlined Walmart application, approval and Walmart Fulfillment Services setup."
	}
];
var handled = [
	"Managing supplier relationships",
	"Optimal pricing & repricing strategies",
	"Facilitating returns & customer service",
	"Account health & risk mitigation",
	"Real-time reporting & analytics",
	"Daily 8-hour active store monitoring"
];
var pillars = [
	{
		icon: MessageCircle,
		title: "Communication",
		desc: "Transparent updates, direct channels, no account managers in the dark."
	},
	{
		icon: ShieldCheck,
		title: "Accountability",
		desc: "Monthly reports, live analytics dashboards, KPIs you can actually verify."
	},
	{
		icon: HeartHandshake,
		title: "Integrity",
		desc: "Honesty and collaboration — internal teams only, never outsourced."
	}
];
var benefits = [
	{
		icon: Sparkles,
		title: "Stress-Free Onboarding",
		desc: "Guided consultation and application setup — we handle the paperwork."
	},
	{
		icon: HandCoins,
		title: "Hands-Free Passive Income",
		desc: "100% managed by our agency once your store is running."
	},
	{
		icon: Eye,
		title: "Full Transparency",
		desc: "Ethical operation, in-house teams, no offshore outsourcing."
	}
];
var steps = [
	{
		n: "01",
		title: "Acquire & Build Your Business Structure",
		desc: "Groundwork, legal entity, staffing and a dedicated account manager assigned to your store."
	},
	{
		n: "02",
		title: "Managing Your Account",
		desc: "Daily 8-hour monitoring, sourcing, listing, customer service and a clear monthly progression report."
	},
	{
		n: "03",
		title: "Scaling Your Account",
		desc: "Building customer loyalty and increasing long-term ROI through aggressive, data-led growth."
	}
];
var faqs = [
	{
		q: "What is dropshipping?",
		a: "Dropshipping is a retail model where you sell products without holding inventory. We source from vetted suppliers and they ship directly to your customer under your store brand."
	},
	{
		q: "What does FBA stand for?",
		a: "FBA is Fulfilled by Amazon. You send (or we source) inventory to Amazon's warehouses and they handle storage, packing, shipping and customer service for you."
	},
	{
		q: "How much profit can I expect?",
		a: "Returns depend on store type, capital and ramp time. Most managed stores hit consistent monthly profit after 60–120 days. We share realistic projections during your consultation."
	},
	{
		q: "How will I get paid?",
		a: "All revenue flows into your store payout account directly from the marketplace. We invoice our management fee monthly — you never wire us your sales."
	},
	{
		q: "What will be my level of involvement?",
		a: "After the initial setup and verification calls, your involvement drops to effectively zero. We run operations end-to-end and report to you monthly."
	}
];
function Index() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 20);
		onScroll();
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	const nav = [
		{
			label: "Services",
			href: "#services"
		},
		{
			label: "How it Works",
			href: "#process"
		},
		{
			label: "Benefits",
			href: "#benefits"
		},
		{
			label: "FAQ",
			href: "#faq"
		},
		{
			label: "Contact",
			href: "#contact"
		}
	];
	return /* @__PURE__ */ jsxs("div", {
		className: "relative min-h-screen overflow-x-hidden bg-background text-foreground",
		children: [
			/* @__PURE__ */ jsx("div", { className: "pointer-events-none fixed inset-0 -z-10 opacity-70 dark:opacity-50 mesh-bg" }),
			/* @__PURE__ */ jsx("div", { className: "pointer-events-none fixed inset-0 -z-10 [background-image:radial-gradient(color-mix(in_oklab,var(--foreground)_6%,transparent)_1px,transparent_1px)] [background-size:28px_28px] opacity-30 dark:opacity-20" }),
			/* @__PURE__ */ jsxs("header", {
				className: `fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "glass-strong border-b border-border/50 shadow-soft" : "bg-transparent"}`,
				children: [/* @__PURE__ */ jsxs("div", {
					className: "mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5",
					children: [
						/* @__PURE__ */ jsx(Logo, {}),
						/* @__PURE__ */ jsx("nav", {
							className: "hidden items-center gap-8 lg:flex",
							children: nav.map((n) => /* @__PURE__ */ jsx("a", {
								href: n.href,
								className: "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
								children: n.label
							}, n.href))
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ jsx(ThemeToggle, {}),
								/* @__PURE__ */ jsx(ApplyForm, { trigger: /* @__PURE__ */ jsx(Button, {
									className: "hidden rounded-full bg-[image:var(--gradient-brand)] px-6 font-semibold text-brand-foreground shadow-glow transition hover:-translate-y-0.5 lg:inline-flex",
									children: "Apply for a Store"
								}) }),
								/* @__PURE__ */ jsx("button", {
									className: "lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 backdrop-blur text-foreground",
									onClick: () => setMenuOpen((o) => !o),
									"aria-label": "Toggle menu",
									children: menuOpen ? /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" })
								})
							]
						})
					]
				}), menuOpen && /* @__PURE__ */ jsx("div", {
					className: "lg:hidden glass-strong border-t border-border/50",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col gap-1 px-6 py-4",
						children: [nav.map((n) => /* @__PURE__ */ jsx("a", {
							href: n.href,
							onClick: () => setMenuOpen(false),
							className: "rounded-md px-3 py-3 text-sm font-medium text-foreground hover:bg-secondary",
							children: n.label
						}, n.href)), /* @__PURE__ */ jsx(ApplyForm, { trigger: /* @__PURE__ */ jsx(Button, {
							className: "mt-2 w-full rounded-full bg-[image:var(--gradient-brand)] font-semibold text-brand-foreground",
							children: "Apply for a Store"
						}) })]
					})
				})]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "relative overflow-hidden pt-32 pb-20 lg:pt-44 lg:pb-32",
				children: [
					/* @__PURE__ */ jsx(Parallax, {
						speed: .15,
						className: "pointer-events-none absolute -top-32 -right-32 h-[560px] w-[560px] rounded-full opacity-60 blur-3xl animate-float-slow",
						children: /* @__PURE__ */ jsx("div", {
							className: "h-full w-full rounded-full",
							style: { background: "radial-gradient(circle, var(--brand), transparent 65%)" }
						})
					}),
					/* @__PURE__ */ jsx(Parallax, {
						speed: .2,
						className: "pointer-events-none absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full opacity-50 blur-3xl animate-float-slower",
						children: /* @__PURE__ */ jsx("div", {
							className: "h-full w-full rounded-full",
							style: { background: "radial-gradient(circle, var(--brand-2), transparent 65%)" }
						})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2",
						children: [/* @__PURE__ */ jsxs(Reveal, { children: [
							/* @__PURE__ */ jsxs("div", {
								className: "inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-foreground",
								children: [/* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-brand animate-pulse" }), "Full-Service E-commerce Agency"]
							}),
							/* @__PURE__ */ jsxs("h1", {
								className: "mt-6 font-display text-4xl font-bold leading-[1.05] text-foreground sm:text-5xl lg:text-6xl",
								children: [
									"We do the",
									" ",
									/* @__PURE__ */ jsxs("span", {
										className: "relative inline-block",
										children: [/* @__PURE__ */ jsx("span", {
											className: "bg-[image:var(--gradient-brand)] bg-clip-text text-transparent animate-gradient",
											children: "heavy lifting"
										}), /* @__PURE__ */ jsxs("svg", {
											className: "absolute -bottom-2 left-0 w-full",
											height: "10",
											viewBox: "0 0 200 10",
											preserveAspectRatio: "none",
											children: [/* @__PURE__ */ jsx("path", {
												d: "M0 5 Q 50 0 100 5 T 200 5",
												stroke: "url(#u)",
												strokeWidth: "3",
												fill: "none",
												strokeLinecap: "round"
											}), /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", {
												id: "u",
												x1: "0",
												x2: "1",
												children: [/* @__PURE__ */ jsx("stop", {
													offset: "0",
													stopColor: "oklch(0.62 0.22 265)"
												}), /* @__PURE__ */ jsx("stop", {
													offset: "1",
													stopColor: "oklch(0.7 0.2 295)"
												})]
											}) })]
										})]
									}),
									" ",
									"so you can do the easy living."
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg",
								children: "We are a full-service Amazon seller store management agency. We build, operate, and scale your store from the ground up — producing passive income with aggressive tactics at Ecom Solutions."
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-8 flex flex-wrap items-center gap-4",
								children: [/* @__PURE__ */ jsx(ApplyForm, { trigger: /* @__PURE__ */ jsxs(Button, {
									size: "lg",
									className: "rounded-full bg-[image:var(--gradient-brand)] px-8 py-6 text-base font-semibold text-brand-foreground shadow-glow transition-transform hover:-translate-y-1",
									children: ["Apply for a Store", /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4" })]
								}) }), /* @__PURE__ */ jsx("a", {
									href: "#services",
									className: "text-sm font-semibold text-foreground underline-offset-4 hover:underline",
									children: "Explore our services →"
								})]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground",
								children: [
									"No outsourcing",
									"Monthly reporting",
									"100% managed"
								].map((t) => /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ jsx(CheckCircle2, { className: "h-4 w-4 text-brand" }),
										" ",
										t
									]
								}, t))
							})
						] }), /* @__PURE__ */ jsx(Reveal, {
							delay: 150,
							children: /* @__PURE__ */ jsx(Parallax, {
								speed: -.08,
								children: /* @__PURE__ */ jsxs("div", {
									className: "relative",
									children: [
										/* @__PURE__ */ jsx("div", { className: "absolute -inset-6 rounded-[2rem] bg-[image:var(--gradient-brand)] opacity-30 blur-3xl animate-gradient" }),
										/* @__PURE__ */ jsx("div", {
											className: "relative overflow-hidden rounded-[2rem] border border-border/60 shadow-float glass-strong",
											children: /* @__PURE__ */ jsx("img", {
												src: hero_team_default,
												alt: "The Ecom Solutions agency team",
												width: 1920,
												height: 1080,
												className: "h-full w-full object-cover"
											})
										}),
										/* @__PURE__ */ jsx("div", {
											className: "absolute -bottom-6 -left-6 hidden rounded-2xl glass-strong p-4 shadow-float sm:block",
											children: /* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ jsx("div", {
													className: "grid h-10 w-10 place-items-center rounded-full bg-[image:var(--gradient-brand)] text-brand-foreground shadow-glow",
													children: /* @__PURE__ */ jsx(ShieldCheck, { className: "h-5 w-5" })
												}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
													className: "text-xs text-muted-foreground",
													children: "Trusted by"
												}), /* @__PURE__ */ jsx("div", {
													className: "font-display text-lg font-bold text-foreground",
													children: "400+ Investors"
												})] })]
											})
										}),
										/* @__PURE__ */ jsx("div", {
											className: "absolute -top-5 -right-5 hidden rounded-2xl glass-strong p-3 shadow-float md:block",
											children: /* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4 text-brand" }), /* @__PURE__ */ jsx("span", {
													className: "text-xs font-semibold text-foreground",
													children: "100% In-House Team"
												})]
											})
										})
									]
								})
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ jsx("section", {
				id: "services",
				className: "relative py-28",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-7xl px-6",
					children: [/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", {
						className: "mx-auto max-w-2xl text-center",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand",
								children: "Our Popular Services"
							}),
							/* @__PURE__ */ jsxs("h2", {
								className: "mt-5 font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl",
								children: [
									"Every channel that matters.",
									" ",
									/* @__PURE__ */ jsx("span", {
										className: "bg-[image:var(--gradient-brand)] bg-clip-text text-transparent",
										children: "Fully managed."
									})
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-4 text-muted-foreground",
								children: "Six battle-tested service lines across the world's largest marketplaces — all run by our in-house operations team."
							})
						]
					}) }), /* @__PURE__ */ jsx("div", {
						className: "mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
						children: services.map((s, i) => /* @__PURE__ */ jsx(Reveal, {
							delay: i * 70,
							children: /* @__PURE__ */ jsxs("div", {
								className: "group relative h-full overflow-hidden rounded-3xl glass p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-float",
								children: [/* @__PURE__ */ jsx("div", {
									className: "absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100",
									style: { background: "linear-gradient(135deg, color-mix(in oklab, var(--brand) 25%, transparent), transparent 60%)" }
								}), /* @__PURE__ */ jsxs("div", {
									className: "relative",
									children: [
										/* @__PURE__ */ jsx("div", {
											className: "grid h-14 w-14 place-items-center rounded-2xl bg-[image:var(--gradient-brand)] text-brand-foreground shadow-glow transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3",
											children: /* @__PURE__ */ jsx(s.icon, { className: "h-6 w-6" })
										}),
										/* @__PURE__ */ jsx("h3", {
											className: "mt-5 font-display text-lg font-bold text-foreground",
											children: s.title
										}),
										/* @__PURE__ */ jsx("p", {
											className: "mt-2 text-sm leading-relaxed text-muted-foreground",
											children: s.desc
										})
									]
								})]
							})
						}, s.title))
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "relative py-28",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:items-center",
					children: [/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx("div", {
							className: "inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand",
							children: "What we handle"
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "mt-5 font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl",
							children: "We put your money to work, so you can put your mind at ease."
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-5 text-muted-foreground",
							children: "From the first supplier handshake to the last shipped order, our internal team owns every step — so you don't have to think about it."
						}),
						/* @__PURE__ */ jsx("ul", {
							className: "mt-8 grid gap-3 sm:grid-cols-2",
							children: handled.map((h) => /* @__PURE__ */ jsxs("li", {
								className: "flex items-start gap-3 rounded-2xl glass px-4 py-3",
								children: [/* @__PURE__ */ jsx(CheckCircle2, { className: "mt-0.5 h-5 w-5 shrink-0 text-brand" }), /* @__PURE__ */ jsx("span", {
									className: "text-sm font-medium text-foreground",
									children: h
								})]
							}, h))
						})
					] }) }), /* @__PURE__ */ jsx(Reveal, {
						delay: 120,
						children: /* @__PURE__ */ jsx("div", {
							className: "grid gap-5",
							children: pillars.map((p) => /* @__PURE__ */ jsxs("div", {
								className: "group flex items-start gap-5 rounded-3xl glass p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-float",
								children: [/* @__PURE__ */ jsx("div", {
									className: "grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand/10 text-brand transition-all group-hover:bg-[image:var(--gradient-brand)] group-hover:text-brand-foreground group-hover:shadow-glow",
									children: /* @__PURE__ */ jsx(p.icon, { className: "h-6 w-6" })
								}), /* @__PURE__ */ jsxs("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ jsx("h3", {
										className: "font-display text-lg font-bold text-foreground",
										children: p.title
									}), /* @__PURE__ */ jsx("p", {
										className: "mt-1 text-sm text-muted-foreground",
										children: p.desc
									})]
								})]
							}, p.title))
						})
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				id: "benefits",
				className: "relative py-28",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-7xl px-6",
					children: [/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", {
						className: "mx-auto max-w-2xl text-center",
						children: [/* @__PURE__ */ jsx("div", {
							className: "inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand",
							children: "Why investors choose us"
						}), /* @__PURE__ */ jsxs("h2", {
							className: "mt-5 font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl",
							children: [
								"Built for",
								" ",
								/* @__PURE__ */ jsx("span", {
									className: "bg-[image:var(--gradient-brand)] bg-clip-text text-transparent",
									children: "hands-free"
								}),
								" ",
								"passive income."
							]
						})]
					}) }), /* @__PURE__ */ jsx("div", {
						className: "mt-14 grid gap-6 md:grid-cols-3",
						children: benefits.map((b, i) => /* @__PURE__ */ jsx(Reveal, {
							delay: i * 100,
							children: /* @__PURE__ */ jsxs("div", {
								className: "group h-full rounded-3xl glass p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-float",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[image:var(--gradient-brand)] text-brand-foreground shadow-glow transition-transform duration-500 group-hover:scale-110",
										children: /* @__PURE__ */ jsx(b.icon, { className: "h-7 w-7" })
									}),
									/* @__PURE__ */ jsx("h3", {
										className: "mt-6 font-display text-xl font-bold text-foreground",
										children: b.title
									}),
									/* @__PURE__ */ jsx("p", {
										className: "mt-3 text-sm leading-relaxed text-muted-foreground",
										children: b.desc
									})
								]
							})
						}, b.title))
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				id: "process",
				className: "relative py-28",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-7xl px-6",
					children: [/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", {
						className: "mx-auto max-w-2xl text-center",
						children: [/* @__PURE__ */ jsx("div", {
							className: "inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand",
							children: "How it works"
						}), /* @__PURE__ */ jsx("h2", {
							className: "mt-5 font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl",
							children: "Three steps from signup to scale."
						})]
					}) }), /* @__PURE__ */ jsx("div", {
						className: "mt-14 grid gap-6 md:grid-cols-3",
						children: steps.map((s, i) => /* @__PURE__ */ jsx(Reveal, {
							delay: i * 120,
							children: /* @__PURE__ */ jsxs("div", {
								className: "relative h-full overflow-hidden rounded-3xl glass p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-float",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "font-display text-7xl font-black leading-none bg-[image:var(--gradient-brand)] bg-clip-text text-transparent opacity-30",
										children: s.n
									}),
									/* @__PURE__ */ jsx("h3", {
										className: "mt-4 font-display text-xl font-bold text-foreground",
										children: s.title
									}),
									/* @__PURE__ */ jsx("p", {
										className: "mt-3 text-sm leading-relaxed text-muted-foreground",
										children: s.desc
									})
								]
							})
						}, s.n))
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "relative py-20",
				children: /* @__PURE__ */ jsx("div", {
					className: "mx-auto max-w-7xl px-6",
					children: /* @__PURE__ */ jsxs("div", {
						className: "relative overflow-hidden rounded-[2rem] bg-[image:var(--gradient-navy)] p-12 text-navy-foreground shadow-float",
						children: [
							/* @__PURE__ */ jsx(Parallax, {
								speed: .1,
								className: "pointer-events-none absolute -top-20 -left-20 h-80 w-80 rounded-full opacity-40 blur-3xl",
								children: /* @__PURE__ */ jsx("div", {
									className: "h-full w-full rounded-full",
									style: { background: "radial-gradient(circle, var(--brand), transparent 65%)" }
								})
							}),
							/* @__PURE__ */ jsx(Parallax, {
								speed: -.1,
								className: "pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full opacity-40 blur-3xl",
								children: /* @__PURE__ */ jsx("div", {
									className: "h-full w-full rounded-full",
									style: { background: "radial-gradient(circle, var(--brand-2), transparent 65%)" }
								})
							}),
							/* @__PURE__ */ jsx("div", {
								className: "relative grid gap-10 text-center md:grid-cols-3",
								children: [
									{
										n: 400,
										label: "Happy Clients"
									},
									{
										n: 300,
										label: "Team Members"
									},
									{
										n: 700,
										label: "Completed Projects"
									}
								].map((s) => /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
									className: "font-display text-5xl font-black sm:text-6xl",
									children: /* @__PURE__ */ jsx(Counter, { end: s.n })
								}), /* @__PURE__ */ jsx("div", {
									className: "mt-2 text-sm uppercase tracking-[0.18em] opacity-80",
									children: s.label
								})] }) }, s.label))
							})
						]
					})
				})
			}),
			/* @__PURE__ */ jsx("section", {
				id: "faq",
				className: "relative py-28",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-4xl px-6",
					children: [/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", {
						className: "text-center",
						children: [/* @__PURE__ */ jsx("div", {
							className: "inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand",
							children: "FAQ"
						}), /* @__PURE__ */ jsx("h2", {
							className: "mt-5 font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl",
							children: "Frequently asked questions."
						})]
					}) }), /* @__PURE__ */ jsx(Reveal, {
						delay: 100,
						children: /* @__PURE__ */ jsx(Accordion, {
							type: "single",
							collapsible: true,
							className: "mt-12 space-y-4",
							children: faqs.map((f, i) => /* @__PURE__ */ jsxs(AccordionItem, {
								value: `item-${i}`,
								className: "overflow-hidden rounded-2xl glass px-6 transition-shadow data-[state=open]:shadow-soft",
								children: [/* @__PURE__ */ jsx(AccordionTrigger, {
									className: "py-5 text-left font-display text-base font-bold text-foreground hover:no-underline sm:text-lg",
									children: f.q
								}), /* @__PURE__ */ jsx(AccordionContent, {
									className: "text-sm leading-relaxed text-muted-foreground",
									children: f.a
								})]
							}, i))
						})
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				id: "apply",
				className: "relative py-28",
				children: /* @__PURE__ */ jsx("div", {
					className: "mx-auto max-w-5xl px-6",
					children: /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", {
						className: "relative overflow-hidden rounded-[2rem] glass-strong p-12 text-center shadow-float",
						children: [/* @__PURE__ */ jsx(Parallax, {
							speed: .1,
							className: "pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full opacity-40 blur-3xl",
							children: /* @__PURE__ */ jsx("div", {
								className: "h-full w-full rounded-full",
								style: { background: "radial-gradient(circle, var(--brand), transparent 65%)" }
							})
						}), /* @__PURE__ */ jsxs("div", {
							className: "relative",
							children: [
								/* @__PURE__ */ jsxs("h2", {
									className: "font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl",
									children: [
										"Ready to own a",
										" ",
										/* @__PURE__ */ jsx("span", {
											className: "bg-[image:var(--gradient-brand)] bg-clip-text text-transparent",
											children: "passive"
										}),
										" ",
										"e-commerce store?"
									]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mx-auto mt-4 max-w-xl text-muted-foreground",
									children: "Book a no-pressure consultation. We'll walk you through capital requirements, expected timelines and the marketplaces best suited to you."
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-8 flex flex-wrap items-center justify-center gap-4",
									children: [/* @__PURE__ */ jsx(ApplyForm, { trigger: /* @__PURE__ */ jsxs(Button, {
										size: "lg",
										className: "rounded-full bg-[image:var(--gradient-brand)] px-8 py-6 text-base font-semibold text-brand-foreground shadow-glow transition hover:-translate-y-1",
										children: ["Apply for a Store", /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4" })]
									}) }), /* @__PURE__ */ jsx("a", {
										href: "#contact",
										className: "text-sm font-semibold text-foreground underline-offset-4 hover:underline",
										children: "Or contact us →"
									})]
								})
							]
						})]
					}) })
				})
			}),
			/* @__PURE__ */ jsx("footer", {
				id: "contact",
				className: "relative bg-[image:var(--gradient-navy)] text-navy-foreground",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-7xl px-6 py-16",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "grid gap-12 lg:grid-cols-4",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "lg:col-span-2",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2.5",
										children: [/* @__PURE__ */ jsx("div", {
											className: "grid h-10 w-10 place-items-center rounded-xl bg-[image:var(--gradient-brand)] shadow-glow",
											children: /* @__PURE__ */ jsx("span", {
												className: "font-display text-xl font-black text-brand-foreground",
												children: "E"
											})
										}), /* @__PURE__ */ jsxs("div", {
											className: "flex flex-col leading-none",
											children: [/* @__PURE__ */ jsx("span", {
												className: "font-display text-lg font-black tracking-tight",
												children: "Ecom."
											}), /* @__PURE__ */ jsx("span", {
												className: "text-[9px] font-semibold uppercase tracking-[0.2em] opacity-70",
												children: "Solutions"
											})]
										})]
									}),
									/* @__PURE__ */ jsx("p", {
										className: "mt-4 max-w-md text-sm opacity-80",
										children: "Full-service e-commerce store management for investors who want results without the operational headache."
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "mt-6 space-y-3 text-sm opacity-90",
										children: [
											/* @__PURE__ */ jsxs("div", {
												className: "flex items-start gap-3",
												children: [/* @__PURE__ */ jsx(MapPin, { className: "mt-0.5 h-4 w-4 shrink-0 text-brand" }), /* @__PURE__ */ jsx("span", { children: "H-68/1, Omor Ali Lane, West Rampura, Dhaka-1219, Bangladesh" })]
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ jsx(Phone, { className: "h-4 w-4 shrink-0 text-brand" }), /* @__PURE__ */ jsx("a", {
													href: "tel:+880",
													className: "hover:underline",
													children: "+880 1XXX-XXXXXX"
												})]
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ jsx(Mail, { className: "h-4 w-4 shrink-0 text-brand" }), /* @__PURE__ */ jsx("a", {
													href: "mailto:info@ecomsolutionsbd.com",
													className: "hover:underline",
													children: "info@ecomsolutionsbd.com"
												})]
											})
										]
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
								className: "font-display text-sm font-bold uppercase tracking-wider",
								children: "Quick Links"
							}), /* @__PURE__ */ jsx("ul", {
								className: "mt-4 space-y-2 text-sm opacity-85",
								children: nav.map((n) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
									href: n.href,
									className: "hover:text-brand",
									children: n.label
								}) }, n.href))
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("h4", {
									className: "font-display text-sm font-bold uppercase tracking-wider",
									children: "Newsletter"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-4 text-sm opacity-80",
									children: "Insights on e-commerce automation, monthly."
								}),
								/* @__PURE__ */ jsxs("form", {
									onSubmit: (e) => {
										e.preventDefault();
										e.currentTarget.reset();
									},
									className: "mt-4 flex gap-2",
									children: [/* @__PURE__ */ jsx(Input, {
										type: "email",
										required: true,
										placeholder: "you@email.com",
										className: "border-white/20 bg-white/10 text-navy-foreground placeholder:text-white/50"
									}), /* @__PURE__ */ jsx(Button, {
										type: "submit",
										className: "bg-[image:var(--gradient-brand)] text-brand-foreground hover:opacity-90",
										children: "Join"
									})]
								})
							] })
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs opacity-70 sm:flex-row",
						children: [/* @__PURE__ */ jsxs("div", { children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" Ecom Solutions. All rights reserved."
						] }), /* @__PURE__ */ jsx("div", { children: "Built for investors who value their time." })]
					})]
				})
			})
		]
	});
}
//#endregion
export { Index as component };
