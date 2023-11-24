looker.plugins.visualizations.add({
    create: function (element, config) {
        console.log("Create function started..");
        var chart = document.createElement('table');
        chart.id = 'custom-table-chart';
        element.appendChild(chart);
        var style = document.createElement('style');
        style.innerHTML = `table, th, td {
          border: 1px solid black;
          border-collapse: collapse;
        }`;
        element.appendChild(style);
        console.log("chart element added...");
    },
    updateAsync: function (data, element, config, queryResponse, details, doneRendering) {
        console.log("update function started..");
        var chart = element.querySelector('#custom-table-chart');
        chart.innerHTML = '';
        var headerRow = document.createElement('tr');
        for (var i of queryResponse.fields.dimensions) {
            var th = document.createElement('th');
            th.textContent = i.label;
            headerRow.appendChild(th);
        }
        for (var i of queryResponse.fields.measures) {
            var th = document.createElement('th');
            th.textContent = i.label;
            headerRow.appendChild(th);
        }
        chart.appendChild(headerRow);
        // Create table rows
        data.forEach(function (row) {
            var rows = document.createElement('tr');
            Object.keys(row).forEach(function (key) {
                var td = document.createElement('td');
                td.innerHTML = LookerCharts.Utils.htmlForCell(row[key]);
                rows.appendChild(td);
            });
            chart.appendChild(rows);
        });
        element.appendChild(chart);
        doneRendering();
    }
});
