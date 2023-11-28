// Assuming you have D3.js loaded in your project
// This is a basic example; you'll need to adapt it to your data structure and requirements

// Sample data
var data = {
  name: 'Root',
  children: [
    { name: 'Category 1', value: 20 },
    { name: 'Category 2', value: 30 },
    // Add more categories as needed
  ],
};

// Set up the treemap layout
var width = 500;
var height = 300;

var treemap = d3.treemap().size([width, height]).padding(1);

// Create hierarchy based on data
var root = d3.hierarchy(data).sum(function (d) {
  return d.value;
});

// Generate treemap nodes
treemap(root);

// Create SVG container
var svg = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height);

// Draw rectangles for each node
var nodes = svg.selectAll('.node')
  .data(root.leaves())
  .enter().append('g')
  .attr('class', 'node')
  .attr('transform', function (d) {
    return 'translate(' + d.x0 + ',' + d.y0 + ')';
  });

nodes.append('rect')
  .attr('width', function (d) {
    return d.x1 - d.x0;
  })
  .attr('height', function (d) {
    return d.y1 - d.y0;
  })
  .style('fill', 'steelblue');

// Add text labels
nodes.append('text')
  .attr('x', function (d) {
    return (d.x1 - d.x0) / 2;
  })
  .attr('y', function (d) {
    return (d.y1 - d.y0) / 2;
  })
  .attr('dy', '0.3em')
  .style('text-anchor', 'middle')
  .style('fill', 'white')
  .text(function (d) {
    return d.data.name;
  });
