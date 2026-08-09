
const state = {
  page: localStorage.getItem("schola-page") || "login",
  timerSeconds: 25 * 60,
  timerHandle: null,
  timerRunning: false,
  tasks: [
    {text:"Read Chapter 7 — Integration",done:true},
    {text:"Algorithms problem set #4",done:false},
    {text:"English essay outline",done:false},
    {text:"Statistics quiz prep",done:false}
  ],
  flashIndex: 0,
  reviewedNotes: false,
  savedResource: false,
  groups: [
    {name:"Science", emoji:"🔬", members:6},
    {name:"T.L.E", emoji:"🛠️", members:4}
  ]
};

const flashcards = [
  {
    q:"Visibility of system status",
    a:"The interface should always keep users informed about system status through appropriate feedback within a reasonable time.",
    ex:"Example: showing upload progress, loading states, or a confirmation after saving."
  },
  {
    q:"Match between system and the real world",
    a:"Use words, concepts, and conventions familiar to users rather than system-oriented terminology.",
    ex:"Example: use a trash-bin icon for delete and natural language for actions."
  },
  {
    q:"User control and freedom",
    a:"Users often make mistakes and need a clearly marked way to leave an unwanted state.",
    ex:"Example: provide undo, cancel, back, and close actions."
  },
  {
    q:"Consistency and standards",
    a:"Users should not have to wonder whether different words, situations, or actions mean the same thing.",
    ex:"Example: keep button labels and navigation patterns consistent."
  }
];

const resources = [
  ["📚","Data Structures Flashcards","Computer Science · 42 cards","76%"],
  ["📝","Calculus Integration Notes","Mathematics · 8 pages","90%"],
  ["📖","English Literature Terms","English · 30 cards","40%"],
  ["🧮","Algorithms — Sorting Review","Computer Science · 16 pages","65%"],
  ["📊","Statistics Formula Sheet","Mathematics · 5 pages","55%"],
  ["💾","SQL Joins Summary","Programming · 20 cards","70%"]
];

function savePage(page){
  state.page = page;
  localStorage.setItem("schola-page", page);
  render();
}

function appLayout(title, content, active){
  return `
    <div class="page-shell">
      <div class="app-frame">
        <aside class="sidebar">
          <div class="brand"><span class="brand-mark">Ⓢ</span><span>Schola</span></div>
          <nav class="nav">
            ${navItem("dashboard","⌂","Dashboard",active)}
            ${navItem("planner","▣","Study Planner",active)}
            ${navItem("library","▱","Resource Library",active)}
            ${navItem("practice","⚯","Practice",active)}
            ${navItem("groups","♧","Study Groups",active)}
            ${navItem("profile","◎","Profile",active)}
          </nav>
          <div class="sidebar-user">
            <div class="avatar-sm">AV</div>
            <div class="user-meta"><div class="user-name">Ashley Vine</div><div class="user-course">BS Information<br>Technology</div></div>
          </div>
        </aside>
        <main class="main">
          <header class="topbar">
            <h2>${title}</h2>
            <button class="quick-add" onclick="openQuickAdd()">＋ Quick Add</button>
          </header>
          ${content}
        </main>
      </div>
    </div>`;
}
function navItem(page,icon,label,active){
  return `<button class="nav-btn ${active===page?"active":""}" onclick="savePage('${page}')"><span class="nav-icon">${icon}</span><span>${label}</span></button>`;
}
function render(){
  const app = document.getElementById("app");
  if(state.page==="login") app.innerHTML = loginPage();
  else if(state.page==="dashboard") app.innerHTML = dashboardPage();
  else if(state.page==="planner") app.innerHTML = plannerPage();
  else if(state.page==="practice") app.innerHTML = practicePage();
  else if(state.page==="flashcards") app.innerHTML = flashcardsPage();
  else if(state.page==="profile") app.innerHTML = profilePage();
  else if(state.page==="library") app.innerHTML = libraryPage();
  else if(state.page==="groups") app.innerHTML = groupsPage();
  bindTaskInputs();
}
function loginPage(){
  return `
  <div class="login-screen">
    <section class="login-panel">
      <div class="login-brand"><span class="brand-mark">Ⓢ</span><span>Schola</span></div>
      <div class="login-content">
        <form class="login-form" onsubmit="login(event)">
          <h1>Welcome back, Ashley!</h1>
          <div class="field"><label>Email</label><input id="email" type="email" value="example@gmail.com" required></div>
          <div class="field"><label>Password</label><input id="password" type="password" value="password" required></div>
          <div class="login-options">
            <label><input type="checkbox" checked> remember me</label>
            <a href="#" onclick="forgotPassword(event)">forgot password? click here</a>
          </div>
          <button class="login-submit" type="submit">login</button>
          <div class="socials">
            <button type="button" class="social-btn" onclick="socialLogin('Google')">🌈 &nbsp; Google</button>
            <button type="button" class="social-btn" onclick="socialLogin('Facebook')">🔵 &nbsp; Facebook</button>
          </div>
        </form>
        <div class="login-art"><img src="assets/login-illustration.png" alt="Study illustration with a document and magnifying glass"></div>
      </div>
    </section>
  </div>`;
}
function login(e){e.preventDefault();showToast("Welcome back, Ashley!");savePage("dashboard")}
function forgotPassword(e){e.preventDefault();showToast("Password reset link prepared for example@gmail.com.")}
function socialLogin(provider){showToast(`${provider} sign-in demo selected.`);savePage("dashboard")}

