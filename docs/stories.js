/* Quarto's dashboard sidebar code (index_files/libs/quarto-dashboard/components.js, from bslib) ends a sidebar transition
   with $(sidebar).trigger(...), written for Shiny, where jQuery is loaded. This page has no jQuery, so on a narrow screen,
   where the sidebar folds, it threw "$ is not defined" (Nov. 26). Those calls only tell Shiny's inputs, which this page
   does not have; a stand-in that does nothing keeps the library file as Quarto made it. */
if (typeof window.$ === "undefined") window.$ = () => ({trigger() { return this }});
// renamed agencies: current name first, former name in brackets (as in the dashboard's own code)
function fdAgency(a) { return a === "Department of Defense" || a === "Department of War" ? "Department of War (Department of Defense)" : a }
/* ---------- User guide. It sits in the header card, outside the part the dashboard redraws, and shows when the card is
   expanded; the overview's header has the line that opens it. ---------- */
(function () {
  const GUIDE = `<div class="fd-guide" role="region" aria-label="How to use this dashboard">
    <h2>How to use this dashboard</h2>
    <div class="fd-cols">
      <section><h3>What this is</h3>
        <p>Every federal agency files an annual FOIA report. This dashboard puts the reports for <span class="fd-yrs">FY2008–FY2025</span> side by side, for agencies
        and for their components: offices inside an agency, such as ICE inside DHS.</p>
        <p>Data: foia.gov annual reports<span class="fd-when" data-pre=", last updated "></span>. A report an agency files after that day is not in the dashboard yet.</p>
        <h3>Two ways in</h3>
        <ol><li><b>Overview</b>, the start page: eight headline numbers, for all agencies or for the agency or component you pick, and beside them "What the reports show", five short findings about all agencies over all the years. Click a finding to open it with a chart made for it; while it is open, the agency and year choices are hidden, since the findings do not follow them. Each card's small chart marks the first and the last year chosen: the first value at the left, the change since then at the right (“×2.6” for a count, points for a share). The “i” says in a sentence what the number is; hover over the card for what stands out in the years chosen; click it for a larger chart. Four cards are shaded to stand out: backlogged requests, requests processed within 20 working days, full grants and exemptions applied. What a card says is worked out from the data each time, so it follows your choices and the next refresh. The agency, component and years can still be changed while a card is open.</li>
          <li><b>Questions 1–6</b>, on the left: Requests received &amp; processed · Response time · Backlog, staff &amp; cost · Outcomes &amp; exemptions · Appeals · Backlog vs intake. Each page has up to three numbers, each with how it is worked out, a chart over time and a chart by agency (and on Question 4, the exemptions used); under them, “Built from” opens the report tables and columns used.</li></ol>
        <p>In a chart by agency, click a row to open that agency or component; click the gold row (the one open) to go back up a level; double-click a component's row to go back to all agencies.</p>
        <p>A measure has the same colour on every page: requests received blue, requests processed red, the backlog purple, FOIA staff navy, total cost green; gold marks the agency or component open in a chart by agency. How requests and appeals ended, and the request tracks, have colours of their own, given above their charts.</p>
        <p class="fd-small">The dashboard’s name in the top bar goes back to the overview; so does clicking a selected question again. “Reset” (top right) puts every choice back to how the dashboard opens: all agencies, all years, nothing compared, and all reporting agencies added up. It stays on the page you are on.</p></section>
      <section><h3>Choosing what you see</h3>
        <dl><dt>Agency (under the title, with Component and Compare with)</dt><dd>“All agencies (government total)”, or one agency. “Hide choices” folds this row to one line that says what is chosen; clicking the question's number (“Question 1”, or “Overview”) does the same for the title and the years. Both give the charts more room.</dd>
          <dt>Component</dt><dd>An office inside the agency you picked.</dd>
          <dt>Fiscal years (top right)</dt><dd>Pick All years, Last 10, Last 5 or the latest year; or drag the two handles on the year slider (the charts follow when you let go). Clicking a year moves the nearer handle there; double-clicking a year shows that year only. The numbers in the cards and the charts by agency are for the last year chosen.</dd>
          <dt>Compare with (up to 5)</dt><dd>Adds agencies or components to compare: the cards get a row for each, and the chart over time shows one at a time, picked under “Showing” (on Question 6, backlog ÷ requests received has a line for each); × removes one. Agencies can be compared with each other; a component only within its own agency, with the agency’s total or its other components, because components differ too much in size and make-up from one agency to the next. To compare with all agencies, choose “All agencies (government total)” as the Agency. Choices that do not fit are greyed out. With a component chosen above, the first list is set to its agency; with an agency chosen, it starts on that agency, to add its components. The charts by agency mark the ones compared, and “Ranked within”, above them, switches to the agency of one compared, to see its components.</dd>
          <dt>Agencies added up in the total</dt><dd>All reporting agencies (<span class="fd-range">71–122</span> a year), or only the <span class="fd-cohort">70 that reported all 18 years</span>, so a total does not grow just because more agencies report.</dd></dl>
</section>
      <section><h3>Words to know</h3>
        <dl><dt>Processed</dt><dd>Requests an agency closed during the fiscal year.</dd>
          <dt>Full grant, partial grant / partial denial, full denial based on exemptions</dt><dd>How a processed request ended after its records were reviewed (the names the reports use). Many end in other ways: no records found, withdrawn, referred and more.</dd>
          <dt>Exemptions</dt><dd>The nine reasons in the law (5 U.S.C. § 552(b)) that let an agency withhold records.</dd>
          <dt>Backlog</dt><dd>Requests still pending at the end of the year beyond the legal time limit: 20 working days from a complete request, plus 10 in unusual circumstances.</dd>
          <dt>Response time</dt><dd>Working days (as the reports count them) from receiving a complete request to closing it. An agency reports a median, and separately how many requests it closed in each range of days. The two do not always agree (National Archives, complex requests, FY2025: a median of 1,384 days, while 1,273 of its 1,551 were closed within 20), and the reports do not say why; Question 2 shows both as reported.</dd>
          <dt>Appeal</dt><dd>The requester asks the agency to review its decision.</dd></dl></section>
    </div>
    <section class="fd-rules"><h3>Rules used everywhere</h3><div class="fd-rules-body"></div></section>
    <p class="fd-keep"><b>Keep in mind.</b> Agencies fill in these reports themselves, and categories can change from year to year. foia.gov has no FY2008
      figures for 26 agencies; they appear in FY2009–10. The reports show what changed, not why.</p>
  </div>`;
  function openGuide(card) { const b = card && card.querySelector(".bslib-full-screen-enter"); if (b) b.click() }
  window.fdOpenGuide = () => { const g = document.querySelector(".fd-guide"); openGuide(g && g.closest(".card")) }   // the sidebar's link
  function fix(qh) {
    qh.dataset.guide = "1";
    const card = qh.closest(".card"); if (!card) return;
    card.classList.add("fd-card");
    if (!card.querySelector(".fd-guide")) (qh.closest(".card-body") || card).insertAdjacentHTML("beforeend", GUIDE);
    const qn = qh.querySelector(".qnum"), name = qn ? qn.textContent.trim() : "";
    if (/^(Question [1-6]|Overview)$/.test(name)) {   // drop "who · years" under the title (the agency row and the years show both; the overview's "headline numbers" too); keep coverage and one-year warnings
      const sel = qh.querySelector(".sel");
      if (sel) { [...sel.childNodes].forEach(n => { if (!(n.nodeType === 1 && n.classList.contains("warn"))) n.remove() });
        const w = sel.querySelector(".warn"); if (w) w.textContent = w.textContent.replace(/^[\s\u00a0]*·\s*/, "");
        if (!sel.textContent.trim()) sel.remove() }
    }
  }
  function rules() {
    const src = document.querySelector(".how-rules ul"), dst = document.querySelector(".fd-rules-body");
    if (src && dst && dst.textContent !== src.textContent) dst.replaceChildren(src.cloneNode(true));
  }
  const scan = () => { document.querySelectorAll(".qhead:not([data-guide])").forEach(fix); rules() };
  new MutationObserver(scan).observe(document.documentElement, {childList: true, subtree: true});
  document.addEventListener("DOMContentLoaded", scan);
})();

