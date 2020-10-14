var character = document.getElementById("character");
var block = document.getElementById("block");

function jump() {
    if (character.classList != "animate") {
        character.classList.add("animate");
    }

    setTimeout(function () {
        character.classList.remove("animate");

    }, 1000);
}

var checkLost = setInterval(function () {
    var characterTop =
        parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var blockLeft =
        parseInt(window.getComputedStyle(block).getPropertyValue("left"));

    if (blockLeft < 350 && blockLeft > 300 && characterTop >= 150) {

        block.style.animation = "none";
        block.style.display = "none";
        alert("Your Lose -GameOver.");
    }
}, 10);