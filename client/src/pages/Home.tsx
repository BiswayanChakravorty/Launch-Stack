import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clipboard,
  ExternalLink,
  FileImage,
  Filter,
  Flag,
  Globe2,
  LayoutDashboard,
  Link2,
  Menu,
  Search,
  Sparkles,
  Upload,
  Users,
  WandSparkles,
  X,
  Zap,
} from "lucide-react";
import { platforms, type Platform } from "../data/platforms";

type View = "home" | "workspace";
type Plan = "free" | "starter" | "scale";
type Campaign = {
  product: string;
  idea: string;
  url: string;
  audience: string;
  positioning: string;
  screenshot: string;
  plan: Plan;
};

const STORAGE_KEY = "launchstack-campaign-v1";
const planDetails: Record<Plan, { name: string; limit: number; price: string; label: string }> = {
  free: { name: "Free launch", limit: 10, price: "$0", label: "10 platforms" },
  starter: { name: "Launch 30", limit: 30, price: "$29", label: "30 platforms" },
  scale: { name: "Launch 50+", limit: 50, price: "$57.99", label: "50+ platforms" },
};

const defaultCampaign: Campaign = {
  product: "",
  idea: "",
  url: "",
  audience: "Founders & makers",
  positioning: "",
  screenshot: "",
  plan: "free",
};

const featuredNames = ["Product Hunt", "Hacker News (Show HN)", "Reddit - r/SaaS", "Indie Hackers", "BetaList", "G2"];

function getPlanPlatforms(plan: Plan) {
  return platforms.slice(0, planDetails[plan].limit);
}

function platformTone(access: string) {
  return access === "Free" ? "free" : access === "Freemium" ? "freemium" : "paid";
}

function scriptFor(platform: Platform, campaign: Campaign) {
  const product = campaign.product || "Your SaaS";
  const idea = campaign.idea || "a practical tool that helps teams move from idea to outcome faster";
  const audience = campaign.audience || "founders and modern teams";
  const url = campaign.url || "https://yourproduct.com";
  const positioning = campaign.positioning || `Built for ${audience.toLowerCase()} who want a simpler way to ${idea.toLowerCase()}.`;
  const lower = platform.name.toLowerCase();
  if (lower.includes("product hunt")) return `Launching ${product} — ${idea}\n\n${positioning}\n\nWe built this for ${audience.toLowerCase()} who are tired of stitching together five tools to make one thing happen.\n\nWhat makes it different:\n• Clear, focused workflow\n• Fast setup with no busywork\n• Designed around the job, not the feature list\n\nTry it here: ${url}\n\nI would love feedback from makers, operators, and anyone building the next version of their workflow.`;
  if (lower.includes("hacker news")) return `Show HN: ${product} — ${idea}\n\nHi HN, we built ${product} for ${audience.toLowerCase()}.\n\nThe short version: ${positioning}\n\nWe kept the first version focused on one useful loop instead of building another all-in-one dashboard. The current build is available at ${url}.\n\nI would especially value feedback on the workflow, onboarding, and the parts that feel too opinionated.`;
  if (lower.includes("reddit")) return `I built ${product} for ${audience.toLowerCase()} — looking for honest feedback\n\nThe problem: ${idea}.\n\nThe approach: ${positioning}\n\nIt is live here: ${url}\n\nWhat would make this useful enough for you to keep using? What would stop you from trying it?`;
  if (lower.includes("indie hackers")) return `I am building ${product} to help ${audience.toLowerCase()} ${idea.toLowerCase()}\n\nThe wedge is simple: ${positioning}\n\nI am sharing the first version at ${url}. I am looking for early users who will tell me where the idea breaks, what they would pay for, and what should stay out of the product.`;
  return `${product}: ${idea}\n\nAudience: ${campaign.audience || "founders and modern teams"}\n\nPositioning: ${positioning}\n\nLaunch link: ${url}\n\nIf you are exploring this problem, I would love to hear what you use today and what still feels harder than it should.`;
}

function AppHeader({ view, setView, onMenu }: { view: View; setView: (view: View) => void; onMenu: () => void }) {
  return (
    <header className="launch-header">
      <button className="launch-brand" onClick={() => setView("home")} aria-label="LaunchStack home">
        <span className="launch-mark"><Flag size={17} strokeWidth={2.6} /></span>
        <span>launch<span>stack</span></span>
      </button>
      <nav className="launch-nav">
        <button className={view === "home" ? "active" : ""} onClick={() => setView("home")}>Why LaunchStack</button>
        <button className={view === "workspace" ? "active" : ""} onClick={() => setView("workspace")}>Launch workspace</button>
        <button onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}>Pricing</button>
      </nav>
      <div className="launch-header-actions">
        <button className="ghost-action" onClick={() => alert("Login is planned for the next release. Your campaign is currently saved locally in this browser.")}>Sign in</button>
        <button className="dark-pill" onClick={() => setView("workspace")}>Open workspace <ArrowRight size={14} /></button>
      </div>
      <button className="launch-mobile-menu" onClick={onMenu} aria-label="Open navigation"><Menu size={20} /></button>
    </header>
  );
}

