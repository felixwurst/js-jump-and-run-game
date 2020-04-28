window.onload = function(){

    let playerNameInput = document.querySelector('#playerNameInput');
    let hiScoreInput = document.querySelector('#hiScoreInput');
    let playButton = document.querySelector('#playButton');
    let highScoreList = document.querySelector('#highScoreList');

    let hiScoreArr = [];

    playButton.addEventListener('click', function() {
        // runGame(GAME_LEVELS, DOMDisplay);
        console.log(playerNameInput.value);
        console.log(hiScoreInput.value);

        let playerName = playerNameInput.value.trim();
        let hiScore = hiScoreInput.value.trim();

        if (playerName !== '') {
            // let listItem = document.createElement('li');
            // listItem.innerText = playerName + ': ' + hiScore + ' Points';
            // highScoreList.append(listItem);

            playerNameInput.value = '';
            hiScoreInput.value = '';

            let hiScoreObj = {};
            hiScoreObj.name = playerName;
            hiScoreObj.score = hiScore;
            hiScoreArr.push(hiScoreObj);
            console.log(hiScoreArr);

            localStorage.setItem('hiScore', JSON.stringify(hiScoreArr));

            hiScoreArr = []; // ?
            highScoreList.innerHTML = '';

            // createHiScoreList();
        }
    })

    function createHiScoreList() {
        let storageData = localStorage.getItem('hiScore');
        if (storageData) {
            let dataObj = JSON.parse(storageData);
            hiScoreArr = [];
            dataObj.forEach(player => {
                hiScoreArr.push(player);
                let listItem = document.createElement('li');
                listItem.innerText = player.name + ': ' + player.score + ' Points';
                highScoreList.append(listItem);
            })
        }
    }
    createHiScoreList();


}

