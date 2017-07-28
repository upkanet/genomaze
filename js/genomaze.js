var maze = new Maze([
		[0,0,0,0,0,0,0,0,0,0,0],
		[0,1,1,1,0,1,0,0,1,1,0],
		[3,1,0,1,0,1,1,0,1,1,0],
		[0,1,0,1,1,1,1,1,1,1,2],
		[0,1,1,1,1,0,1,1,1,1,0],
		[0,1,0,0,0,1,1,0,0,1,0],
		[0,1,1,1,1,1,1,0,1,1,0],
		[0,0,0,0,0,0,0,0,0,0,0]
	]);

var pop = new Population(maze.magnitude);
pop.populate();
var i = 0;

$(function(){
	maze.draw('maze');
	$('#b_nextgen').click(runNextGen);
});

function runNextGen(){
	maze.clear();
	console.clear();
	console.log('Gen #'+i);
	pop.battle(maze);
	pop.die();
	pop.mate();
	pop.mutate();
	
	//results
	console.log(pop.size);
	console.log(pop.best.fitness);
	console.log(pop.avg_fit);
	maze.printIndiv(pop.best);
	i++;
}
