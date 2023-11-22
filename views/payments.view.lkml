view: payments {
  sql_table_name: classicmodels.payments ;;

  dimension: amount {
    type: number
    sql: ${TABLE}.amount ;;
  }
  dimension: check_number {
    type: string
    sql: ${TABLE}.checkNumber ;;
  }
  dimension: customer_number {
    type: number
    sql: ${TABLE}.customerNumber ;;
  }
  dimension_group: payment {
    type: time
    timeframes: [raw, date, week, month, quarter, year]
    convert_tz: no
    datatype: date
    sql: ${TABLE}.paymentDate ;;
  }
  measure: count {
    type: count
  }
}