function HomeView({ onStart }: { onStart: () => void }) {
  return (
    <main>
      <section className="launch-hero">
        <div className="hero-copy launch-copy">
          <div className="launch-eyebrow"><span className="eyebrow-line" /> For founders who want distribution, not another dashboard</div>
          <h1>Launch once.<br /><em>Adapt everywhere.</em></h1>
          <p className="hero-lede">LaunchStack turns one SaaS story into the right launch script, link, and audience angle for 250+ places your next users already look.</p>
          <div className="hero-actions"><button className="lime-button" onClick={onStart}>Build my launch kit <ArrowRight size={16} /></button><button className="text-link" onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })}>See how it works <ChevronDown size={15} /></button></div>
          <div className="hero-proof"><span><Check size={13} /> 250 destinations</span><span><Zap size={13} /> 10 free to start</span><span><Globe2 size={13} /> Local-first setup</span></div>
        </div>
        <div className="hero-visual">
          <div className="hero-orbit orbit-top"><Sparkles size={13} /> One brief in</div>
          <div className="hero-dashboard-card">
            <div className="mini-window-bar"><span /><span /><span /><small>launch kit / 01</small></div>
            <div className="dashboard-card-header"><div><span className="small-caps">Campaign preview</span><h3>Makerly launch</h3></div><span className="ready-chip"><span /> Ready</span></div>
            <div className="url-preview"><div className="url-favicon">M</div><div><strong>makerly.app</strong><small>Build better habits for your product team</small></div><ExternalLink size={13} /></div>
            <div className="script-preview"><div className="small-caps">Product Hunt script</div><h4>Launching Makerly — a calmer way to run product rituals</h4><p>We built Makerly for small teams who want the clarity of a product process without the overhead...</p><div className="preview-footer"><span>Audience · founders & product teams</span><span><Clipboard size={12} /> Copy</span></div></div>
            <div className="channel-row"><span className="channel active">PH</span><span className="channel">HN</span><span className="channel">R</span><span className="channel">IH</span><span className="channel-more">+46 more</span></div>
          </div>
          <div className="hero-orbit orbit-bottom"><Link2 size={13} /> 250 doors out</div>
        </div>
      </section>
      <section className="proof-strip"><div><strong>250</strong><span>launch destinations in one place</span></div><div><strong>3</strong><span>audience angles for every idea</span></div><div><strong>1</strong><span>brief turned into channel-ready copy</span></div><small>Founder distribution is a system. Start with the surface area.</small></section>
      <section className="launch-section" id="how"><div className="section-kicker">A launch system, not a link dump</div><div className="section-heading"><h2>Your product has<br /><em>more doors.</em></h2><p>Enter the context once. LaunchStack gives every platform the version of your story that belongs there — with the destination link attached.</p></div><div className="how-grid"><article><span>01</span><div className="icon-tile"><FileImage size={17} /></div><h3>Give us the raw material</h3><p>Product idea, website, audience, positioning, and a homepage screenshot. The minimum brief that makes the launch feel real.</p></article><article><span>02</span><div className="icon-tile"><WandSparkles size={17} /></div><h3>Shape the story</h3><p>Get platform-aware launch scripts for founders, builders, marketers, developers, and the communities they actually read.</p></article><article><span>03</span><div className="icon-tile"><Flag size={17} /></div><h3>Work the list</h3><p>Open each destination, copy the right version, and track where your launch has been. Quantity becomes a repeatable motion.</p></article></div></section>
      <section className="launch-dark-panel"><div><div className="section-kicker light">The founder advantage</div><h2>Distribution is not<br /><em>a lucky day.</em></h2></div><div><p>Most launch advice gives you five links and a pep talk. LaunchStack gives you the long tail: 250 places, a tailored message, and an order of operations you can actually finish.</p><button className="outline-lime" onClick={onStart}>See the workspace <ArrowRight size={14} /></button></div></section>
      <section className="launch-section pricing-section" id="pricing"><div className="section-kicker">Simple packaging</div><div className="section-heading"><h2>Start free.<br /><em>Scale the surface.</em></h2><p>Use the free launch to find your message. Pay when you are ready to cover more of the market.</p></div><PricingCards onChoose={onStart} /></section>
    </main>
  );
}

