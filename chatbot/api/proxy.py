import frappe
import requests

AI_BACKEND_URL = "http://localhost:8001/erp-chat"

@frappe.whitelist()
def forward_to_ai(question):
    response = requests.post(
        AI_BACKEND_URL,
        json={"question": question},
        timeout=60
    )

    return response.json()["answer"]
