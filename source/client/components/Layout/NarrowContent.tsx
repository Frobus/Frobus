import * as React from "react";
import styled from "styled-components";

class NarrowContent extends React.PureComponent<React.HTMLAttributes<HTMLElement>> {
	render(){ return (<div {...this.props} />); }
}

export default styled(NarrowContent)`
	max-width: 400px;
	flex-grow: 1;
	flex-shrink: 1;
`;