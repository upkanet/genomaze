class Individual{
	constructor(){
		this.genome = this.rdmGen();
		this.fitness = 0;
	}

	rdmGen(size = 15){
		var gen = new Genome(size);
		return gen;
	}
}