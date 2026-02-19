import frappe

@frappe.whitelist()
def execute_sql(sql: str):
    # SECURITY: double validation
    sql_lower = sql.lower()

    if not sql_lower.startswith("select"):
        frappe.throw("Only SELECT queries allowed")

    forbidden = ["insert", "update", "delete", "drop", "alter"]
    if any(word in sql_lower for word in forbidden):
        frappe.throw("Unsafe SQL detected")

    try:
        result = frappe.db.sql(sql, as_dict=True)
        return result
    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "AI SQL Error")
        frappe.throw("Query execution failed")
