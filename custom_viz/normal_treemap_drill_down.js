looker.plugins.visualizations.add({
  create: function (element, config) {
    // Create a container element for the visualization
    var container = element.appendChild(document.createElement("div"));
    container.id = "my-visualization-container";
    // Apply styles to the container
    container.style.display = 'flex';
    container.style.flexDirection = 'row'; // Added to align chart and table vertically
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.overflow = "scroll";

    // Create treemap and set its width
    var treemap = container.appendChild(document.createElement("div"));
    treemap.id = "my-visualization-treemap";
    treemap.style.width = "100%"; // Adjust width as needed
    treemap.style.height = "100%";

    // create tooltip
    var tooltip=container.appendChild(document.createElement("div"));
    tooltip.id = "my-visualization-tooltip";
    // Initialize the treemap visualization properties
    this.chart = d3.select(treemap).append("svg").attr("width", "100%").attr("height", "100%");
   // this.chart.style("overflow-x", "scroll");
   // this.chart.style("overflow-y", "scroll")
  },

  updateAsync: function (data, element, config, queryResponse, details, doneRendering) {
    // Clear any existing content
    this.chart.selectAll("*").remove();
    // Extract data from Looker response
    var dataset = [];
    var field_name=[]
    const column = new Set();
    var links=[]
    data.forEach(function (row) {
      var rowData = {};
      queryResponse.fields.dimension_like.forEach(function (field) {
        field_name.push(field.name)
        column.add(field.label)
        rowData[field.name] = row[field.name].value;
      });

      queryResponse.fields.measure_like.forEach(function (field) {
        links.push({"value":row[field.name].value,"links":(row[field.name].links[1])})
        field_name.push(field.name)
        column.add(field.label)
        rowData[field.name] = row[field.name].value;
      });
      dataset.push(rowData);
    });
    // Set up the treemap layout
    var parentElement = element.parentElement;
    var width = parentElement.clientWidth; // Use clientWidth for the width
    var height = parentElement.clientHeight; // Use clientHeight for the height

    // Create a color scale
    var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    var treemap = d3.treemap().size([width, height]); // Adjust width as needed

    // Create hierarchy based on dimensions and measures
    var root = d3.hierarchy({
      children: dataset.map(function (d) {
        return { name: d[queryResponse.fields.dimension_like[0].name], value: d[queryResponse.fields.measure_like[0].name] };
      }),
    })
      .sum(function (d) {
        return d.value;
      });

    // Generate treemap nodes
    treemap(root);
    // Draw rectangles for each node
    var nodes = this.chart
      .selectAll(".node")
      .data(root.leaves())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", function (d) {
        return "translate(" + d.x0 + "," + d.y0 + ")";
      })
      .on("mouseover", function (d) {
        // Add your custom hover behavior here
        console.log(d)
        var data_tooltip=d.srcElement.__data__.data;
        d3.select(this).style("opacity", 0.7);
        var tooltip = document.querySelectorAll("#my-visualization-tooltip")[0];
        var column_string=[]
        column.forEach((header)=>{
                column_string.push(header)
            });
        tooltip.innerHTML = `${column_string[0]}: ${data_tooltip['name']} \n
                     ${column_string[1]}: ${data_tooltip['value']}`;
        tooltip.style.display = "block";
        tooltip.style.position = "absolute";

        if (d.pageX > 250 ) {
         tooltip.style.left = 50 + "px";
        }
        else {
            tooltip.style.left = d.pageX + "px";
        }
        if (d.pageY > 200){
            tooltip.style.top = 100 + "px";
        }
        else {
            tooltip.style.top = d.pageY + "px";
          }
        tooltip.style.background = "rgba(0, 0, 0, 0.8)";
        tooltip.style.color = "white";
        tooltip.style.padding = "10px";
        tooltip.style.borderRadius = "5px";
        tooltip.style.transition = "opacity 0.3s ease-in-out";
      })
      .on("mouseout", function () {
        // Restore the original opacity on mouseout
        d3.select(this).style("opacity", 1);
        var tooltip = document.querySelectorAll("#my-visualization-tooltip")[0];
         tooltip.style.display = "none";
      })
      .on("click", function (d) {
        LookerCharts.Utils.openDrillMenu({links:data[0][field_name[1]].links,event: {pageX:d.pageX , pageY:d.pageY}});
      });

    nodes
      .append("rect")
      .attr("width", function (d) {
        return d.x1 - d.x0;
      })
      .attr("height", function (d) {
        return d.y1 - d.y0;
      })
      .style("fill", function (d, i) {
        return colorScale(i); // Assign different colors based on the index
      })
      .style("stroke", "white");

    // Add text labels
    nodes
      .append("text")
      .attr("x", function (d) {
        return (d.x1 - d.x0) / 2;
      })
      .attr("y", function (d) {
        return (d.y1 - d.y0) / 2;
      })
      .attr("dy", "0.3em")
      .style("text-anchor", "middle")
      .style("fill", "white")
      .text(function (d) {
        return d.data.name;
      });

    // Signal that the rendering is complete
    doneRendering();
  },
});
