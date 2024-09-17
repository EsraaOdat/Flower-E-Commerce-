$(document).ready(function() {
    let lastMessageId = 0; // Initialize with 0 or the ID of the last message displayed

    $('#chatForm').on('submit', function(e) {
        e.preventDefault(); // Prevent the form from submitting normally
        var senderid = localStorage.getItem("userID");
        var senderName = localStorage.getItem("NameForChat");

        // Create a FormData object and append the form fields
        var formData = new FormData();
        formData.append('SenderId', senderid);
        formData.append('SenderName', senderName);
        formData.append('ReceiverName', "Admin");
        formData.append('ReceiverId', 0);
        formData.append('Message', $('#messageInput').val());

        // Send the form data using AJAX
        $.ajax({
            type: "POST",
            url: "https://localhost:7000/api/Users_Bassam/SendMessage",
            data: formData,
            contentType: false,
            processData: false,
            success: function(response) {
                if (response.success) {
                    $('#messageInput').val(''); // Clear the input field
                    fetchMessages(); // Refresh the chat box
                } else {
                    alert('Message failed to send');
                }
            },
            error: function(xhr, status, error) {
                console.log('Error sending message:', status, error);
                alert('Error occurred while sending the message.');
            }
        });
    });

    // Fetch chat messages from the server
    function fetchMessages() {
        var senderId = localStorage.getItem("userID");
        var formData = new FormData();
        formData.append('SenderId', senderId);
        formData.append('ReceiverId', 0);
        formData.append('LastMessageId', lastMessageId); // Add the last message ID to the request

        $.ajax({
            type: "POST",
            url: "https://localhost:7000/api/Users_Bassam/GetMessages",
            data: formData,
            contentType: false,
            processData: false,
            success: function(messages) {
                console.log('Messages fetched:', messages); // Debug statement
                var chatBox = document.getElementById("chatBox");
                var noMessages = document.getElementById("noMessages");

    {
                    noMessages.classList.remove('visible'); // Hide placeholder message

                    // Append only new messages
                    messages.forEach(function(message) {
                        if (message.id > lastMessageId) { // Check if the message is new
                            var messageDate = new Date(message.timestamp);
                            var formattedTime = messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                            var messageHtml = '';
                            if (message.senderId === parseInt(senderId)) {
                                messageHtml = `
                                    <li class="d-flex align-items-start mb-2 justify-content-end">
                                        <div class="card mask-custom flex-shrink-1 me-2">
                                            <div class="card-header d-flex justify-content-between align-items-center p-2">
                                                <p class="fw-bold mb-0 small">${message.senderName}</p>
                                                <p class="text-time small mb-0"><i class="far fa-clock"></i> ${formattedTime}</p>
                                            </div>
                                            <div class="card-body p-2">
                                                <p class="mb-0 small">${message.message}</p>
                                            </div>
                                        </div>
                                        <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="avatar"
                                            class="rounded-circle shadow-1-strong ms-2" style="width: 32px; height: 32px;">
                                    </li>`;
                            } else if (message.senderId == 0) {
                                messageHtml = `
                                    <li class="d-flex align-items-start mb-3 justify-content-start">
                                        <img src="https://w7.pngwing.com/pngs/429/434/png-transparent-computer-icons-icon-design-business-administration-admin-icon-hand-monochrome-silhouette-thumbnail.png" alt="avatar"
                                            class="rounded-circle shadow-1-strong me-2" style="width: 40px; height: 40px;">
                                        <div class="card mask-custom flex-shrink-1">
                                            <div class="card-header d-flex justify-content-between align-items-center p-2">
                                                <p class="fw-bold mb-0 small">Admin</p>
                                                <p class="text-time small mb-0"><i class="far fa-clock"></i> ${formattedTime}</p>
                                            </div>
                                            <div class="card-body p-2">
                                                <p class="mb-0 small">${message.message}</p>
                                            </div>
                                        </div>
                                    </li>`;
                            }

                            chatBox.innerHTML += messageHtml;
                            lastMessageId = Math.max(lastMessageId, message.id); // Update the lastMessageId
                        }
                    });

                    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
                }
            },
            error: function(xhr, status, error) {
                console.log('Error fetching messages:', status, error);
                alert('Error occurred while fetching messages.');
            }
        });
    }

    // Fetch messages immediately on page load
    fetchMessages();

    // Set interval to fetch messages every 5 seconds
    setInterval(fetchMessages, 5000);
});