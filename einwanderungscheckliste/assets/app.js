/* LebenPlus Einwanderungs-Checkliste – gemeinsame Logik für beide Designs.
   Inhalte stehen in data.js (window.CHECKLIST). Fortschritt bleibt lokal im Browser. */
(function () {
  "use strict";

  var DATA = window.CHECKLIST;
  var KEY = "lebenplus_einwanderung_v2";
  var DAY = 86400000;

  /* ---------- Zustand ---------- */
  var state = load();
  function load() {
    var s = null;
    try { s = JSON.parse(localStorage.getItem(KEY)); } catch (e) { s = null; }
    s = s || {};
    s.date = s.date || "";
    s.profile = s.profile || {};
    s.done = s.done || {};
    s.onlyOpen = !!s.onlyOpen;
    return s;
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* privat / blockiert */ }
  }

  /* ---------- Hilfen ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  // Erlaubt **fett** in Datentexten, sonst wird alles escaped.
  function rich(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"); }

  function entryDate() {
    if (!state.date) return null;
    var p = state.date.split("-");
    var d = new Date(+p[0], +p[1] - 1, +p[2]);
    return isNaN(d) ? null : d;
  }
  function today() { var n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); }
  function addDays(d, n) { return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); }
  function fmt(d) {
    return d.toLocaleDateString("de-CH", { day: "2-digit", month: "2-digit", year: "numeric" });
  }
  function fmtShort(d) { return d.toLocaleDateString("de-CH", { day: "numeric", month: "short" }); }

  // Fälligkeit eines Punkts: Tage relativ zur Einreise oder Jahresende des Einreisejahres
  function dueDate(item) {
    var e = entryDate();
    if (!e || item.due == null) return null;
    if (item.due === "yearEnd") return new Date(e.getFullYear(), 11, 31);
    return addDays(e, item.due);
  }
  function relative(d) {
    var diff = Math.round((d - today()) / DAY);
    if (diff === 0) return "heute";
    if (diff === 1) return "morgen";
    if (diff === -1) return "seit gestern";
    if (diff > 0) return "in " + diff + " Tagen";
    return "seit " + -diff + " Tagen";
  }

  function visible(item) {
    if (!item.when) return true;
    return !!state.profile[item.when];
  }
  function itemTasks(item) { return item.tasks || []; }
  function itemDoneCount(item) {
    return itemTasks(item).filter(function (t) { return state.done[t.id]; }).length;
  }
  function itemDone(item) {
    var t = itemTasks(item);
    return t.length > 0 && itemDoneCount(item) === t.length;
  }
  function allItems() {
    var out = [];
    DATA.phases.forEach(function (ph) {
      ph.items.forEach(function (it) { if (visible(it)) out.push({ item: it, phase: ph }); });
    });
    return out;
  }

  /* ---------- Einrichtung (Datum + Profil) ---------- */
  function renderSetup() {
    var root = $("#cl-setup");
    if (!root) return;
    var profileHtml = DATA.profile.map(function (p) {
      return '<label class="cl-toggle"><input type="checkbox" data-profile="' + p.id + '"' +
        (state.profile[p.id] ? " checked" : "") + '><span class="cl-toggle-ui" aria-hidden="true"></span>' +
        '<span class="cl-toggle-text"><strong>' + esc(p.label) + "</strong><small>" + esc(p.hint) + "</small></span></label>";
    }).join("");
    root.innerHTML =
      '<div class="cl-field"><label for="cl-date">Geplantes Einreisedatum</label>' +
      '<input type="date" id="cl-date" value="' + esc(state.date) + '">' +
      '<p class="cl-field-hint" id="cl-date-hint"></p></div>' +
      '<fieldset class="cl-profile"><legend>Was trifft auf dich zu?</legend>' + profileHtml + "</fieldset>";

    $("#cl-date").addEventListener("change", function (e) {
      state.date = e.target.value; save(); renderAll();
    });
    $all("[data-profile]", root).forEach(function (cb) {
      cb.addEventListener("change", function () {
        state.profile[cb.dataset.profile] = cb.checked; save(); renderAll(true);
      });
    });
    updateDateHint();
  }
  function updateDateHint() {
    var h = $("#cl-date-hint");
    if (!h) return;
    var e = entryDate();
    if (!e) { h.textContent = "Mit Datum berechnen wir alle Fristen automatisch."; return; }
    var diff = Math.round((e - today()) / DAY);
    h.textContent = diff > 0 ? "Noch " + diff + " Tage bis zur Einreise. Alle Fristen sind berechnet."
      : diff === 0 ? "Heute ist Einreisetag. Willkommen in der Schweiz!"
      : "Du bist seit " + -diff + " Tagen in der Schweiz. Alle Fristen sind berechnet.";
  }

  /* ---------- Als Nächstes ---------- */
  function renderNext() {
    var root = $("#cl-next");
    if (!root) return;
    var e = entryDate();
    if (!e) {
      root.innerHTML = '<p class="cl-next-empty">Gib oben dein Einreisedatum ein. Dann siehst du hier, was als Nächstes fällig ist.</p>';
      return;
    }
    var open = allItems().filter(function (x) { return !itemDone(x.item) && dueDate(x.item); });
    open.sort(function (a, b) { return dueDate(a.item) - dueDate(b.item); });
    if (!open.length) {
      root.innerHTML = '<p class="cl-next-empty">Alles mit Frist ist erledigt. Stark!</p>';
      return;
    }
    root.innerHTML = '<ol class="cl-next-list">' + open.slice(0, 4).map(function (x) {
      var d = dueDate(x.item);
      var late = d < today();
      return '<li class="' + (late ? "is-late" : "") + '"><a href="#' + x.item.id + '" data-jump="' + x.item.id + '">' +
        '<span class="cl-next-date"><strong>' + fmtShort(d) + "</strong><small>" + relative(d) + "</small></span>" +
        '<span class="cl-next-title">' + esc(x.item.title) + "<small>" + esc(x.phase.title) + "</small></span>" +
        '<span class="cl-next-arrow" aria-hidden="true">→</span></a></li>';
    }).join("") + "</ol>";
  }

  /* ---------- Phasen-Navigation ---------- */
  function renderNav() {
    var root = $("#cl-nav");
    if (!root) return;
    root.innerHTML = DATA.phases.map(function (ph, i) {
      var items = ph.items.filter(visible);
      var done = items.filter(itemDone).length;
      return '<a class="cl-chip" href="#phase-' + ph.id + '" data-phase="' + ph.id + '">' +
        '<span class="cl-chip-num">' + (i + 1) + "</span>" + esc(ph.short || ph.title) +
        '<span class="cl-chip-count">' + done + "/" + items.length + "</span></a>";
    }).join("");
  }

  /* ---------- Liste ---------- */
  var openState = {};
  function renderList() {
    var root = $("#cl-list");
    if (!root) return;
    root.classList.toggle("only-open", state.onlyOpen);
    root.innerHTML = DATA.phases.map(function (ph, i) {
      var items = ph.items.filter(visible);
      return '<section class="cl-phase" id="phase-' + ph.id + '" data-phase-section="' + ph.id + '">' +
        '<header class="cl-phase-head"><span class="cl-phase-num">' + (i + 1) + "</span>" +
        "<div><h2>" + esc(ph.title) + "</h2><p>" + esc(ph.lead) + "</p></div>" +
        '<span class="cl-phase-time">' + esc(ph.time) + "</span></header>" +
        '<div class="cl-items">' + items.map(renderItem).join("") + "</div></section>";
    }).join("");
    bindList(root);
  }

  function renderItem(item) {
    var d = dueDate(item);
    var total = itemTasks(item).length;
    var count = itemDoneCount(item);
    var done = itemDone(item);
    var late = d && !done && d < today();
    var isOpen = openState[item.id];
    var profile = item.when ? DATA.profile.filter(function (p) { return p.id === item.when; })[0] : null;

    var dateHtml = d
      ? '<span class="cl-due' + (late ? " is-late" : "") + '">' + (late ? "Überfällig · " : "Bis ") + fmt(d) + "</span>"
      : "";

    var body = "";
    if (item.intro) body += '<p class="cl-intro">' + rich(item.intro) + "</p>";
    if (total) {
      body += '<ul class="cl-tasks">' + item.tasks.map(function (t) {
        return '<li><label><input type="checkbox" data-task="' + t.id + '"' + (state.done[t.id] ? " checked" : "") + ">" +
          '<span class="cl-box" aria-hidden="true"></span><span class="cl-task-text">' + rich(t.text) + "</span></label></li>";
      }).join("") + "</ul>";
    }
    (item.facts || []).forEach(function (f) {
      body += '<div class="cl-facts">' + (f.title ? "<h4>" + esc(f.title) + "</h4>" : "") +
        '<dl>' + f.rows.map(function (r) { return "<div><dt>" + esc(r[0]) + "</dt><dd>" + rich(r[1]) + "</dd></div>"; }).join("") + "</dl>" +
        (f.note ? '<p class="cl-facts-note">' + rich(f.note) + "</p>" : "") + "</div>";
    });
    (item.notes || []).forEach(function (n) {
      body += '<div class="cl-note cl-note-' + (n.type || "tip") + '"><strong>' + esc(n.title) + "</strong><p>" + rich(n.text) + "</p></div>";
    });
    if (item.sources && item.sources.length) {
      body += '<p class="cl-sources"><span>Offizielle Quellen:</span> ' + item.sources.map(function (s) {
        return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.label) + "</a>";
      }).join("") + "</p>";
    }

    return '<article class="cl-item' + (done ? " is-done" : "") + (late ? " is-late" : "") + (isOpen ? " is-open" : "") + '" id="' + item.id + '">' +
      '<button class="cl-item-head" type="button" aria-expanded="' + (isOpen ? "true" : "false") + '" aria-controls="body-' + item.id + '">' +
      '<span class="cl-ring" style="--p:' + (total ? count / total : 0) + '" aria-hidden="true"><span>' +
      (done ? "✓" : count + "/" + total) + "</span></span>" +
      '<span class="cl-item-titles"><span class="cl-item-title">' + esc(item.title) + "</span>" +
      '<span class="cl-item-meta"><span class="cl-when">' + esc(item.timing) + "</span>" + dateHtml +
      (profile ? '<span class="cl-tag">' + esc(profile.tag) + "</span>" : "") +
      (item.legal ? '<span class="cl-tag cl-tag-legal">Pflicht</span>' : "") + "</span></span>" +
      '<span class="cl-chevron" aria-hidden="true"></span></button>' +
      '<div class="cl-item-body" id="body-' + item.id + '"><div class="cl-item-inner">' + body + "</div></div></article>";
  }

  function bindList(root) {
    $all(".cl-item-head", root).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var art = btn.parentNode;
        var open = !art.classList.contains("is-open");
        art.classList.toggle("is-open", open);
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        openState[art.id] = open;
      });
    });
    $all("[data-task]", root).forEach(function (cb) {
      cb.addEventListener("change", function () {
        if (cb.checked) state.done[cb.dataset.task] = true; else delete state.done[cb.dataset.task];
        save();
        var art = cb.closest(".cl-item");
        var item = findItem(art.id);
        // Nur den Kopf der Karte neu zeichnen, damit der Fokus erhalten bleibt
        var tmp = document.createElement("div");
        tmp.innerHTML = renderItem(item);
        var newHead = tmp.firstChild.querySelector(".cl-item-head");
        var oldHead = art.querySelector(".cl-item-head");
        oldHead.querySelector(".cl-ring").replaceWith(newHead.querySelector(".cl-ring"));
        oldHead.querySelector(".cl-item-meta").replaceWith(newHead.querySelector(".cl-item-meta"));
        art.className = tmp.firstChild.className;
        if (itemDone(item) && !art.dataset.celebrated) { art.dataset.celebrated = "1"; pulse(art); }
        renderProgress(); renderNav(); renderNext();
      });
    });
  }
  function pulse(el) {
    el.classList.add("just-done");
    setTimeout(function () { el.classList.remove("just-done"); }, 900);
  }
  function findItem(id) {
    var found = null;
    DATA.phases.forEach(function (ph) { ph.items.forEach(function (it) { if (it.id === id) found = it; }); });
    return found;
  }

  /* ---------- Fortschritt ---------- */
  function renderProgress() {
    var items = allItems();
    var tasks = 0, done = 0;
    items.forEach(function (x) { tasks += itemTasks(x.item).length; done += itemDoneCount(x.item); });
    var pct = tasks ? Math.round((done / tasks) * 100) : 0;
    $all("[data-progress-fill]").forEach(function (el) { el.style.width = pct + "%"; });
    $all("[data-progress-text]").forEach(function (el) { el.textContent = pct + " %"; });
    $all("[data-progress-detail]").forEach(function (el) { el.textContent = done + " von " + tasks + " Aufgaben erledigt"; });
  }

  /* ---------- Kalender-Export (.ics) ---------- */
  function icsDate(d) {
    return d.getFullYear() + String(d.getMonth() + 1).padStart(2, "0") + String(d.getDate()).padStart(2, "0");
  }
  function icsEscape(s) { return String(s).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n"); }
  function exportIcs() {
    if (!entryDate()) { alertBox("Bitte zuerst dein Einreisedatum eingeben."); return; }
    var lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//LebenPlus//Einwanderungs-Checkliste//DE", "CALSCALE:GREGORIAN"];
    var stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
    allItems().forEach(function (x) {
      var d = dueDate(x.item);
      if (!d || itemDone(x.item)) return;
      lines.push("BEGIN:VEVENT", "UID:" + x.item.id + "@einwanderungscheckliste", "DTSTAMP:" + stamp,
        "DTSTART;VALUE=DATE:" + icsDate(d), "DTEND;VALUE=DATE:" + icsDate(addDays(d, 1)),
        "SUMMARY:" + icsEscape("Frist: " + x.item.title),
        "DESCRIPTION:" + icsEscape(x.item.timing + ". " + (x.item.tasks || []).map(function (t) { return "- " + t.text.replace(/\*\*/g, ""); }).join("\n")),
        "BEGIN:VALARM", "TRIGGER:-P3D", "ACTION:DISPLAY", "DESCRIPTION:" + icsEscape(x.item.title), "END:VALARM",
        "END:VEVENT");
    });
    lines.push("END:VCALENDAR");
    var blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "einwanderung-schweiz-fristen.ics";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }

  function alertBox(msg) {
    var t = $("#cl-toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(alertBox._t);
    alertBox._t = setTimeout(function () { t.classList.remove("show"); }, 3200);
  }

  /* ---------- Aktionen ---------- */
  function bindActions() {
    $all("[data-action]").forEach(function (b) {
      b.addEventListener("click", function () {
        var a = b.dataset.action;
        if (a === "print") {
          $all(".cl-item").forEach(function (el) { el.classList.add("is-open"); });
          window.print();
        } else if (a === "ics") exportIcs();
        else if (a === "expand") {
          var anyClosed = $all(".cl-item:not(.is-open)").length > 0;
          $all(".cl-item").forEach(function (el) {
            el.classList.toggle("is-open", anyClosed); openState[el.id] = anyClosed;
            el.querySelector(".cl-item-head").setAttribute("aria-expanded", anyClosed ? "true" : "false");
          });
          b.textContent = anyClosed ? "Alle zuklappen" : "Alle aufklappen";
        } else if (a === "only-open") {
          state.onlyOpen = !state.onlyOpen; save();
          b.setAttribute("aria-pressed", state.onlyOpen ? "true" : "false");
          $("#cl-list").classList.toggle("only-open", state.onlyOpen);
        } else if (a === "reset") {
          var r = $("#cl-reset-confirm");
          if (r && !r.open) { r.showModal ? r.showModal() : doReset(); } else doReset();
        }
      });
    });
    var oo = $('[data-action="only-open"]');
    if (oo) oo.setAttribute("aria-pressed", state.onlyOpen ? "true" : "false");
    var dlg = $("#cl-reset-confirm");
    if (dlg) {
      dlg.addEventListener("close", function () { if (dlg.returnValue === "yes") doReset(); });
    }
    document.addEventListener("click", function (e) {
      var j = e.target.closest("[data-jump]");
      if (!j) return;
      var art = document.getElementById(j.dataset.jump);
      if (art && !art.classList.contains("is-open")) art.querySelector(".cl-item-head").click();
    });
  }
  function doReset() {
    state = { date: "", profile: {}, done: {}, onlyOpen: false };
    save(); openState = {}; renderAll(true);
    alertBox("Alles zurückgesetzt.");
  }

  /* ---------- Scrollspy für die Phasen-Chips ---------- */
  function bindSpy() {
    if (!("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = en.target.dataset.phaseSection;
        $all(".cl-chip").forEach(function (c) { c.classList.toggle("is-active", c.dataset.phase === id); });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    $all("[data-phase-section]").forEach(function (s) { io.observe(s); });
  }

  function renderAll(full) {
    if (full) renderSetup(); else updateDateHint();
    renderNext(); renderNav(); renderList(); renderProgress(); bindSpy();
    $all("[data-stand]").forEach(function (el) { el.textContent = DATA.stand; });
  }

  renderSetup();
  renderAll();
  bindActions();
  if (location.hash) {
    var t = document.getElementById(location.hash.slice(1));
    if (t && t.classList.contains("cl-item")) t.querySelector(".cl-item-head").click();
  }
})();
