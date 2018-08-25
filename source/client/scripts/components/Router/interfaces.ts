import * as React from "react";
import {Router} from "./Router";
import {Location, History} from "history";
import * as UrlPattern from "url-pattern";

export type IRouterConsumerProps = React.ConsumerProps<Router>;

export interface ILocationProps {
	children: (location: Location) => React.ReactNode,
}

export interface IGetHistoryProps {
	children: (history: History) => React.ReactNode,
}

export interface IGetRouterProps {
	children: (router: Router) => React.ReactNode,
}

export interface IRouterProps {
	history ?: History,
}

export interface ILinkProps {
	href		: string,
	external   ?: boolean,
}