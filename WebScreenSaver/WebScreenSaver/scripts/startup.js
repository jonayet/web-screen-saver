(function () {
    var _CaptionTransitions = [];
    _CaptionTransitions["L"] = { $Duration: 900, x: 0.6, $Easing: { $Left: $JssorEasing$.$EaseInOutSine }, $Opacity: 2 };
    _CaptionTransitions["R"] = { $Duration: 900, x: -0.6, $Easing: { $Left: $JssorEasing$.$EaseInOutSine }, $Opacity: 2 };
    _CaptionTransitions["T"] = { $Duration: 900, y: 0.6, $Easing: { $Top: $JssorEasing$.$EaseInOutSine }, $Opacity: 2 };
    _CaptionTransitions["B"] = { $Duration: 900, y: -0.6, $Easing: { $Top: $JssorEasing$.$EaseInOutSine }, $Opacity: 2 };
    var options = {
        $AutoPlay: true,
        $Idle: 3000,
        $PauseOnHover: 0,
        $CaptionSliderOptions: {
            $Class: $JssorCaptionSlider$,
            $CaptionTransitions: _CaptionTransitions,
            $PlayInMode: 1,
            $PlayOutMode: 3
        }
    };
    var jssor_slider1 = new $JssorSlider$('slider1_container', options);
    jssor_slider1.$Pause();
    $JssorPlayer$.$FetchPlayers(document.body);

    jssor_slider1.$On($JssorSlider$.$EVT_STATE_CHANGE, stateChangeEventHandler);
    function stateChangeEventHandler(slideIndex, progress, progressBegin, idleBegin, idleEnd, progressEnd)
    {
        if (slideIndex == 3 && progress == idleBegin) {
            jssor_slider1.$Pause();
            ytplayer.$Play();
            setTimeout(function () {
                ytplayer.$Quit();
                jssor_slider1.$Play();
            }, 10000);
        }
    }

    function getClockTime() {
        return moment().format('h:mm:ss A') + "<br>" + moment().format('Do MMMM YYYY');
    }

    var clockIntervalId;
    function startClockInterval() {
        clockIntervalId = setInterval(function () {
            $('#screen-clock').html(getClockTime());
        }, 500);
    }

    function stopClockInterval() {
        clearInterval(clockIntervalId);
    }

    function startScreenSaver() {
        $('#screen-cover').css('visibility', 'visible');
        $('#screen-cover').css('opacity', 0.6);

        $('#slider1_container').css('visibility', 'visible');
        $('#slider1_container').css('opacity', 1);

        $('#screen-clock').css('visibility', 'visible');
        $('#screen-clock').css('opacity', 1);
        $('#screen-clock').html(getClockTime());
        startClockInterval();
        jssor_slider1.$Play();
    }

    function stopScreenSaver() {
        stopClockInterval();
        ytplayer.$Quit();
        jssor_slider1.$Pause();
        $('#screen-cover').css('opacity', 0);
        $('#screen-cover').css('visibility', 'hidden');

        $('#slider1_container').css('visibility', 'hidden');
        $('#slider1_container').css('opacity', 0);

        $('#screen-clock').css('visibility', 'hidden');
        $('#screen-clock').css('opacity', 0);
    }

    $(function () {
        $.idleTimer(10000);
        $(document).on('idle.idleTimer', function (e, elem, obj) {
            e.stopPropagation();
            startScreenSaver();            
        });
        $(document).on('active.idleTimer', function (e, elem, obj, triggerevent) {
            stopScreenSaver();
        });
    });
})();