var svg = d3.select("svg");

var margin = {top: 20, right: 60, bottom: 30, left: 60};
var width = +svg.attr("width") - margin.left - margin.right;
var height = +svg.attr("height") - margin.top - margin.bottom;

var raio = 4;

var xScale = d3.scale.ordinal()
						.rangePoints([0, width], 1)
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

var line = d3.svg.line()
					.interpolate("linear")
					.x(function(d){
						return xScale(d[0]) + margin.left;
					})
					.y(function(d){
						return yScale(d[1]) + margin.top;
					});


svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")")
		.call(xAxis);

svg.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		.call(yAxis);

svg.append("g")
		.append("path")
			.attr("class", "path line")
			.attr("d", line(dados));

svg.append("g")
		.selectAll(".dot")
		.data(dados)
		.enter()
			.append("circle")
			.attr("class", "dot")
			.attr("cx", line.x())
			.attr("cy", line.y())
			.attr("r", raio);