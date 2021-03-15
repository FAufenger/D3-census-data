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

        /////////// another attempt to fix plot right migration in large window ////////
    // var aspect = width / height,
    //     chart = d3.select("#scatterPlot").select("svg");

    // // Event listener for window resize.
    // // When the browser window is resized, makeResponsive() is called.
    // d3.select(window).on("resize", function makeResponsive() {

    //     var targetWidth = chart.node().getBoundingClientRect().width;
    //     chart.attr("width", targetWidth);
    //     chart.attr("height", targetWidth / aspect);
    // })
/////////////////////////////////////
*/
/////////////////////////////////////
