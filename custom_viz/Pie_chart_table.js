(function (looker, Chart) {

    // Function to update the table with selected data
    function updateTable(selectedData) {
        var table = document.getElementById('selectedDataTable');
        table.innerHTML = ''; // Clear previous data

        // Create table header
        var headerRow = table.insertRow(0);
        var headerCell1 = headerRow.insertCell(0);
        var headerCell2 = headerRow.insertCell(1);
        headerCell1.innerHTML = 'Label';
        headerCell2.innerHTML = 'Value';

        // Create table row for selected data
        var row = table.insertRow(1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = selectedData.rendered;
        cell2.innerHTML = selectedData.value;
    }

    looker.plugins.visualizations.add({
        id: 'custom_pie_chart_chartjs',
        label: 'Custom Pie Chart (Chart.js)',
        options: {
            color: {
                type: 'string',
                label: 'Color',
                // default: '#3498db'
            }
        },
        handleErrors: function (data, resp) {
            return true;
        },
        create: function (element, config) {
            // Create a container div for centering
            var container = document.createElement('div');
            container.style.display = 'flex';
            container.style.alignItems = 'center';
            container.style.justifyContent = 'center';

            // Create a canvas element for the chart
            var canvas = document.createElement('canvas');
            canvas.setAttribute('id', 'customPieChartCanvas');
            container.appendChild(canvas);

            // Create a table element for displaying selected data
            var table = document.createElement('table');
            table.setAttribute('id', 'selectedDataTable');
            table.style.border = '1px solid #ccc'; // Border style
            container.appendChild(table);

            // Append the container to the main element
            element.appendChild(container);

            // Initialize the Chart.js instance
            this.chart = new Chart(canvas, {
                type: 'pie',
                options: {
                    onClick: function (event, elements) {
                        if (elements && elements.length > 0) {
                            // Trigger drill-down
                            var data = event.chart.config.data;
                            var label = data.labels;
                            var value = data.datasets[0].data;
                            var selectedData = value[elements[0].index];

                            // Display selected data in the table
                            updateTable(selectedData);
                        }
                    }
                }
            });
        },
        update: function (data, element, config, queryResponse) {
            // Extract the data from Looker response
            var values = data;
            // Generate the chart data
            var FinalData = [];
            var finalLabel = [];
            var other_links = [];
            let sum = 0;
            values.forEach(function (currentValue, index) {
                var cell = currentValue[queryResponse.fields.measure_like[0].name];
                if (index < 19) {
                    var cellElement = '<p>' + cell.value + ' </p>';
                    FinalData.push(cell);
                    finalLabel.push(currentValue[queryResponse.fields.dimensions[0].name].value);
                } else {
                    other_links.push(cell.links[0])
                    sum = sum + currentValue[queryResponse.fields.measure_like[0].name].value;
                }
            })
            finalLabel.push("Other")
            FinalData.push({ rendered: sum.toString(), links: other_links, value: sum })
            var finalCharData = {
                datasets: [{ data: FinalData }],
                labels: finalLabel
            }

            // Update the chart with the data
            this.chart.data = finalCharData;
            this.chart.update();
        }
    });

}(looker, Chart));
