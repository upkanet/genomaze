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
		return (this.height - 2) * (this.width - 2);
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

				html += '<td id="cell-' + x + '-' + y + '" class="td-' + tdcl + '">'+x+' / '+y+'</td>';
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
		var path = [this.entranceCoords];
		var arriving = this.endUp(path,dna);
		var fitness = this.assessFitness(arriving);

		return {'fitness': fitness,'arriving': arriving};
	}

	assessFitness(arriving){
		return 1 - this.distanceToExit(arriving.x, arriving.y) / this.entranceToExit();
	}

	endUp(path,dna,draw = false){
		var currentCell = path[path.length - 1];
		var x = currentCell.x;
		var y = currentCell.y;

		if(draw){
			this.colorCell(x,y);
		}

		//console.log('current cell');
		//console.log(currentCell);
		//console.log(dna);

		var nc = this.nextCell(x,y,dna[0]);
		//console.log('next cell');
		//console.log(nc);
		if(!this.isCellPracticable(nc.x, nc.y) || this.isOnPreviousPath(path, nc.x, nc.y) || dna.length == 0){
			return currentCell;
		}
		else{
			//Remove DNA first direction
			var n_dna = dna.slice();
			n_dna.shift();
			//Add next point to the path
			path.push(nc);
			return this.endUp(path, n_dna, draw);
		}
	}

	isOnPreviousPath(path, nx, ny){
		var v = false;
		for(var i = 0; i < path.length; i++){
			if(path[i].x == nx && path[i].y == ny){
				v = true;
			}
		}

		return v;
	}

	isCellPracticable(x,y){
		return (this.getCellType(x,y) != 'wall' && x < this.width && y < this.height);
	}

	nextCell(x,y,direction){
		switch(direction){
			case 'N':
				return {"x": x, "y": y - 1};
				break;
			case 'S':
				return {"x": x, "y": y + 1};
				break;
			case 'W':
				return {"x": x - 1, "y": y};
				break;
			case 'E':
				return {"x": x + 1, "y": y};
				break;
		}
	}

	printIndiv(indiv){
		var d = indiv.genome.dna;
		var path = [this.entranceCoords];
		var arriving = this.endUp(path,d, true);
	}

	colorCell(x,y){
		$('#cell-'+x+'-'+y).addClass('snakecell');
	}

	clear(){
		for(var x = 0; x < this.width; x++){
			for(var y = 0; y < this.height; y++){
				$('#cell-'+x+'-'+y).removeClass('snakecell');
			}
		}
	}

}