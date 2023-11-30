looker.plugins.visualizations.add({
  create: function (element, config) {
    console.log("Creating");
    // Create a container element for the visualization
    // Create a container element for both the treemap and the table
    var container = element.appendChild(document.createElement("div"));
    container.className = "my-visualization-container";
    console.log(container);

    // Apply styles to the container
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.overflow = "scroll";

    // Initialize the treemap visualization properties
    this.chart = d3.select(container).append("svg");

    // Apply styles to the SVG
    this.chart.style("width", "50%"); // Adjust width as needed
    this.chart.style("height", "100%");
    this.chart.style("overflow-x", "scroll");
    this.chart.style("overflow-y", "scroll");

    // Initialize the table visualization properties
    this.table = document.createElement('table');
    this.table.setAttribute('class', 'table');

    // Applying styling to the table
    this.table.style.width = '50%'; // Adjust width as needed
    this.table.style.borderCollapse = 'collapse';
    this.table.style.marginTop = '20px';

    // Append the table to the container
    container.append(this.table);
  },

  updateAsync: function (data, element, config, queryResponse, details, doneRendering) {
    console.log("Updating...");
    // Clear any existing content
    this.chart.selectAll("*").remove();
      // create a tooltip
      // this.tooltip2.style("visibility", "hidden");
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
      })
      .on("click", function (d) {
        // Restore the original opacity on mouseout
        // d3.select(this).style("opacity", 1);
        // d3.select(this).style("visibility","hidden");
        var headerRow = this.table.insertRow(0);
      headerRow.insertCell(0).textContent = queryResponse.fields.dimension_like[0].name;
      headerRow.insertCell(1).textContent = queryResponse.fields.dimension_like[1].name;

      // Clear existing rows
      while (this.table.rows.length > 1) {
        this.table.deleteRow(1);
      }
      // Extract data from Looker's query response
      var col1 = queryResponse.fields.dimension_like[0].name;
      var col2 = queryResponse.fields.dimension_like[1].name;

      // Populate the table with data
      for (var i = 0; i < data.length; ++i) {
          var row = this.table.insertRow(i + 1);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);

          // Use the correct field names based on your LookML model
          cell1.textContent = data[i][col1].value;
          cell2.textContent = data[i][col2].value;
          // Customize cell content or styling as needed
          // Add a link or button for each row
          var dashboardUrl = 'https://your-dashboard-url'; // Replace with your actual dashboard URL
          var link = document.createElement('a');
          link.textContent = 'View Dashboard';
          link.href = dashboardUrl;
          link.target = '_self'; // Open in a new tab/window
          cell3.appendChild(link);
      }
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
        // console.log(d)
        return d.data.name;
      });

    // Signal that the rendering is complete
    doneRendering();
  },
});
