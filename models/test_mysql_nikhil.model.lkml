connection: "mysql"

# include all the views
include: "/views/**/*.view.lkml"
include: "/dashboard/**/*.dashboard"

datagroup: test_mysql_nikhil_default_datagroup {
  # sql_trigger: SELECT MAX(id) FROM etl_log;;
  max_cache_age: "1 hour"
}

persist_with: test_mysql_nikhil_default_datagroup

explore: customers {}

explore: employees {}

explore: offices {}

explore: orderdetails {}

explore: orders {}

explore: payments {}

explore: productlines {}

explore: products {}
