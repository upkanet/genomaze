class Maze {
	constructor(arr){
		//2D Array : 0 wall / 1 field / 2 entrance / 3 exit
		this.arr = arr;
		this.width = arr[0].length;
		this.height = arr.length;
	}

	find(num){
		var xt = null;
		var yt = null;

		for(var x = 0; x < this.width; x++){
			for(var y = 0; y < this.height; y++){
				if(this.arr[y][x] == num){
					xt = x;
					yt = y;
				}
			}
		}
		return {"x": xt, "y": yt};
	}

	get exitCoords(){
		return this.find(3);
	}

	get entranceCoords(){
		return this.find(2);
	}
	
	get magnitude(){
		return Math.pow(Math.max(this.height, this.width),2);
	}

	distanceToExit(x,y){
		var ex = this.exitCoords;

		return Math.sqrt(Math.pow(x - ex.x,2)+Math.pow(y - ex.y,2));
	}

	entranceToExit(){
		var entrance = this.entranceCoords;
		return this.distanceToExit(entrance.x, entrance.y);
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

				html += '<td class="td-' + tdcl + '">'+x+' / '+y+'</td>';
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

	tryDNA(dna){
		var fitness = 0;
		var x = this.entranceCoords.x;
		var y = this.entranceCoords.y;
		var arriving = this.endUp(x,y,dna);

		fitness = 1 - this.distanceToExit(arriving.x, arriving.y) / this.entranceToExit();

		return fitness;
	}

	endUp(x,y,dna){
		var nc = this.nextCoords(x,y,dna[0]);
		if(nc == null || this.getCell(nc.x, nc.y) == 0){
			return {"x": x, "y": y};
		}
		else{
			if(dna.length == 1){
				return {"x": nc.x, "y": nc.y};
			}
			else{
				var n_dna = dna.slice();
				n_dna.shift();
				return this.endUp(nc.x, nc.y, n_dna);
			}
		}
	}

	getCell(x,y){
		return this.arr[y][x];
	}

	nextCoords(x,y,direction){
		switch(direction){
			case 'N':
				if(y == 0){
					return null;
				}
				else{
					return {"x": x, "y": y - 1};
				}
				break;
			case 'S':
				if(y >= this.height - 2){
					return null;
				}
				else{
					return {"x": x, "y": y + 1};
				}
				break;
			case 'W':
				if(x == 0){
					return null;
				}
				else{
					return {"x": x - 1, "y": y};
				}
				break;
			case 'E':
				if(x >= this.width - 2){
					return null;
				}
				else{
					return {"x": x + 1, "y": y};
				}
				break;
		}
	}

}