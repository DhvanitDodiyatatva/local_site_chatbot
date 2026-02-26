frappe.pages["helpdesk"].on_page_load = function (wrapper) {
	const page = frappe.ui.make_app_page({
		parent: wrapper,
		title: "ERPNext Chatbot Helpdesk",
		single_column: true,
	});

	$(wrapper).find(".layout-main-section").html(`
		<style>
			.chat-container {
				max-width: 700px;
				margin: auto;
				display: flex;
				flex-direction: column;
				height: 75vh;
				background: #ffffff;
				border-radius: 12px;
				box-shadow: 0 4px 15px rgba(0,0,0,0.08);
				padding: 15px;
			}

			#chat-area {
				flex: 1;
				overflow-y: auto;
				padding: 10px;
				background: #f7f9fc;
				border-radius: 10px;
				margin-bottom: 10px;
			}

			.chat-row {
				display: flex;
				margin-bottom: 10px;
			}

			.chat-row.user {
				justify-content: flex-end;
			}

			.chat-row.bot {
				justify-content: flex-start;
			}

			.chat-bubble {
				padding: 10px 14px;
				border-radius: 14px;
				max-width: 70%;
				font-size: 14px;
				line-height: 1.5;
				word-wrap: break-word;
				box-shadow: 0 2px 5px rgba(0,0,0,0.05);
			}

			.user-bubble {
				background: #007bff;
				color: #fff;
				border-bottom-right-radius: 4px;
			}

			.bot-bubble {
				background: #e9ecef;
				color: #333;
				border-bottom-left-radius: 4px;
			}

			.input-area {
				display: flex;
				gap: 10px;
			}

			#user-input {
				border-radius: 20px;
				height: 40px;
				padding: 10px 15px;
			}

			#send-btn {
				border-radius: 20px;
				padding: 8px 18px;
			}
		</style>

		<div class="chat-container">
			<div id="chat-area"></div>

			<div class="input-area">
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
		let message = $("#user-input").val().trim(); //  trims whitespace

		if (!message) return; // prevents empty messages

		$("#chat-area").append(`
			<div class="chat-row user">
				<div class="chat-bubble user-bubble">${message}</div>
			</div>
		`);

		$("#user-input").val("");

		frappe.call({
			method: "chatbot.api.proxy.forward_to_ai",
			args: { question: message },
			callback: function (r) {
				$("#chat-area").append(`
					<div class="chat-row bot">
						<div class="chat-bubble bot-bubble">${r.message}</div>
					</div>
				`);
				$("#chat-area").scrollTop($("#chat-area")[0].scrollHeight);
			},
		});
	}
};
