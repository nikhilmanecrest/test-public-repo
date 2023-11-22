view: products {
  sql_table_name: classicmodels.products ;;

  dimension: buy_price {
    type: number
    sql: ${TABLE}.buyPrice ;;
  }
  dimension: msrp {
    type: number
    sql: ${TABLE}.MSRP ;;
  }
  dimension: product_code {
    type: string
    sql: ${TABLE}.productCode ;;
  }
  dimension: product_description {
    type: string
    sql: ${TABLE}.productDescription ;;
  }
  dimension: product_line {
    type: string
    sql: ${TABLE}.productLine ;;
  }
  dimension: product_name {
    type: string
    sql: ${TABLE}.productName ;;
  }
  dimension: product_scale {
    type: string
    sql: ${TABLE}.productScale ;;
  }
  dimension: product_vendor {
    type: string
    sql: ${TABLE}.productVendor ;;
  }
  dimension: quantity_in_stock {
    type: number
    sql: ${TABLE}.quantityInStock ;;
  }
  measure: count {
    type: count
    drill_fields: [product_name]
  }
}