/* ---------- Fiscal-year buttons in place of the two year dropdowns, and agency and component lists that start with the
   largest ones. The buttons set the hidden dropdowns and the lists are only regrouped, so the dashboard's own inputs stay
   in charge. ---------- */
(function () {
  const DATA = (window.__foiaJson = window.__foiaJson || fetch("data/foia.json").then(r => r.ok ? r.json() : Promise.reject(r.status))
    .then(D => { D.ids.Agency = D.ids.Agency.map(fdAgency); return D }));
  const ev = el => el.dispatchEvent(new Event("change", {bubbles: true}));

  // ---- fiscal years: presets and a slider with two handles, one for the first year and one for the last. The handles may pass
  // each other (the lower one is the first year); both on one year = that year only. The charts follow when a handle is let go.
  // Clicking a year moves the nearer handle there; double-clicking a year shows that year only.
  const yearBox = () => document.querySelector(".years");
  const yearSel = () => { const w = yearBox(); return w ? [...w.querySelectorAll("select")] : [] };
  function buildYears(card) {
    const [a] = yearSel(); if (!a || card.querySelector(".fd-tl")) return;
    const ys = [...a.options].map(o => +o.value), first = ys[0], last = ys[ys.length - 1];   // the years in the data
    const presets = [["All years", first, last], ["Last 10", Math.max(first, last - 9), last], ["Last 5", Math.max(first, last - 4), last], [`FY${last}`, last, last]];
    const pos = y => last === first ? 0 : (y - first) / (last - first) * 100;   // per cent along the track
    const box = document.createElement("div"); box.className = "tl fd-tl";
    box.innerHTML = `<div class="tl-top">${presets.map(([l, x, y]) => `<button type="button" class="tl-p" data-a="${x}" data-b="${y}">${l}</button>`).join("")}<span class="tl-label" aria-live="polite"></span></div>
      <div class="tl-slider">
        <div class="tl-track"><div class="tl-rail"><div class="tl-fill"></div></div>
          <input type="range" class="tl-h" min="${first}" max="${last}" step="1" aria-label="First fiscal year">
          <input type="range" class="tl-h" min="${first}" max="${last}" step="1" aria-label="Last fiscal year"></div>
        <div class="tl-ticks">${ys.map(y => `<button type="button" class="tl-t" data-y="${y}" title="FY${y}" style="left:${pos(y)}%">${String(y).slice(2)}</button>`).join("")}</div>
      </div>`;
    const hs = [...box.querySelectorAll(".tl-h")], fill = box.querySelector(".tl-fill");
    const cur = () => { const [x, y] = yearSel().map(s => +s.value); return [Math.min(x, y), Math.max(x, y)] };
    const shown = () => { const [x, y] = hs.map(h => +h.value); return [Math.min(x, y), Math.max(x, y)] };   // where the handles are now
    const paint = (lo, hi) => {   // the track, the year labels and the presets for a range, while dragging too
      fill.style.left = `${pos(lo)}%`; fill.style.width = `${pos(hi) - pos(lo)}%`;
      box.querySelectorAll(".tl-t").forEach(t => { const y = +t.dataset.y; t.classList.toggle("on", y >= lo && y <= hi); t.classList.toggle("end", y === lo || y === hi) });
      box.querySelectorAll(".tl-p").forEach(p => p.classList.toggle("on", +p.dataset.a === lo && +p.dataset.b === hi));
      box.querySelector(".tl-label").textContent = lo === hi ? `FY${lo}` : `FY${lo}–FY${hi}` };
    const draw = () => { const [lo, hi] = cur(); hs[0].value = String(lo); hs[1].value = String(hi); paint(lo, hi) };
    const set = (x, y) => { const [sa, sb] = yearSel(); sa.value = String(Math.min(x, y)); sb.value = String(Math.max(x, y)); ev(sb); draw() };   // the dashboard reads both
    box.querySelectorAll(".tl-p").forEach(p => p.onclick = () => set(+p.dataset.a, +p.dataset.b));
    hs.forEach(h => { h.addEventListener("input", () => paint(...shown()));   // moving: only the slider changes
      h.addEventListener("change", () => { const [lo, hi] = shown(), [clo, chi] = cur(); if (lo !== clo || hi !== chi) set(lo, hi); else draw() }) });   // let go (or a key): the charts follow
    let clickTimer = null;
    box.querySelectorAll(".tl-t").forEach(t => {
      t.onclick = () => { const y = +t.dataset.y; clearTimeout(clickTimer);
        clickTimer = setTimeout(() => { const [lo, hi] = cur();   // the nearer handle moves; outside the range, the end on that side
          if (y < lo) set(y, hi); else if (y > hi) set(lo, y); else if (y - lo <= hi - y) set(y, hi); else set(lo, y) }, 220) };
      t.ondblclick = () => { clearTimeout(clickTimer); set(+t.dataset.y, +t.dataset.y) } });
    yearSel().forEach(s => s.addEventListener("change", draw));
    card.classList.add("fd-has-tl"); (card.querySelector(".card-body") || card).appendChild(box);
    yearBox().classList.add("fd-hidden");   // the two dropdowns stay in the page, hidden
    draw();
  }

  // ---- lists: the 10 agencies with the most requests in the latest year, and an agency's 5 largest components in the last
  // year chosen (only when it has more than 6), A-Z inside each group. A shorter list, not a ranking.
  function regroup(sel, groups) {
    const keep = sel.value, frag = document.createDocumentFragment();
    for (const [label, opts] of groups) { if (!opts.length) continue;
      if (label == null) { opts.forEach(o => frag.appendChild(o)); continue }
      const g = document.createElement("optgroup"); g.label = label; opts.forEach(o => g.appendChild(o)); frag.appendChild(g) }
    sel.replaceChildren(frag); sel.value = keep; sel.dataset.grouped = "1";
  }
  const formSel = lab => { const l = [...document.querySelectorAll("label")].find(x => x.textContent.trim() === lab); const f = l && l.closest("form"); return f && f.querySelector("select") };
  let TOP = null;
  DATA.then(D => {
    const ids = D.ids, R = D.values["01_Requests__ProcessingStatisticsReceivedQuantity"]; if (!R) return;
    const last = Math.max(...ids.FY), rows = [];
    ids.FY.forEach((y, i) => { if (y === last && ids.level[i] === "agency") rows.push([R[i] || 0, ids.Agency[i]]) });
    rows.sort((a, b) => b[0] - a[0]);
    TOP = {label: `Largest 10 (most requests in FY${last})`, names: new Set(rows.slice(0, 10).map(r => r[1]))};
    scan();
  }).catch(err => console.error("largest agencies:", err));
  function groupAgencies(sel, emptyFirst) {
    if (!TOP || sel.dataset.grouped) return;
    const opts = [...sel.options], head = opts.filter((o, i) => emptyFirst ? o.value === "" : i === 0), rest = opts.filter(o => !head.includes(o));
    regroup(sel, [[null, head], [TOP.label, rest.filter(o => TOP.names.has(o.textContent.trim()))], ["All other agencies", rest.filter(o => !TOP.names.has(o.textContent.trim()))]]);
  }
  function groupComponents(sel) {
    if (sel.disabled || sel.dataset.grouped) return;
    const agSel = formSel("Agency"), agency = agSel && agSel.selectedOptions[0] && agSel.selectedOptions[0].textContent.trim();
    const hi = Math.max(...yearSel().map(s => +s.value)), opts = [...sel.options], head = [opts[0]], rest = opts.slice(1);
    if (!agency || rest.length <= 6) { sel.dataset.grouped = "1"; return }
    DATA.then(D => {
      if (!sel.isConnected || sel.dataset.grouped) return;
      const ids = D.ids, R = D.values["01_Requests__ProcessingStatisticsReceivedQuantity"], recv = new Map();
      ids.FY.forEach((y, i) => { if (y === hi && ids.level[i] === "component" && ids.Agency[i] === agency) recv.set(`${ids.Name[i]} (${ids.Component[i]})`, R[i] || 0) });
      const big = rest.slice().sort((a, b) => (recv.get(b.textContent.trim()) || 0) - (recv.get(a.textContent.trim()) || 0)).slice(0, 5).filter(o => (recv.get(o.textContent.trim()) || 0) > 0);
      if (!big.length) { sel.dataset.grouped = "1"; return }
      regroup(sel, [[null, head], [`Largest 5 (FY${hi})`, rest.filter(o => big.includes(o))], ["All other components", rest.filter(o => !big.includes(o))]]);
    });
  }
  // the same grouping for the component list under "Compare with". That list is rebuilt by the dashboard each time its agency
  // changes (values are entity keys "C|agency|key"); the year can change later, so it is regrouped when the last year changes.
  function groupCmpComponents(sel) {
    const ag = document.querySelector("select.cmp-agency"), agency = ag && ag.value;
    if (!agency || sel.disabled) return;
    const hi = Math.max(...yearSel().map(s => +s.value)), sig = `${agency}|${hi}`, grouped = !!sel.querySelector("optgroup");
    if (grouped && sel.dataset.fdSig === sig) return;                        // grouped for this agency and year
    if (!grouped && (sel.dataset.fdFlat === sig || sel.dataset.fdWait === sig)) return;   // nothing to group, or on its way
    const opts = [...sel.options], head = [opts[0]], rest = opts.slice(1).sort((x, y) => x.textContent.localeCompare(y.textContent));
    const flat = () => { sel.dataset.fdFlat = sig; if (grouped) regroup(sel, [[null, head], [null, rest]]) };
    if (rest.length <= 6) return flat();
    sel.dataset.fdWait = sig;
    DATA.then(D => {
      delete sel.dataset.fdWait;
      if (!sel.isConnected || ag.value !== agency || !opts.every(o => sel.contains(o))) return;   // list rebuilt meanwhile: the next scan does it
      const ids = D.ids, R = D.values["01_Requests__ProcessingStatisticsReceivedQuantity"], recv = new Map();
      ids.FY.forEach((y, i) => { if (y === hi && ids.level[i] === "component" && ids.Agency[i] === agency) recv.set(`C|${agency}|${ids.Key[i]}`, R[i] || 0) });
      const big = rest.slice().sort((x, y) => (recv.get(y.value) || 0) - (recv.get(x.value) || 0)).slice(0, 5).filter(o => (recv.get(o.value) || 0) > 0);
      if (!big.length) return flat();
      delete sel.dataset.fdFlat; sel.dataset.fdSig = sig;
      regroup(sel, [[null, head], [`Largest 5 (FY${hi})`, rest.filter(o => big.includes(o))], ["All other components", rest.filter(o => !big.includes(o))]]);
    });
  }
  function fixNote() {   // the sidebar note names the hidden "To FY" dropdown: say "the last year chosen"
    document.querySelectorAll(".sidebar p, .sidebar .side-note, p").forEach(el => {
      if (el.dataset.fdNote || !el.textContent.includes('"To FY" year')) return;
      const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); let n;
      while ((n = w.nextNode())) if (n.nodeValue.includes('"To FY" year')) n.nodeValue = n.nodeValue.replace('the "To FY" year', "the last year chosen");
      el.dataset.fdNote = "1" });
  }
  function scan() {
    fixNote();
    const qh = document.querySelector(".qhead"), card = qh && qh.closest(".card");
    if (card) buildYears(card);
    const a = formSel("Agency"); if (a) groupAgencies(a, false);
    const c = document.querySelector("select.cmp-agency"); if (c) groupAgencies(c, true);
    const k = formSel("Component"); if (k) groupComponents(k);
    const cc = document.querySelector("select.cmp-comp"); if (cc) groupCmpComponents(cc);
  }
  new MutationObserver(scan).observe(document.documentElement, {childList: true, subtree: true});
  document.addEventListener("DOMContentLoaded", scan);
})();