function dashboardPage(){
  return appLayout("Good morning, Ashley 👋",`
    <div class="content">
      <section class="streak">
        <div><h3>14-day streak</h3><p>Your longest streak yet — keep it going!</p></div>
        <span class="pill">🏆 Personal best</span>
      </section>
      <section class="stats-grid">
        ${stat("Hours this week","18.5","↑ 3h vs last week",true)}
        ${stat("Sessions completed","12","Goal: 15")}
        ${stat("Exams upcoming","3","Next: 3 days")}
        ${stat("Resources uploaded","47","Across 5 subjects")}
      </section>
      <section class="two-col">
        <div class="card section-card">
          <div class="section-title">Exam countdown</div>
          ${exam("Mathematics — Calculus","Fri 25 May · 09:00","3 days ⚠",true)}
          ${exam("Computer Science — Algorithms","Mon 2 Jun · 10:00","11 days")}
          ${exam("English — Literary Analysis","Mon 9 Jun · 09:00","18 days")}
        </div>
        <div class="card section-card">
          <div class="section-title">Today's sessions</div>
          ${session("Calculus — Integration","08:00–09:30","✓ Done")}
          ${session("Algorithms — Sorting","11:00–12:30","Now")}
          ${session("English — Close Reading","15:00–16:00","Upcoming")}
        </div>
        <div class="card section-card">
          <div class="section-title">Weekly goal progress</div>
          ${progress("Study Hours","18.5 / 20 hrs",92)}
          ${progress("Sessions","12 / 15",80)}
          ${progress("Maths revision","6 / 8 hrs",75)}
        </div>
        <div class="card section-card">
          <div class="section-title">AI study assistant</div>
          <div class="chat"><div class="stat-icon" style="width:30px;height:30px;background:#2d7631;color:white">◌</div><div class="chat-bubble">Hi! I noticed you have Calculus coming up soon. Would you like me to generate some practice problems?</div></div>
          <form class="chat-input" onsubmit="sendChat(event)"><input id="chatbox" placeholder="Ask me anything about your studies"><button class="icon-btn">➤</button></form>
        </div>
      </section>
    </div>`,"dashboard");
}
function stat(label,value,sub,highlight=false){return `<div class="card stat ${highlight?"highlight":""}"><div class="label">${label}</div><div class="value">${value}</div><div class="sub">${sub}</div></div>`}
function exam(title,meta,right,danger=false){return `<div class="exam-item ${danger?"danger":""}"><div><div class="item-title">${title}</div><div class="item-meta">${meta}</div></div><div class="item-right">${right}</div></div>`}
function session(title,meta,status){return `<div class="session-item"><div class="session-left"><span class="dot"></span><div><div class="item-title">${title}</div><div class="item-meta">${meta}</div></div></div><span class="status">${status}</span></div>`}
function progress(label,right,pct){return `<div class="progress-row"><div class="progress-head"><span>${label}</span><span class="muted">${right}</span></div><div class="bar"><span style="width:${pct}%"></span></div></div>`}
function sendChat(e){e.preventDefault();const box=document.getElementById("chatbox"); if(!box.value.trim()) return; showToast(`AI demo: "${box.value.trim()}" received.`);box.value=""}

