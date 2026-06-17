/* =====================================================================
   Wyken ARSC — shared data + behaviour for all pages.
   Edit the DATA arrays to update the site (later: move to a Google Sheet
   or JSON file so volunteers can edit without code).
   ===================================================================== */

/* ---------- NAV (single source of truth for all pages) ---------- */
const NAV_MAIN = [
  {p:'home', label:'Home', href:'index.html'},
  {p:'about', label:'About', href:'about.html'},
  {p:'calendar', label:'Calendar', href:'calendar.html'},
  {p:'competitions', label:'Competitions', href:'competitions.html'},
  {p:'skaters', label:'Skaters', href:'skaters.html'},
  {p:'gallery', label:'Gallery', href:'gallery.html'},
  {p:'shop', label:'Club Shop', href:'shop.html'}
];
const NAV_MORE = [
  {p:'members', label:'Members', href:'members.html'},
  {p:'safeguarding', label:'Safeguarding', href:'safeguarding.html'},
  {p:'documents', label:'Documents', href:'documents.html'},
  {p:'contact', label:'Contact', href:'contact.html'}
];

/* ---------- DATA ---------- */
const TYPES = {
  training:{label:'Training', colour:'#ff1f6b'},
  competition:{label:'Competition', colour:'#d6004f'},
  grading:{label:'Grading', colour:'#ff7aa8'},
  display:{label:'Display', colour:'#f6c544'},
  social:{label:'Social', colour:'#15121a'}
};

const GBSA_CAL = 'http://gbskateartistic.co.uk/calendar/';
const EVENTS = [
  {date:'2026-06-20', type:'competition', title:'Dance Tots–Cadet British Championship', loc:'Breydon Arena, Gt Yarmouth', time:'20–21 Jun', note:'GBSA national diary', link:GBSA_CAL},
  {date:'2026-06-23', type:'training', title:'Club session', loc:'Wyken CC', time:'6:00–8:00pm', note:'Tuesday'},
  {date:'2026-06-27', type:'training', title:'Club session', loc:'Wyken CC', time:'1:00–4:00pm', note:'Saturday'},
  {date:'2026-07-04', type:'grading', title:'Summer GBSA gradings', loc:'Wyken CC', time:'10:00am–2:00pm', note:'Figures & Freestyle'},
  {date:'2026-07-11', type:'competition', title:'Figure & Free British Championships', loc:'Breydon Arena, Gt Yarmouth', time:'11–12 Jul', note:'GBSA national diary — our biggest event', link:GBSA_CAL},
  {date:'2026-07-18', type:'competition', title:'Dance Youth–Senior British Championship', loc:'Breydon Arena, Gt Yarmouth', time:'18–19 Jul', note:'GBSA national diary', link:GBSA_CAL},
  {date:'2026-07-19', type:'display', title:'Wyken Summer Showcase', loc:'Wyken CC', time:'2:00pm', note:'Family & friends welcome — free entry'},
  {date:'2026-07-24', type:'social', title:'End-of-term pizza & disco skate', loc:'Wyken CC', time:'6:30pm', note:'Bring a friend!'},
  {date:'2026-08-22', type:'competition', title:'Dance Summer Challenge', loc:'Smithills Sport Centre, Bolton', time:'All day', note:'GBSA national diary', link:GBSA_CAL},
  {date:'2026-09-19', type:'competition', title:'Figure & Free Autumn Nationals & Promotional Final', loc:'Breydon Arena, Gt Yarmouth', time:'19–20 Sep', note:'GBSA national diary', link:GBSA_CAL},
  {date:'2026-11-07', type:'competition', title:'Classics, Masters, Show Champs & Quartet Nationals', loc:'Breydon Arena, Gt Yarmouth', time:'7–8 Nov', note:'GBSA national diary', link:GBSA_CAL}
];

const RESULTS = [
  {date:'2026-05-18', skater:'Ella Thompson', gb:true, event:'British Open', disc:'Freestyle', cat:'Junior', place:1, score:'58.4'},
  {date:'2026-05-18', skater:'Ella Thompson', gb:true, event:'British Open', disc:'Figures', cat:'Junior', place:2, score:'42.1'},
  {date:'2026-05-04', skater:'Maya Patel', gb:true, event:'Midlands Regional', disc:'Dance', cat:'Senior', place:1, score:'61.0'},
  {date:'2026-04-27', skater:'Jack Reynolds', gb:false, event:'Midlands Regional', disc:'Freestyle', cat:'Cadet', place:3, score:'39.7'},
  {date:'2026-04-27', skater:'Sophie Lane', gb:false, event:'Midlands Regional', disc:'Figures', cat:'Cadet', place:2, score:'40.2'},
  {date:'2026-03-15', skater:'Ella Thompson', gb:true, event:'Spring National', disc:'Freestyle', cat:'Junior', place:1, score:'56.9'},
  {date:'2026-02-22', skater:'Maya Patel', gb:true, event:'Inter-Club Trophy', disc:'Dance', cat:'Senior', place:1, score:'59.8'},
  {date:'2025-11-30', skater:'Jack Reynolds', gb:false, event:'Autumn Open', disc:'Freestyle', cat:'Cadet', place:5, score:'34.1'},
  {date:'2025-10-12', skater:'Sophie Lane', gb:false, event:'Club Championships', disc:'Figures', cat:'Cadet', place:1, score:'38.0'},
  {date:'2025-09-21', skater:"Liam O'Connor", gb:false, event:'Beginners Open', disc:'Freestyle', cat:'Cadet', place:2, score:'31.5'}
];