/* ---------- The agency row in the header card: Agency, Component, Compare with and "Agencies added up in the total" are moved
   out of the sidebar into a row under the title and the years. The cell boxes the dashboard draws them into are moved whole,
   so the dashboard keeps redrawing them in place and every input works as before; the sidebar keeps the questions. ---------- */
(function () {
  const IDS = ["ojs-cell-17", "ojs-cell-18", "ojs-cell-21", "ojs-cell-22"];   // Agency, Component, Compare with, Agencies added up in the total
  function show(bar, tog, hide) { bar.classList.toggle("fd-achide", hide); const t = hide ? "Show choices ▾" : "Hide choices ▴"; if (tog.textContent !== t) tog.textContent = t; tog.setAttribute("aria-expanded", String(!hide)) }
  // the question's title and the years fold apart from the agency row: a click on "Question 1" (or "Overview") folds them, and
  // the line then reads "Question 1 · its name · the years"; another click opens them
  function fold(card, hide) { card.classList.toggle("fd-hdfold", hide); card.querySelectorAll(".qhead > .qnum").forEach(q => q.setAttribute("aria-expanded", String(!hide))) }
  function place() {
    const card = document.querySelector(".card.fd-card.fd-has-tl"), body = card && card.querySelector(":scope > .card-body");
    const cells = IDS.map(id => document.getElementById(id));
    if (!body || cells.some(c => !c)) return;
    let bar = body.querySelector(":scope > .fd-acbar");
    if (!bar) { bar = document.createElement("div"); bar.className = "fd-acbar"; bar.setAttribute("role", "group");
      bar.setAttribute("aria-label", "Agency, component and comparison"); body.appendChild(bar) }
    for (const c of cells) if (c.parentElement !== bar) bar.appendChild(c);
    const qh = card.querySelector(".qhead"), qn = qh && qh.querySelector(":scope > .qnum");
    if (qn && !qh.dataset.fdHd) {   // the header is drawn anew when the question changes: set it up again
      const tt = document.createElement("span"); tt.className = "fd-qtitle";   // the title after "Question 1" is loose text: in a span, it can be hidden
      [...qh.childNodes].filter(n => n !== qn && !(n.nodeType === 1 && n.classList.contains("sel"))).forEach(n => tt.appendChild(n));
      const hdSum = document.createElement("span"); hdSum.className = "fd-hdsum"; qn.after(hdSum, tt);
      // shown in place of the title while a finding is open on the start page (stories.css): the finding is about all agencies
      // and all years, whatever is chosen, so the chosen name would mislead
      const st = document.createElement("span"); st.className = "fd-qstory"; st.textContent = "What the reports show"; tt.after(st);
      const go = () => fold(card, !card.classList.contains("fd-hdfold"));
      qn.setAttribute("role", "button"); qn.tabIndex = 0; qn.setAttribute("aria-label", `${qn.textContent.trim()}: fold or open the title and the years`);
      qn.addEventListener("click", go); qn.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go() } });
      qh.dataset.fdHd = "1"; fold(card, card.classList.contains("fd-hdfold"));   // open when the page opens; a fold is kept
    }
    const qb = document.querySelector(".qbtn.on"), yrs = document.querySelector(".fd-tl .tl-label"), hdSum = qh && qh.querySelector(".fd-hdsum");
    const line = [qb ? qb.textContent.trim().replace(/^\d+\s*/, "") : "", yrs ? yrs.textContent : ""].filter(Boolean).map(x => ` · ${x}`).join("");
    if (hdSum && hdSum.textContent !== line) hdSum.textContent = line
    let tog = bar.querySelector(":scope > .fd-actog"), sum = bar.querySelector(":scope > .fd-acsum");
    if (!tog) { tog = document.createElement("button"); tog.type = "button"; tog.className = "fd-actog"; sum = document.createElement("div"); sum.className = "fd-acsum"; bar.prepend(sum); bar.append(tog)
      tog.addEventListener("click", () => show(bar, tog, !bar.classList.contains("fd-achide")))
      show(bar, tog, false) }   // open whenever the page opens; folded only by a click, and it stays so while the page is in use
    // folded: one line that says what is chosen (written only when it changes, as this runs on every change to the page)
    const pick = id => { const s = document.querySelector(`#${id} select`); return s && !s.disabled && s.selectedIndex > 0 ? s.selectedOptions[0].textContent.trim() : null }
    const ag = document.querySelector("#ojs-cell-17 select"), cmp = document.querySelector("div.cmp"), chips = [...document.querySelectorAll("div.cmp .chip")].map(c => c.firstChild ? c.firstChild.textContent.trim() : "")
    const only = [...document.querySelectorAll("#ojs-cell-22 input:checked")].some(i => /^Only/.test((i.closest("label") || i.parentElement).textContent.trim()))
    const text = `${ag ? ag.selectedOptions[0].textContent.trim() : ""}${pick("ojs-cell-18") ? ` › ${pick("ojs-cell-18")}` : ""}${chips.length ? ` · compared with ${chips.join(", ")}` : ""}${only ? ` · only the agencies that reported every year` : ""}`
    if (sum.textContent !== text) sum.textContent = text
    // the explanation under "Agencies added up in the total" becomes the label's tooltip (the form is redrawn when the agency changes)
    const f = document.querySelector("#ojs-cell-22 form"), l = f && f.querySelector(":scope > label"), n = f && f.querySelector(".side-note");
    if (l && n && !l.dataset.fdTip) l.dataset.fdTip = n.textContent.trim();
  }
  new MutationObserver(place).observe(document.documentElement, {childList: true, subtree: true});
  document.addEventListener("DOMContentLoaded", place);
})();