function plannerPage(){
  const heads = ["Time","Mon 19","Tue 20","Wed 21","Thu 22","Fri 23","Sat 24","Sun 25"];
  const rows = [
    ["08:00","Calculus","","Calculus","","Calculus","",""],
    ["10:00","","Algorithms","","Algorithms","","Statistics",""],
    ["14:00","","","English","","English","",""],
    ["16:00","Statistics","","","","","",""]
  ];
  let cells = heads.map(h=>`<div class="planner-cell head">${h}</div>`).join("");
  rows.forEach(r=>{r.forEach((v,i)=>{cells+=`<div class="planner-cell ${i===0?"time":""}">${i===0?v:(v?`<div class="event ${v==="Algorithms"?"mid":v==="Statistics"?"light":""}">${v}</div>`:"")}</div>`})});
  return appLayout("Study Planner",`
  <div class="content compact">
    <div class="page-heading"><div><h1>Study Planner</h1><p>Week of 19 May 2026</p></div><div><button class="btn btn-secondary">‹</button> <button class="btn btn-secondary">›</button></div></div>
    <div class="card planner-table planner-scroll"><div class="planner-grid">${cells}</div></div>
    <div class="planner-bottom">
      <div class="card timer-card">
        <div class="section-title" style="color:#4ea64f">Focus timer</div>
        <div class="timer-row"><div class="timer-circle">25:00</div><div><div class="bold">Algorithms — Sorting</div><div class="text-sm muted" style="margin:7px 0 18px">Session 2 of 4 today</div><button class="btn btn-primary" onclick="openTimer()">▷ &nbsp; Start</button> <button class="btn btn-secondary" onclick="resetTimer()">↻ &nbsp; Reset</button></div></div>
      </div>
      <div class="card tasks-card">
        <div class="section-title" style="color:#4ea64f">Today's tasks <button style="float:right;border:0;background:#d9efd5;border-radius:50%;width:28px;height:28px" onclick="addTask()">＋</button></div>
        <div class="task-list">${state.tasks.map((t,i)=>`<label class="task ${t.done?"done":""}"><input data-task="${i}" type="checkbox" ${t.done?"checked":""}>${t.text}</label>`).join("")}</div>
        <hr style="border:0;border-top:1px solid var(--line)">
        ${progress("Progress",`${state.tasks.filter(t=>t.done).length}/${state.tasks.length} done`,state.tasks.filter(t=>t.done).length/state.tasks.length*100)}
      </div>
    </div>
  </div>`,"planner");
}
function bindTaskInputs(){
  document.querySelectorAll("[data-task]").forEach(el=>el.addEventListener("change",()=>{
    state.tasks[+el.dataset.task].done=el.checked;render();
  }));
}
function addTask(){
  openModal(`<div class="modal small"><h3>Add study task</h3><p>Add a new task to today's study plan.</p><div class="modal-field"><label>Task</label><input id="new-task" placeholder="e.g. Review SQL joins"></div><div class="modal-actions"><button class="btn btn-soft" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="confirmAddTask()">Add task</button></div></div>`)
}
function confirmAddTask(){const v=document.getElementById("new-task").value.trim();if(v){state.tasks.push({text:v,done:false});closeModal();render();showToast("Task added.")}}
function resetTimer(){state.timerSeconds=1500;showToast("Focus timer reset to 25:00.")}