// NOTE: all names below are FICTITIOUS placeholders for the demo. Swap for real skaters (with photo consent) when ready.
// To add a photo: set photo:'images/skaters/<name>.jpg' on a skater (falls back to initials if the file is missing).
const SKATERS = [
  {name:'Mia Carter', initials:'MC', role:'Senior Freestyle · Amfora Trophy 🇭🇷', badge:'INTERNATIONAL', disc:['Freestyle'], grade:'Test 8', medals:12, best:'57.2'},
  {name:'Grace Bennett', initials:'GB', role:'Senior Freestyle · Amfora Trophy 🇭🇷', badge:'INTERNATIONAL', disc:['Freestyle','Dance'], grade:'Test 8', medals:10, best:'55.8'},
  {name:'Ruby Shaw', initials:'RS', role:'Freestyle & Figures', disc:['Freestyle','Figures'], grade:'Test 5', medals:4, best:'—'},
  {name:'Ella Thompson', initials:'ET', role:'Junior Freestyle & Figures', gb:true, disc:['Freestyle','Figures'], grade:'Test 8', medals:14, best:'58.4'},
  {name:'Maya Patel', initials:'MP', role:'Senior Dance', gb:true, disc:['Dance'], grade:'Test 9', medals:11, best:'61.0'},
  {name:'Jack Reynolds', initials:'JR', role:'Cadet Freestyle', gb:false, disc:['Freestyle'], grade:'Test 4', medals:5, best:'39.7'},
  {name:'Coach Hannah', initials:'CH', role:'Head Coach', gb:false, disc:['Freestyle','Dance','Figures'], grade:'Coach', medals:'—', best:'—'}
];

const HONOURS = [
  {yr:'🇭🇷', title:'International debut — Amfora Trophy, Croatia', sub:'Mia & Grace both skated brilliantly · 2026'},
  {yr:'🥇', title:'British Champion — Junior Freestyle', sub:'Ella Thompson · National British Championships 2026'},
  {yr:'🇬🇧', title:'2 skaters selected for Team GB', sub:'Ella Thompson & Maya Patel · 2026 squad'},
  {yr:'🥇', title:'Senior Dance gold', sub:'Maya Patel · Midlands Regional 2026'},
  {yr:'🏆', title:'Best Small Club award', sub:'Midlands Region 2025'},
  {yr:'🥈', title:'Cadet Figures silver', sub:'Sophie Lane · Midlands Regional 2026'}
];

// Public order window — when open:true the public Shop page shows kit; otherwise kit is members-only.
const ORDER_WINDOW = {open:true, closes:'Fri 17 July 2026'};

// kind: 'comp' = competition kit (competing skaters) · 'practice' = general WARSC practice kit (everyone)
const SHOP = [
  {emoji:'👕', name:'Club training tee', price:14, kind:'practice', desc:'Breathable tee with club crest.', sizes:['Age 5-6','Age 7-8','Age 9-11','Age 12-13','S','M','L','XL']},
  {emoji:'🧥', name:'Club hoodie', price:28, kind:'practice', desc:'Embroidered crest + name on the back.', sizes:['Age 5-6','Age 7-8','Age 9-11','Age 12-13','S','M','L','XL']},
  {emoji:'🩳', name:'Practice shorts', price:16, kind:'practice', desc:'Stretch shorts in club colours.', sizes:['Age 5-6','Age 7-8','Age 9-11','Age 12-13','S','M','L']},
  {emoji:'🎒', name:'Skate bag', price:22, kind:'practice', desc:'Padded bag sized for quad skates.', sizes:['One size']},
  {emoji:'🧦', name:'Club socks (2pk)', price:8, kind:'practice', desc:'Long skating socks, club colours.', sizes:['Kids','Adult']},
  {emoji:'🧴', name:'Water bottle', price:6, kind:'practice', desc:'750ml club-branded bottle.', sizes:['One size']},
  {emoji:'🩱', name:'Competition leotard', price:45, kind:'comp', desc:'Club-colour competition leotard.', sizes:['Age 5-6','Age 7-8','Age 9-11','Age 12-13','XS','S','M']},
  {emoji:'🤸', name:'Competition skinsuit', price:58, kind:'comp', desc:'Black & pink full skinsuit for freestyle/dance.', sizes:['Age 7-8','Age 9-11','Age 12-13','XS','S','M']},
  {emoji:'🧥', name:'Team tracksuit jacket', price:38, kind:'comp', desc:'Full-zip team jacket, name embroidered.', sizes:['Age 7-8','Age 9-11','Age 12-13','S','M','L','XL']},
  {emoji:'👖', name:'Team tracksuit bottoms', price:30, kind:'comp', desc:'Matching team bottoms for poolside/comp.', sizes:['Age 7-8','Age 9-11','Age 12-13','S','M','L','XL']}
];

