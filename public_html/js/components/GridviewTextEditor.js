
var GridviewTextEditor = createReactClass({
	focus() {
		this.refs["main"].focus();
		this.refs["main"].select();
	},
	render: function() {
		return e("input", {
			ref: "main",
			type:"text",
			defaultValue: this.props.defaultValue,
			onChange: this.props.onChange.bind(this),
			onBlur: this.props.onBlur.bind(this),
			onKeyDown: this.props.onKeyDown.bind(this)
		});
	}
});
