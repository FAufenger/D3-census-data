// Assign Plot to responsive function 
function makeResponsive() {
    
    ///////////////////////////////////////////////////
    //   Clean area and set basic chart parameters   //
    ///////////////////////////////////////////////////

    // if the SVG area isn't empty when the browser loads,
    // remove it and replace it with a resized version of the chart
    var svgArea = d3.select("#scatterPlot").select("svg");

    if (!svgArea.empty()) {
        svgArea.remove();
    }

    // Define SVG area dynamis dimensions
    var svgHeight = (window.innerHeight) - 150;
    var svgWidth = (window.innerWidth) - 250;

    // Define the chart's margins as an object
    var chartMargin = { top: 30, right: 30, bottom: 145, left: 145 };

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

    // Select preset variables
    var xSelect = "age";
    var ySelect = "smokes";

    /////////////////////////////////////////////////////
    //   Functions to call when updating axis choice   //
    /////////////////////////////////////////////////////

    // Create a dynamic function for linear scale for axis
    // X axis
    function xScale(stateData, xSelect) {
        var xLinearScale = d3.scaleLinear()
            .domain([(d3.min(stateData, d => d[xSelect]) - 1), (d3.max(stateData, d => d[xSelect]) + 1)])
            .range([0, chartWidth]);
        return xLinearScale;
    };
    // Y axis
    function yScale(stateData, ySelect) {
        var yLinearScale = d3.scaleLinear()
            .domain([(d3.min(stateData, d => d[ySelect]) - 1), (d3.max(stateData, d => d[ySelect]) + 1)])
            .range([chartHeight, 0]);
        return yLinearScale;
    };

    // Create axis as a function for update
    // X axis create
    function renderXaxis(newXScale, xAxis) {
        var bottomAxis = d3.axisBottom(newXScale);

        xAxis.transition()
            .duration(1000)
            .call(bottomAxis);

        return xAxis;
    };
    // Y Axis create
    function renderYaxis(newYScale, yAxis) {
        var leftAxis = d3.axisLeft(newYScale)  //.ticks(10);

        yAxis.transition()
            .duration(1000)
            .call(leftAxis);

        return yAxis;
    };

    // function used for updating circles group with a transition to
    // new X circles
    function renderXCircles(circleGroup, newXScale, xSelect) {

        circleGroup.transition()
            .duration(1000)
            .attr("cx", d => newXScale(d[xSelect]));

        return circleGroup;
    }
    // new Y circles
    function renderYCircles(circleGroup, newYScale, ySelect) {

        circleGroup.transition()
            .duration(1000)
            .attr("cy", d => newYScale(d[ySelect]));

        return circleGroup;
    }
    // Move text abbr/ update X
    function updateXTextAbbr(textGroup, newXScale, xSelect) {

        textGroup.transition()
            .duration(1000)
            .attr("x", d => newXScale(d[xSelect]));

        return textGroup;
    };
    // Move text abbr/ update Y
    function updateYTextAbbr(textGroup, newYScale, ySelect) {

        textGroup.transition()
            .duration(1000)
            .attr("y", d => newYScale(d[ySelect]));

        return textGroup;
    };

    // function used for updating X circles group with new tooltip
    function updateXToolTip(newXScale, textGroup) {
        switch (newXScale) {
            case "age":
                var labelX = "Average Age"; break;
            case "poverty":
                var labelX = "Poverty(%)"; break;
            case "income":
                var labelX = "Avg Income($)"; break;
        }
        var toolTip = d3.tip()
            .attr("class", "tooltip")
            .offset([80, -60])
            .html(function (d) {
                return (`<b>${d.state}</b><br>${labelX}: ${d[newXScale]}<br>${ySelect}: ${d[ySelect]}`);
            });

        textGroup.call(toolTip);

        textGroup.on("mouseover", function (data) {
            toolTip.show(data, this);
        })
            // onmouseout event
            .on("mouseout", function (data, index) {
                toolTip.hide(data);
            });

        return textGroup;
    };

    // function used for updating Y circles group with new tooltip
    function updateYToolTip(newYScale, textGroup) {
        switch (newYScale) {
            case "smokes":
                var labelY = "Smokers(%)"; break;
            case "obesity":
                var labelY = "Obese(%)"; break;
            case "healthcare":
                var labelY = "No Healthcare(%)"; break;
        }

        var toolTip = d3.tip()
            .attr("class", "tooltip")
            .offset([80, -60])
            .html(function (d) {
                return (`<b>${d.state}</b><br> ${xSelect}: ${d[xSelect]}<br>${labelY}: ${d[newYScale]}`);
            });

        textGroup.call(toolTip);

        textGroup.on("mouseover", function (data) {
            toolTip.show(data, this);
        })
            // onmouseout event
            .on("mouseout", function (data, index) {
                toolTip.hide(data);
            });

        return textGroup;
    };


    /////////////////////////////////////////////
    //    Import data and Initial page load    //
    /////////////////////////////////////////////

    // Import data from data.csv 
    d3.csv("./assets/resources/data.csv").then(function (stateData) {
        // Check to see what imported data looks like
        //console.log(stateData);

        // Cast the hours value to a number for each piece of tvData
        stateData.forEach(function (d) {
            d.poverty = +d.poverty;
            d.age = +d.age;
            d.income = +d.income;
            d.healthcare = +d.healthcare;
            d.obesity = +d.obesity;
            d.smokes = +d.smokes;
        });

        // Create a dynamic linear scale for axis
        var xLinearScale = d3.scaleLinear()
            .domain([(d3.min(stateData, d => d[xSelect]) - 1), (d3.max(stateData, d => d[xSelect]) + 1)])
            .range([0, chartWidth]);

        var yLinearScale = d3.scaleLinear()
            .domain([(d3.min(stateData, d => d[ySelect]) - 1), (d3.max(stateData, d => d[ySelect]) + 1)])
            .range([chartHeight, 0]);


        // Create axis as a function
        var bottomAxis = d3.axisBottom(xLinearScale);
        var leftAxis = d3.axisLeft(yLinearScale)  //.ticks(10);


        // Append two SVG group elements to the chartGroup area,
        // and create the bottom (x) and left (y) axes inside of them
        var xAxis = chartGroup.append("g")
            .attr("transform", `translate(0, ${chartHeight})`)
            .call(bottomAxis);

        var yAxis = chartGroup.append("g")
            .call(leftAxis);


        // Create one SVG circle per piece of stateData
        // Use the linear scales to position each circle within the chart
        var circleGroup = chartGroup.selectAll(".circle")
            .data(stateData)
            .enter()
            .append("circle") //.attr("class", "cir")
            .attr("cx", d => xLinearScale(d[xSelect]))
            .attr("cy", d => yLinearScale(d[ySelect]))
            .attr("r", "14")
            .attr("stroke-width", "1")
            .attr("fill", "green")
            .attr("opacity", ".6")
            // event listener for mouseover circle color
            .on("mouseover", function () {
                d3.select(this)
                    .attr("fill", "red");
            })
            // event listener for mouseout circle color
            .on("mouseout", function () {
                d3.select(this)
                    .attr("fill", "blue");
            });

        // Add text to data points
        textGroup = chartGroup.append("g")
            .selectAll('text')
            .data(stateData)
            .enter()
            .append("text")
            .text(d => d.abbr)
            .attr("x", d => xLinearScale(d[xSelect]))
            .attr("y", d => yLinearScale(d[ySelect]))
            //.classed("sateAbbreviation" = true)
            .attr("text-anchor", "middle")
            .attr("fill", "black")
            .attr("font-size", "12px")
            .style("font-weight", "bold")
            .attr("alignment-baseline", "central");

        //////////////////////////////////////////  
        //             ToolTips:                //
        //////////////////////////////////////////
        // Step 1: Initialize Tooltip
        var toolTip = d3.tip()
            .attr("class", "tooltip")
            .offset([80, -60])
            .html(function (d) {
                return (`<b>${d.state}</b><br>Avg Age: ${d[xSelect]}<br>Smokes: ${d[ySelect]}%`);
            });
        // Step 2: Create the tooltip in chartGroup.
        textGroup.call(toolTip);
        // Step 3: Create "mouseover" event listener to display tooltip
        // // Or Could put mouse over on circle -> circleGroup.on()
        textGroup.on("mouseover", function (data) {
            toolTip.show(data, this);
        })
            // Step 4: Create "mouseout" event listener to hide tooltip
            .on("mouseout", function (data, index) {
                toolTip.hide(data);
            })


        /////////////////////////////////////
        // Labels//
        /////////////////////////////////////

        // Add X axis labels
        var xLabelsGroup = chartGroup.append("g")
            .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + chartMargin.bottom - 5})`)
            .attr("text-anchor", "middle");

        var ageLabel = xLabelsGroup.append("text")
            .attr("y", -75)
            .attr("value", "age") // value to grab for event listener
            .classed("active", true)
            .text("Mean Age");
        var povertyLabel = xLabelsGroup.append("text")
            .attr("y", -40)
            .attr("value", "poverty") // value to grab for event listener
            .classed("inactive", true)
            .text("Poverty(%)");
        var incomeLabel = xLabelsGroup.append("text")
            .attr("y", -5)
            .attr("value", "income") // value to grab for event listener
            .classed("inactive", true)
            .text("Average Household Income");

        // Add Y axis labels
        var yLabelsGroup = chartGroup.append("g")
            .attr("transform", `translate(${-30}, ${chartHeight / 2}), rotate(270)`)
            .attr("text-anchor", "middle")

        var smokersLabels = yLabelsGroup.append("text")
            .attr("y", -10)
            .attr("value", "smokes") // value to grab for event listener
            .classed("active", true)
            .text("Smokers (%)");
        var obeseLabel = yLabelsGroup.append("text")
            .attr("y", -45)
            .attr("value", "obesity") // value to grab for event listener
            .classed("inactive", true)
            .text("Obese(%)");
        var healthcareLabel = yLabelsGroup.append("text")
            .attr("y", -80)
            .attr("value", "healthcare") // value to grab for event listener
            .classed("inactive", true)
            .text("Lacks Healthcare(%)");


        //////////////////////////////////////
        //          Event Listener          //
        //////////////////////////////////////

        // x axis labels event listener
        // functions here found above csv import
        xLabelsGroup.selectAll("text")
            .on("click", function () {
                // get value of selection
                var value = d3.select(this).attr("value");

                if (value !== xSelect) {

                    // replaces chosenXAxis with value
                    xSelect = value;
                    //console.log(xSelect)

                    // Create a dynamic linear scale for X axis
                    xLinearScale = xScale(stateData, xSelect);

                    // updates x axis with transition
                    xAxis = renderXaxis(xLinearScale, xAxis);

                    // updates circles with new x values
                    circleGroup = renderXCircles(circleGroup, xLinearScale, xSelect);

                    // updates abbr
                    textGroup = updateXTextAbbr(textGroup, xLinearScale, xSelect);
                    // updates tooltips with new info
                    textGroup = updateXToolTip(xSelect, textGroup);

                    // changes classes to change bold text
                    if (xSelect === "age") {
                        ageLabel
                            .classed("active", true)
                            .classed("inactive", false);
                        povertyLabel
                            .classed("active", false)
                            .classed("inactive", true);
                        incomeLabel
                            .classed("active", false)
                            .classed("inactive", true);
                    } else if (xSelect === "poverty") {
                        ageLabel
                            .classed("active", false)
                            .classed("inactive", true);
                        povertyLabel
                            .classed("active", true)
                            .classed("inactive", false);
                        incomeLabel
                            .classed("active", false)
                            .classed("inactive", true);
                    } else {
                        ageLabel
                            .classed("active", false)
                            .classed("inactive", true);
                        povertyLabel
                            .classed("active", false)
                            .classed("inactive", true);
                        incomeLabel
                            .classed("active", true)
                            .classed("inactive", false);
                    }
                    // Check / log x selected
                    console.log(xSelect);
                };
            })

        // y axis labels event listener
        // functions here found above csv import
        yLabelsGroup.selectAll("text")
            .on("click", function () {
                // get value of selection
                var value = d3.select(this).attr("value");

                if (value !== ySelect) {

                    // replaces chosenYAxis with value
                    ySelect = value;
                    //console.log(xSelect)

                    // Create a dynamic linear scale for Y axis
                    yLinearScale = yScale(stateData, ySelect);

                    // updates x axis with transition
                    yAxis = renderYaxis(yLinearScale, yAxis);

                    // updates circles with new x values
                    circleGroup = renderYCircles(circleGroup, yLinearScale, ySelect);

                    // updates abbr
                    textGroup = updateYTextAbbr(textGroup, yLinearScale, ySelect);
                    // updates tooltips with new info
                    textGroup = updateYToolTip(ySelect, textGroup);

                    // changes classes to change bold text
                    if (ySelect === "smokes") {
                        smokersLabels
                            .classed("active", true)
                            .classed("inactive", false);
                        obeseLabel
                            .classed("active", false)
                            .classed("inactive", true);
                        healthcareLabel
                            .classed("active", false)
                            .classed("inactive", true);
                    } else if (ySelect === "obesity") {
                        smokersLabels
                            .classed("active", false)
                            .classed("inactive", true);
                        obeseLabel
                            .classed("active", true)
                            .classed("inactive", false);
                        healthcareLabel
                            .classed("active", false)
                            .classed("inactive", true);
                    } else {
                        smokersLabels
                            .classed("active", false)
                            .classed("inactive", true);
                        obeseLabel
                            .classed("active", false)
                            .classed("inactive", true);
                        healthcareLabel
                            .classed("active", true)
                            .classed("inactive", false);
                    }
                    // Check/ log y select    
                    console.log(ySelect);
                };
            })
    // Attempt to log errors
    }).catch(function (error) {
        console.log(error);
    });
}

// Call main function
makeResponsive();

// Event listener for window resize.
// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);



/*
///////////////// END ////////////////////////////

    ////////////////TipTool//////////////////////////

    //...... not working tool tip method....... // //
    // Use Tool Tips to have a hover over display
    // Step 1: Append a div to the body (#scatterPlot) to create tooltips, assign it a class
    // =======================================================

    // var toolTip = d3.selectAll("#scatterPlot").append("div")
    //     .attr("class", "tooltip");

    // // Step 2: Add an onmouseover event to display a tooltip
    // //        // // ========================================================
    // textGroup.on("mouseover", function(d) {
    //     toolTip.style("display", "block")
    //     .html(`<b>${d.state}</b><br>Age: ${d.age}<br>Smokes: ${d.smokes}`)
    //     .style("left", d3.event.pageX + "px")
    //     .style("top", d3.event.pageY + "px");
    // })

    // // Step 3: Add an onmouseout event to make the tooltip invisible
    //     .on("mouseout", function() {
    //     toolTip.style("display", "none");
    //     });


    ///////////////////////////////////////////////////
    // Attemt to make axis change from drop down box //
    ///////////////////////////////////////////////////

    // // Use D3 to select the dropdown menu to have to multiple filter types
    // var dropdownMenuX = d3.select("#selXType");
    // // Assign the value of the dropdown menu option to a variable
    // var filterTypeX = dropdownMenuX.property("value");
    // switch (filterTypeX) {
    //     case "age":
    //         var xSelect = "age"; break;
    //     case "poverty":
    //         var xSelect = "poverty"; break;
    //     case "income":
    //         var xSelect = "income"; break;
    //     case "healthcare":
    //         var xSelect = "healthcare"; break;
    //     case "obesity":
    //         var xSelect = "obesity"; break;
    //     case "smokes":
    //         var xSelect = "poverty"; break;
    //     default:
    //         var xSelect = "age"; break;
    // };

    // // Use D3 to select the dropdown menu to have to multiple filter types
    // var dropdownMenuY = d3.select("#selYType");
    // // Assign the value of the dropdown menu option to a variable
    // var filterTypeY = dropdownMenuY.property("value");
    // switch (filterTypeY) {
    //     case "age":
    //         var ySelect = "age"; break;
    //     case "poverty":
    //         var ySelect = "poverty"; break;
    //     case "income":
    //         var ySelect = "income"; break;
    //     case "healthcare":
    //         var ySelect = "healthcare"; break;
    //     case "obesity":
    //         var ySelect = "obesity"; break;
    //     case "smokes":
    //         var ySelect = "poverty"; break;
    //     default:
    //         var ySelect = "smokes"; break;
    // };



    // // Event change function - connected to html onchange ability
    // function optionChangedX() {
    //     var xSelect = d3.select(this).property('value');
    //     updateLegend(newData);
    // }

    // d3.select("#selYType")
    // .on('change', function() {
    // var ySelect = d3.select(this).property('value');
    //})
/////////////////////////////////////
*/