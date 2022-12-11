const play = document.getElementById('play');
const achievements = document.getElementById('achievements');
const settings = document.getElementById('settings');
const logout = document.getElementById('logout');

const auth = firebase.auth();

const startGame = () => {
    window.location.assign('./index');
}

play.addEventListener('click', startGame);

const logOut = () => {
    auth.signOut()
    .then(() => {
        window.location.assign('../');
    })
}

logout.addEventListener('click', logOut);