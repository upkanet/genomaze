class Individual{
	constructor(gensize = null, genome = null){
		this.gensize = gensize;
		if(genome == null){
			this.genome = this.rdmGen(this.gensize);
		} else{
			this.genome = genome;
		}
		this.fitness = 0;
	}

	rdmGen(size = 15){
		var gen = new Genome(size);
		return gen;
	}

	tryMaze(maze){
		this.fitness = maze.tryDNA(this.genome.dna);
	}

	mutate(mrate){
		this.genome.mutate(mrate);
	}
}