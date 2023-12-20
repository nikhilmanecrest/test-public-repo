looker.plugins.visualizations.add({
  create: function (element, config) {
    // Create a container element for the visualization
    var container = element.appendChild(document.createElement("div"));
    container.id = "my-visualization-container";
    // Apply styles to the container
    container.style.display = 'block';
    container.style.flexDirection = 'row'; // Added to align chart and table vertically
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.overflow = "scroll";

    // Object to store multiple treemaps
    this.charts = {};
  },

  updateAsync: function (data, element, config, queryResponse, details, doneRendering) {
    // Clear any existing content
    for (const key in this.charts) {
      this.charts[key].selectAll("*").remove();
    }

    // Set up the container
    var parentElement = element.querySelector("#my-visualization-container");
    var containerWidth = parentElement.clientWidth;
    var containerHeight = parentElement.clientHeight;

    // Manually group data by a category (e.g., "Category" key in your data)
    var nestedData = {};
    data.forEach(function (d) {
      var category = d["Category"];
      if (!nestedData[category]) {
        nestedData[category] = [];
      }
      nestedData[category].push({ name: d["NAME"], value: d["Marks"] });
    });

    // Loop through each group and create a treemap
    for (const category in nestedData) {
      // Create a treemap container for each category
      var treemapContainer = parentElement.appendChild(document.createElement("div"));
      treemapContainer.id = `my-visualization-treemap-${category}`;
      treemapContainer.style.width = "100%"; // Full width of the container
      treemapContainer.style.height = "100%"; // Full height of the container
      // treemapContainer.style.overflow = "scroll";
      this.charts[category] = d3.select(treemapContainer).append("svg").attr("width", "100%").attr("height", "100%");

      // Create hierarchy based on dimensions and measures
      var root = d3.hierarchy({
        children: nestedData[category],
      })
        .sum(function (d) {
          return d.value;
        });

      // Generate treemap nodes
      var treemap = d3.treemap().size([containerWidth, containerHeight]);
      treemap(root);

      // Generate random colors
      var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

      // Draw rectangles for each node
      var nodes = this.charts[category]
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
        .style("fill", function () {
          return colorScale(Math.random());
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
    }

    doneRendering();
  },
});


[
  {
    "Category": "A",
    "NAME": "Nikhil",
    "Marks": 10
  },
  {
    "Category": "A",
    "NAME": "Sanket",
    "Marks": 20
  },
  {
    "Category": "A",
    "NAME": "A",
    "Marks": 5
  },
  {
    "Category": "A",
    "NAME": "N",
    "Marks": 15
  },
  {
    "Category": "A",
    "NAME": "C",
    "Marks": 8
  },
  {
    "Category": "A",
    "NAME": "D",
    "Marks": 1
  },
  {
    "Category": "A",
    "NAME": "E",
    "Marks": 3
  },
  {
    "Category": "A",
    "NAME": "R",
    "Marks": 17
  },
  {
    "Category": "A",
    "NAME": "T",
    "Marks": 20
  },
  {
    "Category": "B",
    "NAME": "L1",
    "Marks": 1
  },
  {
    "Category": "B",
    "NAME": "E",
    "Marks": 1
  },
  {
    "Category": "C",
    "NAME": "Q",
    "Marks": 1
  },
  {
    "Category": "C",
    "NAME": "L",
    "Marks": 1
  },
  {
    "Category": "D",
    "NAME": "Y",
    "Marks": 1
  },
  {
    "Category": "D",
    "NAME": "X",
    "Marks": 1
  }

]
