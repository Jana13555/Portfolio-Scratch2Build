const themes = ['pink', 'dark', 'calm'];

const defaultPrefs = {
    theme: 'pink',
}
let prefs = {...defaultPrefs};
try {
    prefs = JSON.parse(localStorage.getItem('prefs')) || defaultPrefs
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
const themeBtn = document.querySelector("#theme-btn")
themeBtn.addEventListener('click', () => {
    const themeIndex = themes.indexOf(prefs.theme);
    const newIndex = (themeIndex + 1) % themes.length;
    prefs.theme = themes[newIndex];
    setTheme(prefs.theme);
    savePrefs();
})

setTheme(prefs.theme)