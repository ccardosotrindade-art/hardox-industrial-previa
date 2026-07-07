import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Flame, Sparkles, PaintBucket, Wrench, ShieldCheck, Truck,
  Factory, Clock, Award, Users, ChevronLeft, ChevronRight,
  Phone, Mail, MapPin, MessageCircle, Menu, X, CheckCircle2,
} from "lucide-react";
import heroWelding from "@/assets/hero-welding.jpg";
import heroBlasting from "@/assets/hero-blasting.jpg";
import heroPainting from "@/assets/hero-painting.jpg";
import teamImg from "@/assets/team.jpg";
import logoImg from "@/assets/logo.png";

export const Route = createFileRoute("/")({
  component: Index,
});

const WHATSAPP = "5547991199451";
const WA_LINK = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Olá! Gostaria de solicitar um orçamento.")}`;

const slides = [
  {
    img: heroWelding,
    kicker: "Metalmecânica Industrial",
    title: "Equipamentos de alta durabilidade operacional",
    sub: "Controle total de qualidade e prazos para indústrias que exigem precisão técnica em Santa Catarina.",
  },
  {
    img: heroBlasting,
    kicker: "Jateamento Sa 2½",
    title: "Preparação de superfície com padrão técnico rigoroso",
    sub: "Cabine própria 6,0 × 6,0 × 3,3 m para peças e estruturas de grande porte, prontas para receber acabamento protetivo.",
  },
  {
    img: heroPainting,
    kicker: "Pintura Técnica",
    title: "Acabamento protetivo que resiste ao ambiente industrial",
    sub: "Pintura líquida e eletrostática em pó aplicadas em fluxo integrado, garantindo aderência e vida útil superior.",
  },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("animate-fade-in-up");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { href: "#sobre", label: "Sobre" },
    { href: "#servicos", label: "Serviços" },
    { href: "#diferenciais", label: "Diferenciais" },
    { href: "#depoimentos", label: "Clientes" },
    { href: "#faq", label: "FAQ" },
    { href: "#contato", label: "Contato" },
  ];
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        scrolled ? "bg-background/90 backdrop-blur border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <a href="#top" className="flex items-center gap-3" aria-label="HARDOX Industrial — início">
          <img src={logoImg} alt="HARDOX Industrial" className="h-10 w-10 rounded-md object-cover" />
          <span className="text-lg font-black tracking-tight">
            HARDOX <span className="text-primary">Industrial</span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground transition hover:text-foreground">
              {l.label}
            </a>
          ))}
          <a href={WA_LINK} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-elegant transition hover:bg-primary-glow">
            Fale Conosco
          </a>
        </nav>
        <button
          className="lg:hidden rounded-md border border-border p-2"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted">
                {l.label}
              </a>
            ))}
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="mt-2 rounded-md bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground">
              Fale Conosco
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, []);
  const prev = () => setI((v) => (v - 1 + slides.length) % slides.length);
  const next = () => setI((v) => (v + 1) % slides.length);
  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden">
      {slides.map((s, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${idx === i ? "opacity-100" : "opacity-0"}`}
          aria-hidden={idx !== i}
        >
          <img
            src={s.img}
            alt={s.title}
            className="h-full w-full object-cover"
            {...(idx === 0 ? { fetchPriority: "high" as const } : { loading: "lazy" as const })}
          />
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute inset-0 bg-background/40" />
        </div>
      ))}

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-4 pb-20 pt-32 md:px-8">
        <div key={i} className="max-w-3xl animate-fade-in-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            <Sparkles size={14} /> {slides[i].kicker}
          </span>
          <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            {slides[i].title}
          </h1>
          <p className="mt-4 text-lg font-semibold italic text-primary md:text-xl">
            O Sucesso do Seu Produto Passa Por Aqui
          </p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {slides[i].sub}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-elegant transition hover:bg-primary-glow">
              Solicitar Orçamento
            </a>
            <a href="#servicos" className="inline-flex items-center gap-2 rounded-md border border-border bg-background/40 px-6 py-3.5 text-sm font-semibold text-foreground backdrop-blur transition hover:bg-background/70">
              Conheça os Serviços
            </a>
          </div>

          <dl className="mt-14 grid max-w-2xl grid-cols-3 gap-6 border-t border-border/60 pt-8">
            {[
              { k: "+5", v: "anos de operação" },
              { k: "100%", v: "processos integrados" },
              { k: "Sa 2½", v: "padrão de jateamento" },
            ].map((s) => (
              <div key={s.v}>
                <dt className="text-2xl font-black text-primary md:text-3xl">{s.k}</dt>
                <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-8 z-20 flex items-center justify-center gap-4">
        <button onClick={prev} aria-label="Slide anterior" className="rounded-full border border-border bg-background/60 p-2.5 backdrop-blur transition hover:bg-primary hover:text-primary-foreground">
          <ChevronLeft size={18} />
        </button>
        <div className="flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Ir para slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all ${idx === i ? "w-10 bg-primary" : "w-4 bg-muted-foreground/50"}`}
            />
          ))}
        </div>
        <button onClick={next} aria-label="Próximo slide" className="rounded-full border border-border bg-background/60 p-2.5 backdrop-blur transition hover:bg-primary hover:text-primary-foreground">
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}

