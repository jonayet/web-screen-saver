(function () {
    $(function () {
        var inactiveTime = 3000;
        var slideDelay = 3000;
        var videoSlideIndex = 3;

        var options = {
            $AutoPlay: true,
            $PauseOnHover: 0,
            $Idle: slideDelay
        };
        var jssorSlider = new $JssorSlider$('jssor-slider', options);
        jssorSlider.$Pause();

        var videoPlayer = videojs("video-player");
        function playVideo(endCallback) {
            videoPlayer.play();
            videoPlayer.on("ended", function () {
                if (endCallback)
                    endCallback();
            });
        }

        function stopVideo() {
            videoPlayer.pause();
            videoPlayer.currentTime(0);
        }

        function stateChangeEventHandler(slideIndex, progress, progressBegin, idleBegin) {
            if (slideIndex === videoSlideIndex && progress === idleBegin) {
                jssorSlider.$Pause();
                playVideo(function() {
                    jssorSlider.$Play();
                });
            }
        }
        jssorSlider.$On($JssorSlider$.$EVT_STATE_CHANGE, stateChangeEventHandler);

        function getClockTime() {
            return moment().format('h:mm:ss A') + "<br>" + moment().format('Do MMMM YYYY');
        }

        var clockIntervalId;
        function startClockInterval() {
            clockIntervalId = setInterval(function() {
                $('#screen-clock').html(getClockTime());
            }, 500);
        }

        function stopClockInterval() {
            clearInterval(clockIntervalId);
        }

        function showElement(id) {
            $(id).css('visibility', 'visible');
            $(id).css('opacity', 1);
        }

        function hideElement(id) {
            $(id).css('visibility', 'hidden');
            $(id).css('opacity', 0);
        }

        function startScreenSaver() {
            showElement('#screen-cover');
            showElement('#jssor-slider');
            showElement('#screen-clock');
            $('#screen-clock').html(getClockTime());
            startClockInterval();
            jssorSlider.$Play();
        }

        function stopScreenSaver() {
            stopVideo();
            stopClockInterval();
            jssorSlider.$Pause();
            hideElement('#screen-cover');
            hideElement('#jssor-slider');
            hideElement('#screen-clock');
        }

        $.idleTimer(inactiveTime);
        $(document).on('idle.idleTimer', function() {
            startScreenSaver();
        });

        $(document).on('active.idleTimer', function() {
            stopScreenSaver();
        });

        pageVisibility.onHidden(function() {
            stopScreenSaver();
        });
    });
})();