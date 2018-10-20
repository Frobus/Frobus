import * as React from "react";

import getItem from "@models/boilerplates/getItem";

export default class Boilerplate extends React.PureComponent<{
	id: string,
}> {
	render(){

		return (
			<div>
				Boilerplate:
				<pre>
					{/* {JSON.stringify(getItem(this.props.id), null, "\t")} */}
				</pre>
			</div>
		);
	}
}