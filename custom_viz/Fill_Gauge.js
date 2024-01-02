function createLiquidFillGauge(container, value, config) {
  const svg = d3.select(container)
    .append("svg")
    .attr("width", config.width)
    .attr("height", config.height);

  const gauge = svg.append("g")
    .attr("transform", `translate(${config.width / 2},${config.height / 2})`);

  const fill = gauge.append("circle")
    .attr("class", "fill")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", config.radius)
    .style("fill", config.fillColor);

  const text = gauge.append("text")
    .attr("text-anchor", "middle")
    .attr("dy", ".35em")
    .style("font-size", "20px");

  const arc = d3.arc()
    .startAngle(0)
    .endAngle(Math.PI);

  const foreground = gauge.append("path")
    .datum({ endAngle: 0 })
    .attr("class", "foreground")
    .attr("d", arc)
    .style("fill", config.fillColor);

  foreground.transition()
    .duration(config.transitionDuration)
    .attrTween("d", function (d) {
      const interpolate = d3.interpolate(d.endAngle, value * Math.PI);
      return function (t) {
        d.endAngle = interpolate(t);
        return arc(d);
      };
    });

  text.text(`${Math.round(value * 100)}%`);
}

looker.plugins.visualizations.add({
  create: function (element, config) {
    element.innerHTML = '<div id="myLiquidFillGaugeContainer"></div>';
  },
  updateAsync: function (data, element, config, queryResponse, details, doneRendering) {
    const container = document.getElementById('myLiquidFillGaugeContainer');

    if (data && data.length > 0) {
      const value = data[0][queryResponse.fields.measure_like[0].name].value;
      const liquidFillConfig = {
        width: 200,
        height: 200,
        radius: 80,
        fillColor: "#3498db",
        transitionDuration: 1000,
      };

      createLiquidFillGauge(container, value, liquidFillConfig);
    } else {
      container.innerHTML = 'No data available.';
    }

    doneRendering();
  },
});
