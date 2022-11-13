// import yuraPlayer from "./yuraPlayer";
import "../css/yuraStyle.css"
(async function() {
    import('./yuraPlayer').then(function(yuraPlayer) {
        yuraPlayer.default()
    })
})()