function practicePage(){
  return appLayout("Practice",`
  <div class="content">
    <div class="page-heading"><div><h1>Practice</h1><p>Practice your study sessions with flashcards</p></div><div class="date-card"><div class="text-xs">Today</div><div class="bold">July 12, 2026</div><div class="text-xs">Sunday</div></div></div>
    <div class="practice-stats">
      ${practiceStat("▤","76","Cards mastered")}
      ${practiceStat("ϟ","3","Active decks")}
      ${practiceStat("✓","12","Sessions this week")}
    </div>
    <div class="section-title" style="color:#4ea64f">Flash cards</div>
    <div class="decks">
      ${deck("HCI II — Usability Heuristics","General Studies","24 cards · 18 mastered",75,"▤",true)}
      ${deck("Discrete Math — Set Theory","Mathematics","32 cards · 20 mastered",63,"▤")}
      ${deck("DBS — SQL Joins Summary","Programming","20 cards · 14 mastered",70,"▤")}
    </div>
  </div>`,"practice");
}
function practiceStat(icon,value,label){return `<div class="card practice-stat"><div class="stat-icon">${icon}</div><div><div class="value bold" style="font-size:22px">${value}</div><div class="text-xs muted">${label}</div></div></div>`}
function deck(title,tag,meta,pct,icon,primary=false){return `<div class="card deck"><div class="deck-cover">${icon}</div><div class="deck-body"><h3>${title}</h3><span class="tag">${tag}</span><div class="deck-meta">${meta}</div><div class="progress-head"><span class="muted">Mastery</span><span class="muted">${pct}%</span></div><div class="bar"><span style="width:${pct}%"></span></div><button class="btn btn-primary" onclick="${primary?"startPractice()":"showToast('Demo deck opened.')"}">Start Practice</button></div></div>`}
function startPractice(){state.flashIndex=0;savePage("flashcards")}
function flashcardsPage(){
  const c=flashcards[state.flashIndex%flashcards.length];
  return appLayout("Practice",`
  <div class="content">
    <div class="flash-toolbar"><button class="back-btn" onclick="savePage('practice')">← Back to Practice</button><div class="bold">HCI II — Usability Heuristics</div></div>
    <div class="flash-stage">
      <div class="flash-progress">Card ${state.flashIndex+1} of 24 · Answer</div>
      <article class="flashcard">
        <h2>${c.q}</h2>
        <p>${c.a}</p>
        <p class="answer">${c.ex}</p>
        <div class="flash-actions"><button class="btn btn-primary" style="min-width:180px" onclick="nextCard()">Next Card →</button></div>
      </article>
    </div>
  </div>`,"practice");
}
function nextCard(){state.flashIndex=(state.flashIndex+1)%flashcards.length;render()}

function profilePage(){
  const bars=[2.5,1,3,2,1.5,3.5,.5];
  const days=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  return appLayout("Profile",`
  <div class="profile-cover"></div>
  <div class="content compact">
    <div class="profile-hero"><div class="avatar" style="margin:auto">AV</div><h1>Ashley Vine</h1><div class="muted text-sm">BS Information Technology · Year 2</div><button class="btn btn-primary" style="margin-top:16px" onclick="editProfile()">✎ &nbsp; Edit Profile</button></div>
    <div class="profile-grid">
      <div class="card about-card">
        <div class="section-title" style="color:#4ea64f">About</div>
        <p>Passionate about tech and problem-solving. Currently focusing on algorithms, databases, and UI design.</p>
        <div class="about-meta"><div class="meta-row"><span class="muted">Joined</span><b>September 2023</b></div><div class="meta-row"><span class="muted">Programme</span><b>BS Info Tech</b></div><div class="meta-row"><span class="muted">Study Groups</span><b>5 active</b></div></div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:18px">${["3<br><span class='text-xs'>Subjects</span>","47<br><span class='text-xs'>Resources</span>","12<br><span class='text-xs'>Badges</span>"].map(x=>`<div style="text-align:center;background:#eaf6e7;border-radius:12px;padding:12px">${x}</div>`).join("")}</div>
      </div>
      <div class="card weekly-card">
        <div class="section-title" style="color:#4ea64f">Weekly activity <span class="tag" style="float:right">14 hrs this week</span></div>
        <div class="chart">${bars.map((v,i)=>`<div class="chart-col"><div class="chart-bar" style="height:${v/3.5*130}px"><span class="chart-val">${v}h</span></div>${days[i]}</div>`).join("")}</div>
      </div>
      <div class="profile-metrics">
        ${metric("◔","14","Day Streak","+2 this week")}
        ${metric("◷","120","Study Hours","8.5 hrs this week")}
        ${metric("◎","48","Tasks Completed","6 due this week")}
        ${metric("🏆","12","Badges Earned","2 new this month")}
      </div>
      <div class="profile-bottom">
        <div><div class="section-title" style="color:#4ea64f">Saved decks & notes</div><div class="saved-list">
          ${saved("▱","Data Structures Flashcards","Computer Science · 42 cards","68%","showToast('Flashcards opened.')")}
          ${saved("▤","Calculus Integration Notes","Mathematics · 8 pages","90%","openNotes()")}
          ${saved("▱","English Literature Terms","English · 30 cards","40%","showToast('Terms opened.')")}
        </div></div>
        <div><div class="section-title" style="color:#4ea64f">Badges</div><div class="card badges-card"><div class="badges-grid">${badge("☆","Top Scorer")}${badge("◔","14-Day Streak")}${badge("↗","Fast Learner")}${badge("▤","Bookworm")}${badge("♙","Perfect Week")}${badge("▣","30-Day Streak")}</div><hr style="border:0;border-top:1px solid var(--line);margin:20px 0"><div style="text-align:center;color:#5ca35c;font-size:12px">4 of 6 badges earned</div></div></div>
      </div>
    </div>
  </div>`,"profile");
}
function metric(icon,num,label,sub){return `<div class="metric-box"><div>${icon}</div><div class="metric-num">${num}</div><div class="bold text-sm">${label}</div><div class="text-xs">${sub}</div></div>`}
function saved(icon,title,sub,pct,action){return `<div class="saved-row"><div class="saved-icon">${icon}</div><div><div class="saved-title">${title}</div><div class="saved-sub">${sub}</div><div class="bar" style="margin-top:8px"><span style="width:${pct}"></span></div></div><div class="text-xs bold muted">${pct}</div><button class="open-link" onclick="${action}">Open</button></div>`}
function badge(icon,label){return `<div class="badge"><div class="badge-icon">${icon}</div>${label}</div>`}
function editProfile(){openModal(`<div class="modal small"><h3>Edit Profile</h3><p>Update your student profile information.</p><div class="modal-field"><label>Name</label><input value="Ashley Vine"></div><div class="modal-field"><label>Programme</label><input value="BS Information Technology"></div><div class="modal-actions"><button class="btn btn-soft" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="closeModal();showToast('Profile updated.')">Save</button></div></div>`)}

