export const command = 
{

    startButton :
    [
        ["mainMenu", ["zIndex", 1], ["onclick", 1], ["inner", "Start"]],
        ["game", ["zIndex", -1], ["onclick", 1], ["inner", "Start"]],
        ["restartScreen"],
        ["scoreScreen", ["zIndex", -1]],
        ["helpScreen", ["zIndex", -1]],
        ["pausescreen"]
    ],
    helpButton :
    [
        ["mainMenu", ["zIndex", 1], ["onclick", 3],["inner", "Help"]],
        ["game", ["zIndex", -1]],
        ["restartScreen", ["zIndex", 1], ["onclick", 1], ["inner", "Restart"]],
        ["scoreScreen", ["zIndex", -1]],
        ["helpScreen", ["zIndex", -1]],
        ["pausescreen", ["zIndex", 1], ["onclick", 1], ["inner", "Resume"]]
    ],
    scoreButton :
    [
        ["mainMenu", ["zIndex", 1], ["onclick", 4], ["inner", "Score"]],
        ["game", ["zIndex", -1]],
        ["restartScreen"],
        ["scoreScreen", ["zIndex", -1]],
        ["helpScreen", ["zIndex", -1]],
        ["pausescreen", ["zIndex", 1], ["onclick", 0], ["inner", "Main Menu"]]
    ],
    backButton :
    [
        ["mainMenu", ["zIndex", -1], ["onclick", 0], ["inner", "Main Menu"]],
        ["game", ["zIndex", -1]],
        ["restartScreen", ["zIndex", 1]],
        ["scoreScreen", ["zIndex", 1]],
        ["helpScreen", ["zIndex", 1]],
        ["pausescreen"]
    ],
    statusButton :
    [
        ["mainMenu", ["zIndex", -1], ["onclick", 5], ["inner", "../images/pause.png"]],
        ["game", ["zIndex", 1], ["onclick", 5], ["inner", "../images/pause.png"]],
        ["restartScreen", ["zIndex", -1]],
        ["scoreScreen", ["zIndex", -1]],
        ["helpScreen", ["zIndex", -1]],
        ["pausescreen", ["zIndex", 1], ["onclick", 1], ["inner", "../images/play.png"]]
    ],
    audioButton :
    [
        ["mainMenu", ["zIndex", -1], ["onclick", false], ["inner", "../images/soundon.png"]],
        ["game", ["zIndex", 1]],
        ["restartScreen", ["zIndex", -1]],
        ["scoreScreen", ["zIndex", -1]],
        ["helpScreen", ["zIndex", -1]],
        ["pausescreen"]
    ]
}