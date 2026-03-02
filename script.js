/* Hummes Portfolio — small JS for:
   - mobile menu
   - search filter (skills / projects)
   - contact form copy-to-clipboard
*/

const SKILLS = [
  { name: "HTML & CSS", level: "Em evolução", desc: "Estrutura, layout, responsivo, components em HTML/CSS puro (Pages)." },
  { name: "JavaScript", level: "Em evolução", desc: "Interações, filtros, integrações básicas e automações." },
  { name: "Git & GitHub", level: "Bom", desc: "Commits, branch, Pages, workflow simples e organização de repo." },
  { name: "UI / UX", level: "Forte", desc: "Visual limpo, hierarquia, micro-interações, sensação premium." },
  { name: "Automação", level: "Em evolução", desc: "Bots e fluxos simples para negócios (WhatsApp, atendimento, etc.)." },
  { name: "APIs (REST)", level: "Em evolução", desc: "Consumir endpoints, enviar/receber dados, integrar serviços." },
  { name: "Node / Next", level: "Em estudo", desc: "Projetos e estrutura moderna (quando precisa de app completo)." },
  { name: "Produto", level: "Forte", desc: "Pensar no usuário, no fluxo, no valor e na entrega final." },
];

const PROJECTS = [
  {
    title: "Hummes — Site/Marca (Portfolio premium)",
    tag: "Web",
    desc: "Identidade visual off-white + pastel, cards e layout premium. Versão estática rápida (GitHub Pages) + evolução contínua.",
    links: [
      { label: "GitHub", href: "https://github.com/hummespage" },
      { label: "Abrir site", href: "#top" }
    ]
  },
  {
    title: "Bots & atendimento (ideia de produto)",
    tag: "Automação",
    desc: "Estruturas para automatizar conversas e captação de leads de forma humana e direta, sem travar o negócio.",
    links: [
      { label: "Roadmap", href: "#planos" }
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

const TIMELINE = [
  { title: "SENAI — Técnico em Desenvolvimento de Sistemas", date: "2026", desc: "Base prática com foco em projetos, lógica e execução." },
  { title: "Estudo contínuo — Web/Apps/UI", date: "Sempre", desc: "Treino constante: interface premium + código limpo + entrega real." },
  { title: "Projetos pessoais (Hummes)", date: "2026 →", desc: "Construir produto e portfólio com padrão alto, simples e vendável." },
  { title: "Experiência em atendimento / moda", date: "2026", desc: "Vivência prática de cliente, comunicação e apresentação (impacta produto)." }
];

function renderSkills(items){
  const grid = document.getElementById("skillsGrid");
  grid.innerHTML = items.map(s => `
    <div class="skill">
      <div class="skill-top">
        <div class="skill-name">${escapeHtml(s.name)}</div>
        <div class="skill-level">${escapeHtml(s.level)}</div>
      </div>
      <div class="skill-desc">${escapeHtml(s.desc)}</div>
    </div>
  `).join("");
}

function renderProjects(items){
  const grid = document.getElementById("projectsGrid");
  grid.innerHTML = items.map(p => `
    <article class="project">
      <div class="project-head">
        <div class="project-title">${escapeHtml(p.title)}</div>
        <div class="tag">${escapeHtml(p.tag)}</div>
      </div>
      <div class="project-desc">${escapeHtml(p.desc)}</div>
      <div class="project-links">
        ${p.links.map(l => `<a class="btn ${l.label === "GitHub" ? "ghost" : ""}" href="${l.href}" ${l.href.startsWith("http") ? 'target="_blank" rel="noreferrer"' : ""}>${escapeHtml(l.label)}</a>`).join("")}
      </div>
    </article>
  `).join("");
}

function renderTimeline(items){
  const grid = document.getElementById("timeline");
  grid.innerHTML = items.map(t => `
    <div class="t-item">
      <div class="t-top">
        <div class="t-title">${escapeHtml(t.title)}</div>
        <div class="t-date">${escapeHtml(t.date)}</div>
      </div>
      <div class="t-desc">${escapeHtml(t.desc)}</div>
    </div>
  `).join("");
}

function escapeHtml(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function contains(hay, needle){
  return hay.toLowerCase().includes(needle.toLowerCase());
}

function wireSearch(){
  const skillSearch = document.getElementById("skillSearch");
  const projectSearch = document.getElementById("projectSearch");

  skillSearch?.addEventListener("input", () => {
    const q = skillSearch.value.trim();
    const filtered = q ? SKILLS.filter(s => contains(s.name, q) || contains(s.desc, q) || contains(s.level, q)) : SKILLS;
    renderSkills(filtered);
  });

  projectSearch?.addEventListener("input", () => {
    const q = projectSearch.value.trim();
    const filtered = q ? PROJECTS.filter(p => contains(p.title, q) || contains(p.desc, q) || contains(p.tag, q)) : PROJECTS;
    renderProjects(filtered);
  });
}

function wireMobileMenu(){
  const btn = document.getElementById("hamburger");
  const menu = document.getElementById("mobileMenu");
  if(!btn || !menu) return;

  btn.addEventListener("click", () => {
    const isOpen = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!isOpen));
    menu.hidden = isOpen;
  });

  menu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      btn.setAttribute("aria-expanded", "false");
      menu.hidden = true;
    });
  });
}

function wireContactCopy(){
  const form = document.getElementById("contactForm");
  if(!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const msg = String(fd.get("message") || "").trim();
    const final = `Oi! Aqui é ${name}. ${msg}`.trim();

    try{
      await navigator.clipboard.writeText(final);
      alert("Mensagem copiada! Agora cola no WhatsApp/Email 🙂");
      form.reset();
    }catch(err){
      alert("Não consegui copiar automaticamente. Copia manualmente:\n\n" + final);
    }
  });
}

(function init(){
  renderSkills(SKILLS);
  renderProjects(PROJECTS);
  renderTimeline(TIMELINE);
  wireSearch();
  wireMobileMenu();
  wireContactCopy();
})();
