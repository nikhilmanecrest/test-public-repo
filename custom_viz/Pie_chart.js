looker.plugins.visualizations.add({
  id: 'my_custom_pie_chart',
  label: 'My Custom Pie Chart',
  options: {
    color: {
      type: 'array',
      label: 'Colors',
      display: 'colors',
      default: ['#FF5733', '#33FF57', '#5733FF', '#FFD700', '#8A2BE2'],
    },
  },
  create: function (element, config) {
    // Initialize the chart container
    element.innerHTML = '<div id="myCustomPieChart"></div>';
  },
  update: function (data, element, config, queryResponse) {
    // Get the data for the chart
    const chartData = getChartData(data);

    // Clear the container before rendering
    element.innerHTML = '';

    // Set up the pie chart using D3.js
    const width = element.clientWidth;
    const height = element.clientHeight;
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    const colorScale = d3.scaleOrdinal().range(config.options.color);

    const pie = d3.pie().value(function (d) {
      return d.value;
    });

    const path = d3
      .arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    const arc = svg
      .selectAll('arc')
      .data(pie(chartData))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arc
      .append('path')
      .attr('d', path)
      .attr('fill', function (d) {
        return colorScale(d.data.label);
      });

    // Add legend
    const legend = svg
      .selectAll('.legend')
      .data(chartData)
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', function (d, i) {
        return 'translate(' + (width / 2 + 20) + ',' + (i * 20 - height / 2 + 10) + ')';
      });

    legend
      .append('rect')
      .attr('width', 18)
      .attr('height', 18)
      .style('fill', function (d) {
        return colorScale(d.label);
      });

    legend
      .append('text')
      .attr('x', 30)
      .attr('y', 9)
      .attr('dy', '.35em')
      .style('text-anchor', 'start')
      .text(function (d) {
        return d.label;
      });
  },
});

function getChartData(data) {
  // Extract data from Looker data object
  const labels = data.fields.dimension[0].name;
  const values = data.fields.measure[0].name;

  return data.data.map(function (row) {
    return {
      label: row[labels].value,
      value: row[values].value,
    };
  });
}
