import * as React			from "react";
import showNotification from "@system/showNotification";
import text 			from "@system/text";
import ErrorDetails 	from "@components/ErrorDetails";

const text_errorTitle = text('Catched error');

export default function errorHandler(error: Error | string){
	let message 	= '';
	let trace:any[]	= [];
	if(typeof error == 'string'){
		message = error;
		trace   = (new Error()).stack.split('\n');
		trace.splice(1, 1)
	} else {
		message = error.message;
		trace   = error.stack.split('\n');
	}
	trace.splice(0, 1);
	trace = trace.map( line => line.trim() );

	const errorDetails = React.createElement(ErrorDetails, {
		message,
		trace
	})

	showNotification("error", text_errorTitle, errorDetails);

	console.error("System Error:", message);
}