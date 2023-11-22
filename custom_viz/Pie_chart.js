looker.plugins.visualizations.add({
  id: "Pie_chart",
  label: "Pie_chart",
  options: {
    font_size: {
      type: "string",
      label: "Font Size",
      values: [
        {"Large": "large"},
        {"Small": "small"}
      ],
      display: "radio",
      default: "large"
    }
  },
    create: function (element, config) {
      var canvas = document.createElement('canvas');
      canvas.style = "position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; border:2px solid blue";
      element.appendChild(canvas);
      this.chart = new Chart(canvas, {
                type: 'pie',
                options: {
                    legend: {
                        display: false
                    },
                    onClick: function (event, elements) {
                        if (elements && elements.length > 0) {
                            # // Trigger drill-down
                            console.log(elements, event);
                            var data = event.chart.config._config.data;
                            var label = data.labels;
                            var value = data.datasets[0].data;
                            console.log(data, label, value)
                            # // Replace 'additional__fields' and 'event_counts' with your actual dimension and measure names
                            # // looker.plugins.drillmenu.drill({
                            # //   links: [{ label: label, type: 'dimension', type_label: 'Dimension', fields: ['additional__fields'] }],
                            # //   data: [{ name: 'event_counts', value: value }],
                            # // });
                            # // function(event) {
                            # // var activePoints = this.chart.getElementsAtEvent(event)
                            # // console.log("kk")
                            # // console.log(event.x)
                            # LookerCharts.Utils.openDrillMenu({
                            #     links: value[elements[0].index].links,
                            #     event: { pageX: event.x, pageY: event.y }
                            # });
                            console.log(value[elements[0].index].links)
                        }
                    }
                }
            });
    },

    updateAsync: function (data, element, config, queryResponse, details, done) {

        done();
    }
});
