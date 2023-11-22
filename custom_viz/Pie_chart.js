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
                            console.log(elements, event);
                            var data = event.chart.config._config.data;
                            var label = data.labels;
                            var value = data.datasets[0].data;
                            console.log(data, label, value)
                            console.log(value[elements[0].index].links)
                        }
                    }
                }
            });
    },

    updateAsync: function (data, element, config, queryResponse, details, done) {
        console.log(data);
        this.chart.data = data
        console.log("Data updated")
        done();
    }
});
