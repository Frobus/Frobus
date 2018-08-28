import * as React from "react";
import styled from "styled-components";

export default class ErrorDetails extends React.PureComponent<{
	message	: string,
	trace	: string[],
}> {
	render(){
		return (
			<ErrorDetailsBlock>
				<ErrorDetailsMessage>{this.props.message}</ErrorDetailsMessage>
				/* @if !DEV */
				<ErrorDetailsTrace>
					{ this.props.trace.map( (line, index) =>
						<ErrorDetailsTraceLine key={index}>{ line }</ErrorDetailsTraceLine>
					)}
				</ErrorDetailsTrace>
				/* @endif */
			</ErrorDetailsBlock>
		);
	}
}
const ErrorDetailsBlock = styled("div")`
	overflow: hidden;
`;
const ErrorDetailsMessage = styled("div")`
	font-size: 1em;
`;
const ErrorDetailsTrace = styled("div")`
	font-size: 0.8em;
	margin-top: 10px;
`;
const ErrorDetailsTraceLine = styled("div")`
	margin-top: 5px;
`;