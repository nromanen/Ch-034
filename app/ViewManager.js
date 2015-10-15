define(function(require){

    ViewManager = function() {
        var currentView;
        
        function showView(view) {

            disposeView(currentView, function () {
                render(view);
            });
        }

        function disposeView(view, callback) {
            if (!view) {
                return callback();
            }

            _disposeView(view);
            return callback();
        }

        function _disposeView(view) {
            if (view.subviews) _.each(view.subviews, function (subview) {
                _disposeView(subview);
            });

            view.remove();
        }

        function render(view) {
            currentView = view;
            currentView.render();
        }

        return {
            show: showView
        };
    };

    return ViewManager;
});