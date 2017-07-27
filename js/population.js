class Population{
	constructor(gensize = null){
		this.gensize = gensize;
	}

	populate(size = 100){
		var new_pop = [];
		for(var i=0; i < size; i++){
			var ind = new Individual(this.gensize);
			new_pop.push(ind);
		}
		this.individuals = new_pop;
	}

	get size(){
		return this.individuals.length;
	}

	battle(maze){
		for(var i = 0; i < this.size; i++){
			this.individuals[i].tryMaze(maze);
		}
	}

}