const GRADES = [
  {n:1, t:'Forward skating', d:'Marching, gliding & a safe controlled stop'},
  {n:2, t:'Forward & backward', d:'Backward skating and dual-foot glides'},
  {n:3, t:'Edges introduced', d:'Forward outside & inside edges'},
  {n:4, t:'One-foot control', d:'One-foot glides and basic swizzles'},
  {n:5, t:'Backward edges', d:'Backward outside & inside edges'},
  {n:6, t:'Turns', d:'Two-foot turns and three-turns introduced'},
  {n:7, t:'Cross-rolls', d:'Forward cross-rolls and crossovers'},
  {n:8, t:'Linked skills', d:'Combining edges, turns & footwork to music'},
  {n:9, t:'Grade test', d:'Tested by a judge → Grade Book & certificate'}
];

// DOCUMENTS — set url:'documents/xxx.pdf' (or external link) to publish; url:null = placeholder slot.
const DOCS = [
  {icon:'🛡️', title:'Safeguarding Policy', sub:'WARSC child protection & welfare policy', url:null},
  {icon:'⚖️', title:'Complaints & Grievance Procedure', sub:'How to raise and resolve a concern', url:null},
  {icon:'🏅', title:'Merit & Grading Scheme', sub:'Full skills for each grade & merit award', url:null},
  {icon:'🤝', title:'Code of Conduct', sub:'For skaters, parents & coaches', url:null},
  {icon:'📄', title:'Membership & Consent Form', sub:'Complete before the first session', url:null},
  {icon:'📷', title:'Photo & Media Consent', sub:'Opt in/out of photos being shared', url:null},
  {icon:'📋', title:'Kit List & What to Wear', sub:'Training and competition kit guide', url:null},
  {icon:'🔒', title:'Privacy & GDPR Notice', sub:'How the club handles your data', url:null},
  {icon:'🏆', title:'Competition Entry Guide', sub:'GBSA regulations ↗', url:'http://gbskateartistic.co.uk/regulations/'}
];

const GAL_CATS = {comp:'Competitions', podium:'Podiums', showcase:'Showcases', squad:'Squad', intl:'International'};
const GALLERY = [
  {cat:'intl', icon:'🇭🇷', caption:'Amfora Trophy, Croatia — our squad', grad:'linear-gradient(135deg,#ff1f6b,#120f16)', tall:true},
  {cat:'podium', icon:'🥇', caption:'British Champs podium', grad:'linear-gradient(135deg,#d6004f,#2a2533)'},
  {cat:'comp', icon:'🛼', caption:'Freestyle programme', grad:'linear-gradient(135deg,#ff5c93,#ff1f6b)'},
  {cat:'squad', icon:'🤝', caption:'Squad in club kit', grad:'linear-gradient(135deg,#2a2533,#ff1f6b)'},
  {cat:'showcase', icon:'✦', caption:'Summer Showcase', grad:'linear-gradient(135deg,#ff8fbf,#d6004f)'},
  {cat:'comp', icon:'♪', caption:'Dance — set pattern', grad:'linear-gradient(135deg,#120f16,#d6004f)', tall:true},
  {cat:'podium', icon:'🏅', caption:'Regional medallists', grad:'linear-gradient(135deg,#ff1f6b,#ff5c93)'},
  {cat:'comp', icon:'○', caption:'Figures — edge work', grad:'linear-gradient(135deg,#2a2533,#ff5c93)'},
  {cat:'squad', icon:'🎉', caption:'End-of-term social skate', grad:'linear-gradient(135deg,#ff1f6b,#2a2533)'},
  {cat:'intl', icon:'🌍', caption:'Travelling to compete abroad', grad:'linear-gradient(135deg,#d6004f,#ff8fbf)'},
  {cat:'showcase', icon:'⭐', caption:'Display night', grad:'linear-gradient(135deg,#ff5c93,#120f16)'},
  {cat:'comp', icon:'🛼', caption:'Warm-up on the floor', grad:'linear-gradient(135deg,#120f16,#ff1f6b)'}
];

