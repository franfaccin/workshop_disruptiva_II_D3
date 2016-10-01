

	var svg = d3.select("svg");

	var margin = {top: 20, right: 60, bottom: 30, left: 60};
	var width = +svg.attr("width") - margin.left - margin.right;
	var height = +svg.attr("height") - margin.top - margin.bottom;

	var xScale = d3.scale.ordinal()
							.rangeBands([0, width], .2)
							.domain(dados.map(function(d){
								return d[0];
							}));

	var yScale = d3.scale.linear()
							.range([height, 0])
							.domain([0, d3.max(dados, function(d){
								return d[1];
							})]);

	var xAxis = d3.svg.axis()
						.scale(xScale)
						.orient("bottom")
						// .tickValues(["A", "K", "M", "T"])
						// .tickFormat(function(d, i){
						// 	return i % 2 == 0 ? d : "";
						// })
						.tickSize(10, 2) //
						;

	var yAxis = d3.svg.axis()
						.scale(yScale)
						.orient("left")
						// .orient("right")
						.ticks(5) //
						// .tickSize(10, 2)
						.tickSize(-width, 2) //
						.tickPadding(10) //
						;

	svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")")
			.call(xAxis);

	svg.append("g")
			.attr("class", "y axis")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
			.call(yAxis);

	// eixo a direita
	// svg.append("g")
	// 		.attr("class", "y axis")
	// 		.attr("transform", "translate(" + (width + margin.left) + "," + margin.top + ")")
	// 		.call(yAxis);

	svg.append("g")
			.selectAll(".bar")
			.data(dados)
			.enter()
				.append("rect")
				.attr("class", "bar")
				.attr("x", function (d){
					return xScale(d[0]) + margin.left;
				})
				.attr("y", function(d){
					return yScale(d[1]) + margin.top;
				})
				.attr("width", xScale.rangeBand())
				.attr("height", function(d){
					return height - yScale(d[1]);
				});


function atualizar (valores) {

	var tempo = 750;

	xScale.domain(valores.map(function(d){
								return d[0];
							}));

	yScale.domain([0, d3.max(valores, function(d){
								return d[1];
							})]);

	var transition = svg.transition().duration(tempo);

	var bars = svg.selectAll("g .bar")
						.data(valores);

	bars.exit()
			.transition()
			.duration(tempo)
				.attr("y", height + margin.top)
				.attr("height", 0);

	bars.enter()
			.append("rect")
				.attr("class", "bar")
				.attr("x", 0)
				.attr("y", height + margin.top)
				.attr("width", xScale.rangeBand())
				.attr("height", 0);

	bars.transition()
		.duration(tempo)
				.attr("x", function (d){
					return xScale(d[0]) + margin.left;
				})
				.attr("y", function(d){
					return yScale(d[1]) + margin.top;
				})
				.attr("height", function(d){
					return height - yScale(d[1]);
				});

	transition.select(".x.axis")
				.call(xAxis);

	transition.select(".y.axis")
				.call(yAxis);

}

var i = 0;

function clickBtn() {
	atualizar(todosDados[++i % 3]);
}