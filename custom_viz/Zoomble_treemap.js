const visObject = {
    create: function(element, config) {
        var container = element.appendChild(document.createElement("div"));
        container.id = "my-visualization-container";
        container.style.width = "100%";
        container.style.height = "100%";
        container.style.overflow = "scroll";
    },
    updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
        var dataset = [];
        let leafUidCounter = 0;
        let clipUidCounter = 0;

        // Iterate on each row of data.
        data.forEach(function(row) {
            // Checking Whether length of dataset is greater than 0 or Not.
            if (dataset.length != 0) {
                var flag = 0;
                var projectFlag = 0;
                // Iterating over the Existing BU data for the Same BU.
                for (let i = 0; i < dataset[0]["children"].length; i++) {
                    ExistingBUData = dataset[0]["children"][i];
                    // Checking Whether BU is present or not in Existing dataset
                    if (ExistingBUData["name"] == row[queryResponse.fields.dimension_like[0].name].value) {
                        // Iterating over Existing BU of Project for the Same Project.
                        for (let j = 0; j < ExistingBUData["children"].length; j++) {
                            ExistingProjectData = ExistingBUData["children"][j];
                            // Checking Whether Project is present or not in Existing dataset.
                            if (ExistingProjectData["name"] == row[queryResponse.fields.dimension_like[1].name].value) {
                                // adding data into Project. (Same BU & Same Project.)
                                ExistingProjectData["children"].push({
                                    "name": row[queryResponse.fields.dimension_like[2].name].value,
                                    "value": row[queryResponse.fields.dimension_like[3].name].value
                                });
                                projectFlag = 1;
                                break;
                            }
                        }
                        // Same BU But Not Same Project
                        if (projectFlag == 0) {
                            ExistingBUData["children"].push({
                                "name": row[queryResponse.fields.dimension_like[1].name].value,
                                "children": [{
                                    "name": row[queryResponse.fields.dimension_like[2].name].value,
                                    "value": row[queryResponse.fields.dimension_like[3].name].value
                                }]
                            });
                            flag = 1;
                            break;
                        }
                    }
                }
                // Not Same BU
                if (flag == 0 && projectFlag == 0) {
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
            } else {
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
                };
                dataset.push(rowData);
            }
        });
        data = dataset[0];
        // Specify the chart’s dimensions.
        var container = element.querySelector("#my-visualization-container");
        const width = container.clientWidth;
        const height = container.clientHeight;

        // This custom tiling function adapts the built-in binary tiling function
        // for the appropriate aspect ratio when the treemap is zoomed-in.
        function tile(node, x0, y0, x1, y1) {
            d3.treemapBinary(node, 0, 0, width, height);
            for (const child of node.children) {
                child.x0 = x0 + (child.x0 / width) * (x1 - x0);
                child.x1 = x0 + (child.x1 / width) * (x1 - x0);
                child.y0 = y0 + (child.y0 / height) * (y1 - y0);
                child.y1 = y0 + (child.y1 / height) * (y1 - y0);
            }
        }

        // Compute the layout.
        const hierarchy = d3.hierarchy(data)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value);
        const root = d3.treemap().tile(tile)(hierarchy);

        // Create the scales.
        const x = d3.scaleLinear().rangeRound([0, width]);
        const y = d3.scaleLinear().rangeRound([0, height]);

        // Formatting utilities.
        const format = d3.format(",d");
        const name = d => d.ancestors().reverse().map(d => d.data.name).join("/");

        // Create the SVG container.
        const svg = d3.create("svg")
            .attr("viewBox", [0.5, -30.5, width, height + 30])
            .attr("width", width)
            .attr("height", height + 30)
            .attr("style", "max-width: 100%; height: auto;")
            .style("font", "10px sans-serif");

        // Display the root.
        let group = svg.append("g").call(render, root);

        function render(group, root) {
            const node = group
                .selectAll("g")
                .data(root.children.concat(root))
                .join("g");

            node.filter(d => (d === root ? d.parent : d.children))
                .attr("cursor", "pointer")
                .on("click", (event, d) => (d === root ? zoomout(root) : zoomin(d)));

            node.append("title")
                .text(d => `${name(d)}\n${format(d.value)}`);

            node.append("rect")
                .attr("id", d => (d.leafUid = `leaf-${leafUidCounter++}`).id)
                .attr("fill", d => (d === root ? "#fff" : d.children ? "#ccc" : "#ddd"))
                .attr("stroke", "#fff");

            node.append("clipPath")
                .attr("id", d => (d.clipUid = `clip-${clipUidCounter++}`).id)
                .append("use")
                .attr("xlink:href", d => `#${d.leafUid}`);

            node.append("text")
                .attr("clip-path", d => `url(#${d.clipUid.id})`)
                .attr("font-weight", d => (d === root ? "bold" : null))
                .selectAll("tspan")
                .data(d => (d === root ? name(d) : d.data.name).split(/(?=[A-Z][^A-Z])/g).concat(format(d.value)))
                .join("tspan")
                .attr("x", 3)
                .attr("y", (d, i, nodes) => `${(i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em`)
                .attr("fill-opacity", (d, i, nodes) => (i === nodes.length - 1 ? 0.7 : null))
                .attr("font-weight", (d, i, nodes) => (i === nodes.length - 1 ? "normal" : null))
                .text(d => d);

            group.call(position, root);
        }

        function position(group, root) {
            group
                .selectAll("g")
                .attr("transform", d => (d === root ? `translate(0,-30)` : `translate(${x(d.x0)},${y(d.y0)})`))
                .select("rect")
                .attr("width", d => (d === root ? width : x(d.x1) - x(d.x0)))
                .attr("height", d => (d === root ? 30 : y(d.y1) - y(d.y0)));
        }

        // When zooming in, draw the new nodes on top, and fade them in.
        function zoomin(d) {
            const group0 = group.attr("pointer-events", "none");
            const group1 = (group = svg.append("g").call(render, d));

            x.domain([d.x0, d.x1]);
            y.domain([d.y0, d.y1]);

            svg.transition()
                .duration(750)
                .call(t => group0.transition(t).remove().call(position, d.parent))
                .call(t =>
                    group1.transition(t)
                    .attrTween("opacity", () => d3.interpolate(0, 1))
                    .call(position, d)
                );
        }

        // When zooming out, draw the old nodes on top, and fade them out.
        function zoomout(d) {
            const group0 = group.attr("pointer-events", "none");
            const group1 = (group = svg.insert("g", "*").call(render, d.parent));

            x.domain([d.parent.x0, d.parent.x1]);
            y.domain([d.parent.y0, d.parent.y1]);

            svg.transition()
                .duration(750)
                .call(t => group0.transition(t).remove().attrTween("opacity", () => d3.interpolate(1, 0)).call(position, d))
                .call(t => group1.transition(t).call(position, d.parent));
        }

        container.innerHTML = "";
        container.appendChild(svg.node());
    },
};

looker.plugins.visualizations.add(visObject);