/* ---------- HEADER / FOOTER / OVERLAYS (built on every page) ---------- */
function buildHeader(){
  const host=document.getElementById('site-header'); if(!host)return;
  const cur=document.body.dataset.page||'';
  const li=(it)=>`<li><a href="${it.href}" class="${cur===it.p?'active':''}">${it.label}</a></li>`;
  const moreActive=NAV_MORE.some(m=>m.p===cur)?'active':'';
  host.innerHTML=`
  <header class="nav">
    <div class="wrap">
      <a href="index.html" class="logo"><img src="images/warsc-logo.png" class="logo-img" alt="WARSC — Wyken Artistic Roller Skating Club" onerror="this.onerror=null;this.src='images/warsc-logo.svg'"></a>
      <nav id="nav">
        <ul>
          ${NAV_MAIN.map(li).join('')}
          <li class="has-drop">
            <a href="#" class="drop-toggle ${moreActive}" onclick="toggleDrop(event,this)">Club Info ▾</a>
            <div class="drop"><ul>${NAV_MORE.map(li).join('')}</ul></div>
          </li>
        </ul>
      </nav>
      <div class="nav-cta">
        <a href="join.html" class="btn btn-primary btn-sm">Book a taster</a>
        <button class="burger" onclick="toggleNav()" aria-label="Menu">☰</button>
      </div>
    </div>
  </header>`;
}
function buildFooter(){
  const host=document.getElementById('site-footer'); if(!host)return;
  host.innerHTML=`
  <footer>
    <div class="wrap">
      <div>
        <a href="index.html" class="logo"><img src="images/warsc-logo.png" class="logo-img" alt="WARSC — Wyken Artistic Roller Skating Club" onerror="this.onerror=null;this.src='images/warsc-logo.svg'"></a>
        <p style="margin-top:14px;font-size:.9rem;max-width:340px">A friendly, competitive artistic roller skating club in Coventry, West Midlands — affiliated to GB Skate Artistic.</p>
        <div class="social">
          <a href="https://www.instagram.com/wyken_arsc/" target="_blank" title="Instagram">📷</a>
          <a href="https://www.facebook.com/people/Wyken-Artistic-Roller-Skating-Club/100095233764524/" target="_blank" title="Facebook">👍</a>
          <a href="contact.html" title="Contact">📧</a>
        </div>
      </div>
      <div>
        <h4>Club</h4>
        <a href="about.html">About &amp; grading</a>
        <a href="gallery.html">Gallery</a>
        <a href="documents.html">Documents</a>
        <a href="join.html">Book a taster</a>
      </div>
      <div>
        <h4>Compete</h4>
        <a href="competitions.html">Competition diary</a>
        <a href="competitions.html">Results board</a>
        <a href="https://www.rollstart.net/" target="_blank">RollStats on RollStart ↗</a>
        <a href="http://gbskateartistic.co.uk/calendar/" target="_blank">GBSA national diary ↗</a>
      </div>
      <div>
        <h4>Official &amp; safeguarding</h4>
        <a href="safeguarding.html">Safeguarding</a>
        <a href="mailto:safeguarding@gbskateartistic.co.uk">Report a concern</a>
        <a href="http://gbskateartistic.co.uk/" target="_blank">GB Skate Artistic ↗</a>
        <a href="https://brsf.co.uk/" target="_blank">British Roller Sports Fed ↗</a>
      </div>
    </div>
    <div class="copy">© 2026 Wyken Artistic Roller Skating Club (WARSC) · Coventry · Demo site for review — sample content throughout.</div>
  </footer>`;
}
function buildOverlays(){
  if(document.getElementById('modal'))return;
  const d=document.createElement('div');
  d.innerHTML=`
    <button id="cart" onclick="openCart()">🛒 Order · <span id="cart-count">0</span></button>
    <div class="lightbox" id="lightbox">
      <button class="lb-close" onclick="closeLightbox()">×</button>
      <button class="lb-nav lb-prev" onclick="lbStep(-1)">‹</button>
      <div class="lb-img" id="lb-img"></div>
      <div class="lb-cap" id="lb-cap"></div>
      <button class="lb-nav lb-next" onclick="lbStep(1)">›</button>
    </div>
    <div class="modal" id="modal"><div class="modal-box"><button class="x" onclick="closeModal()">×</button><div id="modal-content"></div></div></div>`;
  document.body.appendChild(d);
  document.getElementById('modal').addEventListener('click',e=>{ if(e.target.id==='modal')closeModal(); });
  document.getElementById('lightbox').addEventListener('click',e=>{ if(e.target.id==='lightbox')closeLightbox(); });
  document.addEventListener('keydown',e=>{
    if(!document.getElementById('lightbox').classList.contains('open'))return;
    if(e.key==='Escape')closeLightbox();
    if(e.key==='ArrowRight')lbStep(1);
    if(e.key==='ArrowLeft')lbStep(-1);
  });
}

/* ---------- RENDERING (each guards on its container) ---------- */
const fmtDate = d => { const dt=new Date(d); return {day:dt.getDate(), mon:dt.toLocaleString('en-GB',{month:'short'})}; };
let activeFilter='all', cart=[];

