(function() {
    'use strict';

    var UV_KEY = 'liming_visitor_uv';
    var PV_KEY = 'liming_visitor_pv';
    var UV_FLAG = 'liming_uv_counted';
    var INITIAL_UV = 1055;
    var INITIAL_PV = 4350;

    function init() {
        // Initialize UV if not set
        if (localStorage.getItem(UV_KEY) === null) {
            localStorage.setItem(UV_KEY, String(INITIAL_UV));
        }
        // Initialize PV if not set
        if (localStorage.getItem(PV_KEY) === null) {
            localStorage.setItem(PV_KEY, String(INITIAL_PV));
        }

        // Count unique visitor (only once per browser)
        if (!localStorage.getItem(UV_FLAG)) {
            var uv = parseInt(localStorage.getItem(UV_KEY), 10) + 1;
            localStorage.setItem(UV_KEY, String(uv));
            localStorage.setItem(UV_FLAG, '1');
        }

        // Count page view (every load)
        var pv = parseInt(localStorage.getItem(PV_KEY), 10) + 1;
        localStorage.setItem(PV_KEY, String(pv));

        // Update DOM
        updateDisplay();
    }

    function updateDisplay() {
        var uvEl = document.getElementById('visitor-uv');
        var pvEl = document.getElementById('visitor-pv');
        if (uvEl) uvEl.textContent = localStorage.getItem(UV_KEY);
        if (pvEl) pvEl.textContent = localStorage.getItem(PV_KEY);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
