- dashboard: all_custom_visualizations
  title: All Custom Visualizations
  layout: newspaper
  preferred_viewer: dashboards-next
  description: ''
  preferred_slug: jXgOyWntroVBhEcoAVMZ4Q
  elements:
  - title: Treemap
    name: Treemap
    model: test_mysql_nikhil
    explore: employees
    type: test_mysql_nikhil::test_treemap_code
    fields: [employees.count, employees.first_name]
    sorts: [employees.count desc 0]
    limit: 500
    column_limit: 50
    hidden_fields: []
    hidden_points_if_no: []
    series_labels: {}
    show_view_names: true
    defaults_version: 0
    listen: {}
    row: 0
    col: 0
    width: 24
    height: 11
  - title: Table with Drill down
    name: Table with Drill down
    model: test_mysql_nikhil
    explore: offices
    type: test_mysql_nikhil::custom_table_viz
    fields: [offices.city, offices.country, offices.postal_code, offices.count]
    sorts: [offices.count desc 0]
    limit: 500
    column_limit: 50
    hidden_fields: []
    hidden_points_if_no: []
    series_labels: {}
    show_view_names: true
    defaults_version: 0
    row: 11
    col: 7
    width: 9
    height: 6
  - title: Pie chart with Table
    name: Pie chart with Table
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
    row: 11
    col: 0
    width: 7
    height: 6
  - title: Pie chart with drill fields
    name: Pie chart with drill fields
    model: test_mysql_nikhil
    explore: employees
    type: test_mysql_nikhil::pie_chart
    fields: [employees.first_name, employees.count]
    sorts: [employees.count desc 0]
    limit: 500
    column_limit: 50
    hidden_fields: []
    hidden_points_if_no: []
    series_labels: {}
    show_view_names: true
    defaults_version: 0
    row: 11
    col: 16
    width: 8
    height: 6
  - title: Radar Viz using chartjs
    name: Radar Viz using chartjs
    model: test_mysql_nikhil
    explore: customers
    type: test_mysql_nikhil::radar_chart
    fields: [customers.state, customers.count]
    sorts: [customers.count desc 0]
    limit: 500
    column_limit: 50
    hidden_fields: []
    hidden_points_if_no: []
    series_labels: {}
    show_view_names: true
    defaults_version: 0
    row: 17
    col: 0
    width: 8
    height: 6
