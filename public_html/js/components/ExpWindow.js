var ExpWindow = createReactClass({
    getInitialState: function () {
        return {
            x: this.props.x,
            y: this.props.y,
            w: this.props.w,
            h: this.props.h,
            title: this.props.title,
            id: this.props.id,
            minWidth: this.props.minWidth || 100,
            minHeight: this.props.minHeight || 25
        }
    },
    setData: function (source, data) {
        this.setState(data);
        return;
        if (typeof this.props.onStateChange !== "undefined") {
            this.props.onStateChange.call(null, { source: source, data: this.state });
        }
    },
    isMoving: null,
    isResizing: null,
    mouseMove: function (e) {
        var _current = this.getCoords(e);

        if (this.isMoving != null) {
            var _x = this.isMoving.orig.x + (_current.x - this.isMoving.x),
                _y = this.isMoving.orig.y + (_current.y - this.isMoving.y);

            this.setState({
                x: _x,
                y: _y
            });
        }
        if (this.isResizing != null) {
            var _w = this.isResizing.orig.w + (_current.x - this.isResizing.x),
                _h = this.isResizing.orig.h + (_current.y - this.isResizing.y);

            if (_w < this.state.minWidth) { _w = this.state.minWidth; }
            if (_h < this.state.minHeight) { _h = this.state.minHeight; }

            this.setState({
                w: _w,
                h: _h
            });
        }
    },
    mouseUp: function (e) {
        var _source = null;

        if (this.isMoving != null) {
            _source = "moveEnd";
        } else if (this.isResizing != null) {
            _source = "resizeEnd";
        }

        this.isMoving = null;
        this.isResizing = null;
        document.body.className = "";

        if (_source != null) {
            this.fireEvent(_source);
        }
    },
    componentDidMount: function () {
        document.body.addEventListener("mousemove", this.mouseMove.bind(this), false);
        document.body.addEventListener("mouseup", this.mouseUp.bind(this), false);
    },
    componentWillUnmount: function () {
        document.body.removeEventListener("mousemove", this.mouseMove.bind(this), false);
        document.body.removeEventListener("mouseup", this.mouseUp.bind(this), false);
    },
    titleClick: function (e) {
        this.isMoving = this.getCoords(e);
        document.body.className = "no-select";
    },
    resizerClick: function (e) {
        this.isResizing = this.getCoords(e);
        document.body.className = "no-select";
    },
    bodyClick: function (e) {
        this.fireEvent("bodyClick")
    },
    fireEvent: function (source) {
        if (typeof this.props.onStateChange !== "undefined") {
            this.props.onStateChange.call(null, { source: source, data: this.state });
        }
    },
    getCoords: function (e) {
        return {
            x: e.clientX,
            y: e.clientY,
            orig: {
                x: this.state.x,
                y: this.state.y,
                w: this.state.w,
                h: this.state.h
            }
        }
    },
    render: function () {
        var _style = {
            width: this.state.w + "px",
            height: this.state.h + "px",
            top: this.state.y + "px",
            left: this.state.x + "px",
            zIndex: (this.props.zIndex || 0)
        };
        return e("div", { style: _style, className: "window-main", onMouseDown: this.bodyClick.bind(this) },
            e("div", { className: "window-resizer", onMouseDown: this.resizerClick.bind(this) }),
            e("div", { className: "window-title", onMouseDown: this.titleClick.bind(this) }, this.state.title),
            e("div", { className: "window-content", style: { height: (this.state.h - 25) + "px" } }, this.props.children))
    }
});
