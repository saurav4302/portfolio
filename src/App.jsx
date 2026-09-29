import { useEffect, useRef, useState } from 'react'
import './index.css'

const SKILLS = [
  {
    title: 'Backend · Excellent',
    items: [
      ['Spring Boot / Spring MVC', 95],
      ['Core Java', 94],
      ['Microservices · REST (100+ APIs)', 92],
      ['SQL · Banking systems', 90],
    ],
  },
  {
    title: 'Frontend · Excellent',
    items: [
      ['Angular', 93],
      ['Oracle OJET', 85],
      ['React · TypeScript', 86],
      ['HTML / CSS · 20+ screen flows', 88],
    ],
  },
  {
    title: 'AI & Cloud · Recent focus',
    items: [
      ['AI Agents · GenAI automation', 84],
      ['Prompt Engineering · Codex', 82],
      ['Cloud Deployment · Docker', 80],
      ['Python · Go (gRPC services)', 68],
    ],
  },
]

const EXPERIENCE = [
  {
    when: 'Jun 2022 — Present',
    now: true,
    role: 'Senior Application Software Engineer IC3',
    where: 'Oracle Financial Services (OFSS) · Pune — OBCLPM',
    summary:
      'End-to-end features for OBCLPM (corporate lending) with Java, Spring Boot, microservices, REST APIs and OJET across loan origination and facility lifecycle. Lead 4 developers inside a 25-member scrum team.',
    points: [
      'Pre-Shipment Loan Module end-to-end — 5 modules, 4–5 stages per flow, 100+ REST APIs, 20+ UI screens for loans against export LCs & purchase orders; built with AI agents, demoed to leadership in recurring 2-hour sessions over 1.5 months.',
      'Gen AI Auto Sightings of Funds — two AI agents (Payment Extraction + Fund Matching) that parse contract / customer / value-date from DMS uploads via prompts and auto-match SWIFT prepayments by amount, contract, customer & currency; replaced NLP pipelines that needed retraining per format.',
      'Single-handedly delivered loan initiation from Oracle Fusion into corporate apps, extending OBCLPM enterprise integration.',
      'Led cloud deployment of OBCLPM through platform-specific config challenges to a successful rollout.',
    ],
  },
  {
    when: 'Nov 2019 — Jun 2022',
    role: 'Senior Software Developer',
    where: 'Gmagica Pvt. Ltd · Delhi',
    summary:
      'Solo full-lifecycle owner at a service startup — requirements, design, dev, testing, deployment, DevOps & cloud for healthcare and telecom clients. Also acted as manager / team lead coordinating stakeholders.',
    points: [
      'Remote patient vitals platform (Lifesignals) — Spring Boot, Angular, Python, Go, gRPC: ECG waveforms, heart-rate, SpO2, resp-rate, temperature, position in real time.',
      'Server monitoring tool — Angular, Python, Spring Boot: CPU / RAM / memory / Docker health in live graphs & tables.',
      'Gsports & Snapflix (Halotel TZ, Safaricom Kenya, Tigo) — subscription football-data portal and OTT streaming platform, delivered end-to-end.',
      'Vmagic short-video app & logistics live-tracking app — Android / iOS / Swift + Spring Boot; plus a user-management UI praised by the client for usability.',
    ],
  },
  {
    when: 'Apr 2018 — Oct 2019',
    role: 'Software Engineer',
    where: 'Estel Technologies Pvt Ltd · Gurgaon',
    summary:
      'First production Angular + microservices work, shipping in Agile sprints for telecom operators.',
    points: [
      'GLO Admin (GLO Africa) — wallet-system admin tool on Spring MVC.',
      'Voucher Management System (DTAC Thailand) — 50+ REST APIs & 30+ UI screens for voucher distribution & redemption on Angular + Spring Boot.',
    ],
  },
  {
    when: 'Feb 2016 — Mar 2018',
    role: 'Software Programmer',
    where: 'Image Info Systems Pvt. Ltd. · Delhi',
    summary: 'Banking systems for cheque clearing.',
    points: [
      'Cheque Truncation System — HDFC Bank, DCB Bank: end-to-end CTS clearing workflow on Core Java + Zul framework.',
    ],
  },
]