/* ---------- "Clear all": resets Agency, Component and Compare with to how the page opens, in one step. Years, the question
   and "Agencies added up in the total" are not touched. ---------- */
(function () {
  const formSel = lab => { const l = [...document.querySelectorAll("label")].find(x => x.textContent.trim() === lab); const f = l && l.closest("form"); return f && f.querySelector("select") };
  const fire = (el, ...types) => types.forEach(t => el.dispatchEvent(new Event(t, {bubbles: true})));
  const cmpBox = () => document.querySelector("div.cmp");
  const dirty = () => { const ag = formSel("Agency"), c = cmpBox();
    return !!(ag && ag.options.length && ag.value !== ag.options[0].value) || !!(c && Array.isArray(c.value) && c.value.length) };
  function reset() {
    if (window.fdClearParked) window.fdClearParked();   // (Nov. 27) what the rule set aside goes too, or it would come back
    const c = cmpBox();
    if (c) {   // Compare with: back to an empty list and the two lists' first state
      const as = c.querySelector("select.cmp-agency"), cs = c.querySelector("select.cmp-comp");
      if (as) as.value = "";
      if (cs) { cs.replaceChildren(new Option("Whole agency (all components)", "")); cs.disabled = true }
      const chips = c.querySelector(".chips"); if (chips) chips.replaceChildren();
      const hint = c.querySelector(".side-note"); if (hint) hint.textContent = "Choosing adds it to the comparison; × removes it.";
      if (Array.isArray(c.value) && c.value.length) { c.value = []; fire(c, "input") }
    }
    const ag = formSel("Agency");   // Agency: the government total; the dashboard then resets Component itself
    if (ag && ag.value !== ag.options[0].value) { ag.value = ag.options[0].value; fire(ag, "input", "change") }
    setTimeout(update, 50);
  }
  let btn = null;
  const update = () => { if (btn) btn.disabled = !dirty() };
  function place() {
    const ag = formSel("Agency"), form = ag && ag.closest("form");
    if (!form || form.querySelector(".fd-clear")) return;
    form.classList.add("fd-agform");
    btn = document.createElement("button"); btn.type = "button"; btn.className = "fd-clear"; btn.textContent = "Clear all";
    btn.title = "Reset agency, component and compare choices"; btn.addEventListener("click", reset);
    form.appendChild(btn); update();
  }
  new MutationObserver(() => { place(); update() }).observe(document.documentElement, {childList: true, subtree: true});
  document.addEventListener("input", () => setTimeout(update, 0), true);
  document.addEventListener("change", () => setTimeout(update, 0), true);
  document.addEventListener("click", () => setTimeout(update, 0), true);   // the × on a compare chip
})();

/* ---------- The view in the page address, and "Copy link to this view". The address records the question, agency, component,
   years, compare list, the two radio choices and the Explore measure; opening such a link sets the same controls again, in
   order, the way a user would. ---------- */
