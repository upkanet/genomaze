class Population{
	constructor(gensize = null){
		this.generation = 0;
		this.gensize = gensize;

		//death
		this.death_rate = 0.9;
		this.newborn_death_rate = 0.45;

		//mutations
		this.mutation_rate = 0.1;
	}

	populate(size = 100){
		var new_pop = [];
		for(var i=0; i < size; i++){
			var ind = new Individual(this.gensize);
			new_pop.push(ind);
		}
		this.individuals = new_pop;
		this.generation = 0;
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

	get fit(){
		var f = [];
		for(var i = 0; i < this.size; i++){
			f.push(this.individuals[i].fitness);
		}

		return f;
	}

	get avg_fit(){
		var sum = 0;
		for(var i = 0; i < this.size; i++){
			sum += this.individuals[i].fitness;
		}
		return sum / this.size;
	}

	battle(maze){
		for(var i = 0; i < this.size; i++){
			this.individuals[i].tryMaze(maze);
		}
	}

	die(){
		var n_indivs = this.individuals.slice();
		for(var i = 0; i < this.size; i++){
			if(this.individuals[i].fitness < 2 * Math.random() * this.death_rate * this.best.fitness){
				delete n_indivs.splice(i,1);
			}
		}

		this.individuals = n_indivs;
		this.generation += 1;
	}

	mate(){
		var n_indivs = this.individuals.slice();
		for(var i = 0; i < this.size; i++){
			//Find random mate with good fitness
			var j = this.findMate(Math.floor(Math.random() * this.size));

			//Make children
			var children = this.getChildren(i,j);

			//Add newborns to population
			n_indivs = n_indivs.concat(children);
		}

		this.individuals = n_indivs;
	}

	findMate(i){
		if(this.individuals[i].fitness > Math.random()){
			return i;
		}
		else{
			return this.findMate(Math.floor(Math.random() * this.size));
		}
	}

	getChildren(i,j){
		var father = this.individuals[i];
		var mother = this.individuals[j];
		var ch = [];

		var childA = new Individual(this.gensize, new Genome(this.gensize, this.mixDNA(father, mother, 'b')));
		var childB = new Individual(this.gensize, new Genome(this.gensize, this.mixDNA(father, mother, 'g')));

		if(Math.random() > this.newborn_death_rate){
			ch.push(childA);
		}
		if(Math.random() > this.newborn_death_rate){
			ch.push(childB);
		}

		return ch;
	}

	mixDNA(father, mother, gender){
		var fdna = father.genome.dna.slice();
		var mdna = mother.genome.dna.slice();
		var ndna;

		//b for boy, g for girl
		if(gender == 'b'){
			var begin = fdna.slice(0, Math.floor(this.gensize / 2));
			var end = mdna.slice(Math.floor(this.gensize / 2), this.gensize);
			ndna = begin.concat(end);
		}
		if(gender == 'g'){
			var begin = mdna.slice(0, Math.floor(this.gensize / 2));
			var end = fdna.slice(Math.floor(this.gensize / 2), this.gensize);
			ndna = begin.concat(end);
		}

		return ndna;
	}

	mutate(){
		for(var i=0; i < this.size; i++){
			this.individuals[i].mutate(this.mutation_rate);
		}
	}
}