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
	$('#b_chart').click(drawBasic);

});

function runNextGen(){
	maze.clear();
	console.clear();
	console.log('Gen #'+i);
	pop.battle(maze);
	
	//results
	console.log(pop.size);
	console.log(pop.avg_fit);

	//best one
	console.log('/// Best One Scorecard');
	var b = pop.best;
	console.log(b.fitness);
	console.log(JSON.stringify(b.genome.dna));
	console.log(b.arriving);
	console.log(maze.distanceToExit(b.arriving.x, b.arriving.y));
	console.log(maze.entranceToExit());
	maze.printIndiv(b);
	i++;
	
	pop.die();
	pop.mate();
	pop.mutate();
}

google.charts.load('current', {packages: ['corechart', 'bar']});
//google.charts.setOnLoadCallback(drawBasic);

function drawBasic() {
	var arr = pop.histoQuarter();
	console.log(arr);
	var data = google.visualization.arrayToDataTable(arr);

      var materialOptions = {
        chart: {
          title: 'Population of Largest U.S. Cities'
        }
      };
      var materialChart = new google.charts.Bar(document.getElementById('chart_div'));
      materialChart.draw(data, materialOptions);
}
