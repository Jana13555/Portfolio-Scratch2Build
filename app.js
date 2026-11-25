const themes = ['pink', 'dark', 'calm'];
const filters = ['all', 'python', 'java']

const themeBtn = document.querySelector("#theme-btn")
const filterBtns = document.querySelector("#filter-btns") 
const filterBtn = document.querySelectorAll("#filter-btns button") 
const projcetCard = document.querySelectorAll("#projects article") 

const contactForm = document.querySelector('#contact-form')
const formError = document.querySelector('#form-error')
const nameInput = document.querySelector('#name')
const emailInput = document.querySelector('#email')
const messageInput = document.querySelector('#message')

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
    prefs.theme = defaultPrefs.theme
}
if (!filters.includes(prefs.filter)) {
    prefs.filter = defaultPrefs.filter
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

function showMessage(text, isSuccess) {
    formError.textContent = text
    formError.classList.toggle('success', isSuccess)
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const name = nameInput.value.trim()
    const email = emailInput.value.trim()
    const message = messageInput.value.trim()

    if (name.length < 2) {
        showMessage('Please enter your name (at least 2 characters).', false)
        return
    }
    if (!email.includes('@') || !email.includes('.')) {
        showMessage('Please enter a valid email address.', false)
        return
    }
    if (message.length < 10) {
        showMessage('Your message must be at least 10 characters.', false)
        return
    }

    showMessage('Thank you! Your message was sent.', true)
    contactForm.reset()
})

setTheme(prefs.theme)
applyFilter(prefs.filter);