class Individual{
	constructor(gensize = null, genome = null){
		this.gensize = gensize;
		if(genome == null){
			this.genome = this.rdmGen(this.gensize);
		} else{
			this.genome = genome;
		}
		this.fitness = 0;
		this.arriving = null;
	}

	rdmGen(size = 15){
		var gen = new Genome(size);
		return gen;
	}

	tryMaze(maze){
		var maze_result = maze.tryDNA(this.genome.dna);
		this.fitness = maze_result.fitness;
		this.arriving = maze_result.arriving;
	}

	mutate(mrate){
		this.genome.mutate(mrate);
	}
}