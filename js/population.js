class Population{
	setIn(individuals = null){
		this.individuals = individuals;
	}

	populate(size = 100){
		var new_pop = [];
		for(var i=0; i < size; i++){
			var ind = new Individual();
			new_pop.push(ind);
		}
		this.individuals = new_pop;
	}

	get size(){
		return individuals.length;
	}
}