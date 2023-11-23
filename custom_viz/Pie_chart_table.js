(function (looker, Chart) {

    // Function to update the table with selected data
    function updateTable(selectedData) {
        var table = document.getElementById('selectedDataTable');
        table.innerHTML = ''; // Clear previous data

        // Create table header
        var headerRow = table.insertRow(0);
        var headerCell1 = headerRow.insertCell(0);
        var headerCell2 = headerRow.insertCell(1);
        headerCell1.innerHTML = 'Product Name';
        headerCell2.innerHTML = 'Count';
        // Add borders to header cells
        headerCell1.style.border = '1px solid #ccc';
        headerCell2.style.border = '1px solid #ccc';
        if(selectedData.length==1){
        // Create table row for selected data
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = selectedData[0][0];
        cell2.innerHTML = LookerCharts.Utils.htmlForCell(selectedData[0][1]);
        }
        else {
        var len=0;
        // console.log(selectedData[0][0])
        selectedData.forEach(()=>{
          // Create table row for selected data
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = selectedData[len][0];
        cell2.innerHTML = selectedData[len][1];
        // Add borders to data cells
        cell1.style.border = '1px solid #ccc';
        cell2.style.border = '1px solid #ccc';
        len=len+1
        })
        }
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
            container.style.flexDirection = 'column'; // Added to align chart and table vertically

            // Create a canvas element for the chart
            var canvas = document.createElement('canvas');
            canvas.setAttribute('id', 'customPieChartCanvas');
            container.appendChild(canvas);

            // Create a table element for displaying selected data
            var table = document.createElement('table');
            table.setAttribute('id', 'selectedDataTable');
            table.style.borderCollapse = 'collapse'; // Added to collapse the borders
            table.style.width = '100%'; // Added to make the table width 100%
            table.style.border = '1px solid #ccc'; // Added border to the table
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
                            data=[]
                            var label_first_column=label[elements[0].index];
                            var value_first_measure = value[elements[0].index];
                            if (elements[0].index ==19){
                                    label[20].forEach((element)=>{
                                          data.push([element[0],element[1]])
                                    })
                            }
                            else
                            {
                                    data.push([label_first_column,value_first_measure])

                            }
                                // Display selected data in the table
                                    updateTable(data);
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
            var other_data = []
            let sum = 0;
            values.forEach(function (currentValue, index) {
                var cell = currentValue[queryResponse.fields.measure_like[0].name];
                if (index < 19) {
                    var cellElement = '<p>' + cell.value + ' </p>';
                    FinalData.push(cell);
                    finalLabel.push(currentValue[queryResponse.fields.dimensions[0].name].value);
                } else {
                    other_links.push(cell.links[0])
                    record=[]
                    record.push(currentValue[queryResponse.fields.dimensions[0].name].value)
                    record.push(currentValue[queryResponse.fields.measure_like[0].name].value);
                    other_data.push(record)
                    sum = sum + currentValue[queryResponse.fields.measure_like[0].name].value;
                }
            })
            finalLabel.push("Other")
            finalLabel.push(other_data)
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
