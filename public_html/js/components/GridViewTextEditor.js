var GridViewTextEditor = createReactClass({
  getInitialState: function() {
    return {
      value: this.props.value
    }
  },
  getValue: function() {
    return this.state.value;
  },
  focus: function() {
    this.refs["main"].focus();
  },
  change: function(e) {
    this.setState({
      value: e.target.value
    });
    this.props.change.call(null, e.target.value);
  },
  blur: function(e) {
    this.props.blur.call(null);
  },
  componentDidMount: function() {
    this.refs["main"].focus();
    this.refs["main"].select();
  },
  keyDown: function(e) {
    switch (e.keyCode) {
      case 27: this.blur(); break;
      case 9:
      case 13:
        e.preventDefault();
        this.props.moveNext.call(null);
        break;
    }
  },
  render: function() {
    return e("input", {
      ref: "main",
      type:"text",
      defaultValue: this.state.value,
      onChange: this.change.bind(this),
      onBlur: this.blur.bind(this),
      onKeyDown: this.keyDown.bind(this)
    });
  }
});