(function () {
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const waitFor = async (f, ms = 8000) => { for (let t = 0; t < ms; t += 100) { const v = f(); if (v) return v; await sleep(100) } return null };
  const formOf = lab => { const l = [...document.querySelectorAll("label")].find(x => x.textContent.trim() === lab); return l && l.closest("form") };
  const selOf = lab => { const f = formOf(lab); return f && f.querySelector("select") };
  const fire = (el, ...ts) => ts.forEach(t => el.dispatchEvent(new Event(t, {bubbles: true})));
  const checkedText = lab => { const f = formOf(lab), i = f && f.querySelector("input:checked"); return i ? i.closest("label").textContent.trim() : null };
  let restoring = false, timer = null;
  function read() {
    const p = new URLSearchParams(), qp = document.querySelector(".qpick"), q = qp ? +qp.value : 0;
    if (q) p.set("q", q);
    const ag = selOf("Agency"), total = !ag || ag.value === ag.options[0].value;
    if (!total) p.set("agency", ag.selectedOptions[0].textContent.trim());
    const cs = selOf("Component");
    if (!total && cs && !cs.disabled && cs.value !== cs.options[0].value) p.set("comp", cs.selectedOptions[0].textContent.trim());
    const ys = [...document.querySelectorAll(".years select")];
    if (ys.length === 2) { const v = ys.map(s => +s.value), all = [...ys[0].options].map(o => +o.value), lo = Math.min(...v), hi = Math.max(...v);
      if (lo !== all[0] || hi !== all[all.length - 1]) { p.set("from", lo); p.set("to", hi) } }
    const cmp = document.querySelector("div.cmp"); if (cmp && Array.isArray(cmp.value) && cmp.value.length) p.set("with", cmp.value.join("~"));
    if ((checkedText("Agencies added up in the total") || "").startsWith("Only")) p.set("scope", "same");
    // (an address no longer carries an appeals base: Question 5 shows the reversal rate out of all processed appeals and out of
    // those decided, side by side, so "base=all" in an old link is left out)
    const od = document.querySelector(".odetail:not([hidden])");   // the card or the finding opened on the overview (a finding: find=N; Nov. 26, it wrote card=undefined)
    if (!q && od && od.dataset.f) p.set("find", od.dataset.f); else if (!q && od && od.dataset.i) p.set("card", od.dataset.i);
    if (q === 7) { const ty = selOf("Data type"), me = selOf("Measure");
      if (ty) p.set("type", ty.selectedOptions[0].textContent.trim().slice(0, 2)); if (me) p.set("m", me.selectedOptions[0].textContent.trim()) }
    return p;
  }
  function sync() { if (restoring) return; const s = read().toString(); history.replaceState(null, "", s ? `?${s}` : location.pathname) }
  const later = () => { clearTimeout(timer); timer = setTimeout(sync, 400) };
  ["input", "change", "click"].forEach(t => document.addEventListener(t, later, true));
  async function restore(p) {
    restoring = true; window.fdRestoring = true;   // the "Compare with" rule waits until the link is restored
    try {
      await waitFor(() => document.querySelector(".qpick") && selOf("Agency") && document.querySelectorAll(".years select").length === 2);
      const ys = [...document.querySelectorAll(".years select")], f = +p.get("from"), t = +p.get("to");
      if (f && t && [...ys[0].options].some(o => +o.value === f) && [...ys[1].options].some(o => +o.value === t)) { ys[0].value = String(f); ys[1].value = String(t); fire(ys[1], "change"); await sleep(400) }
      const agName = fdAgency(p.get("agency")), ag = selOf("Agency");   // links made before a rename still open
      if (agName) { const o = [...ag.options].find(o => o.textContent.trim() === agName);
        if (o) { ag.value = o.value; fire(ag, "input", "change");
          const comp = p.get("comp");
          if (comp) { const cs = await waitFor(() => { const s = selOf("Component"); return s && !s.disabled && [...s.options].some(o => o.textContent.trim() === comp) && s });
            if (cs) { cs.value = [...cs.options].find(o => o.textContent.trim() === comp).value; fire(cs, "input", "change") } }
          await sleep(500) } }
      const keys = (p.get("with") || "").split("~").filter(Boolean).slice(0, 5).map(k => { const x = k.split("|"); x[1] = fdAgency(x[1]); return x.join("|") });
      // in the link's order; a component's agency is added and then replaced by the component, so a whole agency listed before
      // one of its own components drops out there, and is added again at the end (the only case where the order can change)
      const cmpNow = () => { const c = document.querySelector("div.cmp"); return c && Array.isArray(c.value) ? c.value : [] };
      for (const k of [...keys, ...keys.filter(k => k.startsWith("A|"))]) {
        if (cmpNow().includes(k)) continue;
        const [lv, a] = k.split("|"), as = await waitFor(() => document.querySelector("select.cmp-agency"));
        if (!as || ![...as.options].some(o => o.value === a)) continue;
        as.value = a; fire(as, "change"); await sleep(250);
        if (lv === "A" && !cmpNow().includes(k) && !(window.fdMainLine && window.fdMainLine() === k)) {   // the selection's own agency: choosing it adds nothing (see "Compare with")
          const cs = document.querySelector("select.cmp-comp"); if (cs && [...cs.options].some(o => o.value === "")) { cs.disabled = false; cs.value = ""; fire(cs, "change"); await sleep(250) } }
        if (lv === "C") { const cs = await waitFor(() => { const s = document.querySelector("select.cmp-comp"); return s && [...s.options].some(o => o.value === k) && s });
          if (cs) { cs.value = k; fire(cs, "change"); await sleep(250) } }
      }
      if (p.get("scope") === "same") { const f2 = formOf("Agencies added up in the total"), i = f2 && [...f2.querySelectorAll("input")].find(x => x.closest("label").textContent.trim().startsWith("Only")); if (i) { i.click(); await sleep(300) } }
      const q = +p.get("q");
      if (q) { const b = document.querySelector(`.qbtn[data-id="${q}"]`); if (b && +document.querySelector(".qpick").value !== q) b.click();
        if (q === 7) { const ty = p.get("type"), m = p.get("m");
          if (ty) { const s = await waitFor(() => selOf("Data type")); const o = s && [...s.options].find(o => o.textContent.trim().startsWith(ty)); if (o && s.value !== o.value) { s.value = o.value; fire(s, "input", "change"); await sleep(500) } }
          if (m) { const s = await waitFor(() => { const x = selOf("Measure"); return x && [...x.options].some(o => o.textContent.trim() === m) && x }); if (s) { s.value = [...s.options].find(o => o.textContent.trim() === m).value; fire(s, "input", "change") } } } }
      await sleep(600);
    } finally { restoring = false; window.fdRestoring = false; sync() }
  }
  function button() {   // in the sidebar under the questions, where the hint "Click a selected item again to clear it." was (hidden in stories.css)
    const qp = document.querySelector(".qpick"); if (!qp || document.querySelector(".fd-copy")) return;
    const b = document.createElement("button"); b.type = "button"; b.className = "fd-copy"; b.textContent = "Copy link to this view";
    b.addEventListener("click", async () => { sync();
      try { await navigator.clipboard.writeText(location.href); b.textContent = "Link copied" } catch (e) { b.textContent = "Copy it from the address bar" }
      setTimeout(() => { b.textContent = "Copy link to this view" }, 1800) });
    const g = document.createElement("button"); g.type = "button"; g.className = "fd-link fd-guidelink"; g.textContent = "How to use this dashboard ↗";
    g.addEventListener("click", () => window.fdOpenGuide && window.fdOpenGuide());
    const row = document.createElement("div"); row.className = "fd-linkrow"; row.append(g, b); qp.after(row);   // beside the question list, not inside its input: the guide, then the link
  }
  new MutationObserver(button).observe(document.documentElement, {childList: true, subtree: true});
  const start = new URLSearchParams(location.search);
  if (!start.get("q") && +start.get("card") > 0) window.__openCard = +start.get("card") - 1;   // the overview opens this card when it is first drawn
  if (!start.get("q") && +start.get("find") > 0) window.__openFinding = +start.get("find") - 1;   // or this finding
  if ([...start.keys()].length) restore(start);
})();

