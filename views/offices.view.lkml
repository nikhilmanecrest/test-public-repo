view: offices {
  sql_table_name: classicmodels.offices ;;

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
  dimension: country {
    type: string
    map_layer_name: countries
    sql: ${TABLE}.country ;;
  }
  dimension: office_code {
    type: string
    sql: ${TABLE}.officeCode ;;
  }
  dimension: phone {
    type: string
    sql: ${TABLE}.phone ;;
  }
  dimension: postal_code {
    type: string
    sql: ${TABLE}.postalCode ;;
  }
  dimension: state {
    type: string
    sql: ${TABLE}.state ;;
  }
  dimension: territory {
    type: string
    sql: ${TABLE}.territory ;;
  }
  measure: count {
    type: count_distinct
    sql: "link" ;;
    link: {
      label: "Look this event in chronicle"
      url: "https://www.google.com/"
    }
  }
}
