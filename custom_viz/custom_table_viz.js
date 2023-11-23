looker.plugins.visualizations.add({
  create: function(element, config) {
    // Create a container element for the visualization
    element.innerHTML = '<div id="custom-table"></div>';

    // Render the table using LookerCharts
    this.chart = LookerCharts.Utils.createVis(element, config, {
      type: 'table'
    });
  },

  update: function(data, element, config, queryResponse) {
    // Access the data for the first cell in the first row
    var cellData = data[0][0].value;

    // Use LookerCharts.Utils.htmlForCell() to customize the cell content
    var customHTML = LookerCharts.Utils.htmlForCell(
      '<b>Custom Content:</b> ' + cellData,
      cellData
    );

    // Update the content of the cell in the table
    document.getElementById('custom-table').innerHTML = customHTML;
  }
});
