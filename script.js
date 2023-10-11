let lstPlayer = [];
let lstWiners = [];

setDivWithIdAttacheTo("accueil", "body");
setHnOrPAttacheTo("h1", "Tirage au sort", "accueil");
const accueilBtn = setHnOrPAttacheTo("h2", "Commencer", "accueil");
accueilBtn.setAttribute("onclick", "setGlobal('accueil');");

function setGlobal(str) {
    document.getElementById(str).remove();
    setDivWithIdAttacheTo("global", "body");
    setDivWithIdAttacheTo("message", "body");
    setHnOrPAttacheTo("h1", "Modes de jeu", "global");
    setDivWithIdAttacheTo("menu", "global");
    const electionBtn = setHnOrPAttacheTo("h2", "Election", "menu");
    electionBtn.id = "electionBtn";
    electionBtn.classList.add("menuBtn");
    electionBtn.setAttribute("onclick", "gameMode('election','electionBtn');");
    const rankBtn = setHnOrPAttacheTo("h2", "Classement", "menu");
    rankBtn.id = "rankBtn";
    rankBtn.classList.add("menuBtn");
    rankBtn.setAttribute("onclick", "gameMode('rank','rankBtn');");
    const questionBtn = setHnOrPAttacheTo("h2", "Questions", "menu");
    questionBtn.id = "questionBtn";
    questionBtn.classList.add("menuBtn");
    questionBtn.setAttribute("onclick", "gameMode('question','questionBtn');");
    setDivWithIdAttacheTo("container", "global");
    const electionDiv = setDivWithIdAttacheTo("election", "container");
    electionDiv.classList.add("page");
    const electionTitle = setHnOrPAttacheTo("h2", "Qui sera l'Elu?", "election");
    electionTitle.classList.add("title-game-zone");
    const rankDiv = setDivWithIdAttacheTo("rank", "container");
    rankDiv.classList.add("page");
    const rankTitle = setHnOrPAttacheTo("h2", "Qui sera sur le podium?", "rank");
    rankTitle.classList.add("title-game-zone");
    const questionDiv = setDivWithIdAttacheTo("question", "container");
    questionDiv.classList.add("page");
    const questionTitle = setHnOrPAttacheTo("h2", "Qui sera le dernier en vie?", "question");
    questionTitle.classList.add("title-game-zone");
    setDivWithIdAttacheTo("game-zone", "container");
    setDivWithIdAttacheTo("minimum-tow", "global");
    setDivWithIdAttacheTo("minimum-four", "global");
    const containerAlertParagraphe = setHnOrPAttacheTo("p", "Veuillez insérer au moins 2 joueurs pour débuter la partie.", "minimum-tow");
    containerAlertParagraphe.id = "alert-paragraphe";
    const containerAlertParagrapheFourPlayer = setHnOrPAttacheTo("p", "Veuillez insérer au moins 4 joueurs pour débuter la partie.", "minimum-four");
    containerAlertParagrapheFourPlayer.id = "alert-paragraphe";
    setDivWithIdAttacheTo("add-and-play", "global");
    const addPlayerBtn = setBtnWithClassHtmlAttacheTo("add-and-play-btn", "<i class='fa-solid fa-plus'></i>", "add-and-play");
    addPlayerBtn.id = "addplayer-btn";
    addPlayerBtn.setAttribute("onclick", "let lstPlayer = verifyPlayer('" + lstPlayer + "');");
    const PlayBtn = setBtnWithClassHtmlAttacheTo("add-and-play-btn", "<i class='fa-solid fa-play'></i>", "add-and-play");
    PlayBtn.id = "play-btn";
    const refreshBtn = setBtnWithClassHtmlAttacheTo("add-and-play-btn", "<i class='fa-solid fa-stop'></i>", "add-and-play");
    refreshBtn.id = "refresh-btn";
    refreshBtn.hidden = true;
    refreshBtn.setAttribute("onclick", "refresh()");
    gameMode("election", "electionBtn");
    displayAlertAndPlayBtn()
}

