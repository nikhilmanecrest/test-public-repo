looker.plugins.visualizations.add({
    id: 'custom_table',
    label: 'Custom Table',
    options: {
      // Any options you want to expose to Looker users
    },
    create: function(element, config) {
      // Create a container for the table
      this.table = element.appendChild(document.createElement('table'));
      this.table.setAttribute('class', 'table');

      // Create a container for page numbers
      this.pageNumbersContainer = element.appendChild(document.createElement('div'));
      this.pageNumbersContainer.style.marginTop = '10px';

      // Applying styling to the table
      this.table.style.width = '100%';
      this.table.style.borderCollapse = 'collapse';
      this.table.style.marginTop = '20px';

      var headerRow = this.table.insertRow(0);
      headerRow.insertCell(0).textContent = 'Order Number';
      headerRow.insertCell(1).textContent = 'Order Status';

      // Initialize page number
      this.currentPage = 1;

      this.rowsPerPage = 5;
    },

    paginate : function(queryResponse, data){
      // Extract data from Looker's query response
      var col1 = queryResponse.fields.dimension_like[0].name;
      var col2 = queryResponse.fields.dimension_like[1].name;

      // Calculate the start and end indices based on the current page
      var startIndex = (this.currentPage - 1) * this.rowsPerPage;
      var endIndex = startIndex + this.rowsPerPage;

      // Clear existing rows and page numbers
      while (this.table.rows.length > 1) {
        this.table.deleteRow(1);
      }
      // Populate the table with data for the current page
      for (var i = startIndex; i < Math.min(endIndex, data.length); ++i) {
          // var row = this.table.insertRow(i+1);
          var row = this.table.insertRow(i-startIndex+1);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);

          cell1.textContent = data[i][col1].value;
          cell2.textContent = data[i][col2].value;
      }
    },

    updateAsync: function(data, element, config, queryResponse, details, done) {
      this.pageNumbersContainer.innerHTML = '';
      this.paginate(queryResponse, data)

      // Add page numbers
      var totalPages = Math.ceil(data.length / this.rowsPerPage);
      for (let page = 1; page <= totalPages; ++page) {
        var pageNumberElement = document.createElement('span');

        pageNumberElement.textContent = page;
        pageNumberElement.style.marginRight = '5px';
        pageNumberElement.style.cursor = 'pointer';
        pageNumberElement.id = page;
        pageNumberElement.onclick =  (evt) => {
          this.currentPage = evt.target.id;
          console.log('Clicked on page number: ', this.currentPage);
          this.paginate(queryResponse, data);
        };
        this.pageNumbersContainer.appendChild(pageNumberElement);
      }
      // Signal the completion of rendering
      done();
    }
  });