const PROJECTS = [
  {
    cat: 'AI · Banking',
    title: 'Gen AI Auto Sightings of Funds',
    desc: 'Two AI agents parse DMS documents and auto-match cross-border SWIFT prepayments to loans — no retraining per document format.',
    stack: ['Java', 'Spring Boot', 'AI Agents', 'Prompt Engineering'],
    client: 'Oracle OBCLPM',
    color: 'p2',
  },
  {
    cat: 'Corporate Lending',
    title: 'Pre-Shipment Loan Module — OBCLPM',
    desc: '5 modules, 4–5 stages per flow, 100+ REST APIs & 20+ OJET screens for pre-shipment loans against export LCs and purchase orders.',
    stack: ['Spring Boot', 'Microservices', 'REST', 'OJET'],
    client: 'Oracle OBCLPM',
    color: 'p1',
  },
  {
    cat: 'Banking · Integration',
    title: 'Fusion Loan Initiation + Cloud Rollout',
    desc: 'Single-handed Fusion→OBCLPM loan initiation plus leading the OBCLPM cloud deployment to a successful release.',
    stack: ['Spring Boot', 'Oracle Fusion', 'Cloud'],
    client: 'Oracle OBCLPM',
    color: 'p6',
  },
  {
    cat: 'Healthcare · IoT',
    title: 'Remote Patient Vitals Monitor',
    desc: 'Streams ECG, heart-rate, SpO2, respiration, temperature and position from bedside devices to a live clinical dashboard.',
    stack: ['Spring Boot', 'Angular', 'Python', 'Go', 'gRPC'],
    client: 'Lifesignals',
    color: 'p1',
  },
  {
    cat: 'DevOps · Observability',
    title: 'Infrastructure Monitoring Tool',
    desc: 'CPU, RAM, memory and Docker-container telemetry rendered as live graphs and tables with alerting.',
    stack: ['Angular', 'Python', 'Spring Boot'],
    client: 'Lifesignals',
    color: 'p2',
  },
  {
    cat: 'Sports · Telecom VAS',
    title: 'Gsports Live Football Portal',
    desc: 'Subscription-based live scores, match data and football news for three African telecom operators.',
    stack: ['Spring Boot', 'Angular', 'Subscriptions'],
    client: 'Halotel · Safaricom · Tigo',
    color: 'p3',
  },
  {
    cat: 'Media · OTT',
    title: 'Snapflix OTT Platform',
    desc: 'Movies and live-TV streaming website with subscription management and content catalog.',
    stack: ['Spring Boot', 'Angular', 'Streaming'],
    client: 'Halotel · Safaricom · Tigo',
    color: 'p4',
  },
  {
    cat: 'Mobile · Social',
    title: 'Vmagic Short-Video App',
    desc: 'Create, like, share and comment on short videos — native mobile clients on a Spring Boot backend.',
    stack: ['Android', 'Swift', 'Spring Boot'],
    client: 'Consumer app',
    color: 'p5',
  },
  {
    cat: 'Logistics · Tracking',
    title: 'Fleet Live-Tracking App',
    desc: 'Logistics managers monitor trucks and consignments live, with route and vehicle telemetry.',
    stack: ['Android', 'iOS', 'Spring Boot'],
    client: 'Logistics',
    color: 'p6',
  },
]

const FILTERS = [
  'All',
  'AI · Banking',
  'Corporate Lending',
  'Banking · Integration',
  'Healthcare · IoT',
  'Media · OTT',
  'Mobile · Social',
]

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.12 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function useBars() {
  useEffect(() => {
    const bars = document.querySelectorAll('.bar i')
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.style.width = e.target.dataset.w + '%'
        }),
      { threshold: 0.4 }
    )
    bars.forEach((b) => io.observe(b))
    return () => io.disconnect()
  }, [])
}

