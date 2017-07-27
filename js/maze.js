class Maze {
	constructor(arr){
		//2D Array : 0 wall / 1 field / 2 entrance / 3 exit
		this.arr = arr;
		this.width = arr[0].length;
		this.height = arr.length;
	}

	get exitCoords(){
		var xe = null;
		var ye = null;

		for(var x = 0; x < this.width; x++){
			for(var y = 0; y < this.height; y++){
				if(this.arr[y][x] == 3){
					xe = x;
					ye = y;
				}
			}
		}
		return {"x": xe, "y": ye};
	}

	distanceToExit(x,y){
		var ex = this.exitCoords;

		return Math.sqrt(Math.pow(x - ex.x,2)+Math.pow(y - ex.y,2));
	}

	getCellType(x,y){
		var content = this.arr[y][x];
		var type = null;

		switch(content){
			case 0:
				type = 'wall';
				break;
			case 1:
				type = 'field';
				break;
			case 2:
				type = 'entrance';
				break;
			case 3:
				type = 'exit';
				break;
		}

		return type;
	}

	get html(){
		var html = '';
		var tdcl = '';

		html += '<table class="maze-table">';
		
		for(var y = 0; y < this.height; y++){
			html += '<tr>';
			for(var x = 0; x < this.width; x++){
				tdcl = this.getCellType(x,y);

				html += '<td class="td-' + tdcl + '">&nbsp;</td>';
			}
			html += '</tr>';
		}

		html += '</table>';

		return html;
	}

	draw(idMaze){
		var html = this.html;
		$('#'+idMaze).html(html);
	}

}