function PricingCards({ onChoose }: { onChoose: () => void }) {
  const cards: { plan: Plan; eyebrow: string; title: string; copy: string; features: string[] }[] = [
    { plan: "free", eyebrow: "Try it", title: "$0", copy: "Get your first launch into the wild without a credit card.", features: ["10 launch destinations", "Core launch scripts", "Audience angles", "Local campaign workspace"] },
    { plan: "starter", eyebrow: "Most founders", title: "$29", copy: "Cover the channels that compound discovery for a new SaaS.", features: ["30 launch destinations", "All free features", "Platform-ready copy variants", "Launch checklist"] },
    { plan: "scale", eyebrow: "Full surface", title: "$57.99", copy: "Go broad when you want quantity to become the game changer.", features: ["50+ launch destinations", "All starter features", "Long-tail directory coverage", "Campaign handoff view"] },
  ];
  return <div className="pricing-grid">{cards.map((card) => <article key={card.plan} className={`price-card ${card.plan === "starter" ? "featured" : ""}`}><div className="price-top"><span>{card.eyebrow}</span>{card.plan === "starter" && <b>Popular</b>}</div><h3>{card.title}<small>{card.plan !== "free" ? "/ launch" : ""}</small></h3><p>{card.copy}</p><div className="price-rule" />{card.features.map((feature) => <div className="price-feature" key={feature}><Check size={14} /> {feature}</div>)}<button className={card.plan === "starter" ? "lime-button small" : "outline-button small"} onClick={onChoose}>{card.plan === "free" ? "Start free" : `Choose ${card.title}`} <ArrowRight size={13} /></button></article>)}</div>;
}

