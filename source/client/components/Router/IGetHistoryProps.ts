import React from "react";
import {History} from "history";

export default interface IGetHistoryProps {
	children: (history: History) => React.ReactNode,
}