function renderHeroEvents(){
  const el=document.getElementById('hero-events'); if(!el)return;
  const up=[...EVENTS].sort((a,b)=>new Date(a.date)-new Date(b.date)).slice(0,3);
  el.innerHTML=up.map(e=>{const f=fmtDate(e.date);
    return `<div class="next-event"><div class="ne-date"><b>${f.day}</b><span>${f.mon}</span></div>
      <div class="ne-info"><b>${e.title}</b><span>${e.loc} · ${e.time}</span></div></div>`;}).join('');
}
function renderFilters(){
  const el=document.getElementById('cal-filters'); if(!el)return;
  let html=`<div class="chip ${activeFilter==='all'?'active':''}" onclick="setFilter('all')">All events</div>`;
  for(const k in TYPES) html+=`<div class="chip ${activeFilter===k?'active':''}" onclick="setFilter('${k}')"><span class="dot" style="background:${TYPES[k].colour}"></span>${TYPES[k].label}</div>`;
  el.innerHTML=html;
}
function setFilter(f){ activeFilter=f; renderFilters(); renderEvents(); }
function renderEvents(){
  const list=document.getElementById('event-list'); if(!list)return;
  const evs=[...EVENTS].sort((a,b)=>new Date(a.date)-new Date(b.date)).filter(e=>activeFilter==='all'||e.type===activeFilter);
  if(!evs.length){ list.innerHTML='<p class="lead">No events of this type scheduled.</p>'; return; }
  list.innerHTML=evs.map((e,i)=>{const f=fmtDate(e.date), t=TYPES[e.type];
    return `<div class="event-row" style="border-left-color:${t.colour}">
      <div class="edate"><b>${f.day}</b><span>${f.mon}</span></div>
      <div><span class="etype" style="background:${t.colour}">${t.label}</span>
        <h4 style="margin-top:6px">${e.title}</h4>
        <div class="meta"><span>📍 ${e.loc}</span><span>🕐 ${e.time}</span>${e.note?`<span>· ${e.note}</span>`:''}${e.link?`<a href="${e.link}" target="_blank" style="color:var(--coral);font-weight:700">· GBSA details ↗</a>`:''}</div></div>
      <button class="btn btn-dark btn-sm" onclick="addToCalendar(${i})">+ Calendar</button></div>`;}).join('');
}
function addToCalendar(i){
  const evs=[...EVENTS].sort((a,b)=>new Date(a.date)-new Date(b.date)).filter(e=>activeFilter==='all'||e.type===activeFilter);
  const e=evs[i], d=e.date.replace(/-/g,'');
  const ics=`BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART;VALUE=DATE:${d}\nSUMMARY:${e.title} (Wyken ARSC)\nLOCATION:${e.loc}\nDESCRIPTION:${e.time} - ${e.note||''}\nEND:VEVENT\nEND:VCALENDAR`;
  const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([ics],{type:'text/calendar'})); a.download=e.title.replace(/\s+/g,'-')+'.ics'; a.click();
}
function renderHomeEvents(){
  const el=document.getElementById('home-events'); if(!el)return;
  const up=[...EVENTS].sort((a,b)=>new Date(a.date)-new Date(b.date)).slice(0,4);
  el.innerHTML=up.map(e=>{const f=fmtDate(e.date), t=TYPES[e.type];
    return `<div class="event-row" style="border-left-color:${t.colour}">
      <div class="edate"><b>${f.day}</b><span>${f.mon}</span></div>
      <div><span class="etype" style="background:${t.colour}">${t.label}</span>
        <h4 style="margin-top:6px">${e.title}</h4>
        <div class="meta"><span>📍 ${e.loc}</span><span>🕐 ${e.time}</span></div></div>
      <a class="btn btn-dark btn-sm" href="calendar.html">View all</a></div>`;}).join('');
}
function downloadIcs(e){
  const d=e.date.replace(/-/g,'');
  const ics=`BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART;VALUE=DATE:${d}\nSUMMARY:${e.title} (Wyken ARSC)\nLOCATION:${e.loc}\nDESCRIPTION:${e.time} - ${e.note||''}\nEND:VEVENT\nEND:VCALENDAR`;
  const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([ics],{type:'text/calendar'})); a.download=e.title.replace(/\s+/g,'-')+'.ics'; a.click();
}
// Planned events = everything except routine weekly sessions (training).
let plannedView=[];
function renderPlanned(){
  const el=document.getElementById('planned-list'); if(!el)return;
  plannedView=[...EVENTS].filter(e=>e.type!=='training').sort((a,b)=>new Date(a.date)-new Date(b.date));
  if(!plannedView.length){ el.innerHTML='<p class="lead">No planned events listed yet.</p>'; return; }
  el.innerHTML=plannedView.map((e,i)=>{const f=fmtDate(e.date), t=TYPES[e.type];
    return `<div class="event-row" style="border-left-color:${t.colour}">
      <div class="edate"><b>${f.day}</b><span>${f.mon}</span></div>
      <div><span class="etype" style="background:${t.colour}">${t.label}</span>
        <h4 style="margin-top:6px">${e.title}</h4>
        <div class="meta"><span>📍 ${e.loc}</span><span>🕐 ${e.time}</span>${e.note?`<span>· ${e.note}</span>`:''}${e.link?`<a href="${e.link}" target="_blank" style="color:var(--coral);font-weight:700">· GBSA details ↗</a>`:''}</div></div>
      <button class="btn btn-dark btn-sm" onclick="addPlannedCal(${i})">+ Calendar</button></div>`;}).join('');
}
function addPlannedCal(i){ downloadIcs(plannedView[i]); }
function renderUpcomingComps(){
  const el=document.getElementById('upcoming-comps'); if(!el)return;
  const comps=EVENTS.filter(e=>e.type==='competition').sort((a,b)=>new Date(a.date)-new Date(b.date));
  el.innerHTML=comps.map(e=>{const f=fmtDate(e.date);
    return `<div class="event-row" style="border-left-color:#ff1f6b">
      <div class="edate"><b>${f.day}</b><span>${f.mon}</span></div>
      <div><h4>${e.title}</h4><div class="meta"><span>📍 ${e.loc}</span><span>🕐 ${e.time}</span><span>· ${e.note}</span></div></div>
      <a class="btn btn-dark btn-sm" href="${e.link||GBSA_CAL}" target="_blank">Details ↗</a></div>`;}).join('');
}
function renderResults(){
  const body=document.getElementById('results-body'); if(!body)return;
  const q=(document.getElementById('res-search').value||'').toLowerCase();
  const disc=document.getElementById('res-disc').value, season=document.getElementById('res-season').value;
  const rows=RESULTS.filter(r=>(!q||r.skater.toLowerCase().includes(q)||r.event.toLowerCase().includes(q))&&(!disc||r.disc===disc)&&(!season||r.date.startsWith(season))).sort((a,b)=>new Date(b.date)-new Date(a.date));
  if(!rows.length){ body.innerHTML='<tr><td colspan="7" style="text-align:center;color:var(--muted)">No results match your filter.</td></tr>'; return; }
  body.innerHTML=rows.map(r=>{const mc=r.place<=3?`medal m-${r.place}`:'';
    const pl=r.place===1?'🥇 1st':r.place===2?'🥈 2nd':r.place===3?'🥉 3rd':r.place+'th';
    return `<tr><td>${new Date(r.date).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'2-digit'})}</td>
      <td>${r.skater}${r.gb?'<span class="pill-gb">GB</span>':''}</td><td>${r.event}</td><td>${r.disc}</td><td>${r.cat}</td>
      <td class="${mc}">${pl}</td><td>${r.score}</td></tr>`;}).join('');
}
function renderStats(){
  const el=document.getElementById('stats-grid'); if(!el)return;
  const names=[...new Set(RESULTS.map(r=>r.skater))];
  el.innerHTML=names.map(name=>{
    const rows=RESULTS.filter(r=>r.skater===name).sort((a,b)=>new Date(a.date)-new Date(b.date));
    const scores=rows.map(r=>parseFloat(r.score)).filter(n=>!isNaN(n));
    const best=Math.max(...scores), medals=rows.filter(r=>r.place<=3).length, gb=rows.some(r=>r.gb), max=Math.max(...scores);
    const bars=rows.map(r=>{const v=parseFloat(r.score), h=Math.round((v/max)*60)+6, d=new Date(r.date).toLocaleDateString('en-GB',{month:'short',year:'2-digit'});
      return `<div class="bar" style="height:${h}px" title="${r.event} · ${r.score}"><span>${r.score}</span><small>${d}</small></div>`;}).join('');
    return `<div class="statcard"><div class="sc-head"><h4>${name}${gb?'<span class="pill-gb">GB</span>':''}</h4></div>
      <div class="mini"><div><b>${rows.length}</b><span>Comps</span></div><div><b>${medals}</b><span>Podiums</span></div><div><b>${best.toFixed(1)}</b><span>Best score</span></div></div>
      <div class="spark-wrap"><div class="spark">${bars}</div></div></div>`;}).join('');
}
function renderHonours(){
  const el=document.getElementById('honours-list'); if(!el)return;
  el.innerHTML=HONOURS.map(h=>`<div class="honour"><span class="yr">${h.yr}</span><div><b>${h.title}</b><span>${h.sub}</span></div></div>`).join('');
}
function renderSkaters(){
  const el=document.getElementById('skater-grid'); if(!el)return;
  el.innerHTML=SKATERS.map(s=>`<div class="skater">
    <div class="top ${s.gb?'gb':''}"><div class="avatar">${s.photo?`<img src="${s.photo}" alt="${s.name}" onerror="this.replaceWith(document.createTextNode('${s.initials}'))">`:s.initials}</div></div>
    <div class="body"><h3>${s.name}${s.gb?'<span class="pill-gb">TEAM GB</span>':''}${s.badge?`<span class="pill-intl">${s.badge}</span>`:''}</h3>
      <div class="role">${s.role}</div>
      <div class="disc-tags">${s.disc.map(d=>`<span>${d}</span>`).join('')}</div>
      <div class="pbs"><div><b>${s.grade}</b><span>Grade</span></div><div><b>${s.medals}</b><span>Medals</span></div><div><b>${s.best}</b><span>Best score</span></div></div>
    </div></div>`).join('');
}
function productCard(p,i){
  return `<div class="product"><div class="pic">${p.emoji}</div>
    <div class="pbody"><h4>${p.name}</h4><div class="price">£${p.price.toFixed(2)}</div><p>${p.desc}</p>
      <select id="sz-${i}">${p.sizes.map(s=>`<option>${s}</option>`).join('')}</select>
      <button class="add" onclick="addToCart(${i})">Add to order</button></div></div>`;
}
function renderShopInto(id, kind){
  const el=document.getElementById(id); if(!el)return;
  el.innerHTML=SHOP.map((p,i)=>({p,i})).filter(x=>!kind||x.p.kind===kind).map(x=>productCard(x.p,x.i)).join('');
}
// Public Shop page — GENERAL / PRACTICE kit only (squad & competition kit is members-only).
// Shown while an order window is open, otherwise a closed notice.
function renderShopPage(){
  const el=document.getElementById('shop-grid'); if(!el)return;
  const banner=document.getElementById('shop-banner');
  if(ORDER_WINDOW.open){
    if(banner) banner.style.display='';
    renderShopInto('shop-grid','practice');
  } else {
    if(banner) banner.style.display='none';
    el.innerHTML=`<div class="card" style="grid-column:1/-1;text-align:center;padding:36px">
      <div class="ico" style="margin:0 auto 14px">🔒</div>
      <h3>The general kit order window is closed</h3>
      <p style="max-width:520px;margin:6px auto 0">We open public order windows for general &amp; practice kit each term — check back soon. Competing skaters can order squad &amp; competition kit any time in the <a href="members.html" style="color:var(--coral);font-weight:700">Members area</a>.</p></div>`;
  }
}
// Members area — page is protected server-side by Vercel middleware (see middleware.js).
// Here we just render the kit; access control happens before the page is served.
function renderMembers(){
  if(!document.getElementById('members-comp-grid')) return;
  renderShopInto('members-comp-grid','comp');
}
async function memberLogout(e){
  if(e) e.preventDefault();
  try{ await fetch('/api/logout',{method:'POST'}); }catch(_){}
  window.location.href='index.html';
}
function addToCart(i){
  const p=SHOP[i], size=document.getElementById('sz-'+i).value;
  cart.push({name:p.name,size,price:p.price});
  document.getElementById('cart-count').textContent=cart.length;
  document.getElementById('cart').style.display='block';
}
function val(id){ const e=document.getElementById(id); return e?e.value.trim():''; }
function openCart(){
  if(!cart.length){ showModal('<h3>Your kit order</h3><p>Your basket is empty.</p><button class="btn btn-primary" style="margin-top:12px" onclick="closeModal()">Close</button>'); return; }
  const total=cart.reduce((s,c)=>s+c.price,0);
  const items=cart.map((c,i)=>`<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--line)"><span>${c.name} <small style="color:var(--muted)">(${c.size})</small></span><span>£${c.price.toFixed(2)} <button onclick="removeCart(${i})" style="border:0;background:none;color:var(--coral);cursor:pointer">✕</button></span></div>`).join('');
  showModal(`<h3>Your kit order</h3>${items}
    <div style="display:flex;justify-content:space-between;font-weight:800;margin:12px 0;font-size:1.1rem"><span>Total</span><span>£${total.toFixed(2)}</span></div>
    <div class="field"><label>Your name</label><input id="ord-name" placeholder="Parent / member name"></div>
    <div class="row2"><div class="field"><label>Email</label><input id="ord-email" type="email" placeholder="you@email.com"></div><div class="field"><label>Phone</label><input id="ord-phone" type="tel" placeholder="07…"></div></div>
    <div class="field"><label>Skater name(s) for embroidery &amp; any notes</label><textarea id="ord-notes" rows="2" placeholder="e.g. embroider 'Ruby' on the hoodie"></textarea></div>
    <button class="btn btn-primary" style="width:100%;justify-content:center" onclick="submitOrder()">Send order to club →</button>
    <p class="note">We'll confirm by email. Payment is arranged with the club (bank transfer or at the club).</p>`);
}
function submitOrder(){
  const name=val('ord-name'), email=val('ord-email');
  if(!name||!email){ alert('Please add your name and email so we can confirm your order.'); return; }
  const payload={items:cart, contact:{name,email,phone:val('ord-phone')}, notes:val('ord-notes'), total:cart.reduce((s,c)=>s+c.price,0)};
  fetch('/api/order',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)})
    .then(r=>r.json()).then(()=>{
      cart=[]; document.getElementById('cart-count').textContent='0'; document.getElementById('cart').style.display='none';
      showModal('<h3>Thanks! 🛼</h3><p>Your kit order has been sent to the club — we\'ll confirm by email.</p><button class="btn btn-primary" style="margin-top:12px" onclick="closeModal()">Close</button>');
    })
    .catch(()=>{ alert('Sorry, something went wrong sending your order. Please try again or contact the club.'); });
}
function removeCart(i){ cart.splice(i,1); document.getElementById('cart-count').textContent=cart.length; if(!cart.length){document.getElementById('cart').style.display='none'; closeModal(); return;} openCart(); }
function renderGrades(){
  const el=document.getElementById('grade-grid'); if(!el)return;
  el.innerHTML=GRADES.map(g=>`<div class="grade"><div class="gnum">${g.n}</div><div><b>Grade ${g.n} — ${g.t}</b><span>${g.d}</span></div></div>`).join('');
}
function renderDocs(){
  const el=document.getElementById('docs-grid'); if(!el)return;
  el.innerHTML=DOCS.map(d=>d.url
    ? `<a class="doc-card" href="${d.url}" target="_blank"><span class="dc-ico">${d.icon}</span><div class="dc-body"><b>${d.title}</b><span>${d.sub}</span></div><span class="dc-tag ready">Open</span></a>`
    : `<a class="doc-card placeholder" href="#" onclick="demoDoc(event)"><span class="dc-ico">${d.icon}</span><div class="dc-body"><b>${d.title}</b><span>${d.sub}</span></div><span class="dc-tag">To be added</span></a>`
  ).join('');
}

