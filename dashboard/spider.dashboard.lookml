- dashboard: new_dashboard3
  title: New Dashboard3
  layout: newspaper
  preferred_viewer: dashboards-next
  description: ''
  preferred_slug: 1OVffeud8rKtzZzGmgLh2q
  elements:
  - title: Untitled
    name: Untitled
    model: test_mysql_nikhil
    explore: orders
    type: looker_column
    fields: [orders.shipped_date, orders.order_number]
    sorts: [orders.shipped_date desc]
    limit: 500
    column_limit: 50
    x_axis_gridlines: false
    y_axis_gridlines: true
    show_view_names: false
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
    defaults_version: 1
    listen: {}
    row: 0
    col: 8
    width: 8
    height: 6
  - title: Untitled
    name: Untitled (2)
    model: test_mysql_nikhil
    explore: orders
    type: looker_pie
    fields: [orders.status, orders.count]
    sorts: [orders.count desc 0]
    limit: 500
    column_limit: 50
    value_labels: legend
    label_type: labPer
    defaults_version: 1
    row: 0
    col: 0
    width: 8
    height: 6
  - title: Untitled
    name: Untitled (3)
    model: test_mysql_nikhil
    explore: products
    type: test_mysql_nikhil::astor_plot
    fields: [products.count, price, products.product_name]
    sorts: [products.count desc 0]
    limit: 500
    column_limit: 50
    dynamic_fields:
    - category: measure
      expression:
      label: Price
      value_format:
      value_format_name:
      based_on: products.buy_price
      _kind_hint: measure
      measure: price
      type: average
      _type_hint: number
    hidden_fields: []
    hidden_points_if_no: []
    series_labels: {}
    show_view_names: true
    legend: left
    label_value: 'on'
    center_value: min
    radius: 24
    defaults_version: 0
    row: 0
    col: 16
    width: 8
    height: 6
  - title: Spider chart with URL
    name: Spider chart with URL
    model: test_mysql_nikhil
    explore: products
    type: test_mysql_nikhil::Spider_chart
    fields: [products.count, buy_price, max_stock, products.product_vendor]
    sorts: [products.count desc 0]
    limit: 500
    column_limit: 50
    dynamic_fields:
    - category: measure
      expression:
      label: Buy Price
      value_format:
      value_format_name:
      based_on: products.buy_price
      _kind_hint: measure
      measure: buy_price
      type: average
      _type_hint: number
    - category: measure
      expression:
      label: Max stock
      value_format:
      value_format_name:
      based_on: products.quantity_in_stock
      _kind_hint: measure
      measure: max_stock
      type: max
      _type_hint: number
    hidden_fields: []
    hidden_points_if_no: []
    series_labels: {}
    show_view_names: true
    defaults_version: 0
    row: 6
    col: 0
    width: 8
    height: 6
  - title: Spider chart with URL (Copy)
    name: Spider chart with URL (Copy)
    model: test_mysql_nikhil
    explore: products
    type: test_mysql_nikhil::spider_chart_code
    fields: [products.count, buy_price, max_stock, products.product_vendor]
    sorts: [products.count desc 0]
    limit: 500
    column_limit: 50
    dynamic_fields:
    - category: measure
      expression:
      label: Buy Price
      value_format:
      value_format_name:
      based_on: products.buy_price
      _kind_hint: measure
      measure: buy_price
      type: average
      _type_hint: number
    - category: measure
      expression:
      label: Max stock
      value_format:
      value_format_name:
      based_on: products.quantity_in_stock
      _kind_hint: measure
      measure: max_stock
      type: max
      _type_hint: number
    hidden_fields: []
    hidden_points_if_no: []
    series_labels: {}
    show_view_names: true
    defaults_version: 0
    row: 6
    col: 8
    width: 8
    height: 6
