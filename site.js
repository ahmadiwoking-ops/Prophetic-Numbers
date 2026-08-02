/* ==========================================================
   prophetic-numbers.com — shared script
   Every block is guarded, so this file is safe on all pages.
   ========================================================== */
(function(){
"use strict";

/* ---------- data ---------- */
var ORIGINS = {
  bigbang: {label:"Big Bang fusion",      c:"var(--bigbang)"},
  cosmic:  {label:"Cosmic ray fission",   c:"var(--cosmic)"},
  lowmass: {label:"Dying low-mass stars", c:"var(--lowmass)"},
  fusion:  {label:"Massive star fusion",  c:"var(--fusion)"},
  ironpeak:{label:"Exploding stars",      c:"var(--ironpeak)"},
  merger:  {label:"Merging neutron stars",c:"var(--merger)"}
};

var EL = {
  1: {s:"H",  n:"Hydrogen",   o:"bigbang", r:"Primordial. Fuel for every star."},
  2: {s:"He", n:"Helium",     o:"bigbang", r:"Primordial, and the alpha particle of fusion."},
  5: {s:"B",  n:"Boron",      o:"cosmic",  r:"Not made in stars — chipped from heavier nuclei by cosmic rays."},
  7: {s:"N",  n:"Nitrogen",   o:"lowmass", r:"Catalyst of the CNO cycle."},
  10:{s:"Ne", n:"Neon",       o:"fusion",  r:"Carbon-burning ash; fuel for the neon-burning stage."},
  11:{s:"Na", n:"Sodium",     o:"fusion",  r:"Carbon and neon burning."},
  14:{s:"Si", n:"Silicon",    o:"fusion",  r:"Oxygen-burning ash; fuel for the final stage."},
  15:{s:"P",  n:"Phosphorus", o:"fusion",  r:"Neon and oxygen burning."},
  16:{s:"S",  n:"Sulfur",     o:"fusion",  r:"Oxygen and silicon burning."},
  23:{s:"V",  n:"Vanadium",   o:"fusion",  r:"Late oxygen and silicon burning."},
  26:{s:"Fe", n:"Iron",       o:"ironpeak",r:"Where fusion stops paying. The ash of the last fire."},
  27:{s:"Co", n:"Cobalt",     o:"ironpeak",r:"Middle link of the nickel-56 decay chain."},
  28:{s:"Ni", n:"Nickel",     o:"ironpeak",r:"Silicon burning's end product; powers supernova light."},
  34:{s:"Se", n:"Selenium",   o:"lowmass", r:"Slow neutron capture in dying low-mass stars."},
  47:{s:"Ag", n:"Silver",     o:"merger",  r:"Rapid neutron capture. Neutron-star collisions."}
};

var ROWS = [
  {n:[28,27,14,2,27,2,26,2,28,1,23,15,11],
   t:"Supernova decay chain and silicon burning",
   d:"The sequence opens Ni\u201328, Co\u201327 \u2014 the first two links of the nickel-56 decay chain that lights a supernova. Iron, the third link, follows five places later. The helium between them stands for the alpha particles that built the nickel in the first place."},
  {n:[1,2,27,14,10,1,28,27,47,16,11,34,14,11],
   t:"The iron peak, and one appearance of silver",
   d:"Silver enters here, once, and never returns. It is the only element in the whole set that no star can make on its own \u2014 it requires the rapid neutron capture found in a neutron-star merger."},
  {n:[7,1,5,34,23,34,11,14,7,23,14,10,1],
   t:"Catalysis and oxygen burning",
   d:"Nitrogen leads the row. In the CNO cycle nitrogen is consumed and regenerated without ever being used up \u2014 a nuclear enzyme. Boron sits beside it: an element stars destroy rather than make."},
  {n:[14,5,28,7,34,1,7,34,11,16,1,14,7,2,1,7,5,1,14,1],
   t:"Dispersal into the interstellar medium",
   d:"The longest row, and the most mixed. Heavy and light elements interleave with no clear ordering \u2014 read here as the scattering of a star's manufactured matter into space."},
  {n:[14,2,28,1,7],
   t:"What is left behind",
   d:"Five numbers. Silicon dust, helium gas, nickel from the core, hydrogen of the interstellar medium, nitrogen from the CNO cycle. The raw stock of the next generation of stars."}
];

var LADDER = [
  {t:"Hydrogen burning", o:"bigbang", rx:"4 \u00B9H \u2192 \u2074He", d:"The main sequence. In massive stars this runs through the CNO cycle, with carbon, nitrogen and oxygen acting as catalysts. Lasts millions of years."},
  {t:"Helium burning", o:"bigbang", rx:"3 \u2074He \u2192 \u00B9\u00B2C, then \u00B9\u00B2C + \u2074He \u2192 \u00B9\u2076O", d:"The triple-alpha process. Builds the carbon and oxygen that all later chemistry depends on."},
  {t:"Carbon and neon burning", o:"fusion", rx:"\u00B9\u00B2C + \u00B9\u00B2C \u2192 Ne, Na, Mg", d:"Now measured in centuries, not millennia. Produces neon, sodium and magnesium."},
  {t:"Oxygen burning", o:"fusion", rx:"\u00B9\u2076O + \u00B9\u2076O \u2192 Si, P, S, V", d:"Roughly a year. Yields silicon, phosphorus, sulfur and the first of the transition metals."},
  {t:"Silicon burning", o:"ironpeak", rx:"\u00B2\u2078Si + 7\u03B1 \u2192 \u2075\u2076Ni", d:"The last fire, and it burns for about a day. Silicon captures alpha particles in succession until it reaches nickel-56 at the iron peak."},
  {t:"Core collapse", o:"ironpeak", rx:"\u2075\u2076Ni \u2192 \u2075\u2076Co \u2192 \u2075\u2076Fe", d:"Fusion past iron consumes energy rather than releasing it. The core has nothing left to hold itself up with, falls inward in under a second, and rebounds as a supernova. The nickel it flings outward decays through cobalt to iron, and that decay is what we see brighten and fade."},
  {t:"Neutron-star merger", o:"merger", rx:"rapid neutron capture \u2192 Ag, Pt, Au", d:"Elements past the iron peak need a different furnace altogether. Two neutron stars spiralling together produce a neutron flux extreme enough to build silver, platinum and gold in under a second."}
];

var EQS = [
  {t:"The alpha ladder", o:"ironpeak",
   m:"\u00B2\u2078Si + 7\u03B1 \u2192 \u2075\u2076Ni<br><b>14 + (7 \u00D7 2) = 28</b>",
   d:"Silicon captures seven alpha particles in succession to reach nickel. In atomic numbers that is 14 plus seven twos, which is 28 \u2014 and 14, 2 and 28 are among the most frequent values in the sequence."},
  {t:"The supernova decay chain", o:"ironpeak",
   m:"\u2075\u2076Ni \u2192 \u2075\u2076Co \u2192 \u2075\u2076Fe<br><b>28 \u2192 27</b> open the sequence; <b>26</b> follows in the same row",
   d:"Nickel-56 decays to cobalt-56 with a half-life of about six days, and cobalt to iron-56 in about seventy-seven. That two-step decay is the entire power source of a supernova's visible light curve."},
  {t:"The CNO cycle", o:"lowmass",
   m:"\u00B9\u00B2C + 4 \u00B9H \u2192 \u00B9\u00B2C + \u2074He + 2\u03BD<br><b>N (7) appears 7 times</b>",
   d:"Nitrogen enters the cycle and comes out again unchanged, over and over. Seven appearances for element seven is the neatest numerical coincidence in the sequence \u2014 though carbon and oxygen, the other two letters of CNO, are both absent."},
  {t:"Rapid neutron capture", o:"merger",
   m:"n-capture + \u03B2\u207B decay \u2192 <b>Ag (47)</b>, Pt, Au<br><b>appears exactly once</b>",
   d:"Silver's single appearance matches the rarity of the events that make it. Neutron-star mergers are far less common than supernovae, yet they seed the galaxy with most of its heavy metals."}
];

var CLAIMS = [
  "All fifteen distinct values fall between 1 and 47, and every one of them is the atomic number of an element that plays a named role in stellar burning. <b>No value in the set is astrophysically idle.</b>",
  "The sequence <b>opens on 28 and 27</b> \u2014 nickel then cobalt, the first two steps of the most-cited decay chain in nuclear astrophysics. Iron, its endpoint, arrives five positions later in the same row.",
  "The three most frequent values are <b>1 (hydrogen, 11 times), 14 (silicon, 9 times) and 7 (nitrogen, 7 times)</b> \u2014 the universe's most abundant element, the fuel of the final burning stage, and the CNO catalyst.",
  "<b>14, 2 and 28</b> are all high-frequency values and stand in the exact relation of the silicon-burning alpha ladder: 14 + 7\u00D72 = 28.",
  "<b>Nitrogen appears exactly seven times</b>, matching its own atomic number, for an element whose defining property is that it recurs without being consumed.",
  "<b>Silver appears exactly once.</b> It is the only value in the set that cannot be produced by stellar fusion at all, and its isolation mirrors the rarity of the mergers that make it.",
  "The complete iron-peak triad \u2014 <b>Fe, Co and Ni</b> \u2014 is present, in the frequency order Ni &gt; Co &gt; Fe, which is the abundance order in the first days after an explosion, before the decay chain has run to completion.",
  "The <b>final row of five</b> lists silicon, helium, nickel, hydrogen and nitrogen \u2014 a plausible inventory of a post-supernova nebula, and so a return to the starting conditions of the next star."
];

var QS = [
  {t:"Carbon and oxygen are missing",
   d:"6 and 8 do not appear anywhere in the sixty-five numbers. These are the third and fourth most abundant elements in the universe, the products of helium burning, and two of the three letters in CNO. A sequence encoding stellar nucleosynthesis that omits carbon and oxygen has a real gap at its centre. Magnesium (12) and calcium (20), both major products of the burning ladder, are absent too."},
  {t:"Every integer is an atomic number",
   d:"The observation that all fifteen values map to elements is not by itself evidence: every whole number from 1 to 118 is an atomic number, so any set of small integers would pass this test. The weight of the argument has to rest on which elements come up and how often \u2014 not on the mapping succeeding."},
  {t:"The row divisions carry a lot of the reading",
   d:"The stage-by-stage narrative depends on treating each written row as a unit. The original has no punctuation or separators indicating that the rows are meant as distinct sections rather than a single sequence wrapped across five lines."},
  {t:"No one has tested it against chance",
   d:"The strongest claims here \u2014 nitrogen at exactly seven, silver at exactly one \u2014 have not been evaluated against a null model. The right test is to generate large numbers of random 65-length sequences drawn from 15 values and count how often comparable patterns emerge. Until that is done, 'this cannot be random' remains an assertion rather than a result."}
];

/* ---------- helpers ---------- */
function el(tag, cls){ var e=document.createElement(tag); if(cls) e.className=cls; return e; }
function colorOf(z){ return ORIGINS[EL[z].o].c; }
function $(sel){ return document.querySelector(sel); }
var FLAT = ROWS.reduce(function(a,r){ return a.concat(r.n); }, []);

/* ---------- nav wordmark ---------- */
(function(){
  var mark = $(".brand .mark");
  if(!mark) return;
  [ "bigbang","fusion","ironpeak","lowmass","merger" ].forEach(function(k,i){
    var b = el("i");
    b.style.setProperty("--c", ORIGINS[k].c);
    b.style.setProperty("--h", [10,16,7,13,9][i] + "px");
    mark.appendChild(b);
  });
})();

/* ---------- hero spectrum ---------- */
(function(){
  var host = $("#spectrum");
  if(!host) return;
  FLAT.forEach(function(z,i){
    var li = el("li","spec-line");
    li.style.setProperty("--c", colorOf(z));
    li.style.setProperty("--delay", (i*47%2600)+"ms");
    li.style.setProperty("--dur", (1800+(i*137%2200))+"ms");
    li.title = z + " \u00B7 " + EL[z].s + " \u00B7 " + EL[z].n;
    host.appendChild(li);
  });
  var key = $("#spectrumKey");
  if(!key) return;
  Object.keys(ORIGINS).forEach(function(k){
    var s = el("span"), i = el("i");
    i.style.setProperty("--c", ORIGINS[k].c);
    s.appendChild(i);
    s.appendChild(document.createTextNode(ORIGINS[k].label));
    key.appendChild(s);
  });
})();

/* ---------- tiles ---------- */
function buildTiles(nums){
  var ul = el("ul","tiles");
  nums.forEach(function(z,i){
    var li = el("li","tile");
    li.style.setProperty("--c", colorOf(z));
    li.style.setProperty("--i", i);
    li.setAttribute("data-name", EL[z].n + " \u00B7 Z=" + z);
    var n = el("span","face num"); n.textContent = z;
    var s = el("span","face sym"); s.textContent = EL[z].s;
    li.appendChild(n); li.appendChild(s);
    ul.appendChild(li);
  });
  return ul;
}

(function(){
  var host = $("#rows");
  if(!host) return;
  ROWS.forEach(function(r, ri){
    var block = el("div","row-block");
    var lab = el("p","row-label");
    lab.innerHTML = "Row " + (ri+1) + " <b>" + r.n.length + " figures</b>";
    block.appendChild(lab);
    block.appendChild(buildTiles(r.n));
    host.appendChild(block);
  });
  var bn = $("#btnNum"), be = $("#btnEl");
  if(!bn || !be) return;
  function setMode(elements){
    host.classList.toggle("mode-elements", elements);
    bn.setAttribute("aria-pressed", String(!elements));
    be.setAttribute("aria-pressed", String(elements));
  }
  bn.addEventListener("click", function(){ setMode(false); });
  be.addEventListener("click", function(){ setMode(true); });
})();

/* ---------- element cards ---------- */
(function(){
  var host = $("#elGrid");
  if(!host) return;
  Object.keys(EL).map(Number).sort(function(a,b){return a-b;}).forEach(function(z){
    var e = EL[z], li = el("li","el-card");
    li.style.setProperty("--c", colorOf(z));
    li.innerHTML =
      '<div class="el-z">Z = '+z+'</div>'+
      '<div class="el-sym">'+e.s+'</div>'+
      '<div class="el-name">'+e.n+'</div>'+
      '<span class="el-origin">'+ORIGINS[e.o].label+'</span>';
    li.title = e.r;
    host.appendChild(li);
  });
})();

/* ---------- frequency ---------- */
(function(){
  var host = $("#freq");
  if(!host) return;
  var counts = {};
  FLAT.forEach(function(z){ counts[z] = (counts[z]||0)+1; });
  var order = Object.keys(counts).map(Number).sort(function(a,b){ return counts[b]-counts[a] || a-b; });
  var max = Math.max.apply(null, order.map(function(z){return counts[z];}));
  order.forEach(function(z){
    var li = el("li");
    li.style.setProperty("--c", colorOf(z));
    li.innerHTML =
      '<span class="fl">'+EL[z].s+' &middot; '+z+'</span>'+
      '<span class="fb" data-w="'+((counts[z]/max)*100)+'%" style="--w:0%"></span>'+
      '<span class="fn">'+counts[z]+'</span>';
    host.appendChild(li);
  });
  var fired = false;
  function fill(){
    if(fired) return; fired = true;
    host.querySelectorAll(".fb").forEach(function(b,i){
      setTimeout(function(){ b.style.setProperty("--w", b.dataset.w); }, i*45);
    });
  }
  if("IntersectionObserver" in window){
    new IntersectionObserver(function(en,obs){
      en.forEach(function(e){ if(e.isIntersecting){ fill(); obs.disconnect(); } });
    },{threshold:.25}).observe(host);
  } else fill();
})();

/* ---------- ladder ---------- */
(function(){
  var host = $("#ladder");
  if(!host) return;
  LADDER.forEach(function(s){
    var li = el("li");
    li.style.setProperty("--c", ORIGINS[s.o].c);
    li.innerHTML = '<h3>'+s.t+'</h3><div class="rx">'+s.rx+'</div><p>'+s.d+'</p>';
    host.appendChild(li);
  });
})();

/* ---------- reading rows ---------- */
(function(){
  var host = $("#readingRows");
  if(!host) return;
  ROWS.forEach(function(r, ri){
    var block = el("div","row-block rise mode-elements");
    var lab = el("p","row-label");
    lab.innerHTML = "Row " + (ri+1) + " <b>" + r.t + "</b>";
    block.appendChild(lab);
    block.appendChild(buildTiles(r.n));
    var note = el("p","row-note");
    note.textContent = r.d;
    block.appendChild(note);
    host.appendChild(block);
  });
})();

/* ---------- equations ---------- */
(function(){
  var host = $("#eqs");
  if(!host) return;
  EQS.forEach(function(e){
    var d = el("div","eq");
    d.style.setProperty("--c", ORIGINS[e.o].c);
    d.innerHTML = '<p class="eq-title">'+e.t+'</p><p class="eq-math">'+e.m+'</p><p>'+e.d+'</p>';
    host.appendChild(d);
  });
})();

/* ---------- claims ---------- */
(function(){
  var host = $("#claims");
  if(!host) return;
  CLAIMS.forEach(function(c){
    var li = el("li"); li.innerHTML = '<p>'+c+'</p>'; host.appendChild(li);
  });
})();

/* ---------- open questions ---------- */
(function(){
  var host = $("#qs");
  if(!host) return;
  QS.forEach(function(q){
    var li = el("li"); li.innerHTML = '<h3>'+q.t+'</h3><p>'+q.d+'</p>'; host.appendChild(li);
  });
})();

/* ---------- copy-to-clipboard ---------- */
(function(){
  var btns = document.querySelectorAll("[data-copy]");
  if(!btns.length) return;
  btns.forEach(function(b){
    b.addEventListener("click", function(){
      var text = b.getAttribute("data-copy");
      var done = function(){
        var old = b.textContent;
        b.textContent = "Copied";
        setTimeout(function(){ b.textContent = old; }, 1600);
      };
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(text).then(done, function(){});
      } else {
        var ta = el("textarea");
        ta.value = text; document.body.appendChild(ta); ta.select();
        try{ document.execCommand("copy"); done(); }catch(e){}
        document.body.removeChild(ta);
      }
    });
  });
})();

/* ---------- contact form ---------- */
(function(){
  var form = $("#contactForm");
  if(!form) return;
  var status = $("#formStatus");
  var endpoint = form.getAttribute("action") || "";
  var configured = endpoint.indexOf("YOUR_FORM_ID") === -1 && endpoint.length > 0;

  function say(msg){ if(status){ status.textContent = msg; status.classList.add("show"); } }

  form.addEventListener("submit", function(e){
    e.preventDefault();

    if(!configured){
      say("This form isn't connected to a mail service yet. Please email Admin@prophetic-numbers.com directly \u2014 the button above will open your mail app.");
      return;
    }
    var btn = form.querySelector("button[type=submit]");
    var label = btn ? btn.textContent : "";
    if(btn){ btn.disabled = true; btn.textContent = "Sending\u2026"; }

    fetch(endpoint, {
      method:"POST",
      body:new FormData(form),
      headers:{ "Accept":"application/json" }
    }).then(function(res){
      if(res.ok){
        form.reset();
        say("Thank you \u2014 your message has been sent. We read everything, though replies can take a few days.");
      } else {
        say("Something went wrong sending that. Please email Admin@prophetic-numbers.com instead.");
      }
    }).catch(function(){
      say("Couldn't reach the mail service. Please email Admin@prophetic-numbers.com instead.");
    }).then(function(){
      if(btn){ btn.disabled = false; btn.textContent = label; }
    });
  });
})();

/* ---------- giscus discussion ---------- */
(function(){
  var mount = $("#giscus-mount");
  if(!mount) return;

  var cfg = {
    repo:       mount.dataset.repo || "",
    repoId:     mount.dataset.repoId || "",
    category:   mount.dataset.category || "General",
    categoryId: mount.dataset.categoryId || ""
  };

  var unset = !cfg.repoId || cfg.repoId.indexOf("PASTE_") === 0 ||
              !cfg.categoryId || cfg.categoryId.indexOf("PASTE_") === 0;

  if(unset){
    var fb = $("#comments-fallback");
    if(fb) fb.style.display = "block";
    return;
  }

  var s = document.createElement("script");
  s.src = "https://giscus.app/client.js";
  s.setAttribute("data-repo", cfg.repo);
  s.setAttribute("data-repo-id", cfg.repoId);
  s.setAttribute("data-category", cfg.category);
  s.setAttribute("data-category-id", cfg.categoryId);
  s.setAttribute("data-mapping", "pathname");
  s.setAttribute("data-strict", "0");
  s.setAttribute("data-reactions-enabled", "1");
  s.setAttribute("data-emit-metadata", "0");
  s.setAttribute("data-input-position", "top");
  s.setAttribute("data-theme", "dark_dimmed");
  s.setAttribute("data-lang", "en");
  s.setAttribute("data-loading", "lazy");
  s.crossOrigin = "anonymous";
  s.async = true;
  mount.appendChild(s);
})();

/* ---------- scroll reveal ---------- */
(function(){
  var items = document.querySelectorAll(".rise");
  if(!items.length) return;
  if(!("IntersectionObserver" in window)){
    items.forEach(function(i){ i.classList.add("in"); });
    return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); }
    });
  },{threshold:.12, rootMargin:"0px 0px -8% 0px"});
  items.forEach(function(i){ io.observe(i); });
})();

})();
