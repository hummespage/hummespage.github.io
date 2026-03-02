/* Hummes Portfolio — interactions (no frameworks) */
const SKILLS = [
  { name: "HTML & CSS", level: "Em evolução", desc: "Estrutura, layout, responsivo, componentes em HTML/CSS puro (Pages)." },
  { name: "JavaScript", level: "Em evolução", desc: "Interações, filtros, integrações básicas e automações." },
  { name: "Git & GitHub", level: "Bom", desc: "Commits, branch, Pages, workflow simples e organização de repo." },
  { name: "UI / UX", level: "Forte", desc: "Visual limpo, hierarquia, micro-interações, sensação premium." },
  { name: "Automação", level: "Em evolução", desc: "Bots e fluxos simples para negócios (WhatsApp, atendimento, etc.)." },
  { name: "APIs (REST)", level: "Em evolução", desc: "Consumir endpoints, enviar/receber dados, integrar serviços." },
  { name: "Node / Next", level: "Base", desc: "Projetos e estrutura moderna (quando precisa de app completo)." },
  { name: "Python", level: "Base", desc: "Fundamentos e scripts simples para automação." },
  { name: "Produto", level: "Forte", desc: "Pensar no usuário, no fluxo, no valor e na entrega final." }
];

const PROJECTS = [
  {
    title: "Hummes — Site/Marca (Portfólio premium)",
    tag: "Web",
    desc: "Identidade visual off‑white + pastel, cards e layout premium. Versão estática rápida (GitHub Pages) + evolução contínua.",
    links: [
      { label: "GitHub", href: "https://github.com/hummespage" },
      { label: "Abrir topo", href: "#top" }
    ]
  },
  {
    title: "Bots & automação (Whats/Telegram/Instagram)",
    tag: "Automação",
    desc: "Fluxos de atendimento e captação (provas de conceito). Mensagens, filtros, roteiros e integração básica.",
    links: [
      { label: "Falar comigo", href: "#contato" }
    ]
  },
  {
    title: "Sites e landing pages (vendas/serviços)",
    tag: "Web",
    desc: "Páginas rápidas, responsivas e com cara de produto pronto. Foco em conversão e clareza.",
    links: [
      { label: "Ver seção", href: "#projetos" }
    ]
  },
  {
    title: "Integrações (API REST) — base",
    tag: "Back",
    desc: "Consumo de APIs, estrutura de dados e automações simples conectando serviços.",
    links: [
      { label: "Skills", href: "#skills" }
    ]
  },
  {
    title: "Skate app (conceito)",
    tag: "App",
    desc: "Ideia de rede social local + mapa de picos + conteúdo. MVP com foco em utilidade real e simplicidade.",
    links: [
      { label: "Visão", href: "#planos" }
    ]
  }
];

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === "class") node.className = v;
    else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v);
  });
  children.forEach((c) => node.appendChild(typeof c === "string" ? document.createTextNode(c) : c));
  return node;
}

function renderSkills() {
  const wrap = document.getElementById("skillsList");
  if (!wrap) return;
  wrap.innerHTML = "";
  SKILLS.forEach((s) => {
    wrap.appendChild(
      el("div", { class: "card skill" }, [
        el("h4", {}, [`${s.name} • `, el("span", { class: "muted" }, [s.level])]),
        el("p", {}, [s.desc])
      ])
    );
  });
}

function renderProjects(filter = "") {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;
  const q = (filter || "").trim().toLowerCase();
  grid.innerHTML = "";
  PROJECTS.filter((p) => {
    const hay = `${p.title} ${p.tag} ${p.desc}`.toLowerCase();
    return hay.includes(q);
  }).forEach((p) => {
    const links = el("div", { class: "links" }, p.links.map((l) =>
      el("a", { class: "linkBtn", href: l.href }, [l.label])
    ));
    grid.appendChild(
      el("div", { class: "card project" }, [
        el("div", { class: "project__top" }, [
          el("b", {}, [p.title]),
          el("span", { class: "badge" }, [p.tag])
        ]),
        el("p", {}, [p.desc]),
        links
      ])
    );
  });
}

function setupSearch() {
  const input = document.getElementById("projectSearch");
  if (!input) return;
  input.addEventListener("input", () => renderProjects(input.value));
}

function setupContactCopy() {
  const form = document.getElementById("msgForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const msg = document.getElementById("msg").value.trim();
    const full = `Olá! Eu sou ${name}. ${msg}\n\nMeu contato: +55 48 99215-5149`;
    try {
      await navigator.clipboard.writeText(full);
      alert("Mensagem copiada! Agora cola no WhatsApp/E-mail 🙂");
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = full;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      alert("Mensagem copiada! Agora cola no WhatsApp/E-mail 🙂");
    }
  });
}

function setupMobileNav() {
  const btn = document.getElementById("navBtn");
  const nav = document.getElementById("nav");
  if (!btn || !nav) return;

  const close = () => {
    nav.classList.remove("open");
    btn.setAttribute("aria-expanded", "false");
  };

  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
  window.addEventListener("resize", () => {
    if (window.innerWidth > 700) close();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderSkills();
  renderProjects();
  setupSearch();
  setupContactCopy();
  setupMobileNav();
});
