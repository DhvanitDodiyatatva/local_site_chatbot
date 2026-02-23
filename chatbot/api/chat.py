import frappe


@frappe.whitelist()
def ask(question):


	if not question:
		return "Please ask something."

	user_count = frappe.db.count("User")

	return f"You asked: {question} | Total Users in system: {user_count}"
