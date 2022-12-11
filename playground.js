const rat =  [
    pos(getRandomPosition()),
    area(),
    solid(),
    scale(2),
    sprite("rat", {anim: "run"}),
    state('move'),
    origin("center"),
    "enemy"
]
// Spawn

function spawn(number, enemy) {
    for (let i = 0; i < number; i++) {
        enemy.pos = getRandomPosition()
        console.log(enemy = [...enemy, pos(enemy.pos)])
        add(enemy)
        console.log(enemy.pos)
    }
}

//Profile.js

const logOut = document.getElementById('logOut');
const mergeAccounts = document.getElementById('mergeAccounts');
const modifyAccount = document.getElementById('modifyAccount');
const displayNameHolder = document.getElementById('displayNameHolder');
const photoHolder = document.getElementById('photoHolder');

const auth = firebase.auth();

logOut.addEventListener('click', () => {
    //signOut() is a built in firebase function responsible for signing a user out
    auth.signOut()
        .then(() => {
            window.location.assign('../');
        })
        .catch(error => {
            console.error(error);
        })
})

//Go to modification page
modifyAccount.addEventListener('click', () => {
    window.location.assign('../edit.html');
});

//Go to merge accounts page
mergeAccounts.addEventListener('click', () => {
    window.location.assign('../merge.html');
});
