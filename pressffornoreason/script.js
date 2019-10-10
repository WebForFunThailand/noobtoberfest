const init = () => {
    window.counter = 0
    window.time = 60.00
    window.start = false
    window.highScore = +window.localStorage.getItem('highscore') || 0
    window.buttonMode = "start"
    document.querySelector("#timer").innerHTML = `time : 60`
    document.querySelector("#counter").innerHTML = `F pressed : ${window.counter}`
    document.querySelector("#fps").innerHTML = "F per sec : 0.000"
    document.querySelector("#hs").innerHTML = `highscore : ${window.highScore}`
}
const reset = () => {
    init()
    clearTimeout(window.guide)
    clearInterval(window.countdown)
    clearInterval(window.persec)
    document.querySelector("#msg").style.display = "none"
}
const start = () => {
    window.start = true
    window.countdown = setInterval(() => {
        window.time -= 0.01
        document.querySelector("#timer").innerHTML = `time : ${window.time.toFixed(3)}`
        if (window.time <= 0) {
            window.start = false
            clearInterval(window.countdown)
            clearInterval(window.persec)
            document.querySelector("#timer").innerHTML = "times up"
            window.guide = setTimeout(() => {
                document.querySelector("#msg").style.display = "inline"
            }, 3000)
            if(window.counter > window.highScore) window.localStorage.setItem('highscore', window.counter);
        }
        if (isFinite(window.counter / (60 - window.time).toFixed(3)))
            document.querySelector("#fps").innerHTML = 
            `F per sec :  ${(window.counter/(60-window.time)).toFixed(3)}`
    }, 10)
}
document.addEventListener('keydown', e => {
    if (e.key.toLowerCase() === "f") window.start ? document.querySelector("#counter").innerHTML = `F pressed : ${++window.window.counter}` : start()
    if (e.key.toLowerCase() === "r" && window.start) reset()
})
document.querySelector("#img").addEventListener("mousedown", () => {
    window.start ? document.querySelector("#counter").innerHTML = `F pressed : ${++window.window.counter}` : start()
    window.resetTimer = setTimeout(reset, 1500)
    console.log("down")
})
document.body.addEventListener("mouseup", () => {if (window.resetTimer) clearTimeout(window.resetTimer)})
init()