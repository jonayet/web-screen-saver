(function () {
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
        $.blockUI({
            fadeIn: 1000,
            constrainTabKey: true,
            ignoreIfBlocked: true,
            bindEvents: true,
            focusInput: true,
            baseZ: 5,
            fadeOut: 1000,
            message: '<div> <div id="screen-clock">' + getClockTime() + '</div></div>',
            centerY: 0,
            css: {
                position: 'fixed',
                width: '100%',
                height: '100%',
                top: '0px',
                left: '0px',
                cursor: '',
                border: 'none',
                backgroundColor: 'gainsboro',
                opacity: 0.6,
                zIndex: 6
            },
            overlayCSS: {
                opacity: 0,
            },
            onOverlayClick: $.unblockUI,
            onBlock: startClockInterval,
            onUnblock: stopClockInterval
        });
    }

    function stopScreenSaver() {
        $.unblockUI();
    }

    $(function () {
        $.idleTimer(1000);
        $(document).on('idle.idleTimer', function (e, elem, obj) {
            e.stopPropagation();
            startScreenSaver();            
        });
        $(document).on('active.idleTimer', function (e, elem, obj, triggerevent) {
            stopScreenSaver();
        });
    });
})();