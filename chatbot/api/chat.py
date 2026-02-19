import frappe


@frappe.whitelist()
def ask(question):
	# For now dummy response
	# Later you will connect LLM + MariaDB here

	if not question:
		return "Please ask something."

	# Example: database check
	user_count = frappe.db.count("User")

	return f"You asked: {question} | Total Users in system: {user_count}"
