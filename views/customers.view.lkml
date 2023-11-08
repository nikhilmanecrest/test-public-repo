view: customers {
  sql_table_name: classicmodels.customers ;;

  dimension: address_line1 {
    type: string
    sql: ${TABLE}.addressLine1 ;;
  }
  dimension: address_line2 {
    type: string
    sql: ${TABLE}.addressLine2 ;;
  }
  dimension: city {
    type: string
    sql: ${TABLE}.city ;;
  }
  dimension: contact_first_name {
    type: string
    sql: ${TABLE}.contactFirstName ;;
  }
  dimension: contact_last_name {
    type: string
    sql: ${TABLE}.contactLastName ;;
  }
  dimension: country {
    type: string
    map_layer_name: countries
    sql: ${TABLE}.country ;;
  }
  dimension: credit_limit {
    type: number
    sql: ${TABLE}.creditLimit ;;
  }
  dimension: customer_name {
    type: string
    sql: ${TABLE}.customerName ;;
  }
  dimension: customer_number {
    type: number
    sql: ${TABLE}.customerNumber ;;
  }
  dimension: phone {
    type: string
    sql: ${TABLE}.phone ;;
  }
  dimension: postal_code {
    type: string
    sql: ${TABLE}.postalCode ;;
  }
  dimension: sales_rep_employee_number {
    type: number
    sql: ${TABLE}.salesRepEmployeeNumber ;;
  }
  dimension: state {
    type: string
    sql: ${TABLE}.state ;;
  }
  measure: count {
    type: count
    drill_fields: [customer_name, contact_last_name, contact_first_name]
  }
}
