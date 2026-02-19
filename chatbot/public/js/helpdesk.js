frappe.ui.form.on("Helpdesk", {
    refresh(frm) {
        frm.add_custom_button("Ask AI", () => {
            frappe.prompt(
                [{ label: "Question", fieldname: "question", fieldtype: "Data" }],
                data => {
                    frappe.call({
                        method: "erp_ai_assistant.api.chat.ask_ai",
                        args: { question: data.question },
                        callback: r => {
                            frappe.msgprint({
                                title: "AI Answer",
                                message: r.message.answer
                            });
                        }
                    });
                }
            );
        });
    }
});