/* ---------- The dashboard's name in the top bar: back to the overview's cards. "Reset" at the top right: every choice back to
   how the page opens (agency, component, compare list, years, "Agencies added up in the total"), staying on
   the page that is showing. It sets the dashboard's own inputs, the way a user would, so the charts and the address follow.
   The button keeps the class fd-home so the top-bar styles still apply. ---------- */
(function () {
  const openPanel = () => document.querySelector(".odetail:not([hidden])");
  const goHome = e => { if (e) e.preventDefault(); window.__openCard = null; window.__openFinding = null;
    const c = openPanel(); if (c) c.querySelector(".od-close").click();
    const on = document.querySelector(".qbtn.on"); if (on) on.click(); window.scrollTo(0, 0) };
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const waitFor = async (f, ms = 3000) => { for (let t = 0; t < ms; t += 100) { const v = f(); if (v) return v; await sleep(100) } return null };
  const formOf = lab => { const l = [...document.querySelectorAll("label")].find(x => x.textContent.trim() === lab); return l && l.closest("form") };
  const radioOf = (lab, starts) => { const f = formOf(lab); return f && [...f.querySelectorAll("input[type=radio]")].find(i => i.closest("label").textContent.trim().startsWith(starts)) };
  const MERITS = "Appeals decided on the merits", memo = () => window.__memo || {};
  const hiddenBase = () => { const c = document.getElementById("ojs-cell-23"), d = c && c.querySelector(".observablehq > div"); return d && !d.querySelector("input") ? d : null };   // the appeals base off Question 5
  function dirty() {
    const ag = formOf("Agency"), sel = ag && ag.querySelector("select");
    if (sel && sel.options.length && sel.value !== sel.options[0].value) return true;
    const c = document.querySelector("div.cmp"); if (c && Array.isArray(c.value) && c.value.length) return true;
    const ys = [...document.querySelectorAll(".years select")];
    if (ys.length === 2) { const v = ys.map(s => +s.value), all = [...ys[0].options].map(o => +o.value);
      if (Math.min(...v) !== all[0] || Math.max(...v) !== all[all.length - 1]) return true }
    const only = radioOf("Agencies added up in the total", "Only");
    if ((only && only.checked) || String(memo().scope || "").startsWith("Only")) return true;
    const all5 = radioOf("Reversal rate out of", "All"), hb = hiddenBase();
    return !!((all5 && all5.checked) || (hb && hb.value === "All processed appeals") || memo().base5 === "All processed appeals");
  }
  let btn = null, busy = false;
  const update = () => { if (btn && !busy) { const d = dirty(); btn.classList.toggle("fd-at-home", !d); btn.setAttribute("aria-disabled", String(!d)) } };
  async function reset() {
    if (busy || !dirty()) return; busy = true;
    try {
      const clear = document.querySelector(".fd-clear"); if (clear && !clear.disabled) { clear.click(); await sleep(300) }   // agency, component, compare list
      const all = document.querySelector(".tl-p"); if (all && !all.classList.contains("on")) { all.click(); await sleep(300) }   // "All years"
      const first = await waitFor(() => radioOf("Agencies added up in the total", "All"));   // shown once the agency is the total again
      if (first && !first.checked) { first.click(); await sleep(300) }
      window.__memo = Object.assign(memo(), {scope: first ? first.closest("label").textContent.trim() : memo().scope, base5: MERITS});
      const merits = radioOf("Reversal rate out of", "Appeals decided");
      if (merits) { if (!merits.checked) merits.click() }
      else { const hb = hiddenBase(); if (hb && hb.value !== MERITS) { hb.value = MERITS; hb.dispatchEvent(new Event("input", {bubbles: true})) } }
      await sleep(300);
    } finally { busy = false; update() }
  }
  function place() {
    const nav = document.querySelector("nav.navbar"); if (!nav || nav.querySelector(".fd-home")) return;
    btn = document.createElement("button"); btn.type = "button"; btn.className = "fd-home fd-reset";
    btn.title = "Reset every choice to how the dashboard opens: agency, component, compare, years, agencies added up";
    btn.innerHTML = '<i class="bi bi-arrow-counterclockwise" aria-hidden="true"></i> Reset';
    btn.addEventListener("click", reset); nav.appendChild(btn);
    const name = nav.querySelector(".navbar-title-text > a"); if (name) { name.addEventListener("click", goHome); name.title = "Back to the overview" }
    update();
  }
  document.addEventListener("DOMContentLoaded", place); place();
  document.addEventListener("click", () => setTimeout(update, 0), true);
  document.addEventListener("input", () => setTimeout(update, 0), true);
  document.addEventListener("change", () => setTimeout(update, 0), true);
  // an opened card on the overview: Escape closes it, the arrow keys step through the cards
  document.addEventListener("keydown", e => {
    const d = openPanel(); if (!d || /^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName) || document.querySelector('.card[data-full-screen="true"]')) return;
    const b = d.querySelector(e.key === "Escape" ? ".od-close" : e.key === "ArrowRight" ? ".od-next" : e.key === "ArrowLeft" ? ".od-prev" : "none");
    if (b && !b.disabled) b.click();
  });
})();

/* ---------- When the data was last updated: in the top bar on every page, and in the guide. The date is foia.json's "built"
   (the day prep.py made it from the foia.gov download), so a refresh moves it without a change here. Written the way MuckRock
   writes dates (AP style: Nov. 2, 2026); left out when the file has no date. ---------- */
