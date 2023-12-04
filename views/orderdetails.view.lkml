view: orderdetails {
  sql_table_name: classicmodels.orderdetails ;;

  dimension: order_line_number {
    type: number
    sql: ${TABLE}.orderLineNumber ;;
  }
  dimension: order_number {
    type: number
    sql: ${TABLE}.orderNumber ;;
  }
  dimension: price_each {
    type: number
    sql: ${TABLE}.priceEach ;;
  }
  dimension: product_code {
    type: string
    sql: ${TABLE}.productCode ;;
  }
  dimension: quantity_ordered {
    type: number
    sql: ${TABLE}.quantityOrdered ;;
  }
  measure: count {
    type: count
  }
}