/* ---------- GALLERY + LIGHTBOX ---------- */
let galFilter='all', galView=[], lbIndex=0;
function renderGalFilters(){
  const el=document.getElementById('gal-filters'); if(!el)return;
  let html=`<div class="chip ${galFilter==='all'?'active':''}" onclick="setGalFilter('all')">All photos</div>`;
  for(const k in GAL_CATS) html+=`<div class="chip ${galFilter===k?'active':''}" onclick="setGalFilter('${k}')">${GAL_CATS[k]}</div>`;
  el.innerHTML=html;
}
function setGalFilter(f){ galFilter=f; renderGalFilters(); renderGallery(); }
function renderGallery(){
  const el=document.getElementById('gallery-grid'); if(!el)return;
  galView=GALLERY.filter(g=>galFilter==='all'||g.cat===galFilter);
  el.innerHTML=galView.map((g,i)=>`<button class="gtile ${g.tall?'tall':''}" style="background:${g.grad}" onclick="openLightbox(${i})">
    <span class="tagk">${GAL_CATS[g.cat]}</span><span class="ph">${g.icon}</span><span class="cap">${g.caption}</span></button>`).join('');
}
function openLightbox(i){
  lbIndex=i; const g=galView[i];
  document.getElementById('lb-img').style.background=g.grad;
  document.getElementById('lb-img').textContent=g.icon;
  document.getElementById('lb-cap').textContent=g.caption+'  ·  '+GAL_CATS[g.cat];
  document.getElementById('lightbox').classList.add('open');
}
function closeLightbox(){ document.getElementById('lightbox').classList.remove('open'); }
function lbStep(d){ lbIndex=(lbIndex+d+galView.length)%galView.length; openLightbox(lbIndex); }

