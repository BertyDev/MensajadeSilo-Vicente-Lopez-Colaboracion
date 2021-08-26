$(document).ready((function () {
    var playPause = $(".play-pause"),
        playButton = $("#play-button"),
        pauseButton = $("#pause-button"),
        nextButton = $("#next-button"),
        audioPlayer = $("#audio-player"),
        thumbnail = $("#thumbnail"),
        slider = $(".progress-bar").slider({
            step: .01
        }),
        thisSong = $(".active.playlist-item"),
        playlistItems = $(".playlist-item"),
        title = $("#title"),
        nowPlaying = $("#now-playing");

    function togglePlayPause() {
        playButton.toggleClass("d-none"), pauseButton.toggleClass("d-none")
    }

    function trackName() {
        title.html(thisSong.html())
    }

    function nextTrack(dest) {
        playButton.is(":visible") && togglePlayPause(), thisSong.toggleClass("active"), "this" !== dest && (dest = "next"), "next" === dest ? thisSong = thisSong.is(":last-child") ? $(".playlist-item").first() : thisSong.next() : "this" === dest && (thisSong = $(this)), audioPlayer[0].pause(), thisSong.toggleClass("active"), trackName(), audioPlayer.attr("src", thisSong.attr("audio_url")), thumbnail.attr("src", thisSong.attr("img_url")), audioPlayer[0].currentTime = 0, audioPlayer[0].play()
    }
    playPause.click((function () {
        !0 === audioPlayer[0].paused ? (audioPlayer[0].play(), togglePlayPause(), trackName(), nowPlaying.slideDown()) : (audioPlayer[0].pause(), togglePlayPause())
    })), $(".progress-bar").slider(), audioPlayer.on("timeupdate", (function () {
        slider.slider("option", "value", this.currentTime / this.duration * 100)
    })), slider.on("slidestop", (function (event, ui) {
        var newTime = ui.value / 100 * audioPlayer[0].duration;
        audioPlayer[0].currentTime = newTime
    })), audioPlayer.attr("src", thisSong.attr("audio_url")), nextButton.click((function () {
        audioPlayer[0].pause(), nextTrack()
    })), playlistItems.click((function () {
        nowPlaying.slideDown(), audioPlayer[0].paused && togglePlayPause(), audioPlayer[0].pause(), nextTrack.call(this, "this")
    })), audioPlayer.bind("ended", (function () {
        nextTrack(Pause)
    }))
}));