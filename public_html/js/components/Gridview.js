var Gridview = createReactClass({
  getInitialState: function() {
    return {
      columns: this.props.columns || {},
      data: this.props.data || [],
      keyField: this.props.keyField || "id",
      selectedCellIndex: -1,
      selectedRowIndex: -1,
	  isBusy: false
    }
  },

  setData: function(data) {
    this.setState({
      data: data
    });
  },

  addRow: function(row) {
    var _data = this.state.data;
    _data.push(row);
    this.setState({
      data: _data
    })
  },

  removeRow: function(filter) {
    var _data = this.state.data;
    for (var a in filter) {
      for (var i=0; i<_data.length; i++) {
        if (_data[i][a] === filter[a]) {
          _data.splice(i, 1);
        }
      }
    }
    this.setState({data: _data});
  },

  cellClick: function(rowIndex, colIndex) {
    this.setState({
      selectedCellIndex: colIndex,
	  selectedRowIndex: rowIndex
    });
  },

  getRows: function() {
    var _rows = [];

    this.state.data.map(function(item, rowIndex) {
      var _cells = [];
	  
      this.state.columns.map(function(col, colIndex) {
		  
		  var _isSelected = this.state.selectedCellIndex === colIndex && this.state.selectedRowIndex === rowIndex;
        _cells.push(
          e("td", {
            key: colIndex,
            onClick: this.cellClick.bind(this, rowIndex, colIndex),
			className: _isSelected ? "selected": ""
          }, _isSelected ?
              e(GridviewEditor, {
                value: item[col.name],
                change: function(value, next) {
					if (value !== "asd") {
						this.cellClick(rowIndex, colIndex);
						return;
					}
                  var _data = this.state.data;
                  _data[rowIndex][col.name] = value;
                  this.setState({data: _data});
				  if (typeof next !== "undefined") {
					  next.call();
				  }
                }.bind(this),
                blur: function() {
                  this.cellClick(this.state.selectedRowIndex, -1);
                }.bind(this),
                moveNext: function() {
                  if (this.state.columns.length > colIndex + 1) {
                    this.cellClick(rowIndex, colIndex+1);
                  } else {
                    this.cellClick(this.state.selectedRowIndex, -1);
                  }
                }.bind(this),
				component: GridviewTextEditor
              }) :
              e("span", null, item[col.name].toString())
          )
        );
      }.bind(this));

      var _row = e("tr", { 
		  key: rowIndex, 
		  ref: "row_" + rowIndex,
		  className: this.state.selectedRowIndex === rowIndex ? "selected": ""
	  }, _cells);

      _rows.push(_row);

    }.bind(this));

    return _rows;
  },

  onCellValueChange: function() {
	  
  },

  getCols: function() {
    var _cols = [];
    this.state.columns.map(function(item, index) {
      _cols.push(e("th", {key:index}, item.displayName));
    }.bind(this));
    return e("tr", null, _cols);
  },

  render: function() {
    return e("table", {className: "gridview", cellPadding:"0px", cellSpacing:"0px"},
        e("thead", null, this.getCols()),
        e("tbody", null, this.getRows())
      );
  }
});
