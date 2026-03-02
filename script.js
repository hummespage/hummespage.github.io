/* Hummes Portfolio — small JS for:
   - mobile menu
   - search filter (skills / projects)
   - contact form copy-to-clipboard
*/

const SKILLS = [
  { name: "HTML & CSS", level: "Em evolução", desc: "Layout, responsivo, componentes e boas práticas (incluindo Pages/static)." },
  { name: "JavaScript", level: "Em evolução", desc: "Interações, filtros, DOM, consumo básico de APIs e automações simples." },
  { name: "Python", level: "Em evolução", desc: "Fundamentos + scripts para automatizar tarefas e aprender backend." },
  { name: "Git & GitHub", level: "Bom", desc: "Commits, branches, Pages, organização de repo e rotina de evolução." },
  { name: "UI/UX (produto)", level: "Foco forte", desc: "Interface premium, fluxo simples, linguagem humana e acabamento visual." }
];


const PROJECTS = [
  {
    title: "Hummes — Site/Marca (Portfolio premium)",
    tag: "Web",
    desc: "Identidade visual off-white + pastel, cards e layout premium. Versão estática rápida (GitHub Pages) + evolução contínua.",
    links: [
      { label: "GitHub", href: "https://github.com/hummespage" },
      { label: "Abrir site", href: "https://hummespage.github.io/" }
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
  { title: "Cursos extras (Python / Web / Git)", date: "Em andamento", desc: "Trilhas curtas e prática constante pra acelerar (Python, front-end e workflow de GitHub)." },
  { title: "Técnico em Mecânica", date: "Concluído", desc: "Base sólida de raciocínio técnico, processos e disciplina." },
  { title: "Arquitetura e Urbanismo", date: "Não concluído", desc: "Experiência e visão espacial; levei isso pro design e organização de produto." },
  { title: "Projetista / desenhista (CAD)", date: "Experiência", desc: "Trabalho com desenho técnico e detalhamento — atenção a detalhe que vira padrão de UI." },
  { title: "Empreendedor (bar)", date: "Experiência", desc: "Atendimento, operação e gestão na prática — aprendi muito sobre cliente e execução." },
  { title: "Projetos pessoais (Hummes)", date: "Agora", desc: "Construir produto e portfólio com padrão alto, simples e vendável." }
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
