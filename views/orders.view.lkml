view: orders {
  sql_table_name: classicmodels.orders ;;

  dimension: comments {
    type: string
    sql: ${TABLE}.comments ;;
  }
  dimension: customer_number {
    type: number
    sql: ${TABLE}.customerNumber ;;
  }
  dimension_group: order {
    type: time
    timeframes: [raw, date, week, month, quarter, year]
    convert_tz: no
    datatype: date
    sql: ${TABLE}.orderDate ;;
  }
  dimension: order_number {
    type: number
    sql: ${TABLE}.orderNumber ;;
  }
  dimension_group: required {
    type: time
    timeframes: [raw, date, week, month, quarter, year]
    convert_tz: no
    datatype: date
    sql: ${TABLE}.requiredDate ;;
  }
  dimension_group: shipped {
    type: time
    timeframes: [raw, date, week, month, quarter, year]
    convert_tz: no
    datatype: date
    sql: ${TABLE}.shippedDate ;;
  }
  dimension: status {
    type: string
    sql: ${TABLE}.status ;;
  }
  measure: count {
    type: count
  }
}
