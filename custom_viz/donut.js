// Use Looker's Visualization API
looker.plugins.visualizations.add({
  id: 'display_count',
  label: 'Display Count',
  create: function(element, config) {
    // Create a container for the count value
    this.container = element.appendChild(document.createElement("div"));
    this.container.setAttribute("id", "count-line-container");

    // Applying Styling to the container
    this.container.style.fontWeight = "bold";
    this.container.style.textAlign = "center";
    this.container.style.padding = "25px";
    this.container.style.display = "flex";
    this.container.style.flexDirection = "column";
    this.container.style.alignItems = "center";

   // Create a container element for your chart
    this.parentNode = document.createElement("div");
    this.parentNode.style.display = "flex";
    this.parentNode.style.flexDirection = "column";
    this.parentNode.style.alignItems = "center";
    this.chart_container = document.createElement("canvas")
    this.chart_container.className = "line-chart-container";
    this.parentNode.appendChild(this.chart_container);
    element.appendChild(this.parentNode);

  },

  updateAsync: function(data, element, config, queryResponse, details, done) {

    // Extract data from Looker's query response

    var DATA_COUNT = 10;
    var labels = [];

    // Chart.helpers.srand(4);

    for (var i = 0; i < DATA_COUNT; ++i) {
      labels.push('' + i);
    }
      
     function generateRandomNumbers(count, min, max) {
      var numbers = [];
      for (var i = 0; i < count; ++i) {
        numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
      }
      return numbers;
    }

    // Initialize a Chart.js instance
      var ctx = this.chart_container;
      if (this.chart) {
        this.chart.destroy();
      }
      this.chart = new Chart(ctx, {
        type: "doughnut", // Specify the chart type as a line chart
        data: {
          labels: labels,
          datasets: [{
            backgroundColor: ["#F13E18", "#F1CD18", "#1FF118", "#FF5733", "#33FF57", "#5733FF", "#FF3366", "#33FFB5", "#B533FF", "#FFB533"],
            data: generateRandomNumbers(DATA_COUNT, 0, 100),
            datalabels: {
              anchor: 'end'
            }
          }, {
            backgroundColor: Chart.helpers.color({
              color: Chart.helpers.color(1),
              count: DATA_COUNT
            }),
            data: generateRandomNumbers(DATA_COUNT, 0, 100),
            datalabels: {
              anchor: 'center',
              backgroundColor: null,
              borderWidth: 0
            }
          }, {
            backgroundColor: ["#F1CD18", "#FF5733", "#F13E18", "#33FF57", "#1FF118", "#5733FF", "#FF3366", "#FFB533", "#33FFB5", "#B533FF"],
            data: generateRandomNumbers(DATA_COUNT, 0, 100),
            datalabels: {
              anchor: 'start'
            }
          }]
        },
        options: {
          plugins: {
            datalabels: {
              backgroundColor: function(context) {
                return context.dataset.backgroundColor;
              },
              borderColor: 'white',
              borderRadius: 25,
              borderWidth: 2,
              color: 'white',
              display: function(context) {
                var dataset = context.dataset;
                var count = dataset.data.length;
                var value = dataset.data[context.dataIndex];
                return value > count * 1.5;
              },
              font: {
                weight: 'bold'
              },
              padding: 6,
              formatter: Math.round
            }
          },

          // Core options
          aspectRatio: 4 / 3,
          cutoutPercentage: 32,
          layout: {
            padding: 32
          },
          elements: {
            line: {
              fill: false
            },
            point: {
              hoverRadius: 7,
              radius: 5
            }
          },
        }
      });

    this.chart.canvas.style.height = '300px';
    this.chart.canvas.style.width = '200px';
    // Update the chart
    this.chart.update();

    // Signal the completion of rendering
    done();
  }
});
