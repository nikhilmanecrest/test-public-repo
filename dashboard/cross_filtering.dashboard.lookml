- dashboard: cross_filtering
  title: cross filtering
  layout: newspaper
  preferred_viewer: dashboards-next
  crossfilter_enabled: true
  description: ''
  preferred_slug: NCxtlMWLwkPCVOqM6vKlFq
  elements:
  - title: Untitled
    name: Untitled
    model: test_mysql_nikhil
    explore: offices
    type: test_mysql_nikhil::table_with_cross_filtering
    fields: [offices.address_line1, offices.country, offices.phone, offices.postal_code,
      offices.count]
    sorts: [offices.count desc 0]
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
    width: 8
    height: 6
  - title: Untitled (Copy)
    name: Untitled (Copy)
    model: test_mysql_nikhil
    explore: offices
    type: test_mysql_nikhil::table_with_cross_filtering
    fields: [offices.count, offices.address_line2, offices.city, offices.office_code,
      offices.state, offices.territory]
    sorts: [offices.count desc 0]
    limit: 500
    column_limit: 50
    hidden_fields: []
    hidden_points_if_no: []
    series_labels: {}
    show_view_names: true
    defaults_version: 0
    row: 0
    col: 8
    width: 8
    height: 6
