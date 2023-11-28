// Custom Treemap Visualization for Looker

looker.plugins.visualizations.add({
  create: function (element, config) {
    // Create a container element for the visualization
    var container = element.appendChild(document.createElement("div"));
    container.className = "my-treemap-container";

    // Initialize the visualization properties
    this.chart = d3.select(container).append("svg");
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
    var width = element.offsetWidth;
    var height = element.offsetHeight;

    var treemap = d3.treemap().size([width, height]).padding(1);

    // Create hierarchy based on dimensions
    var root = d3.hierarchy({ values: dataset }).sum(function (d) {
      return d[queryResponse.fields.measure_like[0].name];
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
      });

    nodes
      .append("rect")
      .attr("width", function (d) {
        return d.x1 - d.x0;
      })
      .attr("height", function (d) {
        return d.y1 - d.y0;
      })
      .style("fill", "steelblue")
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
        return d.data[queryResponse.fields.dimension_like[0].name];
      });

    // Signal that the rendering is complete
    doneRendering();
  },
});
