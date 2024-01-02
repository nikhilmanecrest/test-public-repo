project_name: "test_mysql"

# # Use local_dependency: To enable referencing of another project
# # on this instance with include: statements
#
# local_dependency: {
#   project: "name_of_other_project"
# }
visualization: {
  id: "donut_viz"
  label: "donut_viz"
  file: "custom_viz/donut.js"
  dependencies: [
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.utils.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.utils.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/helpers.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/helpers.min.js",
  ]
}

visualization: {
  id: "table_viz"
  label: "table_viz"
  file: "custom_viz/table.js"
}
visualization: {
  id: "pie_chart"
  label: "pie_viz"
  file: "custom_viz/Pie_chart.js"
  dependencies: [
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.utils.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.utils.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/helpers.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/helpers.min.js",
  ]
}
visualization: {
  id: "radar_chart"
  label: "radar_viz"
  file: "custom_viz/radar_chart.js"
  dependencies: [
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.utils.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.utils.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/helpers.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/helpers.min.js",
  ]
}
visualization: {
  id: "Pie_chart_table"
  label: "Pie_chart_table"
  file: "custom_viz/Pie_chart_table.js"
  dependencies: [
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.utils.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.utils.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/helpers.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/helpers.min.js",
  ]
}
visualization: {
  id: "custom_table_viz"
  label: "custom_table_viz"
  file: "custom_viz/custom_table_viz.js"
}
visualization: {
  id: "table_with_cross_filtering"
  label: "table_with_cross_filtering"
  file: "custom_viz/table_with_cross_filtering.js"
}
visualization: {
  id: "astor_plot"
  label: "astor_plot"
  file: "custom_viz/astor_plot.js"
  dependencies: ["https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.js",
    "https://d3js.org/d3.v6.min.js",
    "https://code.jquery.com/jquery-2.2.4.min.js","https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js","https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js","https://cdnjs.cloudflare.com/ajax/libs/d3-legend/1.13.0/d3-legend.min.js"]
}
visualization: {
  id: "Spider_chart"
  url: "https://marketplace-api.looker.com/viz-dist/spider.js"
  label: "Spider_chart"
  dependencies: ["https://code.jquery.com/jquery-2.2.4.min.js","https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js","https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js","https://cdnjs.cloudflare.com/ajax/libs/d3-legend/1.13.0/d3-legend.min.js"]
}
visualization: {
  id: "spider_chart_code"
  label: "spider_chart_code"
  file: "custom_viz/spider_chart_code.js"
  dependencies: ["https://code.jquery.com/jquery-2.2.4.min.js","https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js","https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js","https://cdnjs.cloudflare.com/ajax/libs/d3-legend/1.13.0/d3-legend.min.js"]
}
visualization: {
  id: "treemap_code"
  label: "treemap_code"
  file: "custom_viz/treemap.js"
  dependencies: ["https://code.jquery.com/jquery-2.2.4.min.js","https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js","https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js","https://cdnjs.cloudflare.com/ajax/libs/d3-legend/1.13.0/d3-legend.min.js"
   ,"https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js","https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.js" ]
}
visualization: {
  id: "Fill_Gauge"
  label: "Fill_Gauge"
  file: "custom_viz/Fill_Gauge.js"
  dependencies: ["https://code.jquery.com/jquery-2.2.4.min.js","https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js","https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js","https://cdnjs.cloudflare.com/ajax/libs/d3-legend/1.13.0/d3-legend.min.js"
   ,"https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js","https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.js" ]
}


visualization: {
  id: "test_treemap_code"
  label: "test_treemap_code"
  file: "custom_viz/test_treemap.js"
  dependencies: ["https://code.jquery.com/jquery-2.2.4.min.js","https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js","https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js","https://cdnjs.cloudflare.com/ajax/libs/d3-legend/1.13.0/d3-legend.min.js"
    ,"https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js","https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.js" ]
}
visualization: {
  id: "pagination_viz"
  label: "pagination_viz"
  file: "custom_viz/pagination_code.js"
}
visualization: {
  id: "simple_treemap"
  label: "simple_treemap"
  file: "custom_viz/simple_treemap.js"
  dependencies: ["https://code.jquery.com/jquery-2.2.4.min.js","https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js","https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js","https://cdnjs.cloudflare.com/ajax/libs/d3-legend/1.13.0/d3-legend.min.js"
    ,"https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js","https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.js" ]
}
visualization: {
  id: "treemap_hover"
  label: "treemap_hover"
  file: "custom_viz/treemap_hover.js"
  dependencies: ["https://code.jquery.com/jquery-2.2.4.min.js","https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js","https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js","https://cdnjs.cloudflare.com/ajax/libs/d3-legend/1.13.0/d3-legend.min.js"
    ,"https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js","https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.js" ]
}
visualization: {
  id: "normal_treemap_drill_down"
  label: "normal_treemap_drill_down"
  file: "custom_viz/normal_treemap_drill_down.js"
  dependencies: ["https://code.jquery.com/jquery-2.2.4.min.js","https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js","https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js","https://cdnjs.cloudflare.com/ajax/libs/d3-legend/1.13.0/d3-legend.min.js"
    ,"https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js","https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.js" ]
}
visualization: {
  id: "multiple_treemap"
  label: "Multiple_treepmap"
  file: "custom_viz/Multiple_treepmap.js"
  dependencies: ["https://code.jquery.com/jquery-2.2.4.min.js","https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js","https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js","https://cdnjs.cloudflare.com/ajax/libs/d3-legend/1.13.0/d3-legend.min.js"
    ,"https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js","https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.js" ]
}
visualization: {
  id: "cascade_treemap"
  label: "cascade_treemap"
  file: "custom_viz/CascadedTreemap.js"
  dependencies: ["https://code.jquery.com/jquery-2.2.4.min.js","https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js","https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js","https://cdnjs.cloudflare.com/ajax/libs/d3-legend/1.13.0/d3-legend.min.js"
    ,"https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js","https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.js" ]
}
visualization: {
  id: "cascade_treemap_with_obserable_code"
  label: "cascade_treemap_with_obserable_code"
  file: "custom_viz/cascade_treemap_with_obserable_code.js"
  dependencies: ["https://code.jquery.com/jquery-2.2.4.min.js","https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js","https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js","https://cdnjs.cloudflare.com/ajax/libs/d3-legend/1.13.0/d3-legend.min.js"
    ,"https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js","https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.js","https://d3js.org/d3.v7.min.js"
 ]
}
visualization: {
  id: "circle_packing"
  label: "circle_packing"
  file: "custom_viz/circle_packing.js"
  dependencies: ["https://code.jquery.com/jquery-2.2.4.min.js","https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js","https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js","https://cdnjs.cloudflare.com/ajax/libs/d3-legend/1.13.0/d3-legend.min.js"
    ,"https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js","https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.js","https://d3js.org/d3.v7.min.js"
  ]
}
visualization: {
  id: "Zoomble_treemap"
  label: "Zoomble_treemap"
  file: "custom_viz/Zoomble_treemap.js"
  dependencies: ["https://code.jquery.com/jquery-2.2.4.min.js","https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js","https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js","https://cdnjs.cloudflare.com/ajax/libs/d3-legend/1.13.0/d3-legend.min.js"
    ,"https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js","https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.js","https://d3js.org/d3.v7.min.js"
  ]
}