function libraryPage(){
  return appLayout("Resource Library",`
  <div class="content">
    <div class="page-heading"><div><h1>Resource Library</h1><p>Your saved notes, decks, and study materials</p></div><button class="btn btn-primary" onclick="saveSharedResource()">＋ Save shared resource</button></div>
    <div class="library-grid">${resources.map(r=>`<div class="card resource-card"><div class="resource-icon">${r[0]}</div><h3>${r[1]}</h3><p>${r[2]}</p><div class="progress-head"><span>Progress</span><span>${r[3]}</span></div><div class="bar"><span style="width:${r[3]}"></span></div><div class="resource-actions"><button class="btn btn-soft" onclick="${r[1].includes("Calculus")?"openNotes()":"showToast('Resource opened.')"}">Open</button><button class="btn btn-primary" onclick="saveSharedResource()">Save</button></div></div>`).join("")}</div>
  </div>`,"library");
}

function groupsPage(){
  return appLayout("Study Groups",`
  <div class="content">
    <div class="page-heading"><div><h1>Study Groups</h1><p>Study together, share files, and schedule review sessions</p></div><button class="btn btn-primary" onclick="openCreateGroup()">＋ Create group</button></div>
    <div class="groups-grid">
      ${state.groups.map(g=>`<div class="card group-card"><div class="group-icon">${g.emoji}</div><h3>${g.name}</h3><p>${g.members} members · Shared study space</p><div class="group-upcoming"><span class="muted">Upcoming</span><h3 style="margin:7px 0">Review session · Friday, 4:00 PM</h3><p>Shared files, discussion, and study reminders are available from the full Study Groups page.</p></div><div class="group-actions"><button class="btn btn-primary" onclick="openGroup('${g.name}')">Open</button><button class="btn btn-soft" onclick="showToast('Invite link copied.')">Invite</button></div></div>`).join("")}
      <div class="card group-card" style="display:grid;place-items:center;text-align:center;min-height:300px;border-style:dashed"><div><div class="group-icon" style="margin:auto">＋</div><h3>Create another group</h3><p>Start a focused space for classmates.</p><button class="btn btn-primary" onclick="openCreateGroup()">Create group</button></div></div>
    </div>
  </div>`,"groups");
}