function setDivWithIdAttacheTo(id, attacheTo) {
    const newDiv = document.createElement("div");
    newDiv.id = id;
    attacheTo == "body" ? document.body.appendChild(newDiv) : document.getElementById(attacheTo).appendChild(newDiv);
    return newDiv;
}

function setHnOrPAttacheTo(hn_p, text, attacheTo) {
    if (hn_p == "h1" ||
        hn_p == "h2" ||
        hn_p == "h3" ||
        hn_p == "h4" ||
        hn_p == "h5" ||
        hn_p == "h6" ||
        hn_p == "p") {
        const title = document.createElement(hn_p);
        title.innerText = text;
        attacheTo == "body" ? document.body.appendChild(title) : document.getElementById(attacheTo).appendChild(title);
        return title;
    } else { return; }
}

function setBtnWithClassHtmlAttacheTo(className, html, attacheTo) {
    const newBtn = document.createElement("button");
    newBtn.classList.add(className);
    newBtn.innerHTML = html;
    attacheTo == "body" ? document.body.appendChild(newBtn) : document.getElementById(attacheTo).appendChild(newBtn);
    return newBtn;
}

function gameMode(classPage, idBtn) {
    if (document.getElementById(classPage).style.display == "flex") {
        return;
    } else {
        const pageSelected = document.getElementsByClassName("page");
        const btnSelected = document.getElementsByClassName("menuBtn");
        for (let i = 0; i < pageSelected.length; i++) {
            pageSelected[i].style.display = "none";
            btnSelected[i].style.backgroundColor = "";
            btnSelected[i].style.boxShadow = "";
        } document.getElementById(classPage).style.display = "";
        document.getElementById(idBtn).style.backgroundColor = "#408E91";
        document.getElementById(idBtn).style.boxShadow = "0 0 10px #408E91";
    } displayAlertAndPlayBtn();
    classPlayBtn();
}

function verifyPlayer() {
    let newPlayer = prompt("Nom du nouveau joueur\nLes caractères spésiaux ne sont pas admis");
    if (newPlayer == "" ||
        newPlayer == null ||
        newPlayer.trim() == "") {
        return;
    } if (verifyPlayerList(newPlayer.toLowerCase()) == true) {
        return;
    } if (verifyCharactere(newPlayer.toLowerCase()) == true) {
        return;
    } lstPlayer.push(newPlayer.toLowerCase());
    addPlayer(newPlayer.toLowerCase());
}

function verifyPlayerList(player) {
    for (let i = 0; i < lstPlayer.length; i++) {
        if (player == lstPlayer[i]) {
            return true;
        }
    } return false;
}

function verifyCharactere(player) {
    const Char = "&\"'\\(§!)-_°²³^$µ%£*¨`´][}{#@|<>,;:=+/.?~";
    for (let i = 0; i < player.length; i++) {
        for (let j = 0; j < Char.length; j++) {
            if (Char[j] == player[i]) {
                return true;
            }
        }
    } return false;
}

function addPlayer(player) {
    const NewDiv = setDivWithIdAttacheTo(player, "game-zone");
    NewDiv.classList.add("card");
    NewDiv.innerText = player[0].toUpperCase() + player.slice(1);
    const NewBtn = setBtnWithClassHtmlAttacheTo("minus", "<i class='fa-solid fa-minus'></i>", player);
    NewBtn.setAttribute("onclick", 'removePlayer("' + player + '");');
    displayAlertAndPlayBtn();
    classPlayBtn();
}

function removePlayer(player) {
    document.getElementById(player).remove();
    for (let i = 0; i < lstPlayer.length; i++) {
        if (lstPlayer[i] == player) {
            lstPlayer.splice(i);
        }
    } displayAlertAndPlayBtn();
    classPlayBtn();
}

