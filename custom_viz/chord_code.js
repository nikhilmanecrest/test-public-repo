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
  },

  // Render in response to the data or settings changing
  update: function (data, element, config, queryResponse) {
    // Use a named function expression for handleErrors
    const handleErrors = function (queryResponse, options) {
      if (!queryResponse || !queryResponse.fields) {
        console.error('Invalid query response');
        return false;
      }

      const fields = queryResponse.fields;
      const numDimensions = fields.dimension_like.length;
      const numMeasures = fields.measure_like.length;

      if (numDimensions < options.min_dimensions || numDimensions > options.max_dimensions) {
        console.error('Invalid number of dimensions');
        return false;
      }

      if (numMeasures < options.min_measures || numMeasures > options.max_measures) {
        console.error('Invalid number of measures');
        return false;
      }

      // Additional validation checks if needed

      return true;
    };

    if (!handleErrors(queryResponse, {
      min_pivots: 0, max_pivots: 0,
      min_dimensions: 2, max_dimensions: 2,
      min_measures: 1, max_measures: 1
    })) return;

    // Rest of the update function remains unchanged
  }
});
