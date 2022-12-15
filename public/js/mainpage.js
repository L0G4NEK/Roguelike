const play = document.getElementById('play');
const howToPlay = document.getElementById('howToPlay');
const achievements = document.getElementById('achievements');
const settings = document.getElementById('settings');
const logout = document.getElementById('logout');
const displayEmail = document.getElementById('displayEmail')

const auth = firebase.auth();

auth.onAuthStateChanged(user => {
    displayEmail.innerText = `Welcome, ${user.email}`
});


const startGame = () => {
    window.location.assign('./index');
}

play.addEventListener('click', startGame);

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