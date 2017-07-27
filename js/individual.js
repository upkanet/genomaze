class Individual{
	constructor(gensize = null){
		this.gensize = gensize;
		this.genome = this.rdmGen(this.gensize);
		this.fitness = 0;
	}

	rdmGen(size = 15){
		var gen = new Genome(size);
		return gen;
	}

	tryMaze(maze){
		this.fitness = maze.tryDNA(this.genome.dna);
	}
}