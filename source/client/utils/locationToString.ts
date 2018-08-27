import {Location} from "history";
import history from "@system/history";

export default (location: Location) => history.createHref(location).replace(/^#!?/, '');