function isJson(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}
document.addEventListener("DOMContentLoaded",
	function (event)
	{
		console.log("This is a Covid Chatbot");
		function postTextLex() {

			AWS.config.apiVersions = {
				lexruntime: '2016-11-28',
				// other service API versions
			};

			//Specify AWS credentials
			AWS.config.update({
				accessKeyId: "*********",
				secretAccessKey: "*************",
				region:'us-east-1' //choose a region
			});

			var lexruntime = new AWS.LexRuntime();
			var getInput = document.getElementById("txtInput").value;
			document.getElementById("content").innerHTML += "<img src=\"./images/user.svg\" style=\"width:6%\">";
			document.getElementById("content").innerHTML +=   "<span type='text' class =\"bubble2\" contenteditable=\"true\" >" + getInput +"</textarea>"+"<br>";
			document.getElementById("content").innerHTML += " " +"<br>";
			document.getElementById("content").innerHTML += " " +"<br>";
			document.getElementById("content").innerHTML += " " +"<br>";
			console.log("Here!!!!!!!!!!!!!!")

			//Create parameters for Lex
			var params = {
				botAlias: 'chatv', /* required */
				botName: 'CovidChatbot', /* required --example OrderFlowers*/
				inputText: getInput, /* required */
				userId: 'Administrator', /* required */
				sessionAttributes: {}
			};

			//Post Text to Lex
			lexruntime.postText(params, function(err, data) {
				if (err) {
					console.log(err, err.stack); // an error occurred
				}
				else {
					console.log("hello!!!");
					console.log(data); // successful response
					if(isJson(data.message)){
						const parsedJSON = JSON.parse(data.message);
						const message = parsedJSON.messages;
						console.log("ye dekho bhai 1 -- "+message);

						document.getElementById("content").innerHTML+= " " +"<ul>";
						for(var i = 0; i < message.length; i++) {

							var obj = message[i];

							// if(obj.type.valueOf() === "PlainText".valueOf()){

								document.getElementById("content").innerHTML += "<img src=\"./images/Chatbot.svg\" style=\"width:6%\">";
								if(obj.type.valueOf() === "PlainText".valueOf()){
									document.getElementById("content").innerHTML +=   "<li type='text' class =\"bubble\" contenteditable=\"true\" >" + obj.value +"</li>"+"<br>";
								}
								if(obj.type.valueOf() === "HyperLink".valueOf()){
									console.log("yay!!idhar bhi aa gyi")
									document.getElementById("content").innerHTML +=   " <a class = \"bubble\" contenteditable=\"false\" target=\"blank\" href="+obj.value +">Click here</a> "+"<br>";
								}

								document.getElementById("content").innerHTML += " " +"<br>";
								document.getElementById("content").innerHTML += " " +"<br>";
								document.getElementById("content").innerHTML += " " +"<br>";
							}
						// }
						document.getElementById("content").innerHTML+= " " +"</ul>";
					}

					else{
						console.log("hello!!! other one");
						// document.getElementById("content").innerHTML += "Bot: "+  data.message + "<br>";
						document.getElementById("content").innerHTML
						// document.getElementById("content").innerHTML +=  "<p  style=>"+ "<strong>Chatbot<\strong>" + "<br>";
						document.getElementById("content").innerHTML += "<img src=\"./images/Chatbot.svg\" style=\"width:6%\">";
						document.getElementById("content").innerHTML +=   "<span type='text' class =\"bubble\" contenteditable=\"true\" >" + data.message +"</span>"+"<br>";
						document.getElementById("content").innerHTML += " " +"<br>";
						document.getElementById("content").innerHTML += " " +"<br>";
						document.getElementById("content").innerHTML += " " +"<br>";
					}




				} ;
			});

			//Set the text box blank
			document.getElementById("txtInput").value='';

		}
		document.getElementById("startChat").onclick = postTextLex;
	}
)
