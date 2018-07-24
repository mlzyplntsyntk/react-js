var windows = [{"id":"Company","title":"Company","x":20,"y":20,"w":300,"h":200}];

var remote = {
	models: [{
		name: "Users",
		columns: [{
			name: "id",
			displayName: "ID",
			type: "int"
		}, {
			name: "name",
			displayName: "Name",
			type: "string"
		}, {
			name: "surname",
			displayName: "Surname",
			type: "string"
		}, {
			name: "birthday",
			displayName: "Birthday",
			type: "date"
		}, {
			name: "role",
			displayName: "User Role",
			type: "selection",
			from: "Roles",
			format: "{name}"
		}]
	}, {
		name: "Roles",
		columns: [{
			name: "id",
			type: "int"
		},{
			name: "name",
			displayName: "Name",
			type: "string"
		}]
	}]
}