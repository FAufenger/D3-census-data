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
    
});




// need to use?
/*{
    "globals": {
      "d3": true
    }
  }*/  