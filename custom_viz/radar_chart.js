(function (looker, Chart) {

    looker.plugins.visualizations.add({
        id: 'custom_spider_chart_chartjs',
        label: 'Custom Spider Chart (Chart.js)',
        options: {
            color: {
                type: 'string',
                label: 'Color',
                 default: '#3498db'
            },
          legend: {
            type: 'boolean',
            label: 'Show Legend',
            default: false
          }
        },
        create: function (element, config) {
            // Create a canvas element for the chart
            var canvas = document.createElement('canvas');
            canvas.setAttribute('id', 'customSpiderChartCanvas');
            element.appendChild(canvas);

            // Initialize the Chart.js instance
            this.chart = new Chart(canvas, {
                type: 'radar',
                options: {
                  legend: {
                    display: config.legend
                  }
              }
            });
        },
        update: function (data, element, config, queryResponse) {
            // Extract the data from Looker response
            var values = data;

            // Generate the chart data
            var finalData = [];
            var finalLabel = [];
            var sum = 0;

            values.forEach(function (currentValue, index) {
                if (index < 5) {
                    var cell = currentValue[queryResponse.fields.measure_like[0].name];
                    finalData.push(cell.value);
                    finalLabel.push(currentValue[queryResponse.fields.dimensions[0].name].value);
                } else {
                    sum += currentValue[queryResponse.fields.measure_like[0].name].value;
                }
            });

            // Add the sum to the finalData array
            finalData.push(sum);
            //console.log(finalData)
            finalLabel.push("Other");
            //console.log(finalLabel)
            var finalChartData = {
                datasets: [{
                    data: finalData,
                    borderColor: config.color || '#3498db',
                    backgroundColor: config.color || '#3498db',
                }],
                labels: finalLabel
            };
            console.log("Radar chart")
            console.log(finalChartData)
            // Update the chart with the data
            this.chart.data = finalChartData;
            this.chart.update();
        }
    });

}(looker, Chart));
