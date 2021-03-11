// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = { top: 30, right: 30, bottom: 30, left: 30 };

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3.select("scatterPlot")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Import data from data.csv 
d3.csv("./assets/resources/data.csv").then(function(stateData) {
    // CHeck to see what imported data looks like
    console.log(stateData);
    
  /*
  // Cast the hours value to a number for each piece of tvData
  stateData.forEach(function(d) {
    d.hours1 = +d.hours1;
    d.hours2 = +d.hours2;
  });
  
  // Create a linear scales for axis
  var xLinearScale = d3.scaleLinear()
    .domain([0, d3.max(stateData, d => d.hours)])
    .range([chartHeight, 0]);
  
  var yLinearScale = d3.scaleLinear()
  .domain([0, d3.max(stateData, d => d.hours)])
  .range([chartHeight, 0]);

  // Create axis function
  var bottomAxis = d3.axisBottom(xBandScale);
  var leftAxis = d3.axisLeft(yLinearScale).ticks(10);  

  // Append two SVG group elements to the chartGroup area,
  // and create the bottom and left axes inside of them
  chartGroup.append("g")
    .call(leftAxis);

  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

  // Create one SVG rectangle per piece of tvData
  // Use the linear and band scales to position each rectangle within the chart
  chartGroup.selectAll(".circle")
    .data(stateData)
    .enter()
    .append("circle")
    .attr("class", "bar")
    .attr("cx", d => xLinearScale(d.name))
    .attr("cy", d => yLinearScale(d.hours))
    .attr("r", "12")
    .attr("fill", "green")
    .attr("opacity", ".6");  


  */

}).catch(function(error) {
    console.log(error);
  });




// need to use?
/*{
    "globals": {
      "d3": true
    }
  }*/  