function Sobre() {
  return (
    <section id="sobre" className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div data-reveal className="opacity-0">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Sobre a HARDOX</span>
          <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">
            Excelência técnica que nasce do controle sobre <span className="text-primary">cada etapa</span>.
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
              Fundada em 2020 em Corupá/SC, a HARDOX Industrial nasceu para responder a uma demanda concreta do parque industrial da região norte de Santa Catarina e do Vale do Itajaí: fornecedores fragmentados, prazos incertos e falhas de qualidade entre etapas produtivas.
            </p>
            <p>
              O fundador, profissional que domina todos os processos oferecidos, estruturou uma operação verticalizada — do recebimento do projeto do cliente até a peça pintada e pronta para operação. Fabricação, soldagem, jateamento e pintura acontecem em um único fluxo, sob o mesmo teto, com o mesmo padrão.
            </p>
            <p className="text-foreground">
              Nossa missão é entregar componentes metálicos com perfeição e agilidade, respeitando prazos e priorizando qualidade — para que o cliente receba equipamentos de alta durabilidade operacional, sem gestão paralela de múltiplos fornecedores.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { k: "2020", v: "Fundação" },
              { k: "Corupá/SC", v: "Unidade própria" },
              { k: "4 processos", v: "Integrados" },
            ].map((s) => (
              <div key={s.v} className="rounded-lg border border-border bg-card p-4">
                <div className="text-xl font-black text-primary">{s.k}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div data-reveal className="relative opacity-0">
          <div className="absolute -inset-4 rounded-2xl bg-gradient-primary opacity-20 blur-3xl" aria-hidden />
          <img
            src={teamImg}
            alt="Equipe HARDOX Industrial na unidade fabril em Corupá/SC"
            loading="lazy"
            className="relative w-full rounded-2xl border border-border object-cover shadow-elegant"
          />
        </div>
      </div>
    </section>
  );
}

const servicos = [
  {
    icon: Flame,
    title: "Soldagem Certificada",
    desc: "MIG/MAG, TIG e Eletrodo Revestido em Aço Carbono, Inox, Alumínio e Bronze. Procedimentos conforme ASME IX e AWS D1.1.",
  },
  {
    icon: Wrench,
    title: "Fabricação e Montagem",
    desc: "Componentes industriais e estruturas metálicas fabricados a partir do projeto do cliente, com rigor dimensional e traceabilidade.",
  },
  {
    icon: Sparkles,
    title: "Jateamento Abrasivo",
    desc: "Cabine própria 6,0 × 6,0 × 3,3 m operando no padrão Sa 2½ — preparação ideal para máxima aderência da pintura.",
  },
  {
    icon: PaintBucket,
    title: "Pintura Líquida",
    desc: "Aplicação técnica de sistemas de pintura líquida para ambientes industriais, com controle de espessura e cura.",
  },
  {
    icon: ShieldCheck,
    title: "Pintura Eletrostática (Pó)",
    desc: "Acabamento uniforme e altamente resistente, indicado para peças que exigem proteção mecânica e estética superior.",
  },
  {
    icon: Truck,
    title: "Montagem e Solda In-Loco",
    desc: "Equipe deslocada até a planta do cliente para montagens, ajustes e soldagens em máquinas e equipamentos em operação.",
  },
];

function Servicos() {
  return (
    <section id="servicos" className="border-y border-border bg-secondary/30 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div data-reveal className="mx-auto max-w-2xl text-center opacity-0">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Serviços e Soluções</span>
          <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">
            Você nos entrega o projeto, nós devolvemos a peça pronta e acabada.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Processos integrados que eliminam a fragmentação de fornecedores, reduzem gargalos logísticos e garantem controle total sobre qualidade e prazos.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {servicos.map((s, idx) => {
            const Icon = s.icon;
            return (
              <article
                key={s.title}
                data-reveal
                style={{ animationDelay: `${idx * 80}ms` }}
                className="group flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center opacity-0 transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-elegant"
              >
                <div className="grid h-16 w-16 place-items-center rounded-xl bg-gradient-primary text-primary-foreground transition group-hover:scale-110">
                  <Icon size={30} strokeWidth={2} />
                </div>
                <h3 className="mt-6 text-xl font-bold">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                <a href={WA_LINK} target="_blank" rel="noreferrer" className="mt-6 text-sm font-semibold text-primary transition hover:text-primary-glow">
                  Saiba Mais →
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const diferenciais = [
  { k: "100%", icon: Factory, t: "Fluxo Verticalizado", d: "Solda, jateamento e pintura no mesmo teto — zero fragmentação." },
  { k: "Sa 2½", icon: Sparkles, t: "Padrão de Preparação", d: "Aderência superior da pintura em componentes de grande porte." },
  { k: "ASME IX", icon: Award, t: "Solda Normatizada", d: "Procedimentos qualificados também sob AWS D1.1." },
  { k: "24/7", icon: Clock, t: "Compromisso com Prazos", d: "Planejamento produtivo focado em cumprimento rigoroso." },
  { k: "6×6×3,3m", icon: ShieldCheck, t: "Cabine Própria", d: "Capacidade para peças e estruturas industriais de grande porte." },
  { k: "SC + BR", icon: Truck, t: "Atendimento Flexível", d: "Base em Corupá/SC com abrangência conforme logística negociada." },
];

function Diferenciais() {
  return (
    <section id="diferenciais" className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
      <div data-reveal className="mx-auto max-w-2xl text-center opacity-0">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">Por que a HARDOX</span>
        <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">
          Números que traduzem <span className="text-primary">precisão técnica</span>.
        </h2>
        <p className="mt-4 text-muted-foreground">
          Diferenciais que respondem, na prática, às objeções mais comuns do setor industrial: prazo, qualidade do acabamento e logística.
        </p>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {diferenciais.map((d, idx) => {
          const Icon = d.icon;
          return (
            <div
              key={d.t}
              data-reveal
              style={{ animationDelay: `${idx * 80}ms` }}
              className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 opacity-0 transition hover:border-primary/60"
            >
              <Icon className="absolute right-6 top-6 text-primary/20" size={64} />
              <div className="relative text-4xl font-black text-primary md:text-5xl">{d.k}</div>
              <h3 className="relative mt-4 text-lg font-bold">{d.t}</h3>
              <p className="relative mt-2 text-sm text-muted-foreground">{d.d}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

const depoimentos = [
  {
    n: "Ricardo Menezes",
    r: "Gerente de Suprimentos, Indústria Metalúrgica — Joinville/SC",
    t: "Centralizamos com a HARDOX etapas que antes eram feitas por três fornecedores. Ganhamos previsibilidade de prazo e o acabamento passou a ser consistente.",
  },
  {
    n: "Luciana Fischer",
    r: "Engenharia Industrial — Vale do Itajaí",
    t: "A preparação Sa 2½ e a pintura líquida entregues pela HARDOX resolveram um problema recorrente de descamação que tínhamos em campo. Padrão técnico impecável.",
  },
  {
    n: "Anderson Rocha",
    r: "Coordenador de Manutenção, Indústria de Equipamentos — Jaraguá do Sul/SC",
    t: "Solicitamos uma montagem in-loco de urgência. Equipe chegou preparada, com procedimentos claros, e cumpriu o prazo combinado sem impacto na produção.",
  },
];

function Depoimentos() {
  return (
    <section id="depoimentos" className="border-y border-border bg-secondary/30 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div data-reveal className="mx-auto max-w-2xl text-center opacity-0">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Prova Social</span>
          <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">
            Segurança e confiança <span className="text-primary">na visão de quem contrata</span>.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Indústrias de Santa Catarina que centralizaram fabricação e acabamento na HARDOX Industrial.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {depoimentos.map((d, idx) => (
            <figure
              key={d.n}
              data-reveal
              style={{ animationDelay: `${idx * 100}ms` }}
              className="flex flex-col rounded-2xl border border-border bg-card p-8 opacity-0"
            >
              <div className="text-5xl font-black leading-none text-primary/60">&ldquo;</div>
              <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-foreground">{d.t}</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-primary font-bold text-primary-foreground">
                  {d.n.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <div className="text-sm font-bold">{d.n}</div>
                  <div className="text-xs text-muted-foreground">{d.r}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div data-reveal className="mt-16 rounded-2xl border border-dashed border-border bg-background/40 p-8 opacity-0 text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Atendemos indústrias de diversos setores em Santa Catarina</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-semibold text-muted-foreground">
            {["Metalúrgica", "Máquinas & Equipamentos", "Logística", "Alimentícia", "Automotiva", "Construção Industrial"].map((s) => (
              <span key={s} className="rounded-full border border-border px-4 py-1.5">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  { q: "Vocês fazem projetos?", a: "Não. Focamos na fabricação a partir das especificações e projetos do cliente." },
  { q: "Vocês têm algum produto próprio?", a: "Não. Por enquanto, atuamos exclusivamente na fabricação sob demanda para terceiros." },
  { q: "Quais estados vocês conseguem atender?", a: "A abrangência depende da logística e do processo de negociação com o cliente. Nossa base é Corupá/SC, atendendo com força a região norte de SC e o Vale do Itajaí." },
  { q: "Quais normas de solda vocês seguem?", a: "Trabalhamos conforme ASME IX e AWS D1.1, com processos MIG/MAG, TIG e Eletrodo Revestido em Aço Carbono, Inox, Alumínio e Bronze." },
  { q: "Vocês executam serviços na planta do cliente?", a: "Sim. Realizamos montagem e soldagem in-loco de máquinas, equipamentos e peças." },
];

function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-4xl px-4 py-24 md:px-8 md:py-32">
      <div data-reveal className="text-center opacity-0">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">Perguntas Frequentes</span>
        <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">Tire suas dúvidas técnicas.</h2>
      </div>
      <div className="mt-12 divide-y divide-border rounded-2xl border border-border bg-card">
        {faqs.map((f, idx) => (
          <details key={idx} className="group p-6 open:bg-secondary/40">
            <summary className="flex cursor-pointer items-start justify-between gap-4 text-left font-semibold">
              <span>{f.q}</span>
              <span className="mt-1 text-primary transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28" style={{ backgroundColor: "#2b87bc" }}>
      <div className="absolute inset-0 opacity-20" aria-hidden style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 0.5px, transparent 1px)", backgroundSize: "24px 24px" }} />
      <div className="relative mx-auto max-w-4xl px-4 text-center text-white md:px-8">
        <h2 className="text-3xl font-black leading-tight md:text-5xl">
          Pronto para eliminar a fragmentação de fornecedores?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/90 md:text-lg">
          Solicite um orçamento e receba uma proposta com prazos claros, procedimentos normatizados e acabamento protetivo de alta durabilidade.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={WA_LINK} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-white px-7 py-3.5 text-sm font-bold text-[#2b87bc] transition hover:bg-white/90">
            Solicitar Orçamento
          </a>
          <a href={WA_LINK} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border border-white/70 bg-transparent px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/10">
            <MessageCircle size={16} /> WhatsApp (47) 99119-9451
          </a>
        </div>
        <ul className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/90">
          {["Prazos cumpridos", "Solda normatizada", "Pintura com aderência garantida"].map((x) => (
            <li key={x} className="inline-flex items-center gap-2"><CheckCircle2 size={16} /> {x}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Contato() {
  return (
    <section id="contato" className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
      <div className="grid gap-12 lg:grid-cols-2">
        <div data-reveal className="opacity-0">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Contato</span>
          <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">Vamos conversar sobre o seu projeto.</h2>
          <p className="mt-4 text-muted-foreground">
            Nossa equipe está pronta para avaliar suas especificações e retornar com uma proposta técnica.
          </p>
          <ul className="mt-8 space-y-4">
            <li className="flex items-start gap-4">
              <div className="mt-1 grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary"><Phone size={18} /></div>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">WhatsApp</div>
                <a href={WA_LINK} target="_blank" rel="noreferrer" className="font-semibold hover:text-primary">(47) 99119-9451</a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="mt-1 grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary"><Mail size={18} /></div>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">E-mail</div>
                <a href="mailto:contato.hardox@gmail.com" className="font-semibold hover:text-primary">contato.hardox@gmail.com</a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="mt-1 grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary"><MapPin size={18} /></div>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Endereço</div>
                <p className="font-semibold">Rua Ano Bom, 1355, Bairro Ano Bom</p>
                <p className="text-sm text-muted-foreground">Corupá / SC</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="mt-1 grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary"><Clock size={18} /></div>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Horário</div>
                <p className="font-semibold">Segunda a sexta, 07:00 – 17:30</p>
              </div>
            </li>
          </ul>

          <div className="mt-10 rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <Users size={20} className="text-primary" />
              <h3 className="font-bold">Direção</h3>
            </div>
            <div className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
              <div><span className="text-foreground font-semibold">Fábio Kohls</span> — Direção Executiva</div>
              <div><span className="text-foreground font-semibold">Franciela Wengrath</span> — Direção Administrativa</div>
            </div>
          </div>
        </div>

        <div data-reveal className="opacity-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const f = e.currentTarget as HTMLFormElement;
              const data = new FormData(f);
              const msg = `Olá! Sou ${data.get("nome")}, da empresa ${data.get("empresa")}. ${data.get("mensagem")}`;
              window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
            }}
            className="space-y-4 rounded-2xl border border-border bg-card p-6 md:p-8"
          >
            <h3 className="text-xl font-bold">Solicitar Orçamento</h3>
            <p className="text-sm text-muted-foreground">Preencha os campos e envie sua solicitação diretamente pelo WhatsApp.</p>
            {[
              { n: "nome", l: "Nome", t: "text" },
              { n: "empresa", l: "Empresa", t: "text" },
              { n: "telefone", l: "Telefone", t: "tel" },
            ].map((f) => (
              <div key={f.n}>
                <label htmlFor={f.n} className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{f.l}</label>
                <input required id={f.n} name={f.n} type={f.t} className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30" />
              </div>
            ))}
            <div>
              <label htmlFor="mensagem" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Descreva o serviço</label>
              <textarea required id="mensagem" name="mensagem" rows={4} className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30" />
            </div>
            <button type="submit" className="w-full rounded-md bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-elegant transition hover:bg-primary-glow">
              Enviar via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-3 md:px-8">
        <div>
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="HARDOX Industrial" className="h-10 w-10 rounded-md object-cover" />
            <span className="text-lg font-black tracking-tight">HARDOX <span className="text-primary">Industrial</span></span>
          </div>
          <p className="mt-3 text-sm font-semibold italic text-primary">O Sucesso do Seu Produto Passa Por Aqui</p>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Metalmecânica industrial verticalizada em Corupá/SC. Solda, jateamento e pintura técnica em um único fluxo.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Navegação</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {[["#sobre","Sobre"],["#servicos","Serviços"],["#diferenciais","Diferenciais"],["#depoimentos","Clientes"],["#faq","FAQ"],["#contato","Contato"]].map(([h,l])=>(
              <li key={h}><a href={h} className="hover:text-primary">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Contato</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Rua Ano Bom, 1355 — Corupá/SC</li>
            <li><a href="mailto:contato.hardox@gmail.com" className="hover:text-primary">contato.hardox@gmail.com</a></li>
            <li><a href={WA_LINK} target="_blank" rel="noreferrer" className="hover:text-primary">(47) 99119-9451</a></li>
            <li>Seg – Sex, 07:00 – 17:30</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} HARDOX Industrial — Todos os direitos reservados.
      </div>
    </footer>
  );
}

function WhatsAppFloat() {
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-elegant transition hover:scale-110"
    >
      <MessageCircle size={26} />
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-30" aria-hidden />
    </a>
  );
}

function Index() {
  useReveal();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Sobre />
        <Servicos />
        <Diferenciais />
        <Depoimentos />
        <CTA />
        <FAQ />
        <Contato />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
