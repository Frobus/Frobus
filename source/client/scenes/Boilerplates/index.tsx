import * as React 		from "react";
import BoilerplateNew 	from "./new";
import Boilerplate 		from "./item";


export default class PageBoilerplates extends React.PureComponent<{
	id: string,
}> {
	render (){
		return (
			<React.Fragment>{
				this.props.id == 'new'
				? <BoilerplateNew />
				: <Boilerplate id={this.props.id} />
			}</React.Fragment>
		);
	}
}