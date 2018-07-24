var Explorer = createReactClass({
    getInitialState: function () {
        return {
            windows: []
        }
    },
    addWindow: function (data) {
        var _data = this.state.windows;
        _data.push(data);
        this.setState({
            windows: _data
        });
    },
    items: [],
    maxIndex: 0,
    renderWindows: function () {
        this.items = [];

        this.state.windows.map(function (w) {
            if (typeof w.zIndex !== "undefined" && w.zIndex > this.maxIndex) {
                this.maxIndex = w.zIndex;
            }
        });

        this.state.windows.map(function (item, index) {
            this.items.push(
                e(ExpWindow, {
                    key: index,
                    x: item.x,
                    y: item.y,
                    w: item.w,
                    h: item.h,
                    zIndex: item.zIndex,
                    title: item.title,
                    id: item.id,
                    onStateChange: function (d) {

                        var _w = this.state.windows;
                        for (var i = 0; i < _w.length; i++) {
                            if (d.data.id === _w[i].id) {
                                console.log(_w[i]);
                                _w[i].x = d.data.x;
                                _w[i].y = d.data.y;
                                _w[i].w = d.data.w;
                                _w[i].h = d.data.h;
                                _w[i].zIndex = ++this.maxIndex;;


                                this.setState({
                                    windows: _w
                                });
                                return;
                            }

                        }
                    }.bind(this)
                }, "description")
            );
        }.bind(this));

        return this.items;
    },
    render: function () {
        return e("div", null, this.renderWindows())
    }
});

var e = React.createElement,
    explorer = ReactDOM.render(
        React.createElement(Explorer),
        document.getElementById('explorer')
    );
