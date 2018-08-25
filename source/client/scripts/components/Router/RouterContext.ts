import * as React from "react";
import { Location } from "history";
import {Router} from "./Router";

const defaultLocation: {instance: Router} = null;
export const RouterContext = React.createContext(defaultLocation);