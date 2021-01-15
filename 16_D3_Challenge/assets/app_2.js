// set parameters for SVG
var svgWidth = 1000;
var svgHeight = 650;

var margin = {
  top: 10,
  right: 40,
  bottom: 90,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);


var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// set initial param
var choseX = "poverty";
var choseY = "healthcare";

d3.csv("data/data.csv").then(function(census_data, err) {
    if (err) throw err;

   /////////////////////////////
   ////load CSV here////////////
   /////////////////////////////
    
    // parse data
    census_data.forEach(data => {
      data.poverty = parseFloat(data.poverty);
      data.age = parseFloat(data.age);
      data.income = parseFloat(data.income);
      data.healthcare = parseFloat(data.healthcare);
      data.smokes = parseFloat(data.smokes);
      data.obesity = parseFloat(data.obesity);
    });
  
    // set x and y scale, for now its poverty vs. healthcare
    var xLinearScale = xScale(census_data, choseX);    
    var yLinearScale = yScale(census_data, choseY);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
  
    // append x axis
    var xAxis = chartGroup.append("g")
      .classed("x-axis", true)
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);
  
    // append y axis
    var yAxis = chartGroup.append("g")
      .classed("y-axis", true)
      .call(leftAxis);

    // append initial circles
    var gGroup = chartGroup.selectAll("g")
        .data(census_data)
        .enter()
        .append("g")
        .classed("circles", true);
    
    var circlesGroup = gGroup.append("circle")
        .data(census_data)
      .attr("cx", d => xLinearScale(d[choseX]))
      .attr("cy", d => yLinearScale(d[choseY]))
      .attr("r", 13)
      .attr("fill", "#ff4d4d")
      .attr("opacity", ".5");
  
    // label within circle
    var cLabels = chartGroup.selectAll(".circles")
     .append("text")
     .text( d => d.abbr)
     .attr("text-anchor", "middle")
     .attr("alignment-baseline", "middle")
     .attr("font-size",".6em")
     .attr("style","stroke:white;")
     .attr("x", d => xLinearScale(d[choseX]))  
     .attr("y", d => yLinearScale(d[choseY]));

    // Create group for x-axis labels
    var xLabelsGroup = chartGroup.append("g")
      .attr("transform", `translate(${width/2}, ${height + 20})`);
  
    var poverty_label = xLabelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 15)
      .attr("value", "poverty") 
      .classed("active", true)
      .text("In Poverty (%)");
  
    var age_label = xLabelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 35)
      .attr("value", "age") 
      .classed("inactive", true)
      .text("Age (Median)");
      
    var income_label = xLabelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 55)
      .attr("value", "income") 
      .classed("inactive", true)
      .text("Household Income (Median)");

    // do the same thing for y-axis labels
    var yLabelsGroup = chartGroup.append("g")
        .attr("transform", "rotate(-90)")

    var healthcare_label = yLabelsGroup.append("text")
      .attr("x", 0 - (height/2))
      .attr("y", 0 - (margin.left/3))
      .attr("value", "healthcare") 
      .classed("active", true)
      .text("Lacks Healthcare (%)");    
      
    var smokes_label = yLabelsGroup.append("text")
      .attr("x", 0 - (height/2))
      .attr("y", -40 - (margin.left/3))
      .attr("value", "smokes") 
      .classed("inactive", true)
      .text("Smokers (%)");


    var obesity_label = yLabelsGroup.append("text")
      .attr("x", 0 - (height/2))
      .attr("y", -20 - (margin.left/3))
      .attr("value", "obesity") 
      .classed("inactive", true)
      .text("Obesity (%)");   

    
  
    // updateToolTip function above csv import
    var circlesGroup = updateToolTip(circlesGroup, choseX, choseY);
  
    // x axis labels event listener
    xLabelsGroup.selectAll("text")
      .on("click", function() {
        // get value of selection
        var value = d3.select(this).attr("value");
        if (value !== choseX) {
  
          // replaces choseX with value
          choseX = value;
          xLinearScale = xScale(census_data, choseX);
          xAxis = updatex_axis(xLinearScale, xAxis);
          circlesGroup = update_c(circlesGroup, xLinearScale, choseX,  yLinearScale, choseY);
          circlesGroup = updateToolTip(circlesGroup, choseX, choseY);

          // update labels on circles
          cLabels = renderLabels(cLabels, xLinearScale, choseX, yLinearScale, choseY);
  
          // changes classes to change bold text
          if (choseX === "income") {
            income_label
              .classed("active", true)
              .classed("inactive", false);
            age_label
              .classed("active", false)
              .classed("inactive", true);
            poverty_label
              .classed("active", false)
              .classed("inactive", true);
          }
          else if (choseX === "age") {
            income_label
              .classed("active", false)
              .classed("inactive", true);
            age_label
              .classed("active", true)
              .classed("inactive", false);
            poverty_label
              .classed("active", false)
              .classed("inactive", true);
          }
          else {
            income_label
              .classed("active", false)
              .classed("inactive", true);
            age_label
              .classed("active", false)
              .classed("inactive", true);
            poverty_label
              .classed("active", true)
              .classed("inactive", false);
          }
        }
      });
    


    yLabelsGroup.selectAll("text")
      .on("click", function() {
        // get value of selection
        var value = d3.select(this).attr("value");
        if (value !== choseY) {
  
          // replaces choseY with value
          choseY = value;
  
          yLinearScale = yScale(census_data, choseY);
          yAxis = updatey_axis(yLinearScale, yAxis);
  
          
          circlesGroup = update_c(circlesGroup, xLinearScale, choseX,  yLinearScale, choseY);
  
          // updates tooltips with new info
          circlesGroup = updateToolTip(circlesGroup, choseY);
          
          // update labels on circles --> please note that this part I asked TA for help 
          cLabels = renderLabels(cLabels, xLinearScale, choseX, yLinearScale, choseY);
  
          if (choseY === "smokes") {
            smokes_label
              .classed("active", true)
              .classed("inactive", false);
            obesity_label
              .classed("active", false)
              .classed("inactive", true);
            healthcare_label
              .classed("active", false)
              .classed("inactive", true);
          }
          else if (choseY === "obesity") {
            smokes_label
              .classed("active", false)
              .classed("inactive", true);
            obesity_label
              .classed("active", true)
              .classed("inactive", false);
            healthcare_label
              .classed("active", false)
              .classed("inactive", true);
          }
          else {
            smokes_label
              .classed("active", false)
              .classed("inactive", true);
            obesity_label
              .classed("active", false)
              .classed("inactive", true);
            healthcare_label
              .classed("active", true)
              .classed("inactive", false);
          }
        }
      });


  }).catch(function(error) {console.log(error);
  });