function displayAlertAndPlayBtn() {
    if (document.getElementById("election").style.display == "" ||
        document.getElementById("question").style.display == "") {
        document.getElementById("minimum-four").style.display = "none";
        if (document.getElementsByClassName("card").length < 2) {
            document.getElementById("minimum-tow").style.display = "";
            document.getElementById("play-btn").style.backgroundColor = "rgba(255, 255, 255, 0.5)";
            document.getElementById("play-btn").style.color = "rgba(0, 0, 0, 0.5)";
            document.getElementById("play-btn").style.boxShadow = "none";
            document.getElementById("play-btn").style.cursor = "auto";
        } if (document.getElementsByClassName("card").length > 1) {
            document.getElementById("minimum-tow").style.display = "none";
            document.getElementById("play-btn").style.backgroundColor = "";
            document.getElementById("play-btn").style.color = "white";
            document.getElementById("play-btn").style.boxShadow = "";
            document.getElementById("play-btn").style.cursor = "";
        }
    } else {
        document.getElementById("minimum-tow").style.display = "none";
        if (document.getElementsByClassName("card").length < 4) {
            document.getElementById("minimum-four").style.display = "";
            document.getElementById("play-btn").style.backgroundColor = "rgba(255, 255, 255, 0.5)";
            document.getElementById("play-btn").style.color = "rgba(0, 0, 0, 0.5)";
            document.getElementById("play-btn").style.boxShadow = "none";
            document.getElementById("play-btn").style.cursor = "auto";
        } if (document.getElementsByClassName("card").length > 3) {
            document.getElementById("minimum-four").style.display = "none";
            document.getElementById("play-btn").style.backgroundColor = "red";
            document.getElementById("play-btn").style.color = "white";
            document.getElementById("play-btn").style.boxShadow = "";
            document.getElementById("play-btn").style.cursor = "";
        }
    }
}

function classPlayBtn() {
    if (document.getElementById("election").style.display == "" ||
        document.getElementById("question").style.display == "") {
        if (document.getElementsByClassName("card").length < 2) {
            document.getElementById("play-btn").className = "add-and-play-btn";
        } else {
            for (let i = 0; i < document.getElementsByClassName("page").length; i++) {
                if (document.getElementsByClassName("page")[i].style.display == "none") {
                    document.getElementById("play-btn").classList.remove(document.getElementsByClassName("page")[i].id);
                } if (document.getElementsByClassName("page")[i].style.display == "") {
                    document.getElementById("play-btn").classList.add(document.getElementsByClassName("page")[i].id);
                }
            }
        }
    } else {
        if (document.getElementsByClassName("card").length < 4) {
            document.getElementById("play-btn").className = "add-and-play-btn";
        } else {
            for (let i = 0; i < document.getElementsByClassName("page").length; i++) {
                if (document.getElementsByClassName("page")[i].style.display == "none") {
                    document.getElementById("play-btn").classList.remove(document.getElementsByClassName("page")[i].id);
                } if (document.getElementsByClassName("page")[i].style.display == "") {
                    document.getElementById("play-btn").classList.add(document.getElementsByClassName("page")[i].id);
                }
            }
        }
    } onclickPlyBtn();
}

function onclickPlyBtn() {
    document.getElementById("play-btn").removeAttribute("onclick")
    if (document.getElementById("play-btn").classList.contains("election")) {
        document.getElementById("play-btn").setAttribute("onclick", "playElection();");
    } if (document.getElementById("play-btn").classList.contains("rank")) {
        document.getElementById("play-btn").setAttribute("onclick", "playRank();");
    } if (document.getElementById("play-btn").classList.contains("question")) {
        document.getElementById("play-btn").setAttribute("onclick", "playQuestion();");
    }
}

function blink(index) {
    document.getElementsByClassName("card")[index].style.backgroundColor = "#245953";
    document.getElementsByClassName("card")[index].style.color = "white";
    setTimeout(() => {
        document.getElementsByClassName("card")[index].style.backgroundColor = "";
        document.getElementsByClassName("card")[index].style.color = "";
    }, 200);
}

function playElection() {
    hideBtn();
    const tirage = setInterval(() => {
        let intervalId = Math.ceil(Math.random() * document.getElementsByClassName("card").length - 1);
        blink(intervalId);
    }, 250);
    setTimeout(() => {
        clearInterval(tirage);
        let intervalId = Math.ceil(Math.random() * document.getElementsByClassName("card").length - 1);
        const winner = setInterval(() => {
            blink(intervalId);
        }, 500);
        setTimeout(() => {
            clearInterval(winner);
            setTimeout(() => {
                const playerWin = document.getElementsByClassName("card")[intervalId];
                playerWin.className = "winer";
                lstWiners.push(playerWin.id)
                setHnOrPAttacheTo("h3", "Félicitation " + playerWin.id + ", tu es l'élu!!", "message");
            }, 200);
        }, 1500);
    }, 3000);
}

