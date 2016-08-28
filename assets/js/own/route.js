(function () {
    var app = {
        'default': 'home',
        'menu': document.getElementById("nav"),

        // The function to start the app
        'init': function () {
            window.addEventListener('hashchange', function () {
                app.routeChange();
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
        }
    };
    window.app = app;
})();

app.init();