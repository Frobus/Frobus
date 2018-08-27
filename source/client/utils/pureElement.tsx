import * as React from "react";

class PureComponent extends React.PureComponent<{
	tagName: string
}> {
	render(){
		let props = {...this.props};
		delete props['tagName'];
		return React.createElement( this.props.tagName, props );
	}
}

export default function pureElement(tagName = "div"){
	return function(props){
		return <PureComponent tagName="div" {...props} />
	};
}