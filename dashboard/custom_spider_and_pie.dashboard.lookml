- dashboard: new_dashboard
  title: New Dashboard
  layout: newspaper
  preferred_viewer: dashboards-next
  description: ''
  preferred_slug: LaiKFGyTw8hmc7FWTQ6edy
  elements:
  - title: Untitled
    name: Untitled
    model: test_mysql_nikhil
    explore: customers
    type: test_mysql_nikhil::pie_chart
    fields: [customers.count, customers.country]
    sorts: [customers.count desc]
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
    width: 24
    height: 10
  - title: Untitled
    name: Untitled (2)
    model: test_mysql_nikhil
    explore: employees
    type: test_mysql_nikhil::radar_chart
    fields: [employees.job_title, employees.count]
    sorts: [employees.count desc 0]
    limit: 500
    column_limit: 50
    hidden_fields: []
    hidden_points_if_no: []
    series_labels: {}
    show_view_names: true
    defaults_version: 0
    row: 10
    col: 0
    width: 8
    height: 6
  - title: Untitled
    name: Untitled (3)
    model: test_mysql_nikhil
    explore: employees
    type: test_mysql_nikhil::Pie_chart_table
    fields: [employees.reports_to, employees.count]
    sorts: [employees.count desc 0]
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
    show_null_points: true
    defaults_version: 0
    row: 10
    col: 8
    width: 8
    height: 6
