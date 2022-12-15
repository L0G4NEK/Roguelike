const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');
const logout = document.getElementById('logout');
const mainMenu = document.getElementById('mainMenu');

const auth = firebase.auth();

const goToMainMenu = () => {
    window.location.assign('./mainPage');
}

mainMenu.addEventListener('click', goToMainMenu);

const logOut = () => {
    auth.signOut()
        .then(() => {
            window.location.assign('./signin');
        })
}

logout.addEventListener('click', logOut);

auth.onAuthStateChanged(user => {
    if(!user) {
        window.location.assign('./signin');
    }
})

//modal

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

let person = prompt("Please enter your hero name", "Hero");

if (person != null) {
    document.getElementById("heroName").innerHTML =
        person + ",";
}