(function () {
  const DATA = (window.__foiaJson = window.__foiaJson || fetch("data/foia.json").then(r => r.ok ? r.json() : Promise.reject(r.status))
    .then(D => { D.ids.Agency = D.ids.Agency.map(fdAgency); return D }));
  const MONTH = ["Jan.", "Feb.", "March", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
  const ap = s => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || ""); return m && +m[2] >= 1 && +m[2] <= 12 ? `${MONTH[+m[2] - 1]} ${+m[3]}, ${m[1]}` : null };
  const TIP = "The last time the data was refreshed from foia.gov's annual reports. A report an agency files after this day is not in the dashboard yet.";
  let when = null;
  function place() {
    if (!when) return;
    const nav = document.querySelector("nav.navbar");
    if (nav && !nav.querySelector(".fd-updated")) {
      const s = document.createElement("span"); s.className = "fd-updated"; s.dataset.fdTip = TIP;
      s.textContent = `Data updated ${when}`; nav.appendChild(s);
    }
    document.querySelectorAll(".fd-when:not([data-set])").forEach(el => { el.dataset.set = "1"; el.textContent = (el.dataset.pre || "") + when });
    // the guide's years and agency counts, from the data (Nov. 26), so they stay right after a refresh
    if (span) for (const [cls, text] of Object.entries(span)) document.querySelectorAll(`.${cls}:not([data-set])`).forEach(el => { el.dataset.set = "1"; el.textContent = text });
  }
  let span = null;
  DATA.then(D => {
    when = ap(D.built);
    const per = new Map(), seen = new Map();   // agency reports per year; the years each agency reported
    D.ids.FY.forEach((y, i) => { if (D.ids.level[i] !== "agency") return; per.set(y, (per.get(y) || 0) + 1); const a = D.ids.Agency[i]; (seen.get(a) || seen.set(a, new Set()).get(a)).add(y) });
    const ys = [...per.keys()].sort((a, b) => a - b), n = ys.length, all = [...seen.values()].filter(s => s.size === n).length, c = [...per.values()];
    if (n) span = {"fd-yrs": `FY${ys[0]}–FY${ys[n - 1]}`, "fd-range": `${Math.min(...c)}–${Math.max(...c)}`, "fd-cohort": `${all} that reported all ${n} years`};
    place() }).catch(() => {});
  new MutationObserver(place).observe(document.documentElement, {childList: true, subtree: true});
})();

/* ---------- Short explanations: an element with data-fd-tip shows its text at once, on hover, or on a click, which keeps it
   open until the next click anywhere or Esc. (The browser's own tooltip waits about a second, and a click did nothing.) ---------- */
(function () {
  let tip = null, pinned = null;
  const box = () => { if (!tip) { tip = document.createElement("div"); tip.className = "fd-tip"; tip.setAttribute("role", "tooltip"); document.body.appendChild(tip) } return tip };
  // under the element, or above it when there is no room below
  function place(t, el) {
    const r = el.getBoundingClientRect(), w = t.offsetWidth, h = t.offsetHeight;
    t.style.left = Math.max(8, Math.min(window.innerWidth - w - 8, r.left)) + "px";
    t.style.top = (r.bottom + 6 + h > window.innerHeight - 8 && r.top - 6 - h > 8 ? r.top - 6 - h : r.bottom + 6) + "px";
  }
  function show(el) { const t = box(); t.textContent = el.dataset.fdTip; t.style.display = "block"; place(t, el) }
  function hide() { if (tip) tip.style.display = "none"; pinned = null }
  const at = e => e.target && e.target.closest ? e.target.closest("[data-fd-tip]") : null;
  document.addEventListener("pointerover", e => { const el = at(e); if (el && !pinned) show(el) });
  document.addEventListener("pointerout", e => { const el = at(e); if (el && !pinned && !el.contains(e.relatedTarget)) hide() });
  document.addEventListener("click", e => { const el = at(e);
    if (el) { e.preventDefault(); e.stopPropagation(); if (pinned === el) hide(); else { show(el); pinned = el } } else if (pinned) hide() }, true);   // a click on it shows the text only (on a card, it does not open the card)
  document.addEventListener("keydown", e => { if (e.key === "Escape") hide() });
  window.addEventListener("scroll", () => { if (tip && tip.style.display === "block") hide() }, true);
})();

/* ---------- What "Compare with" may hold (client meeting, Nov. 17). "All agencies (government total)" goes with anything.
   Every other line on a chart is either a whole agency, or belongs to one agency (its total and its components). So agencies
   are compared with each other, and a component only within its own agency; components of different agencies, which differ
   too much in size and make-up, are never on one chart, and neither is a component with another agency's total.
   The rule counts the Agency and Component chosen above as one of the lines. Choices that would break it are greyed out in
   the two "Compare with" lists, with a line saying why. When the Agency or Component above changes, or a link opens, a line
   that no longer fits is taken out by clicking its ×, the way a user would, and a note names it.
   Nov. 23 (user): a component chosen above can only be compared within its agency, so the first "Compare with" list is set
   to that agency and locked, and the second offers the agency as a whole and its other components; nothing is added until
   one is chosen there. A whole agency chosen above: the first list starts on it (its components one click away) and can be
   changed to another agency, whose components then cannot be added, so the second list says "Whole agency only". Choosing
   the agency of the selection above lists its components and adds nothing (before, it added the agency, or the selection
   again). The dashboard's "Compare with" input has two hooks for this: preset (fill the lists without adding) and skipAdd.
   ---------- */
