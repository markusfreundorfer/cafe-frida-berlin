(function () {
    var app = {
        'default': 'home',
        'menu': document.getElementById("nav"),
        'headerEle': document.getElementsByTagName("header")[0],
        'enableScrollEventHeader': true,

        // The function to start the app
        'init': function () {
            window.addEventListener('hashchange', function () {
                app.routeChange();
            });
            window.addEventListener('scroll', function () {
                if (app.enableScrollEventHeader) {
                    app.header(false);
                }
            });


            // If there is no hash in the URL, change the URL to
            // include the default view's hash.
            if (!window.location.hash) {
                window.location.hash = app.default;
            } else {
                // Execute routeChange() for the first time
                app.routeChange();
            }
        },
        // The default view is recorded here. A more advanced implementation
        // might query the DOM to define it on the fly.
        'routeChange': function () {
            app.routeID = location.hash.slice(1);
            app.route = app.routes[app.routeID];
            app.routeElem = document.getElementById(app.routeID);
            app.route.rendered();
            app.menu.checked = app.menu.checked ? !app.menu.checked : app.menu.checked;

            // The Header needs to be shown on subpages.
            // The Scroll event which hides the Header needs to be disabled.
            if (app.routeID !== 'home') {
                app.header(true);
                app.enableScrollEventHeader = false;
            } else {
                app.enableScrollEventHeader = true;
                app.headerEle.setAttribute("class", "");
            }
        },
        // routes (i.e. views and their functionality) defined here
        'routes': {
            'cafe': {
                'rendered': function () {
                    console.log('this view is "cafe"');
                }
            },
            'menu': {
                'rendered': function () {
                    console.log('this view is "menu"');
                }
            },
            'our-story': {
                'rendered': function () {
                    console.log('this view is "story"');
                }
            },
            'home': {
                'rendered': function () {
                    console.log('this view is "home"');
                }
            }
        },

        // Shows the Frida Logo in header when scrolling down
        'header': function (force) {
            if (window.scrollY > 50 || force) {
                app.headerEle.setAttribute("class", "show");
            } else if (!force) {
                app.headerEle.setAttribute("class", "");
            }
        }
    };
    window.app = app;
})();

app.init();