function openQuickAdd(){
  openModal(`<div class="modal small"><h3>Quick Add</h3><p>Choose what you want to add to Schola.</p><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:25px">
    <button class="btn btn-soft" style="min-height:90px" onclick="closeModal();addTask()">✓<br>Task</button>
    <button class="btn btn-soft" style="min-height:90px" onclick="closeModal();saveSharedResource()">▱<br>Resource</button>
    <button class="btn btn-soft" style="min-height:90px" onclick="closeModal();openCreateGroup()">♧<br>Study Group</button>
  </div><div class="modal-actions"><button class="btn btn-primary" onclick="closeModal()">Close</button></div></div>`);
}
function openCreateGroup(){
  openModal(`<div class="modal">
    <h2>Create Study Group</h2><p>Start a focused space for classmates to study and share files.</p>
    <div class="modal-field"><label>Group Name</label><input id="group-name" placeholder="e.g. Database Systems Review"></div>
    <div class="modal-field"><label>Subject</label><input id="group-subject" value="Computer Science"></div>
    <div class="modal-field"><label>Description</label><input id="group-desc" value="Weekly review sessions and shared notes"></div>
    <div class="modal-actions"><button class="btn btn-soft" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="createGroup()">Create group</button></div>
  </div>`);
}
function createGroup(){
  const name=document.getElementById("group-name").value.trim();
  if(!name){showToast("Enter a group name.");return}
  state.groups.push({name,emoji:"📚",members:1});closeModal();savePage("groups");showToast("Study group created.");
}
function openGroup(name){
  const g=state.groups.find(x=>x.name===name)||state.groups[0];
  openModal(`<div class="modal small"><h2>${g.emoji} ${g.name}</h2><p>${g.members} members · Shared study space</p><div class="notes-box" style="min-height:220px"><div class="muted">Upcoming</div><h3 style="font-size:27px;margin-top:10px">Review session · Friday, 4:00 PM</h3><p>Shared files, discussion, and study reminders are available from the full Study Groups page.</p></div><div class="modal-actions" style="justify-content:flex-start"><button class="btn btn-primary" onclick="closeModal()">Close</button></div></div>`)
}
function openNotes(){
  openModal(`<div class="modal">
    <h2>Calculus Integration Notes</h2><p>Mathematics · 8 pages · Last opened today</p>
    <div class="notes-box"><h3>Integration by Parts</h3><div class="formula">Formula: ∫u dv = uv − ∫v du</div><p style="color:var(--ink)">Example: ∫x eˣ dx = x eˣ − eˣ + C</p><p>Use integration by parts when the integrand is a product of functions and one factor becomes simpler when differentiated. A common strategy is to choose u using the LIATE guideline: Logarithmic, Inverse trigonometric, Algebraic, Trigonometric, Exponential.</p></div>
    <div class="modal-actions"><button class="btn btn-soft" onclick="closeModal()">Close</button><button class="btn btn-primary" onclick="markReviewed()">Mark reviewed</button></div>
  </div>`)
}
function markReviewed(){state.reviewedNotes=true;closeModal();showToast("Calculus Integration Notes marked reviewed.")}
function saveSharedResource(){
  state.savedResource=true;
  openModal(`<div class="modal small"><h2>Saved to your library</h2><p>The shared resource is now available from your profile and Resource Library.</p><div class="modal-actions" style="justify-content:flex-start"><button class="btn btn-primary" onclick="closeModal()">Done</button></div></div>`)
}
function openTimer(){
  state.timerSeconds=1500;
  state.timerRunning=true;
  openTimerModal();
  clearInterval(state.timerHandle);
  state.timerHandle=setInterval(()=>{
    if(!state.timerRunning) return;
    state.timerSeconds--;
    const el=document.getElementById("timer-display");
    if(el) el.textContent=formatTime(state.timerSeconds);
    if(state.timerSeconds<=0){clearInterval(state.timerHandle);state.timerRunning=false;showToast("Focus session complete!")}
  },1000);
}
function openTimerModal(){
  openModal(`<div class="modal timer"><h2>Focus Timer</h2><p>Algorithms — Sorting · Session 2 of 4 today</p><div id="timer-display" class="timer-big">${formatTime(state.timerSeconds)}</div><p class="timer-copy">Stay focused. Your session is ready to begin.</p><div style="margin-top:40px"><button class="btn btn-primary" onclick="endSession()">End session</button></div></div>`)
}
function formatTime(s){const m=Math.floor(s/60).toString().padStart(2,"0");const sec=(s%60).toString().padStart(2,"0");return `${m}:${sec}`}
function endSession(){clearInterval(state.timerHandle);state.timerRunning=false;closeModal();showToast("Focus session ended.")}

function openModal(html){
  const root=document.getElementById("modal-root");root.innerHTML=html;root.classList.add("open");root.setAttribute("aria-hidden","false")
}
function closeModal(){const root=document.getElementById("modal-root");root.classList.remove("open");root.setAttribute("aria-hidden","true");setTimeout(()=>root.innerHTML="",180)}
function showToast(msg){
  const root=document.getElementById("toast-root");
  const el=document.createElement("div");el.className="toast";el.textContent=msg;root.appendChild(el);
  setTimeout(()=>el.remove(),2600)
}
document.addEventListener("keydown",e=>{if(e.key==="Escape") closeModal()});
document.addEventListener("click",e=>{if(e.target && e.target.id==="modal-root") closeModal()});
render();
