// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

import React from 'react';
import ReactDOM from 'react-dom';

import socket from "./socket";
import Grid from "./game.js"

var random_number = Math.random() * 20;

function ready(channel, game) {
	// Two arguments: 1) what we want to create
	//                2) where we want to put it
	ReactDOM.render(
		    <div>
		        <div className="firstGrid">
		            <h5>Your ocean area</h5>
		            <Grid id="my_grid" my_grid="true" channel={channel} game={game} user={random_number} />
		        </div>
		        <div className="secondGrid">
		            <h5>Your opponent's ocean area</h5>
		            <Grid id="opponents_grid" my_grid="false" channel={channel} game={game} user={random_number} />
		        </div>
			    <div className="divBelow">
				    <div className="leftDiv">
				        <div className="cross"></div>
				        <h6>Shot got to ship</h6>
				    </div>
				    <div className="rightDiv">
				        <div className="failed"></div>
				        <h6>Failed shot</h6>
				    </div>
				</div>
		    </div>
	    	, document.getElementById("react-container"));

}

function start() {

	$("#create_button").click(function(){
		$.ajax({
	        url: "/api/randomNumber",
	        type: 'GET',
	        success: function(res) {
	        		$("#join_code_text").html(res.random_number);
	        		$("#join_div").css({display: 'none'});
	        		$("#create_button").css({display: 'none'});
	        		$("#your_join_code_is").css({display: 'block'});
	        	 	let channel = socket.channel("game:" + res.random_number, {"user": random_number}); //+ window.user_name, {});
				  	channel.join()
				  		.receive("ok", state0 => {
					    	console.log("Joined successfully");
					    	ready(channel, res.random_number);
					    })
					    .receive("error", resp => { 
					    	ReactDOM.render(
					    		<div>
					    			<h3 className="messageMyGrid">Couldn't connect to websockets.</h3>
					    		</div>, document.getElementById("react-container"));
					    	console.log("Unable to join", resp);
					   	});
	        },
	        error: function(xhr, ajaxOptions, thrownError) {
	            console.log("ERROR " + xhr);
	            var responseMessage = JSON.parse(xhr.responseText);
	        }
	    });
	});


	$("#join_button").click(function(){
		var value = $("#join_code_input").val();
		if (value.length > 0){
			$.ajax({
		        url: "/api/randomNumber/" + value,
		        type: 'POST',
		        success: function(res) {
	        		if (res.result == "ok"){
	        			$("#create_div").css({display: 'none'});
		        	 	let channel = socket.channel("game:" + value, {"user": random_number}); //+ window.user_name, {});
					  	channel.join()
					  		.receive("ok", state0 => {
						    	console.log("Joined successfully");
						    	ready(channel, value);
						    })
						    .receive("error", resp => { 
						    	ReactDOM.render(
						    		<div>
						    			<h3 className="messageMyGrid">Couldn't connect to websockets.</h3>
						    		</div>, document.getElementById("react-container"));
						    	console.log("Unable to join", resp);
						   	});
	        		}
		        },
		        error: function(xhr, ajaxOptions, thrownError) {
		            console.log("ERROR " + xhr);
		            var responseMessage = JSON.parse(xhr.responseText);
		        }
		    });
		}else{
			alert("You must insert a valid code");
		}
	});


/*	channel.on("get_code", payload =>{
    	ready(channel);
    }); */

//	channel.push("get_code", {});

}

$(start);