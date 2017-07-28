class Population{
	constructor(gensize = null){
		this.gensize = gensize;
		this.death_rate = 0.5;
		this.mutation_rate = 0.02;
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

	get best(){
		var b,f;
		var m = 0;
		for(var i = 0; i < this.size; i++){
			f = this.individuals[i].fitness;
			if(f > m){
				b = this.individuals[i];
				m = f;
			}
		}

		return b;
	}

	battle(maze){
		for(var i = 0; i < this.size; i++){
			this.individuals[i].tryMaze(maze);
		}
	}

	die(){
		var n_indivs = this.individuals.slice();
		for(var i = 0; i < this.size; i++){
			if(this.individuals[i].fitness < Math.random() * this.death_rate * this.best.fitness){
				console.log('#'+i + ' / death : ' + this.individuals[i].fitness);
				delete n_indivs.splice(i,1);
			}
		}

		this.individuals = n_indivs;
	}
}