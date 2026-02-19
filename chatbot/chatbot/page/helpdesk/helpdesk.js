frappe.pages["helpdesk"].on_page_load = function (wrapper) {
	const page = frappe.ui.make_app_page({
		parent: wrapper,
		title: "AI Chat",
		single_column: true,
	});

	$(wrapper).find(".layout-main-section").html(`
		<div style="max-width:700px;margin:auto">
			<div id="chat-area" style="height:400px;overflow:auto;border:1px solid #ddd;padding:10px;margin-bottom:10px;"></div>

			<div style="display:flex;gap:10px;">
				<input type="text" id="user-input" class="form-control" placeholder="Ask something..." />
				<button class="btn btn-primary" id="send-btn">Send</button>
			</div>
		</div>
	`);

	// Send click
	$("#send-btn").on("click", function () {
		send_message();
	});

	// Enter key
	$("#user-input").on("keypress", function (e) {
		if (e.which === 13) {
			send_message();
		}
	});

	function send_message() {
		let message = $("#user-input").val();
		if (!message) return;

		$("#chat-area").append(`<div><b>You:</b> ${message}</div>`);
		$("#user-input").val("");

		frappe.call({
			method: "chatbot.api.proxy.forward_to_ai",
			args: { question: message },
			callback: function (r) {
				$("#chat-area").append(`<div><b>Bot:</b> ${r.message}</div>`);
				$("#chat-area").scrollTop($("#chat-area")[0].scrollHeight);
			},
		});
	}
};
