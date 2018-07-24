var Gridview = createReactClass({
  getInitialState: function() {
    return {
      columns: this.props.columns || {},
      data: [],
      keyField: this.props.keyField || "id",
      selectedCell: "",
      selectedRow: ""
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
      selectedCell: rowIndex + "_" + colIndex
    });
  },

  getRows: function() {
    var _rows = [];

    this.state.data.map(function(item, rowIndex) {

      var _cells = [];

      this.state.columns.map(function(col, colIndex) {

        _cells.push(
          e("td", {
            key: colIndex,
            onClick: this.cellClick.bind(this, rowIndex, colIndex)
          }, this.state.selectedCell === rowIndex + "_" + colIndex ?
              e(GridViewEditor, {
                value: item[col],
                change: function(value) {
                  var _data = this.state.data;
                  _data[rowIndex][col] = value;
                  this.setState({data: _data});
                }.bind(this),
                blur: function() {
                  this.setState({ selectedCell: "" })
                }.bind(this),
                moveNext: function() {
                  if (this.state.columns.length > colIndex + 1) {
                    this.cellClick(rowIndex, colIndex+1);
                  } else {
                    this.setState({ selectedCell: "" })
                  }
                }.bind(this)
              }) :
              e("span", null, item[col])
          )
        );

      }.bind(this));

      var _row = e("tr", { key: rowIndex, ref: "row_" + rowIndex }, _cells);

      _rows.push(_row);

    }.bind(this));

    return _rows;
  },

  getCols: function() {
    var _cols = [];
    this.state.columns.map(function(item, index) {
      _cols.push(e("th", {key:index}, item));
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
