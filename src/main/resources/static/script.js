var stompClient = null;

function connect() {
    let socket = new SockJS("/server1");  // Ensure this matches your server-side WebSocket endpoint
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function (frame) {
        console.log("Connected: " + frame);


		let joinMessage = {
			name : localStorage.getItem("name"),
			content : "has joined the chat!",
			isSystemMsg :true
		}
		
		
		
		stompClient.send("/app/message",{},JSON.stringify(joinMessage));
		
        // Example: Subscribe to a topic after connecting
        stompClient.subscribe("/topic/return-to", function (response) {
            console.log("Received: " + response.body);
            showMessage(JSON.parse(response.body))
            // Here, you can add code to display the received message in the chat room
        });
        
       

        // Hide login form and show chat room after successful connection
        $("#nameForm").addClass('d-none');
        $("#chat-room").removeClass('d-none');
    }, function (error) {
        console.error("Connection error: ", error);
    });
}
function showMessage(message) {
    // Fix the issue with string interpolation in jQuery
    console.log(message);
    if(message.systemMsg){
		 $("#message-container-table").append('<tr><td><b>' + message.name + ' ' + message.content + '</td></tr>');

	}
	else {
		$("#message-container-table").append('<tr><td><b>' + message.name + ' :</b> ' + message.content + '</td></tr>');

	}
}

function logout() {

let logoutMessage = {
			name : localStorage.getItem("name"),
			content : "has left the chat!",
			isSystemMsg :true
		}
		stompClient.send("/app/message",{},JSON.stringify(logoutMessage));
		 localStorage.removeItem("name"); // Remove name from localStorage
        $("#nameForm").removeClass('d-none'); // Show login form again
        $("#chat-room").addClass('d-none'); // Hide chat room
        $("#welcome-message").html(''); // Clear welcome message
        stompClient.disconnect(); // Disconnect WebSocket if connected
        console.log("User logged out.");
         location.reload();
		

}


function sendMessage(){
		
		let jsonOb={
			name:localStorage.getItem("name"),
			content:$("#message-value").val(),
			
		}
		
		stompClient.send("/app/message",{},JSON.stringify(jsonOb));
		
		  $("#message-value").val('');
	}




$(document).ready(() => {
    $("#login").click(() => {
        let name = $("#name").val();
        if (name.trim() === "") {
            alert("Please enter a name!");
           return;
        }
        
        // Save name in localStorage
        localStorage.setItem("name", name);
        console.log("Name saved: " + name);

		$("#welcome-message").html(`Welcome, <b>${name}</b>`);
 
        // Connect to WebSocket after saving the name
        connect();
       
       
    });
    
    $("#send").click(()=>{
		sendMessage()
	})
	$("#logout").click(()=>{
		logout()
	})
	
	 // Send message when Enter key is pressed in the message input field
    $("#message-value").keypress((e) => {
        if (e.which == 13) { // Enter key pressed
            sendMessage();
        }
    });
    
});