function LendingConsole() {
  const stages = [
    { label: 'Origination', state: 'done' },
    { label: 'Facility', state: 'done' },
    { label: 'Disbursement', state: 'active' },
    { label: 'Repayment', state: 'todo' },
  ]
  return (
    <div className="lend" aria-label="OBCLPM corporate lending snapshot">
      <div className="lend-head">
        <div>
          <span className="lend-kicker">OBCLPM · CORPORATE LENDING</span>
          <strong>Pre-Shipment Loans · against export LCs &amp; POs</strong>
        </div>
        <span className="lend-live"><i />OFSS</span>
      </div>
      <div className="lend-stages">
        {stages.map((s) => (
          <div key={s.label} className={`stage ${s.state}`}>
            <span className="stage-dot">{s.state === 'done' ? '✓' : s.state === 'active' ? '●' : '○'}</span>
            {s.label}
          </div>
        ))}
      </div>
      <div className="lend-bar"><i /></div>
      <div className="lend-grid">
        <div><small>FLOW</small><b>5 <em>modules · stages</em></b></div>
        <div><small>APIS</small><b>100+ <em>REST</em></b></div>
        <div><small>SCREENS</small><b>20+ <em>OJET</em></b></div>
      </div>
      <div className="lend-match">
        <span className="match-check">✓</span>
        <p><strong>SWIFT prepayments auto-sighted</strong> — matched to loans by amount, contract, customer &amp; currency</p>
      </div>
    </div>
  )
}

function AgentFeed() {
  const rows = [
    { agent: 'extraction-agent', text: 'parses DMS uploads → contract · customer · value-date' },
    { agent: 'matching-agent', text: 'auto-matches prepayments → loans · no retraining per format' },
    { agent: 'codex', text: 'daily driver → scaffolds modules, endpoints + OJET screens' },
  ]
  return (
    <div className="term" aria-label="AI agent work log">
      <div className="term-bar"><i style={{ background: '#ff5f57' }} /><i style={{ background: '#febc2e' }} /><i style={{ background: '#28c840' }} /><span>codex — agent workspace · OFSS</span><span className="term-live">daily driver</span></div>
      <ul className="agent-feed">
        {rows.map((r) => (
          <li key={r.agent}>
            <span className="agent-name">{r.agent}</span>
            <span className="agent-text">{r.text}</span>
          </li>
        ))}
        <li className="agent-cursor"><span className="agent-name">codex</span><span className="caret">▍</span></li>
      </ul>
    </div>
  )
}

