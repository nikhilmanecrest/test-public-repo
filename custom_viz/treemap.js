looker.plugins.visualizations.add({
  create: function (element, config) {
    // Create a container element for the visualization
    var container = element.appendChild(document.createElement("div"));
    container.className = "my-treemap-container";

    // Apply styles to the container
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.overflow = "scroll";

    // Initialize the visualization properties
    this.chart = d3.select(container).append("svg");

    // Apply styles to the SVG
    this.chart.style("width", "100%");
    this.chart.style("height", "100%");
    this.chart.style("overflow-x", "scroll");
    this.chart.style("overflow-y", "scroll");
  },

  updateAsync: function (data, element, config, queryResponse, details, doneRendering) {
    // Clear any existing content
    this.chart.selectAll("*").remove();

    // Extract data from Looker response
    var dataset = [];
    data.forEach(function (row) {
      var rowData = {};
      queryResponse.fields.dimension_like.forEach(function (field) {
        rowData[field.name] = row[field.name].value;
      });
      queryResponse.fields.measure_like.forEach(function (field) {
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

    var treemap = d3.treemap().size([width, height]);

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
        d3.select(this).style("opacity", 0.7);
      })
      .on("mouseout", function () {
        // Restore the original opacity on mouseout
        d3.select(this).style("opacity", 1);
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
