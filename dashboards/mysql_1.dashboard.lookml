- dashboard: mysql_dashboard
  title: MySQL Dashboard
  layout: newspaper
  preferred_viewer: dashboards-next
  description: ''
  preferred_slug: BUeEt5fRbPQZYAKcyubepZ
  elements:
  - title: Monthly Order Status
    name: Monthly Order Status
    model: test_mysql
    explore: orders
    type: looker_column
    fields: [orders.status, orders.count, orders.order_month]
    pivots: [orders.status]
    fill_fields: [orders.order_month]
    sorts: [orders.status, orders.order_month desc]
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
    hidden_pivots: {}
    hidden_series: []
    listen: {}
    row: 0
    col: 0
    width: 24
    height: 7
  - title: Quarterly Sale
    name: Quarterly Sale
    model: test_mysql
    explore: payments
    type: looker_pie
    fields: [payments.payment_quarter, sum_of_amount]
    fill_fields: [payments.payment_quarter]
    sorts: [payments.payment_quarter desc]
    limit: 500
    column_limit: 50
    dynamic_fields:
    - measure: sum_of_amount
      based_on: payments.amount
      expression: ''
      label: Sum of Amount
      type: sum
      _kind_hint: measure
      _type_hint: number
    value_labels: labels
    label_type: labVal
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
    show_null_points: true
    defaults_version: 1
    row: 7
    col: 13
    width: 11
    height: 10
  - title: Top In Stock Products
    name: Top In Stock Products
    model: test_mysql
    explore: products
    type: looker_bar
    fields: [products.quantity_in_stock, products.product_name]
    sorts: [products.quantity_in_stock desc]
    limit: 10
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
    color_application:
      collection_id: aed851c8-b22d-4b01-8fff-4b02b91fe78d
      palette_id: c36094e3-d04d-4aa4-8ec7-bc9af9f851f4
      options:
        steps: 5
    x_axis_zoom: true
    y_axis_zoom: true
    series_colors:
      products.quantity_in_stock: "#7C478E"
    defaults_version: 1
    value_labels: legend
    label_type: labPer
    row: 7
    col: 0
    width: 13
    height: 10
