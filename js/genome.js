class Genome {
	constructor(size, dna = null){
		if(dna != null){
			this.dna = dna;
			this.size = dna.length;
		}
		else{
			this.size = size;
			this.dna = this.rdmDNA();
		}
	}

	rdmDNA(){
		var new_dna = [];
		var coin = 0;
		for(var i = 0; i < this.size; i++){
			coin = Math.random() * 4;
			new_dna.push(this.direction(coin));
		}

		return new_dna;
	}

	direction(coin){
		var dir = '';
		switch(Math.floor(coin)){
			case 0:
				dir = 'N';
				break;
			case 1:
				dir = 'E';
				break;
			case 2:
				dir = 'S';
				break;
			case 3:
				dir = 'W';
				break;
		}

		return dir;
	}
}