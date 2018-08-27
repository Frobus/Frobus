import React from "react";
import Router from "./Router";

export default interface IGetRouterProps {
	children: (router: Router) => React.ReactNode,
}