(function () {
  const formOf = lab => { const l = [...document.querySelectorAll("label")].find(x => x.textContent.trim() === lab); return l && l.closest("form") };
  const selOf = lab => { const f = formOf(lab); return f && f.querySelector("select") };
  const fam = k => fdAgency(k.split("|")[1]), isComp = k => k.startsWith("C|");
  // can k go on a chart with the lines in have? A component needs every line to be of its agency; an agency needs every
  // component already there to be its own
  const fits = (have, k) => isComp(k) ? have.every(h => fam(h) === fam(k)) : have.every(h => !isComp(h) || fam(h) === fam(k));
  const RULE = "Greyed out: a component is compared only within its own agency; agencies can be compared with each other.";
  const RULE2 = "A component is compared only within its own agency; agencies can be compared with each other.";
  function mainLine() {   // the Agency and Component chosen above, as a line key; none for all agencies
    const ag = selOf("Agency"); if (!ag || !ag.options.length || ag.value === ag.options[0].value) return null;
    const a = fdAgency(ag.selectedOptions[0].textContent.trim()), cs = selOf("Component");
    const t = cs && !cs.disabled && cs.options.length && cs.value !== cs.options[0].value ? cs.selectedOptions[0].textContent.trim() : null;
    return t ? `C|${a}|${(t.match(/\(([^()]+)\)$/) || [null, t])[1]}` : `A|${a}`;   // a component as "Compare with" keys it: by the short code in brackets
  }
  // Nov. 27 (user: choosing a component cleared the agencies being compared, and going back did not bring them back): a line
  // that no longer fits, or that repeats the selection above, is set aside, not thrown away. It is listed, greyed, under the
  // lines compared, and comes back by itself, in the order it was set aside, once the selection above allows it (room
  // permitting); its × there drops it for good. "Clear all" and Reset drop what was set aside
  let parked = [], putBack = [], putBackAt = 0, busy = false;   // set aside; names put back in the last few seconds
  const taken = new Set();   // agencies of the lines just taken out
  const tries = new Map();   // a line whose × did not take it out is not clicked again and again
  let presetFor, presetVal = "";   // the selection the first list was last set for, and the agency it was set to
  window.fdMainLine = () => mainLine();   // for the link restore
  window.fdClearParked = () => { parked = []; putBack = []; const el = document.querySelector("div.cmp .fd-parked"); if (el) el.remove() };
  function parkedEl(box) {   // what was set aside: greyed chips, each with its own ×, and a line saying when they come back
    let el = box.querySelector(".fd-parked");
    if (!parked.length) { if (el) el.remove(); return }
    if (!el) { el = document.createElement("div"); el.className = "fd-parked"; (box.querySelector(".chips") || box).after(el) }
    const key = parked.map(q => q.k).join("~"); if (el.dataset.k === key) return; el.dataset.k = key
    const chips = parked.map(q => { const c = document.createElement("span"); c.className = "chip fd-parked-chip"; c.title = "Not on the chart for now: it comes back when the selection above allows it"
      const x = document.createElement("button"); x.type = "button"; x.title = "Drop it"; x.textContent = "×"; x.onclick = () => { parked = parked.filter(z => z !== q); parkedEl(box) }
      c.append(q.name, x); return c })
    const h = document.createElement("span"); h.className = "fd-parked-h"; h.textContent = "Set aside for now:"
    const t = document.createElement("div"); t.className = "fd-parked-t"; t.textContent = "They come back by themselves when the selection above allows them (a component is compared only within its own agency); × drops one."
    el.replaceChildren(h, ...chips, t)
  }
  function note(box) {
    let n = box.querySelector(".fd-cmp-note");
    if (!n) { n = document.createElement("div"); n.className = "fd-cmp-note"; n.setAttribute("aria-live", "polite"); (box.querySelector(".chips") || box).before(n) }
    return n;
  }
  function check() {
    const box = document.querySelector("div.cmp"); if (!box || !Array.isArray(box.value) || busy) return;
    if (!box.skipAdd) box.skipAdd = a => { const mm = mainLine(); return !!mm && fam(mm) === fdAgency(a) };   // asked by the input when an agency is chosen
    if (window.fdRestoring) { later(300); return }   // a link adds a component's agency first, then the component: judge the list once it is complete
    const m = mainLine(), have = m ? [m] : [], out = [];
    for (const k of box.value) (k !== m && fits(have, k) ? have : out).push(k);   // the selection itself, compared again, is set aside too
    if (out.length) {   // set aside the first line that does not fit: its × takes it off the chart; the dashboard redraws the chips and this runs again
      const i = box.value.indexOf(out[0]), chip = box.querySelectorAll(".chips .chip")[i], x = chip && chip.querySelector("button");
      const n = (tries.get(out[0]) || 0) + 1; tries.set(out[0], n);
      if (x && n <= 3) { if (!parked.some(q => q.k === out[0])) parked.push({k: out[0], name: chip.textContent.replace("×", "").trim()}); if (out[0] !== m) taken.add(fam(out[0])); busy = true; x.click(); setTimeout(() => { busy = false; check() }, 60); return }
    }
    if (!out.length) tries.clear();
    // put back what was set aside once the selection allows it, in the order it was set aside, while there is room
    if (parked.length && box.restore && !window.fdRestoring) {
      const back = [], cur = [...have];
      for (const q of parked) if (q.k !== m && !box.value.includes(q.k) && fits(cur, q.k) && box.value.length + back.length < 5) { back.push(q); cur.push(q.k) }
      if (back.length) { parked = parked.filter(q => !back.includes(q)); putBack = back.map(q => q.name); putBackAt = Date.now(); busy = true; box.restore(back.map(q => q.k)); setTimeout(() => { busy = false; check() }, 60); return }
    }
    parkedEl(box);
    const as = box.querySelector("select.cmp-agency"), cs = box.querySelector("select.cmp-comp");
    // the two lists still showing the agency of a line just taken out, or an agency that can no longer be added: back to
    // their first state, as "Clear all" leaves them
    const own = m && as ? [...as.options].find(o => o.value && fdAgency(o.value) === fam(m)) : null;   // the selection's agency in the first list
    const first = () => { as.value = ""; if (cs) { cs.replaceChildren(new Option("Whole agency (all components)", "")); cs.disabled = true } };
    if (as && as.value && !(own && as.value === own.value) && (taken.has(fdAgency(as.value)) || !fits(have, `A|${as.value}`))) first();
    taken.clear();
    // the first list: locked on the agency of a component chosen above; set once to the agency chosen above; back to its first
    // state when the list was only set by this and all agencies are chosen above
    const lock = !!(m && isComp(m) && own);
    if (as && box.preset) {
      if (lock && as.value !== own.value) { box.preset(own.value); presetVal = own.value }
      else if (!lock && own && presetFor !== m && (!as.value || as.value === presetVal)) { box.preset(own.value); presetVal = own.value }
      else if (!m && as.value && as.value === presetVal && presetFor) first();
      presetFor = m;
      as.disabled = lock; as.title = lock ? "Set by the component chosen above: it is compared only within its own agency" : "";
    }
    // "Whole agency only" is set here, not by the dashboard: undone first, then judged again on the lines as they are now
    if (cs && cs.dataset.fdWhole) { delete cs.dataset.fdWhole; if (as && as.value && [...cs.options].some(o => o.value)) { cs.disabled = false; cs.options[0].text = "Whole agency (all components)" } }
    let grey = false, wholeOnly = false;
    if (as) [...as.options].forEach(o => { if (!o.value) return; o.disabled = !fits(have, `A|${o.value}`); grey = grey || o.disabled });
    if (cs && !cs.disabled) {
      [...cs.options].forEach(o => { if (!o.value) { o.disabled = !!(m && !isComp(m) && own && as.value === own.value); return }   // the agency chosen above, as a whole: already on the chart
        const self = o.value === m || (m && isComp(m) && o.text.trim() === (selOf("Component") || {selectedOptions: [{}]}).selectedOptions[0].textContent?.trim());   // the component chosen above
        o.disabled = !fits(have, o.value) || self; grey = grey || (o.disabled && !self) });
      const comps = [...cs.options].filter(o => o.value);
      if (comps.length && comps.every(o => o.disabled) && !comps.some(o => o.value === m)) { cs.options[0].text = "Whole agency only"; cs.value = ""; cs.disabled = true; cs.dataset.fdWhole = "1"; wholeOnly = true; grey = false }   // another agency's components: none can be added
    }
    if (lock) grey = false;   // the locked list's greyed agencies cannot be seen
    const n = note(box), recent = putBack.length > 0 && Date.now() - putBackAt < 8000;
    const text = recent ? `Put back: ${putBack.join("; ")}.` : lock || wholeOnly ? RULE2 : grey ? RULE : "";
    if (n.textContent !== text) n.textContent = text;
    n.classList.toggle("fd-warn", !!recent); n.hidden = !text;
    if (!recent) putBack = [];
  }
  let t = null;
  const later = (ms = 60) => { clearTimeout(t); t = setTimeout(check, ms) };
  new MutationObserver(() => later()).observe(document.documentElement, {childList: true, subtree: true});
  ["input", "change", "click"].forEach(e => document.addEventListener(e, () => later(), true));
  setInterval(() => { if (putBack.length && Date.now() - putBackAt >= 8000) check() }, 1000);   // let the "Put back" note go after a while
})();