export default function App() {
  const [filter, setFilter] = useState('All')
  const [menu, setMenu] = useState(false)
  const [sent, setSent] = useState(false)
  const formRef = useRef(null)
  useReveal()
  useBars()

  const visible = PROJECTS.filter((p) => filter === 'All' || p.cat === filter)

  return (
    <>
      <nav className="nav">
        <div className="wrap nav-inner">
          <a className="brand" href="#top" aria-label="Saurav Upadhyay home">
            <span className="brand-mark">S</span>
            <span className="brand-name">Saurav Upadhyay<small>SENIOR APP ENGINEER · ORACLE</small></span>
          </a>
          <div className={`nav-links ${menu ? 'open' : ''}`}>
            {['About', 'Skills', 'Experience', 'Work', 'Contact'].map((l) => (
              <a key={l} href={'#' + l.toLowerCase()} onClick={() => setMenu(false)}>{l}</a>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <a className="btn btn-dark btn-sm nav-cta" href="#contact">Contact</a>
            <button className="menu-btn" onClick={() => setMenu((m) => !m)} aria-label="Toggle menu" aria-expanded={menu}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
            </button>
          </div>
        </div>
      </nav>

      <header className="hero" id="top">
        <div className="wrap hero-grid">
          <div>
            <span className="status-pill"><span className="dot" />Senior App Engineer IC3 @ Oracle · Pune</span>
            <h1>
              Banking systems<br />
              <span className="thin">with</span> AI agents<br />
              that <span className="blue">ship.</span>
            </h1>
            <p className="lede">
              I&apos;m <strong>Saurav Upadhyay</strong> — 10+ years building scalable microservices and
              banking systems with <strong>Java, Spring Boot, REST &amp; OJET</strong>. Currently at Oracle
              on <strong>OBCLPM corporate lending</strong>: Pre-Shipment Loans (100+ APIs), Gen-AI fund sighting
              with two production agents, Fusion integrations and cloud rollout.
            </p>
            <div className="hero-cta">
              <a className="btn btn-dark" href="#work">View selected work
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8h9M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
              <a className="btn btn-ghost" href="#contact">upadhyaysaurav598@gmail.com</a>
            </div>
            <div className="hero-meta">
              <div><b>10+</b><span>Years experience</span></div>
              <div><b>100+</b><span>REST APIs in one module</span></div>
              <div><b>2</b><span>AI agents in production</span></div>
            </div>
          </div>
          <div>
            <LendingConsole />
            <AgentFeed />
          </div>
        </div>
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...Array(2)].flatMap((_, k) =>
              ['Java', 'Spring Boot', 'Microservices', 'REST APIs', 'OJET', 'Angular', 'AI Agents', 'Prompt Engineering', 'Codex', 'Cloud', 'SQL', 'Docker'].map((t, i) => (
                <span className="tag" key={k + '-' + i}>{t}</span>
              ))
            )}
          </div>
        </div>
      </header>

      <section className="block" id="about">
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <span className="eyebrow">About</span>
              <h2>Leads a squad. Architects<br />modules. Ships with AI.</h2>
            </div>
            <p>Leading feature development and architecture on Oracle&apos;s corporate lending platform — mentoring a 4-dev squad inside a 25-member scrum, unblocking UI and backend, and using AI agents to deliver 100-API modules on enterprise timelines.</p>
          </div>
          <div className="cards3">
            <div className="card blue reveal">
              <div className="iconbox"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 6l6-3 6 3-6 3-6-3zM4 6v8l6 3 6-3V6M10 9v8" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg></div>
              <h3>AI agent-driven delivery</h3>
              <p>Pre-Shipment Loan module and Gen-AI fund sighting built with Codex and prompt-engineered agents — 2-hour leadership demos, 1.5 months, production outcome.</p>
              <ul><li>Codex</li><li>Prompt Engineering</li><li>GenAI</li></ul>
            </div>
            <div className="card reveal">
              <div className="iconbox"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2l7 3v5c0 4.5-3 7.2-7 8-4-.8-7-3.5-7-8V5l7-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg></div>
              <h3>Corporate lending at scale</h3>
              <p>Loan origination &amp; facility lifecycle on OBCLPM: 5 pre-shipment modules, 100+ REST APIs, 20+ OJET screens, Fusion integration, cloud rollout.</p>
              <ul><li>OBCLPM</li><li>OJET</li><li>Cloud</li></ul>
            </div>
            <div className="card reveal">
              <div className="iconbox"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.6" /><path d="M10 6v4l2.8 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg></div>
              <h3>Full-stack &amp; founder-mode past</h3>
              <p>Healthcare vitals, OTT, telecom wallets, bank CTS — solo lifecycle ownership from requirements to DevOps before Oracle.</p>
              <ul><li>Spring Boot</li><li>Angular</li><li>Healthcare → Fintech</li></ul>
            </div>
          </div>
        </div>
      </section>

      <section className="block alt" id="skills">
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <span className="eyebrow">Skills</span>
              <h2>Deep where it counts,<br />current where it matters.</h2>
            </div>
            <p>Excellent in Spring Boot, Angular, Core Java and SQL — now shipping with Codex, prompt engineering and cloud.</p>
          </div>
          <div className="skills-grid">
            <div style={{ display: 'grid', gap: 18 }}>
              {SKILLS.map((c) => (
                <div className="skill-cat reveal" key={c.title}>
                  <h3>{c.title}</h3>
                  {c.items.map(([name, pct]) => (
                    <div className="bar-row" key={name}>
                      <div className="bar-top"><span>{name}</span><span>{pct}%</span></div>
                      <div className="bar"><i data-w={pct} /></div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gap: 18, alignContent: 'start' }}>
              <div className="quote-card reveal">
                <span className="eyebrow" style={{ color: '#93c5fd' }}>Latest highlight</span>
                <p style={{ marginTop: 14 }}>&ldquo;Two AI agents replaced an NLP retraining loop — fund sighting now works from a prompt, not a model release.&rdquo;</p>
                <cite>— Gen AI Auto Sightings of Funds, OBCLPM · Payment Extraction + Fund Matching agents</cite>
              </div>
              <div className="skill-cat reveal">
                <h3>Education</h3>
                <p style={{ margin: '0 0 6px', fontWeight: 600, color: 'var(--ink)' }}>B.Tech, Computer Science</p>
                <p style={{ margin: 0, fontSize: 14, color: 'var(--muted)' }}>UIET (MDU), Rohtak · 2012 — 2016</p>
                <p style={{ margin: '14px 0 0', fontSize: 14, color: 'var(--muted)' }}>Pune / Gurugram, India</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="block" id="experience">
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <span className="eyebrow">Experience</span>
              <h2>10+ years, 4 teams,<br />banking to bedside.</h2>
            </div>
            <a className="btn btn-ghost btn-sm" href="#contact">Request full résumé</a>
          </div>
          <div className="timeline">
            {EXPERIENCE.map((e) => (
              <div className={`t-item reveal ${e.now ? 'now' : ''}`} key={e.role + e.where}>
                <div className="t-card">
                  <span className="t-when">{e.when}</span>
                  <h3>{e.role}</h3>
                  <div className="where">{e.where}</div>
                  <p>{e.summary}</p>
                  <ul>{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block alt" id="work">
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <span className="eyebrow">Selected work</span>
              <h2>Latest: AI agents for<br />corporate lending.</h2>
            </div>
            <div className="filters" role="group" aria-label="Filter projects">
              {FILTERS.map((f) => (
                <button key={f} className={`chip ${filter === f ? 'on' : ''}`} onClick={() => setFilter(f)}>{f === 'All' ? 'All' : f.split(' ·')[0]}</button>
              ))}
            </div>
          </div>
          <div className="proj-grid">
            {visible.map((p) => (
              <article className="proj reveal in" key={p.title}>
                <div className={`proj-visual ${p.color}`} />
                <div className="proj-top">
                  <span className="proj-cat">{p.cat}</span>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="proj-stack">{p.stack.map((s) => <span key={s}>{s}</span>)}</div>
                </div>
                <div className="proj-foot">
                  <span className="mono" style={{ fontSize: 12, color: 'var(--faint)' }}>{p.client}</span>
                  <a href="#experience">See in experience →</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="block" id="numbers">
        <div className="wrap">
          <div className="band reveal">
            <div><b>10<i>+</i></b><span>Years building microservices &amp; banking systems</span></div>
            <div><b>100<i>+</i></b><span>REST APIs in the Pre-Shipment Loan module alone</span></div>
            <div><b>2</b><span>AI agents live in OBCLPM fund sighting</span></div>
            <div><b>4<i>/</i>25</b><span>Devs led inside a 25-member scrum team</span></div>
          </div>
        </div>
      </section>

      <section className="block alt" id="contact">
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <span className="eyebrow">Contact</span>
              <h2>Connect with<br />Saurav.</h2>
            </div>
            <p>Professional profile — currently with the Oracle Banking Corporate Lending team (OFSS), not looking for new roles.</p>
          </div>
          <div className="contact-grid">
            <div className="contact-info reveal">
              <span className="eyebrow" style={{ color: '#93c5fd' }}>Direct lines</span>
              <h2>Saurav Upadhyay</h2>
              <p>Pune / Gurugram, India · Typically replies within 24 hours.</p>
              <div className="c-row"><span className="c-ic"><svg width="17" height="17" viewBox="0 0 20 20" fill="none"><rect x="3" y="5" width="14" height="10" rx="2" stroke="#fff" strokeWidth="1.5" /><path d="M3.5 6.5L10 11l6.5-4.5" stroke="#fff" strokeWidth="1.5" /></svg></span><a href="mailto:upadhyaysaurav598@gmail.com">upadhyaysaurav598@gmail.com</a></div>
              <div className="c-row"><span className="c-ic"><svg width="17" height="17" viewBox="0 0 20 20" fill="none"><path d="M10 17s6-5.3 6-9.5A6 6 0 104 7.5C4 11.7 10 17 10 17z" stroke="#fff" strokeWidth="1.5" /><circle cx="10" cy="7.5" r="2" stroke="#fff" strokeWidth="1.5" /></svg></span><span>Oracle OFSS · Pune</span></div>
              <div style={{ marginTop: 'auto', paddingTop: 26, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <span className="mono" style={{ fontSize: 12, color: '#a1a1aa', border: '1px solid #2a2a2e', padding: '7px 13px', borderRadius: 999 }}>Spring Boot</span>
                <span className="mono" style={{ fontSize: 12, color: '#a1a1aa', border: '1px solid #2a2a2e', padding: '7px 13px', borderRadius: 999 }}>AI Agents</span>
                <span className="mono" style={{ fontSize: 12, color: '#a1a1aa', border: '1px solid #2a2a2e', padding: '7px 13px', borderRadius: 999 }}>OBCLPM</span>
              </div>
            </div>
            <form
              className="form reveal"
              ref={formRef}
              onSubmit={(e) => {
                e.preventDefault()
                const data = new FormData(e.currentTarget)
                const name = String(data.get('name') || '').trim()
                const email = String(data.get('email') || '').trim()
                const message = String(data.get('message') || '').trim()
                const subject = encodeURIComponent(`Portfolio contact from ${name || 'website visitor'}`)
                const body = encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)
                window.location.href = `mailto:upadhyaysaurav598@gmail.com?subject=${subject}&body=${body}`
                setSent(true)
                formRef.current?.reset()
              }}
            >
              {sent && <div className="form-ok" role="status">Opening your email app to send the message to upadhyaysaurav598@gmail.com — just press Send there.</div>}
              <div className="field"><label htmlFor="n">Your name</label><input id="n" name="name" required placeholder="Your name" /></div>
              <div className="field"><label htmlFor="em">Email</label><input id="em" name="email" type="email" required placeholder="you@example.com" /></div>
              <div className="field"><label htmlFor="m">Message</label><textarea id="m" name="message" required placeholder="Say hello or share context — I respond when I can." /></div>
              <button className="btn btn-blue" type="submit" style={{ width: '100%', justifyContent: 'center' }}>Send message</button>
              <p className="mono" style={{ fontSize: 11.5, color: 'var(--faint)', textAlign: 'center', marginTop: 12 }}>Opens your email app addressed to me. No account or backend involved.</p>
            </form>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap foot">
          <p>© 2026 Saurav Upadhyay · Built with React · Oracle Banking Corporate Lending + AI agents.</p>
          <span className="mono">Pune / Gurugram, IN</span>
        </div>
      </footer>
    </>
  )
}
