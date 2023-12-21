looker.plugins.visualizations.add({
  create: function(element, config) {
    // Create a container element for the nested divs
    var container = element.appendChild(document.createElement("div"));
    container.id = "my-visualization-container";
    container.style.width="100%";
    container.style.height="100%";
    container.style.backgroundColor="grey";
    container.style.margin="1%";
    container.style.overflow="scroll";
    container.style.display="flex";
    // container.style.flexWrap = 'wrap';

  },
  componentsCreation: function (container,data,queryResponse) {
    // Clear any existing content

    if(queryResponse.fields.dimension_like.length !=4){
        console.log("Only Four dimensions are allowed.")
      }
      if(queryResponse.fields.measure_like.length > 0){
        console.log("Only Four dimensions allowed.")
      }
    // console.log(data)
    var dataset = [];

    data.forEach(function (row) {
      if(dataset.length !=0){
        var flag=0;
        dataset.forEach((row1)=>{
          if(row1["BU"]==row[queryResponse.fields.dimension_like[0].name].value)
          {
            if(row1["BU"]["project"]==row[queryResponse.fields.dimension_like[1].name].value){
              row1["BU"]["project"]["team"].push({
                "name":row[queryResponse.fields.dimension_like[2].name].value,
                "allocation":row[queryResponse.fields.dimension_like[3].name].value
              })
            flag=1;
            }
            else {
              row1["BUData"].push({
                       "project":row[queryResponse.fields.dimension_like[1].name].value,
                       "team":[
                         {
                           "name":row[queryResponse.fields.dimension_like[2].name].value,
                           "allocation":row[queryResponse.fields.dimension_like[3].name].value
                         }
                       ]
                     })
                flag=1;
            }
          }});
        if(flag==0){
        dataset.push({"BU":row[queryResponse.fields.dimension_like[0].name].value,
                     "BUData":[{
                       "project":row[queryResponse.fields.dimension_like[1].name].value,
                       "team":[
                         {
                           "name":row[queryResponse.fields.dimension_like[2].name].value,
                           "allocation":row[queryResponse.fields.dimension_like[3].name].value
                         }
                       ]
                     }]
      })
        }
      }
      else
      {
        var rowData = {"BU":row[queryResponse.fields.dimension_like[0].name].value,
                     "BUData":[{
                       "project":row[queryResponse.fields.dimension_like[1].name].value,
                       "team":[
                         {
                           "name":row[queryResponse.fields.dimension_like[2].name].value,
                           "allocation":row[queryResponse.fields.dimension_like[3].name].value
                         }
                       ]
                     }]
      }
        dataset.push(rowData)
      }
      });
    // console.log(dataset)
    container.innerHTML="";
    for (var dataRecord = 0; dataRecord < dataset.length; dataRecord++) {
        // console.log(dataset[dataRecord])
        var buDiv = container.appendChild(document.createElement("div"));
        console.log("container width",container.clientWidth,"container width",container.clientWidth)
        buDiv.style.width=container.clientWidth/dataset.length;
        buDiv.style.height=container.clientHeight/dataset.length;
        buDiv.style.backgroundColor="#3498db";
        buDiv.style.margin="1%";
        buDiv.style.display="flex";
        // buDiv.style.flexWrap = 'wrap';
        var BUName=dataset[dataRecord]['BU'];
        buDiv.className = `${BUName}`+"bussiness-unit-div";
        buDiv.textContent = `${dataset[dataRecord]['BU']}`;
        for(var projectRecord=0;projectRecord<dataset[dataRecord]["BUData"].length;projectRecord++){
          var projectDiv = buDiv.appendChild(document.createElement("div"));
          var ProjectName=dataset[dataRecord]["BUData"][projectRecord]["project"];
          // console.log(ProjectName)
          projectDiv.className = `${ProjectName}`+"Project-div";
          projectDiv.style.width=buDiv.clientWidth/dataset[dataRecord]["BUData"].length;
          projectDiv.style.height=buDiv.clientHeight/dataset[dataRecord]["BUData"].length;
          projectDiv.style.margin="1%";
          projectDiv.style.backgroundColor="#2ecc71";
          projectDiv.style.display="flex";
          projectDiv.style.flexWrap = 'wrap';
          projectDiv.textContent = ProjectName;
          var TeamDiv = projectDiv.appendChild(document.createElement("div"));
          TeamDiv.className = "Team-Project-div";
          TeamDiv.style.display="flex";
          TeamDiv.style.flexWrap = 'wrap';
          TeamDiv.style.flexDirection = 'row';
          TeamDiv.textContent = "Team";
          TeamDiv.style.width="98%";
          TeamDiv.style.height="90%";
          TeamDiv.style.margin="1%";
          TeamDiv.style.backgroundColor="#e74c3c";
          // treemap-div
          var TreemapDiv = TeamDiv.appendChild(document.createElement("div"));
          TreemapDiv.className = "Treemap-team-div";
          TreemapDiv.style.display="flex";
          TreemapDiv.style.flexWrap = 'wrap';
          TreemapDiv.style.flexDirection = 'row';
          TreemapDiv.style.height="90%";
          TreemapDiv.style.width="100%";
          TreemapDiv.style.margin="1%";
          TreemapDiv.style.backgroundColor="#f39c12";
          var containerWidth = TreemapDiv.clientWidth;
          var containerHeight = TreemapDiv.clientHeight;
          var data1=dataset[dataRecord]["BUData"][projectRecord]["team"]
          // console.log(data1)
          this.chart = d3.select(TreemapDiv).append("svg").attr("width", containerWidth/dataset[dataRecord]["BUData"][projectRecord]["team"].length).attr("height", containerHeight/dataset[dataRecord]["BUData"][projectRecord]["team"].length);
          var colorScale = d3.scaleOrdinal(d3.schemeCategory10);
          var treemap = d3.treemap().size([containerWidth, containerHeight]); // Adjust width as needed
          var root = d3.hierarchy({
            children: data1.map(function (d) {
              return { name: d["name"], value: d["allocation"] };
            }),
          })
            .sum(function (d) {
              return d.value;
            });
          treemap(root);
         // Draw rectangles for each node
          var nodes = this.chart
            .selectAll(".node")
            .data(root.leaves())
            .enter()
            .append("g")
            .attr("class", "node")
            .attr("transform", function (d) {
              return "translate(" + d.x0 + "," + d.y0 + ")";
            })
          nodes
            .append("rect")
            .attr("width", function (d) {
              return d.x1 - d.x0;
            })
            .attr("height", function (d) {
              return d.y1 - d.y0;
            })
            .style("fill", function (d, i) {
              return colorScale(i); // Assign different colors based on the index
            })
            .style("stroke", "white");
          // Add text labels
          nodes
            .append("text")
            .attr("x", function (d) {
              return (d.x1 - d.x0) / 2;
            })
            .attr("y", function (d) {
              return (d.y1 - d.y0) / 2;
            })
            .attr("dy", "0.3em")
            .style("text-anchor", "middle")
            .style("fill", "white")
            .text(function (d) {
              return d.data.name;
            });
            }

      }
  },
  updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
    var container = element.querySelector("#my-visualization-container");
    this.componentsCreation(container,data,queryResponse)
    doneRendering();
  }
});
