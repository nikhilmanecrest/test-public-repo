const visObject = {
    create: function(element, config) {
        var container = element.appendChild(document.createElement("div"));
        container.id = "my-visualization-container";
        container.style.width = "100%";
        container.style.height = "100%";
        container.style.overflow = "scroll";

    },
    cascade: function(root, offset) {
        const x = new Map();
        const y = new Map();
        return root.eachAfter(d => {
            if (d.children) {
                x.set(d, 1 + d3.max(d.children, c => (c.x1 === d.x1 - offset ? x.get(c) : NaN)));
                y.set(d, 1 + d3.max(d.children, c => (c.y1 === d.y1 - offset ? y.get(c) : NaN)));
            } else {
                x.set(d, 0);
                y.set(d, 0);
            }
        }).eachBefore(d => {
            d.x1 -= 2 * offset * x.get(d);
            d.y1 -= 2 * offset * y.get(d);
        });
    },
    updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
        var dataset = [];
        // Iterate on each row of data.
        data.forEach(function(row) {
          // Checking Whether length of dataset is greater than 0 or Not.
          if (dataset.length != 0) {
                var flag = 0;
        var projectFlag=0;
                // Iterating over the Existing BU data for Same BU.
        for(let i=0;i<dataset[0]["children"].length;i++) {
          ExistingBUData = dataset[0]["children"][i];
                    // Checking Whether BU is present or not in Existing dataset
                    if (ExistingBUData["name"] == row[queryResponse.fields.dimension_like[0].name].value) {
                        // Iterating over Existing BU of Project for Same Project.
            for(let j=0;j<ExistingBUData["children"].length;j++){
              ExistingProjectData = ExistingBUData["children"][j]
              // Checking Whether Project is present or not in Existing dataset.
              if (ExistingProjectData["name"] == row[queryResponse.fields.dimension_like[1].name].value) {
                 // adding data into Project. (Same BU & Same Project.)
                 ExistingProjectData["children"].push({
                  "name": row[queryResponse.fields.dimension_like[2].name].value,
                  "value": row[queryResponse.fields.dimension_like[3].name].value
                })
                projectFlag = 1;
                break;
              }
            }
            // Same BU But Not Same Project
            if(projectFlag==0){
              ExistingBUData["children"].push({
                "name": row[queryResponse.fields.dimension_like[1].name].value,
                "children": [
                  {
                  "name": row[queryResponse.fields.dimension_like[2].name].value,
                  "value": row[queryResponse.fields.dimension_like[3].name].value
                  }
                ]
              });
              flag=1;
              break;
            }
                    }
        }
        // Not Same BU

        if(flag==0 && projectFlag==0){
          dataset[0]["children"].push({
            "name": row[queryResponse.fields.dimension_like[0].name].value,
            "children": [{
              "name": row[queryResponse.fields.dimension_like[1].name].value,
              "children": [{
                "name": row[queryResponse.fields.dimension_like[2].name].value,
                "value": row[queryResponse.fields.dimension_like[3].name].value
              }]
            }]
          });
        }
      }
            else {
                // adding first Time data into dataset
                var rowData = {
                    "name": "CDS",
                    "children": [{
                        "name": row[queryResponse.fields.dimension_like[0].name].value,
                        "children": [{
                            "name": row[queryResponse.fields.dimension_like[1].name].value,
                            "children": [{
                                "name": row[queryResponse.fields.dimension_like[2].name].value,
                                "value": row[queryResponse.fields.dimension_like[3].name].value
                            }]
                        }]
                    }]
                }
                dataset.push(rowData)
            }
        });
        data = dataset[0];
        console.log(data)
        // Specify the chart’s dimensions.
        var container = element.querySelector("#my-visualization-container");
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Replace the color scale with a different interpolator
        const color = d3.scaleSequential([8, 0], d3.interpolateViridis);

        // Create the treemap layout.
        const treemap = data =>
            this.cascade(
                d3
                .treemap()
                .size([width, height])
                .paddingOuter(3)
                .paddingTop(19)
                .paddingInner(1)
                .round(true)(d3.hierarchy(data).sum(d => d.value).sort((a, b) => b.value - a.value)),
                3 // treemap.paddingOuter
            );
        const root = treemap(data);

        // Create the SVG container.
        const svg = d3
            .create("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height])
            .attr("style", "max-width: 100%; height: auto; overflow: visible; font: 10px sans-serif;");
        // Create the drop shadow.
        const shadow = svg
            .append("filter")
            .attr("id", "shadow")
            .append("feDropShadow")
            .attr("flood-opacity", 0.3)
            .attr("dx", 0)
            .attr("stdDeviation", 3);

        // Add nodes (with a color rect and a text label).
        const node = svg
            .selectAll("g")
            .data(root.descendants())
            .enter()
            .append("g")
            .attr("filter", "url(#shadow)")
            .attr("transform", d => `translate(${d.x0},${d.y0})`);

        const format = d3.format(",d");
        node
            .append("title")
            .text(d => `${d.ancestors().reverse().map(d => d.data.name).join("/")}\n${format(d.value)}`);

        node
            .append("rect")
            .attr("id", d => (d.nodeUid = `node-${Math.random().toString(36).substr(2, 9)}`).toString())
            .attr("fill", d => color(d.height))
            .attr("width", d => d.x1 - d.x0)
            .attr("height", d => d.y1 - d.y0);

        node
            .append("clipPath")
            .attr("id", d => (d.clipUid = `clip-${Math.random().toString(36).substr(2, 9)}`).toString())
            .append("use")
            .attr("xlink:href", d => `#${d.nodeUid}`);

        node
            .append("text")
            .attr("clip-path", d => `url(#${d.clipUid})`)
            .selectAll("tspan")
            .data(d => d.data.name.split(/(?=[A-Z][^A-Z])/g).concat(format(d.value)))
            .enter()
            .append("tspan")
            .attr("fill-opacity", (d, i, nodes) => (i === nodes.length - 1 ? 0.7 : null))
            .text(d => d);

        node
            .filter(d => d.children)
            .selectAll("tspan")
            .attr("dx", 3)
            .attr("y", 13);

        node
            .filter(d => !d.children)
            .selectAll("tspan")
            .attr("x", 3)
            .attr("y", (d, i, nodes) => `${(i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em`);
        container.innerHTML = "";
        container.appendChild(svg.node())
    },
};

looker.plugins.visualizations.add(visObject);
