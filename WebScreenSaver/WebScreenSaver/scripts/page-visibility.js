(function () {
    "use_strict";

    var onVisibleEventSubscribers = [];
    var onHiddenEventSubscribers = [];
    var hidden = "hidden";

    window.pageVisibility = {};
    window.pageVisibility.onVisible = function (callback) {
        onVisibleEventSubscribers.push(callback);
    }

    window.pageVisibility.onHidden = function (callback) {
        onHiddenEventSubscribers.push(callback);
    }

    function onchange(evt) {
        var visibility;
        var v = "visible", h = "hidden";
        var evtMap = {
            focus: v,
            focusin: v,
            pageshow: v,
            blur: h,
            focusout: h,
            pagehide: h
        };

        evt = evt || window.event;
        if (evt.type in evtMap)
            visibility = evtMap[evt.type];
        else
            visibility = this[hidden] ? h : v;

        if (visibility === v) {
            onVisibleEventSubscribers.forEach(function (subscriber) {
                subscriber();
            });
        } else if (visibility === h) {
            onHiddenEventSubscribers.forEach(function (subscriber) {
                subscriber();
            });
        }
    }

    // ReSharper disable Html.EventNotResolved
    // Standards:
    if (hidden in document)
        document.addEventListener("visibilitychange", onchange);
    else if ((hidden = "mozHidden") in document)
        document.addEventListener("mozvisibilitychange", onchange);
    else if ((hidden = "webkitHidden") in document)
        document.addEventListener("webkitvisibilitychange", onchange);
    else if ((hidden = "msHidden") in document)
        document.addEventListener("msvisibilitychange", onchange);
        // IE 9 and lower:
    else if ("onfocusin" in document)
        document.onfocusin = document.onfocusout = onchange;
        // All others:
    else
        window.onpageshow = window.onpagehide
        = window.onfocus = window.onblur = onchange;

    // set the initial state (but only if browser supports the Page Visibility API)
    if (document[hidden] !== undefined)
        onchange({ type: document[hidden] ? "blur" : "focus" });
})();