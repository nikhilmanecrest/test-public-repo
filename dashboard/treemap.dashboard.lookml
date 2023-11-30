- dashboard: treemap
  title: Treemap
  layout: newspaper
  preferred_viewer: dashboards-next
  description: ''
  preferred_slug: jXgOyWntroVBhEcoAVMZ4Q
  elements:
  - title: Treemap
    name: Treemap
    model: test_mysql_nikhil
    explore: employees
    type: test_mysql_nikhil::treemap_code
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
    width: 21
    height: 11
