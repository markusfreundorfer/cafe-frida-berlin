(function () {
    var app = {
        'default': 'home',
        'menu': document.getElementById("nav"),
        'headerEle': document.getElementsByTagName("header")[0],

        // The function to start the app
        'init': function () {
            window.addEventListener('scroll', function() {
                app.header();
            });
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
        },

        // Shows the Frida Logo in header when scrolling down
        'header': function () {
            if(window.scrollY > 50){
                app.headerEle.setAttribute("class","show");
            }else{
                app.headerEle.setAttribute("class","");
            }
        }
    };
    window.app = app;
})();

app.init();