- dashboard: pie_chart_with_table
  title: Pie chart with table
  layout: newspaper
  preferred_viewer: dashboards-next
  description: ''
  preferred_slug: MlMgLcJ0lCQHE4UtPITQ4r
  elements:
  - title: Untitled
    name: Untitled
    model: test_mysql_nikhil
    explore: products
    type: test_mysql_nikhil::Pie_chart_table
    fields: [products.product_name, products.count]
    sorts: [products.count desc 0]
    limit: 500
    column_limit: 50
    hidden_fields: []
    hidden_points_if_no: []
    series_labels: {}
    show_view_names: false
    x_axis_gridlines: false
    y_axis_gridlines: true
    show_y_axis_labels: true
    show_y_axis_ticks: true
    y_axis_tick_density: default
    y_axis_tick_density_custom: 5
    show_x_axis_label: true
    show_x_axis_ticks: true
    y_axis_scale_mode: linear
    x_axis_reversed: false
    y_axis_reversed: false
    plot_size_by_field: false
    trellis: ''
    stacking: ''
    limit_displayed_rows: false
    legend_position: center
    point_style: none
    show_value_labels: false
    label_density: 25
    x_axis_scale: auto
    y_axis_combined: true
    ordering: none
    show_null_labels: false
    show_totals_labels: false
    show_silhouette: false
    totals_color: "#808080"
    defaults_version: 0
    listen: {}
    row: 0
    col: 0
    width: 8
    height: 8
  - title: Untitled
    name: Untitled (2)
    model: test_mysql_nikhil
    explore: offices
    type: test_mysql_nikhil::custom_table_viz
    fields: [offices.country, offices.count, offices.city, offices.office_code, offices.postal_code,
      offices.state, offices.territory]
    sorts: [offices.count desc 0]
    limit: 500
    column_limit: 50
    hidden_fields: []
    hidden_points_if_no: []
    series_labels: {}
    show_view_names: true
    defaults_version: 0
    listen:
      Country: offices.country
    row: 0
    col: 16
    width: 8
    height: 8
  - title: Untitled
    name: Untitled (3)
    model: test_mysql_nikhil
    explore: offices
    type: test_mysql_nikhil::Pie_chart_table
    fields: [offices.country, offices.count]
    sorts: [offices.count desc 0]
    limit: 500
    column_limit: 50
    hidden_fields: []
    hidden_points_if_no: []
    series_labels: {}
    show_view_names: true
    defaults_version: 0
    listen:
      Country: offices.country
    row: 0
    col: 8
    width: 8
    height: 8
  filters:
  - name: Country
    title: Country
    type: field_filter
    default_value: ''
    allow_multiple_values: true
    required: false
    ui_config:
      type: dropdown_menu
      display: popover
    model: test_mysql_nikhil
    explore: offices
    listens_to_filters: []
    field: offices.country
