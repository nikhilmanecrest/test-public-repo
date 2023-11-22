looker.plugins.visualizations.add({
  id: "Pie_chart",
  label: "Pie_chart",
  options: {
    font_size: {
      type: "string",
      label: "Font Size",
      values: [
        {"Large": "large"},
        {"Small": "small"}
      ],
      display: "radio",
      default: "large"
    }
  },
    create: function (element, config) {
      var canvas = document.createElement('canvas');
      canvas.style = "border:thin solid black";
      element.appendChild(canvas);
    },

    updateAsync: function (data, element, config, queryResponse, details, done) {
        done();
    }
});
