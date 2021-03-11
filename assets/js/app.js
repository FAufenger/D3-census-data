// Define SVG area dimensions
var svgWidth = 800;
var svgHeight = 600;

// Define the chart's margins as an object
var chartMargin = { top: 30, right: 30, bottom: 45, left: 30 };

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3.select("#scatterPlot")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Import data from data.csv 
d3.csv("./assets/resources/data.csv").then(function (stateData) {
    // CHeck to see what imported data looks like
    console.log(stateData);


    // Cast the hours value to a number for each piece of tvData
    stateData.forEach(function (d) {
        d.age = +d.age;
        d.smokes = +d.smokes;
    });

    // Create a linear scales for axis
    var xLinearScale = d3.scaleLinear()
        .domain([0, (d3.max(stateData, d => d.age) + 5)])
        .range([0, chartWidth]);

    var yLinearScale = d3.scaleLinear()
        .domain([0, (d3.max(stateData, d => d.smokes) + 5)])
        .range([chartHeight, 0]);

    // Create axis function
    var xAxis = d3.axisBottom(xLinearScale);
    var yAxis = d3.axisLeft(yLinearScale)  //.ticks(10);

    // Append two SVG group elements to the chartGroup area,
    // and create the bottom and left axes inside of them
    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis);

    chartGroup.append("g")
        .call(yAxis);
    

    // Create one SVG circle per piece of stateData
    // Use the linear scales to position each circle within the chart
    chartGroup.selectAll(".circle")
        .data(stateData)
        .enter()
        .append("circle") //.attr("class", "bar")
        .attr("cx", d => xLinearScale(d.age))
        .attr("cy", d => yLinearScale(d.smokes))
        .attr("r", "12")
        .attr("stroke-width", "1")
        .attr("fill", "green")
        .attr("opacity", ".6");

    // Add text to data points
    chartGroup.append("g")
        .selectAll('text')
        .data(stateData)
        .enter()
        .append("text")
        .text(d=>d.abbr)
        .attr("x",d=>xLinearScale(d.age))
        .attr("y",d=>yLinearScale(d.smokes))
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "central");


     // Add axis labels
    chartGroup.append("text")
        .attr("transform", `translate(${chartWidth / 2},  ${chartHeight + chartMargin.bottom - 5})`)
        .attr("text-anchor", "middle")
        .text("Mean Age");

    chartGroup.append("text")
        .attr("transform", `translate(${chartWidth},  1200)`)
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("smokers (%)");




}).catch(function (error) {
    console.log(error);
});




// need to use?
/*{
    "globals": {
      "d3": true
    }
  }*/