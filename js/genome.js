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
		for(var i = 0; i < this.size; i++){
			new_dna.push(this.rdmDir());
		}

		return new_dna;
	}

	mutate(mrate){
		for(var i = 0; i < this.size; i++){
			if(Math.random() < mrate){
				this.dna[i] = this.rdmDir();
			}
		}
	}

	rdmDir(){
		var r = Math.floor(4 * Math.random());
		
		var dir = '';
		switch(r){
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