//updating y-scale 
function yScale(data, choseY) {
  // create scales
  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(data, d => d[choseY]) * 0.96,
      d3.max(data, d => d[choseY]) * 1.1
    ])
    .range([height, 0]);

  return yLinearScale;

};

//updating x-scale -- which is simillar as above for y-scale; 
function xScale(data, choseX) {
    // create scales
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d => d[choseX]) * 0.96,
        d3.max(data, d => d[choseX]) * 1.1
      ])
      .range([0, width]);
  
    return xLinearScale;
  
  };
  

  // update xAxis var when label is clicked
  function updatex_axis(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
  
    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);
  
    return xAxis;
  };
  
  // update yAxis var when label is clicked
  function updatey_axis(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);
  
    yAxis.transition()
      .duration(1000)
      .call(leftAxis);
  
    return yAxis;
  }
  
  // update circles group with transitions
  function update_c(circlesGroup, newXScale, choseX, newYScale, choseY) {
  
    circlesGroup.transition()
      .duration(1000)
      .attr("cx", d => newXScale(d[choseX]))
      .attr("cy", d => newYScale(d[choseY]));
  
    return circlesGroup;
  }  
  // update circles group with transitions
  function renderLabels(cLabels, newXScale, choseX, newYScale, choseY) {
  
    cLabels.transition()
      .duration(1000)
      .attr("x", d => newXScale(d[choseX]))
      .attr("y", d => newYScale(d[choseY]));
  
    return cLabels;
  }
  
  // update circles group with new tooltip
  function updateToolTip(circlesGroup, choseX, choseY) {
  
    if (choseX === "poverty") {
      var xlabel = "In Poverty (%): ";
    }
    else if (choseX === "age") {
        var xlabel = "Age (Median): ";
    }
    else {
      var xlabel = "Household Income (Median): $";
    };  

    if (choseY === "healthcare") {
      var ylabel = "Lacks Healthcare (%): ";
    }
    else if (choseY === "obesity") {
        var ylabel = "Obesity (%): ";
    }
    else {
      var ylabel = "Smokers (%): ";
    }
  
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(d => {
        return (`${d.state} (${d.abbr})<br>${ylabel}${d[choseY]}<br>${xlabel}${d[choseX]}`);
      });
  
    circlesGroup.call(toolTip);


    circlesGroup
    // mouseover event - show tooltip
        .on("mouseover", function(data) {
      toolTip.show(data);
        })
      // onmouseout event - hide tooltip
        .on("mouseout", function(data, index) {
        toolTip.hide(data);
        });
  
    return circlesGroup;
  };
  