import * as React from "react";
import {Location} from "history";

export default interface ILocationProps {
	children: (location: Location) => React.ReactNode,
}