function playRank() {

}

function hideBtn() {
    document.getElementById("electionBtn").removeAttribute("onclick");
    document.getElementById("rankBtn").removeAttribute("onclick");
    document.getElementById("questionBtn").removeAttribute("onclick");
    document.getElementById("play-btn").hidden = true;
    document.getElementById("addplayer-btn").removeAttribute("onclick");
    document.getElementById("addplayer-btn").style.boxShadow = "none";
    document.getElementById("addplayer-btn").style.cursor = "auto";
    document.getElementById("addplayer-btn").style.backgroundColor = "rgba(255, 255, 255, 0.5)";
    document.getElementById("addplayer-btn").style.color = "rgba(0, 0, 0, 0.5)";
    for (let i = 0; i < document.getElementsByClassName("minus").length; i++) {
        document.getElementsByClassName("minus")[i].style.backgroundColor = "rgba(125, 125, 125, 0.5)";
        document.getElementsByClassName("minus")[i].style.boxShadow = "none";
        document.getElementsByClassName("minus")[i].style.cursor = "auto";
        document.getElementsByClassName("minus")[i].removeAttribute("onclick");
    } document.getElementById("refresh-btn").hidden = false;
    document.getElementById("refresh-btn").removeAttribute("onclick");
    document.getElementById("refresh-btn").style.backgroundColor = "rgba(255, 255, 255, 0.5)";
    document.getElementById("refresh-btn").style.color = "rgba(0, 0, 0, 0.5)";
    document.getElementById("refresh-btn").style.boxShadow = "none";
    document.getElementById("refresh-btn").style.cursor = "auto";
    setTimeout(() => {
        document.getElementById("refresh-btn").style.backgroundColor = "";
        document.getElementById("refresh-btn").style.color = "";
        document.getElementById("refresh-btn").style.boxShadow = "";
        document.getElementById("refresh-btn").setAttribute("onclick", "refresh()");
        document.getElementById("refresh-btn").style.cursor = ""
    }, 5000);
}

function setMessage() {
    document.getElementById("message").remove();
    setDivWithIdAttacheTo("message", "body");
}

function refresh() {
    setMessage();
    const winer = document.getElementsByClassName("winer");
    lstWiners = [];
    while (winer.length > 0) {
        for (let i = 0; i < winer.length; i++) {
            winer[i].className = "card";
        }
    } for (let i = 0; i < document.getElementsByClassName("minus").length; i++) {
        document.getElementsByClassName("minus")[i].style.backgroundColor = "";
        document.getElementsByClassName("minus")[i].style.boxShadow = "";
        document.getElementsByClassName("minus")[i].style.cursor = "";
        document.getElementsByClassName("minus")[i].setAttribute("onclick", 'removePlayer("' + document.getElementsByClassName("card")[i].id + '");');
    }
    document.getElementById("electionBtn").setAttribute("onclick", "gameMode('election','electionBtn');");
    document.getElementById("rankBtn").setAttribute("onclick", "gameMode('rank','rankBtn');");
    document.getElementById("questionBtn").setAttribute("onclick", "gameMode('question','questionBtn');");
    document.getElementById("play-btn").hidden = false;
    document.getElementById("addplayer-btn").setAttribute("onclick", "let lstPlayer = verifyPlayer('" + lstPlayer + "');");
    document.getElementById("addplayer-btn").style.backgroundColor = "";
    document.getElementById("addplayer-btn").style.color = "";
    document.getElementById("addplayer-btn").style.boxShadow = "";
    document.getElementById("addplayer-btn").style.cursor = "";
    document.getElementById("refresh-btn").hidden = true;
    displayAlertAndPlayBtn();
    classPlayBtn();
}