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
	$('#b_chart').click(drawQuarters);
	$(document).keypress(function(e){if(e.keyCode == 32) {runNextGen()}});

});

function runNextGen(){
	if(!maze.solved){
		maze.clear();
		console.clear();
		console.log('Gen #'+pop.generation);
		pop.battle(maze);
		
		//results
		console.log('/// Population Scorecard');
		console.log('Size : ' + pop.size);
		console.log('Avg Score : ' + pop.avg_fit);

		//best one
		console.log('/// Best One Scorecard');
		var b = pop.best;
		console.log('Score : '+b.fitness);
		console.log(JSON.stringify(b.genome.dna));
		console.log(b.arriving);
		maze.printIndiv(b);
		drawQuarters();
		maze.solved = (b.fitness == 1);
		
		//Pop living its life
		pop.die();
		pop.mate();
		pop.mutate();
	}
	else{
		console.clear();
		console.log('Maze Solved');
		console.log('Gen #'+pop.generation);
		//results
		console.log('/// Population Scorecard');
		console.log('Size : ' + pop.size);
		console.log('Avg Score : ' + pop.avg_fit);

		//best one
		console.log('/// Best One Scorecard');
		var b = pop.best;
		console.log('Score : '+b.fitness);
		console.log(JSON.stringify(b.genome.dna));
		console.log(b.arriving);
		maze.printIndiv(b);
		drawQuarters();
	}
}

google.charts.load('current', {packages: ['corechart', 'bar']});

function drawQuarters() {
	var arr = pop.histoQuarter();
	console.log(arr);
	var data = google.visualization.arrayToDataTable(arr);
	var materialOptions = {
	chart: {
	  title: 'Population Percentiles'
	}
	};
	var materialChart = new google.charts.Bar(document.getElementById('chart_div'));
	materialChart.draw(data, materialOptions);
}
