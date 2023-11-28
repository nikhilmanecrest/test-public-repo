looker.plugins.visualizations.add({
  id: 'chord',
  label: 'Chord',
  options: {
    color_range: {
      type: 'array',
      label: 'Color Range',
      display: 'colors',
      default: ['#dd3333', '#80ce5d', '#f78131', '#369dc1', '#c572d3', '#36c1b3', '#b57052', '#ed69af']
    }
  },
  // Set up the initial state of the visualization
  create: function (element, config) {
    element.innerHTML = `
      <style>
        .chordchart circle {
          fill: none;
          pointer-events: all;
        }

        .chordchart:hover path.chord-fade {
          display: none;
        }

        .groups text {
          font-size: 12px;
        }

        .chordchart, .chord-tip {
          font-family: "Open Sans", "Helvetica", sans-serif;
        }

        .chord-tip {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 10;
        }
      </style>
    `;

    this.tooltip = d3.select(element).append('div').attr('class', 'chord-tip');
    this.svg = d3.select(element).append('svg');
  },
  // Render in response to the data or settings changing
  update: function (data, element, config, queryResponse) {
    if (!handleErrors(this, queryResponse, {
      min_pivots: 0, max_pivots: 0,
      min_dimensions: 2, max_dimensions: 2,
      min_measures: 1, max_measures: 1
    })) return;

    const dimensions = queryResponse.fields.dimension_like;
    const measure = queryResponse.fields.measure_like[0];

    const width = element.clientWidth;
    const height = element.clientHeight;
    const thickness = 15;
    const outerRadius = Math.min(width, height) * 0.5;
    const innerRadius = outerRadius - thickness;

    if (innerRadius < 0) return;

    const valueFormatter = formatType(measure.value_format) || defaultFormatter;

    const tooltip = this.tooltip;

    const colorScale = d3.scaleOrdinal();
    if (config.color_range == null || !(/^#/).test(config.color_range[0])) {
      config.color_range = this.options.color_range.default;
    }
    const color = colorScale.range(config.color_range);

    const chord = d3.chord()
      .padAngle(0.025)
      .sortSubgroups(d3.descending)
      .sortChords(d3.descending);

    const ribbon = d3.ribbon()
      .radius(innerRadius);

    const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const matrix = this.computeMatrix(data, dimensions.map(d => d.name), measure.name);

    const svg = this.svg
      .html('')
      .attr('width', '100%')
      .attr('height', '100%')
      .append('g')
      .attr('class', 'chordchart')
      .attr('transform', 'translate(' + width / 2 + ',' + (height / 2) + ')')
      .datum(chord(matrix.matrix));

    svg.append('circle')
      .attr('r', outerRadius);

    const ribbons = svg.append('g')
      .attr('class', 'ribbons')
      .selectAll('path')
      .data(chords => chords)
      .enter().append('path')
      .style('opacity', 0.8)
      .attr('d', ribbon)
      .style('fill', d => color(d.target.index))
      .style('stroke', d => d3.rgb(color(d.index)).darker())
      .on('mouseenter', d => {
        tooltip.html(this.titleText(matrix.nameByIndex, d.source, d.target, valueFormatter));
      })
      .on('mouseleave', d => tooltip.html(''));

    const group = svg.append('g')
      .attr('class', 'groups')
      .selectAll('g')
      .data(chords => chords.groups)
      .enter().append('g')
      .on('mouseover', (d, i) => {
        ribbons.classed('chord-fade', p => p.source.index !== i && p.target.index !== i);
      });

    const groupPath = group.append('path')
      .style('opacity', 0.8)
      .style('fill', d => color(d.index))
      .style('stroke', d => d3.rgb(color(d.index)).darker())
      .attr('id', (d, i) => `group${i}`)
      .attr('d', arc);

    const groupPathNodes = groupPath.nodes();

    const groupText = group.append('text').attr('dy', 11);

    groupText.append('textPath')
      .attr('xlink:href', (d, i) => `#group${i}`)
      .attr('startOffset', (d, i) => (groupPathNodes[i].getTotalLength() - (thickness * 2)) / 4)
      .style('text-anchor', 'middle')
      .text(d => matrix.nameByIndex.get(d.index.toString()));

    groupText
      .filter(function (d, i) {
        return groupPathNodes[i].getTotalLength() / 2 - 16 < this.getComputedTextLength();
      })
      .remove();
  },
  computeMatrix: function (data, dimensions, measure) {
    const indexByName = d3.map();
    const nameByIndex = d3.map();
    const matrix = [];
    let n = 0;

    dimensions.forEach(dimension => {
      data.forEach(d => {
        const value = d[dimension].value;
        if (!indexByName.has(value)) {
          nameByIndex.set(n.toString(), value);
          indexByName.set(value, n++);
        }
      });
    });

    for (let i = -1; ++i < n;) {
      matrix[i] = [];
      for (let t = -1; ++t < n;) {
        matrix[i][t] = 0;
      }
    }

    data.forEach(d => {
      const row = indexByName.get(d[dimensions[1]].value);
      const col = indexByName.get(d[dimensions[0]].value);
      const val = d[measure].value;
      matrix[row][col] = val;
    });

    return {
      matrix,
      indexByName,
      nameByIndex
    };
  },
  titleText: function (lookup, source, target, formatter) {
    const sourceName = lookup.get(source.index);
    const sourceValue = formatter(source.value);
    const targetName = lookup.get(target.index);
    const targetValue = formatter(target.value);
    return `
      <p>${sourceName} → ${targetName}: ${sourceValue}</p>
      <p>${targetName} → ${sourceName}: ${targetValue}</p>
    `;
  }
});
