var GridviewEditor = createReactClass({
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
  },
  fireChanges: function(next) {
	  if (this.props.value !== this.state.value) {
		  this.props.change.call(null, this.state.value, next);
	  } else {
		  next();
	  }
  },
  blur: function(discardChanges) {
	  if (!discardChanges) {
		  this.fireChanges(function() {
				this.props.blur.call(null)
			}.bind(this));
		  return;
	  }
    this.props.blur.call(null);
  },
  componentDidMount: function() {
    this.refs["main"].focus();
  },
  keyDown: function(e) {
    switch (e.keyCode) {
      case 27: this.blur(true); break;
      case 9:
      case 13:
        e.preventDefault();
		this.fireChanges(function() {
			this.props.moveNext.call(null)
		}.bind(this));
        break;
    }
  },
  render: function() {
    return e(this.props.component, {
      ref: "main",
      type:"text",
      defaultValue: this.state.value,
      onChange: this.change.bind(this),
      onBlur: this.blur.bind(this, false),
      onKeyDown: this.keyDown.bind(this)
    });
  }
});
