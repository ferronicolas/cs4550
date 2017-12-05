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

function ready(channel, state) {
	// Two arguments: 1) what we want to create
	//                2) where we want to put it
	ReactDOM.render(
		    <div>
		        <div className="firstGrid">
		            <h5>Your ocean area</h5>
		            <Grid id="my_grid" my_grid="true" channel={channel} />
		        </div>
		        <div className="secondGrid">
		            <h5>Your opponent's ocean area</h5>
		            <Grid id="opponents_grid" my_grid="false" channel={channel} />
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
  	let channel = socket.channel("game:123430", {}); //+ window.user_name, {});
  	channel.join()
  		.receive("ok", state0 => {
	    	console.log("Joined successfully");
	    	ready(channel, state0);
	    })
	    .receive("error", resp => { 
	    	ReactDOM.render(
	    		<div>
	    			<h3 className="messageMyGrid">Couldn't connect to websockets.</h3>
	    		</div>, document.getElementById("react-container"));
	    	console.log("Unable to join", resp);
	   	});

}

$(start);