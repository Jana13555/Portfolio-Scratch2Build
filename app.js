const themes = ['pink', 'dark', 'calm'];
const themeBtn = document.querySelector("#theme-btn")
const filterBtns = document.querySelector("#filter-btns") 
const filterBtn = document.querySelectorAll("#filter-btns button") 
const projcetCard = document.querySelectorAll("#projects article") 

const defaultPrefs = {
    theme: 'pink',
    filter: 'all',
}
let prefs = {...defaultPrefs};
try {
    prefs = JSON.parse(localStorage.getItem('prefs')) || { ...defaultPrefs };
} catch (error) {
    prefs = {...defaultPrefs};
}
if (!themes.includes(prefs.theme)) {
    prefs = {...defaultPrefs}
}

function setTheme(themeName) {
    document.documentElement.dataset.theme = themeName;
}
function savePrefs() {
    localStorage.setItem('prefs', JSON.stringify(prefs));
}
themeBtn.addEventListener('click', () => {
    const themeIndex = themes.indexOf(prefs.theme);
    const newIndex = (themeIndex + 1) % themes.length;
    prefs.theme = themes[newIndex];
    setTheme(prefs.theme);
    savePrefs();
})

function applyFilter(filterValue) {
    projcetCard.forEach(proj => {
        proj.hidden = !(filterValue == 'all' || proj.dataset.category === filterValue);
    });
    filterBtn.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter == filterValue)
    })
}

filterBtns.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return
    prefs.filter = btn.dataset.filter;
    applyFilter(prefs.filter);
    savePrefs();
})

setTheme(prefs.theme)

if (prefs.filter != 'all' || prefs.filter!= 'python' || prefs.filter!='java') {
    prefs.filter = 'all';
}
applyFilter(prefs.filter);