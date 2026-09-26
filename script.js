/* =========================================================
   CONFIGURA AQUÍ TUS DATOS DE CONTACTO
   ========================================================= */
const CONTACT = {
  email: "kevinhern49@gmail.com",
  phone: "+57 301 391 6533",
  whatsapp: "573013916533",
  linkedin: "https://www.linkedin.com/in/kevin-hernandez-431464235/",
  github: "https://github.com/Kevin25DC",
};

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

/* ---------- Contact wiring ---------- */
const hrefs = {
  email: `mailto:${CONTACT.email}`,
  whatsapp: `https://wa.me/${CONTACT.whatsapp}`,
  linkedin: CONTACT.linkedin,
  github: CONTACT.github,
};
const texts = {
  email: CONTACT.email,
  phone: CONTACT.phone,
  linkedin: CONTACT.linkedin.replace(/^https?:\/\/(www\.)?/, ""),
  github: CONTACT.github.replace(/^https?:\/\//, ""),
};
$$("[data-link]").forEach((a) => (a.href = hrefs[a.dataset.link]));
$$("[data-text]").forEach((el) => (el.textContent = texts[el.dataset.text]));
$("#y").textContent = new Date().getFullYear();
$("#copyMail").addEventListener("click", async (e) => {
  try {
    await navigator.clipboard.writeText(CONTACT.email);
    e.target.textContent = "¡Correo copiado! ✓";
  } catch {
    e.target.textContent = CONTACT.email;
  }
  setTimeout(() => (e.target.textContent = "Copiar correo"), 2200);
});

/* ---------- Mobile nav ---------- */
const burger = $(".burger"), links = $(".links");
burger.addEventListener("click", () => {
  burger.classList.toggle("open");
  links.classList.toggle("open");
});
$$(".links a").forEach((a) => a.addEventListener("click", () => {
  burger.classList.remove("open");
  links.classList.remove("open");
}));

/* ---------- Scroll progress ---------- */
const bar = $(".progress");
addEventListener("scroll", () => {
  const h = document.documentElement;
  bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + "%";
}, { passive: true });

/* ---------- Typed roles ---------- */
(() => {
  const el = $(".typed");
  const words = JSON.parse(el.dataset.words);
  if (reduced) { el.textContent = words[0]; return; }
  let w = 0, i = 0, del = false;
  const tick = () => {
    const word = words[w];
    el.textContent = word.slice(0, i);
    if (!del && i === word.length) { del = true; return setTimeout(tick, 1600); }
    if (del && i === 0) { del = false; w = (w + 1) % words.length; }
    i += del ? -1 : 1;
    setTimeout(tick, del ? 35 : 70);
  };
  tick();
})();

/* ---------- Terminal animation ---------- */
(() => {
  const term = $("#term");
  const script = [
    ["p", "$ "], ["c", "claude "], ["", "--agent treasury-dev issue #1417\n", 1],
    ["m", "▸ cargando skills: guidelines, tesoreria, pl-sql\n"],
    ["m", "▸ MCP oracle (read-only) conectado\n"],
    ["v", "● analizar   "], ["p", "✓\n"],
    ["v", "● construir  "], ["p", "✓ "], ["m", "Facade + migración + tests\n"],
    ["v", "● probar     "], ["p", "✓ "], ["m", "42 passed\n"],
    ["v", "● revisar    "], ["p", "✓ "], ["m", "quality gate OK\n"],
    ["k", "→ PR #1418 abierto\n\n"],
    ["p", "$ "], ["c", "rag "], ["", "query \"¿cómo se liquida la prima?\"\n", 1],
    ["m", "▸ embeddings → pinecone top_k=5\n"],
    ["m", "▸ gemini · claude · deepseek\n"],
    ["p", "✓ respuesta con 5 fuentes citadas\n\n"],
    ["p", "$ "], ["c", "git push "], ["", "origin main\n", 1],
    ["k", "▲ deploy → vercel  ready in 14s\n"],
  ];
  const cursor = '<span class="cur"></span>';
  let html = "";
  if (reduced) {
    term.innerHTML = script.map(([c, t]) => `<span class="${c}">${t}</span>`).join("");
    return;
  }
  let li = 0, ci = 0;
  const step = () => {
    if (li >= script.length) {
      term.innerHTML = html + cursor;
      return setTimeout(() => { html = ""; li = 0; ci = 0; step(); }, 4500);
    }
    const [cls, text, typed] = script[li];
    if (typed) {
      ci++;
      term.innerHTML = html + `<span class="${cls}">${text.slice(0, ci)}</span>` + cursor;
      if (ci < text.length) return setTimeout(step, 38);
    }
    html += `<span class="${cls}">${text}</span>`;
    term.innerHTML = html + cursor;
    li++; ci = 0;
    setTimeout(step, typed ? 380 : 170);
  };
  setTimeout(step, 900);
})();

/* ---------- Reveal on scroll + counters ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add("in");
    const n = e.target.querySelector("[data-count]");
    if (n) countUp(n);
    io.unobserve(e.target);
  });
}, { threshold: 0.12 });
$$(".reveal").forEach((el, i) => {
  el.style.transitionDelay = (i % 4) * 80 + "ms";
  io.observe(el);
});
function countUp(el) {
  const end = +el.dataset.count, dur = 1600, t0 = performance.now();
  const f = (t) => {
    const p = Math.min((t - t0) / dur, 1);
    el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(f);
  };
  requestAnimationFrame(f);
}

/* ---------- Tilt + spotlight ---------- */
const fine = matchMedia("(pointer: fine)").matches;
if (fine && !reduced) {
  $$(".tilt").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      el.style.setProperty("--mx", x * 100 + "%");
      el.style.setProperty("--my", y * 100 + "%");
      el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 6}deg) rotateY(${(x - 0.5) * 8}deg) translateY(-4px)`;
    });
    el.addEventListener("mouseleave", () => (el.style.transform = ""));
  });
  $$(".magnetic").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
    });
    el.addEventListener("mouseleave", () => (el.style.transform = ""));
  });
  const glow = $(".cursor-glow");
  addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  }, { passive: true });
} else {
  $(".cursor-glow").style.display = "none";
}

/* ---------- Project filters ---------- */
$$(".filters button").forEach((b) => b.addEventListener("click", () => {
  $$(".filters button").forEach((x) => x.classList.toggle("on", x === b));
  const f = b.dataset.f;
  $$(".project").forEach((p) => {
    const show = f === "all" || p.dataset.cat.split(" ").includes(f);
    p.classList.toggle("hide", !show);
    if (show) { p.classList.add("in"); p.animate([{ opacity: 0, transform: "scale(.96)" }, { opacity: 1, transform: "none" }], { duration: 350, easing: "ease-out" }); }
  });
}));

/* ---------- Orbit (AI section) ---------- */
(() => {
  const rings = $$(".ring").map((ring, idx) => ({
    items: $$("b", ring).map((b) => ({ b, a: parseFloat(b.style.getPropertyValue("--a")) * Math.PI / 180 })),
    speed: [0.28, -0.18, 0.12][idx],
  }));
  let last = performance.now();
  const frame = (t) => {
    const dt = reduced ? 0 : (t - last) / 1000;
    last = t;
    rings.forEach((r) => r.items.forEach((it) => {
      it.a += r.speed * dt;
      it.b.style.left = 50 + 50 * Math.cos(it.a) + "%";
      it.b.style.top = 50 + 50 * Math.sin(it.a) + "%";
    }));
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
})();

/* ---------- CI/CD pipeline animation ---------- */
(() => {
  const stages = $$(".stage"), pipes = $$(".pipe");
  let i = 0, running = false;
  const run = () => {
    stages.forEach((s, k) => { s.classList.toggle("done", k < i); s.classList.toggle("active", k === i); });
    pipes.forEach((p, k) => p.classList.toggle("fill", k < i));
    i++;
    if (i <= stages.length) setTimeout(run, 900);
    else setTimeout(() => { i = 0; run(); }, 2600);
  };
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !running) { running = true; run(); }
  }).observe($(".pipeline"));
})();

/* ---------- Particle network background ---------- */
(() => {
  const c = $("#bg"), ctx = c.getContext("2d");
  let w, h, pts, mouse = { x: -999, y: -999 };
  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = innerWidth; h = innerHeight;
    c.width = w * dpr; c.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.min(90, Math.floor((w * h) / 16000));
    pts = Array.from({ length: n }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
    }));
  };
  resize();
  addEventListener("resize", resize);
  addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    for (const p of pts) {
      if (!reduced) { p.x += p.vx; p.y += p.vy; }
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
      if (dm < 140) { p.x += (p.x - mouse.x) / dm; p.y += (p.y - mouse.y) / dm; }
      ctx.fillStyle = "rgba(167,139,250,.7)";
      ctx.beginPath(); ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2); ctx.fill();
    }
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 130) {
          ctx.strokeStyle = `rgba(34,211,238,${(1 - d / 130) * 0.22})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  };
  draw();
})();
