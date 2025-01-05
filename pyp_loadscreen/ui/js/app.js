let muted = localStorage.getItem('loadscreen_muted') || false;

$(document).ready(function() {
    loadConfig();
    setTimeout(()=>{
        $(".loading").addClass("show");
    }, 3000);
    $(".bgtrueblack").removeClass("show");


    let loadPercentage = 0;

    const handlers = {loadProgress(data) { loadPercentage = data.loadFraction * 100 }};
    
    window.addEventListener('message', (e) => (handlers[e.data.eventName] || (() => {}))(e.data));

    setInterval(() => {
        if (loadPercentage == 100) {
            setTimeout(function() {
                $(".loading").removeClass("show");
            }, 1000);

            setTimeout(function() {
                $(".bgtrueblack").addClass("show");
            }, 2000);
        }
        $(".barra").css( "width",  loadPercentage + "%");
    }, 250);

    window.addEventListener('message', function(event) {
        if (event.action == "terminar") {
            $(".progress").fadeOut(1000);
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.which == 32) {
            muted = !muted
            document.getElementById("myVideo").muted = muted
            localStorage.setItem('loadscreen_muted', muted);
            Translate(".mute", (!muted && Config.Translates.mute || Config.Translates.unmute), true);
        }
    });
});

function loadConfig() {
    if (isImage(Config.Background)) {
        document.getElementById("myVideo").style.display = "none";
        document.body.style.backgroundImage = `url(${Config.Background})`;
    } else {
        document.body.style.backgroundImage = "none";
        document.getElementById("myVideo").src = Config.Background;
        document.getElementById("myVideo").style.display = "block";
        document.getElementById("myVideo").muted = muted
    }
    document.querySelector(".papinaservice img").src = Config.papinaservice;

    Translate(".bienvenido", Config.Translates.welcome, false);
    Translate(".loading_text", Config.Translates.loading, false);
    Translate(".web", Config.Translates.web, false);
    Translate(".mute", (!muted && Config.Translates.mute || Config.Translates.unmute), true);
}   

function isImage(url) {
    const extension = url.split('.').pop().toLowerCase();
    return Config.ImageExtensions.includes(extension);
}

function Translate(id, text, html) {
    let cm = document.querySelector(id)
    if (!html) {
        cm.innerText = text;
    } else {
        cm.innerHTML = text;
    }
}