function WorkspaceView({ campaign, setCampaign, onHome }: { campaign: Campaign; setCampaign: (campaign: Campaign) => void; onHome: () => void }) {
  const [query, setQuery] = useState("");
  const [accessFilter, setAccessFilter] = useState("All");
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(platforms[0]);
  const [scriptDraft, setScriptDraft] = useState(() => scriptFor(platforms[0], campaign));
  const [copied, setCopied] = useState("");
  const [saved, setSaved] = useState(false);
  const selectedPlatforms = getPlanPlatforms(campaign.plan);
  const filtered = useMemo(() => platforms.filter((platform) => platform.name.toLowerCase().includes(query.toLowerCase()) && (accessFilter === "All" || platform.access === accessFilter)), [query, accessFilter]);

  useEffect(() => {
    if (!selectedPlatforms.some((platform) => platform.name === selectedPlatform.name)) setSelectedPlatform(selectedPlatforms[0] || platforms[0]);
  }, [campaign.plan]);

  useEffect(() => {
    setScriptDraft(scriptFor(selectedPlatform, campaign));
  }, [selectedPlatform.name, campaign.product, campaign.idea, campaign.url, campaign.audience, campaign.positioning]);

  async function copyScript() {
    try { await navigator.clipboard.writeText(scriptDraft); } catch { /* clipboard may be unavailable in preview */ }
    setCopied(selectedPlatform.name);
    window.setTimeout(() => setCopied(""), 1800);
  }

  function saveCampaign() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(campaign));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  }

  function handleScreenshot(file?: File) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setCampaign({ ...campaign, screenshot: String(reader.result) });
    reader.readAsDataURL(file);
  }

  return <main className="workspace-page"><div className="workspace-heading"><div><button className="back-link" onClick={onHome}>← Back to launch story</button><div className="section-kicker">Launch workspace</div><h1>Build your <em>launch kit.</em></h1><p>Give us one clean brief. Get the right version of your story for every door.</p></div><div className="save-state">{saved ? <><Check size={13} /> Saved locally</> : <><span /> Browser-local workspace</>}</div></div><div className="workspace-shell"><aside className="campaign-rail"><div className="rail-title"><span>01</span><strong>Your campaign</strong></div><div className="campaign-form"><label>Product name<input value={campaign.product} onChange={(e) => setCampaign({ ...campaign, product: e.target.value })} placeholder="e.g. Makerly" /></label><label>What are you building?<textarea value={campaign.idea} onChange={(e) => setCampaign({ ...campaign, idea: e.target.value })} placeholder="A sentence about the problem you solve" rows={3} /></label><label>Website link<div className="input-with-icon"><Link2 size={14} /><input value={campaign.url} onChange={(e) => setCampaign({ ...campaign, url: e.target.value })} placeholder="https://yourproduct.com" /></div></label><label>Primary audience<div className="select-wrap"><Users size={14} /><select value={campaign.audience} onChange={(e) => setCampaign({ ...campaign, audience: e.target.value })}><option>Founders & makers</option><option>Marketing teams</option><option>Developers & technical teams</option><option>Product leaders</option><option>Small businesses</option></select><ChevronDown size={14} /></div></label><label>Positioning line<textarea value={campaign.positioning} onChange={(e) => setCampaign({ ...campaign, positioning: e.target.value })} placeholder="The sharp reason someone should care" rows={3} /></label><label>Homepage screenshot<div className="screenshot-upload"><input id="screenshot" type="file" accept="image/*" onChange={(e) => handleScreenshot(e.target.files?.[0])} /><label htmlFor="screenshot" className="upload-trigger">{campaign.screenshot ? <img src={campaign.screenshot} alt="Homepage preview" /> : <><Upload size={17} /><span>Add a screenshot</span><small>PNG, JPG · helps your copy feel real</small></>}</label></div></label></div><button className="save-button" onClick={saveCampaign}>{saved ? "Saved" : "Save campaign"} <Check size={14} /></button></aside><section className="workspace-content"><div className="plan-switcher"><div><span className="section-kicker">02 · Coverage</span><h2>Choose your launch surface</h2></div><div className="plan-pills">{(Object.keys(planDetails) as Plan[]).map((plan) => <button key={plan} className={campaign.plan === plan ? "selected" : ""} onClick={() => setCampaign({ ...campaign, plan })}><strong>{planDetails[plan].price}</strong><small>{planDetails[plan].label}</small></button>)}</div></div><div className="coverage-meta"><span><b>{selectedPlatforms.length}</b> destinations in this kit</span><span className="coverage-note">You can always expand later</span></div><div className="script-and-list"><div className="platform-list-card"><div className="list-header"><div><span className="section-kicker">Destination catalog</span><h3>Choose a door</h3></div><span className="count-badge">{filtered.length} / 250</span></div><div className="search-box"><Search size={14} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search platforms" /><div className="filter-box"><Filter size={13} /><select value={accessFilter} onChange={(e) => setAccessFilter(e.target.value)}><option>All</option><option>Free</option><option>Freemium</option><option>Paid</option></select></div></div><div className="platform-scroll">{filtered.map((platform) => <button key={`${platform.name}-${platform.url}`} className={`platform-row ${selectedPlatform.name === platform.name ? "selected" : ""}`} onClick={() => setSelectedPlatform(platform)}><span className={`platform-dot ${platformTone(platform.access)}`} /><span className="platform-name">{platform.name}</span><span className={`access-tag ${platformTone(platform.access)}`}>{platform.access}</span><ExternalLink size={12} /></button>)}</div></div><div className="script-card"><div className="script-card-top"><div><span className="section-kicker">03 · Channel script</span><h3>{selectedPlatform.name}</h3></div><a href={selectedPlatform.url} target="_blank" rel="noreferrer" className="open-link">Open platform <ExternalLink size={13} /></a></div><div className="script-meta"><span className={`access-tag ${platformTone(selectedPlatform.access)}`}>{selectedPlatform.access} destination</span><span><Users size={12} /> Written for {campaign.audience || "your audience"}</span></div><textarea className="script-editor" value={scriptDraft} onChange={(e) => setScriptDraft(e.target.value)} aria-label={`${selectedPlatform.name} launch script`} /><div className="script-actions"><button className="lime-button small" onClick={copyScript}>{copied === selectedPlatform.name ? <><Check size={13} /> Copied</> : <><Clipboard size={13} /> Copy script</>}</button><button className="outline-button small" onClick={() => window.open(selectedPlatform.url, "_blank", "noopener,noreferrer")}>Open link <ExternalLink size={13} /></button></div><div className="script-tip"><Sparkles size={13} /><span>Tip: rewrite the first line in the platform's native voice, then keep the proof and link intact.</span></div></div></div></section></div></main>;
}

export default function Home() {
  const [view, setView] = useState<View>("home");
  const [mobileNav, setMobileNav] = useState(false);
  const [campaign, setCampaignState] = useState<Campaign>(() => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || defaultCampaign; } catch { return defaultCampaign; } });

  function setCampaign(next: Campaign) { setCampaignState(next); localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); }
  function setViewAndScroll(next: View) { setView(next); setMobileNav(false); window.scrollTo({ top: 0, behavior: "smooth" }); }

  return <div className="launch-app"><AppHeader view={view} setView={setViewAndScroll} onMenu={() => setMobileNav((open) => !open)} />{mobileNav && <div className="mobile-launch-nav"><button onClick={() => setViewAndScroll("home")}>Why LaunchStack</button><button onClick={() => setViewAndScroll("workspace")}>Launch workspace</button><button onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}>Pricing</button></div>}{view === "home" ? <HomeView onStart={() => setViewAndScroll("workspace")} /> : <WorkspaceView campaign={campaign} setCampaign={setCampaign} onHome={() => setViewAndScroll("home")} />}<footer className="launch-footer"><div className="launch-brand"><span className="launch-mark"><Flag size={14} /></span><span>launch<span>stack</span></span></div><span>Launch once. Adapt everywhere.</span><button onClick={() => setViewAndScroll("workspace")}>Open workspace <ArrowRight size={13} /></button></footer></div>;
}
