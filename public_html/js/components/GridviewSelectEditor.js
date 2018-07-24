
var GridviewSelectEditor = createReactClass({
	focus() {
		this.refs["main"].focus();
	},
	render: function() {
		return e("select", {
			ref: "main",
			type:"text",
			defaultValue: this.props.defaultValue,
			onChange: this.props.onChange.bind(this),
			onBlur: this.props.onBlur.bind(this),
			onKeyDown: this.props.onKeyDown.bind(this)
		});
	}
});