/* ---------- TABS / NAV / MODAL ---------- */
function switchTab(id,el){
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.tabpane').forEach(t=>t.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('tab-'+id).classList.add('active');
}
function toggleNav(){ document.getElementById('nav').classList.toggle('open'); }
function toggleDrop(e,el){ e.preventDefault(); el.parentElement.classList.toggle('open'); }
function showModal(html){ document.getElementById('modal-content').innerHTML=html; document.getElementById('modal').classList.add('open'); }
function closeModal(){ document.getElementById('modal').classList.remove('open'); }
function submitForm(e,what){ e.preventDefault(); showModal(`<h3>Thanks! 🛼</h3><p>Your ${what.toLowerCase()} has been received (demo). We'll be in touch soon.</p><button class="btn btn-primary" style="margin-top:14px" onclick="closeModal()">Close</button>`); return false; }
function demoDoc(e){ e.preventDefault(); showModal(`<h3>Document</h3><p>This is where the real PDF would open/download. Upload the club's document and link it here.</p><button class="btn btn-primary" style="margin-top:14px" onclick="closeModal()">Close</button>`); }

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', ()=>{
  if(!document.querySelector('link[rel="icon"]')){ const l=document.createElement('link'); l.rel='icon'; l.href='images/warsc-logo.svg'; document.head.appendChild(l); }
  buildHeader(); buildFooter(); buildOverlays();
  renderHeroEvents(); renderHomeEvents(); renderFilters(); renderEvents(); renderUpcomingComps();
  renderResults(); renderStats(); renderHonours(); renderSkaters();
  renderShopPage(); renderPlanned();
  renderGalFilters(); renderGallery(); renderGrades(); renderDocs();
  renderMembers();
});
