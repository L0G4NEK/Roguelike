
const logout = document.getElementById('logout');
const mainMenu = document.getElementById('mainMenu');

const auth = firebase.auth();

const goToMainMenu = () => {
    window.location.assign('./mainpage');
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
