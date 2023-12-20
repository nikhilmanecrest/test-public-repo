const visObject = {
    create: function(element, config) {
        var container = element.appendChild(document.createElement("div"));
        container.id = "my-visualization-container";
        container.style.width = "100%";
        container.style.height = "100%";
        container.style.overflow = "scroll";
    },
  zoomTo: function zoomTo(v,width,label,node) {
      const k = width / v[2];

      view = v;
      label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
      node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
      node.attr("r", d => d.r * k);
      },
  zoom: function (event, d,width,svg,label) {
      const focus0 = focus;
      focus = d;
      const transition = svg.transition()
        .duration(event.altKey ? 7500 : 750)
        .tween("zoom", d => {
          const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
          return t => this.zoomTo(i(t),width);
        });

      label
        .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
        .transition(transition)
        .style("fill-opacity", d => d.parent === focus ? 1 : 0)
        .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
        .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
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
      // Specify the chart’s dimensions.
      var container = element.querySelector("#my-visualization-container");
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Create the color scale.
        const color = d3.scaleLinear()
            .domain([0, 5])
            .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
            .interpolate(d3.interpolateHcl);

        // Compute the layout.
        const pack = data => d3.pack()
            .size([width, height])
            .padding(3)
          (d3.hierarchy(data)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value));
        const root = pack(data);

        // Create the SVG container.
        const svg = d3.create("svg")
            .attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
            .attr("width", width)
            .attr("height", height)
            .attr("style", `max-width: 100%; height: auto; display: block; margin: 0 -14px; background: ${color(0)}; cursor: pointer;`);

        // Append the nodes.
        const node = svg.append("g")
          .selectAll("circle")
          .data(root.descendants().slice(1))
          .join("circle")
            .attr("fill", d => d.children ? color(d.depth) : "white")
            .attr("pointer-events", d => !d.children ? "none" : null)
            .on("mouseover", function() { d3.select(this).attr("stroke", "#000"); })
            .on("mouseout", function() { d3.select(this).attr("stroke", null); })
            .on("click", (event, d) => focus !== d && (
              zoom(event, d), event.stopPropagation()));

        // Append the text labels.
        const label = svg.append("g")
            .style("font", "10px sans-serif")
            .attr("pointer-events", "none")
            .attr("text-anchor", "middle")
          .selectAll("text")
          .data(root.descendants())
          .join("text")
            .style("fill-opacity", d => d.parent === root ? 1 : 0)
            .style("display", d => d.parent === root ? "inline" : "none")
            .text(d => d.data.name);

        // Create the zoom behavior and zoom immediately in to the initial focus node.
        svg.on("click", (event) => zoom(event, root));
        let focus = root;
        let view;
        zoomTo([focus.x, focus.y, focus.r * 2]);

        function zoomTo(v) {
          const k = width / v[2];
          view = v;
          label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
          node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
          node.attr("r", d => d.r * k);
        }

        function zoom(event, d) {
          const focus0 = focus;
          focus = d;
          const transition = svg.transition()
              .duration(event.altKey ? 7500 : 750)
              .tween("zoom", d => {
                const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
                return t => zoomTo(i(t));
              });

          label
            .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
            .transition(transition)
              .style("fill-opacity", d => d.parent === focus ? 1 : 0)
              .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
              .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
        }

        container.innerHTML = "";
        container.appendChild(svg.node())
    },
};

looker.plugins.visualizations.add(visObject);
