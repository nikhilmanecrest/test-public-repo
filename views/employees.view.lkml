view: employees {
  sql_table_name: classicmodels.employees ;;

  dimension: email {
    type: string
    sql: ${TABLE}.email ;;
  }
  dimension: employee_number {
    type: number
    sql: ${TABLE}.employeeNumber ;;
  }
  dimension: extension {
    type: string
    sql: ${TABLE}.extension ;;
  }
  dimension: first_name {
    type: string
    sql: ${TABLE}.firstName ;;
  }
  dimension: job_title {
    type: string
    sql: ${TABLE}.jobTitle ;;
  }
  dimension: last_name {
    type: string
    sql: ${TABLE}.lastName ;;
  }
  dimension: office_code {
    type: string
    sql: ${TABLE}.officeCode ;;
  }
  dimension: reports_to {
    type: number
    sql: ${TABLE}.reportsTo ;;
  }
  measure: count {
    type: count
    drill_fields: [last_name, first_name]
  }
}
