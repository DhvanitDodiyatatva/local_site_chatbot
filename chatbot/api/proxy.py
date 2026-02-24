import requests
import frappe


@frappe.whitelist(allow_guest=True)
def forward_to_ai(question: str):
    try:
        response = requests.post(
            "http://192.168.2.29:8001/erp-chat",
            json={"question": question},
            timeout=30
        )

        #  Check HTTP status
        if response.status_code != 200:
            frappe.throw(f"AI server error: {response.status_code}")

        #  Ensure valid JSON
        try:
            data = response.json()
        except ValueError:
            frappe.throw("AI server returned invalid JSON")

        #  Ensure answer exists
        if "answer" not in data:
            return "Unexpected response from AI service."

        return data["answer"]

    except requests.exceptions.RequestException as e:
        frappe.throw(f"AI connection failed: {str(e)}")
