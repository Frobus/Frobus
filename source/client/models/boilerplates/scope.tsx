export const STORE_NAMESPACE = "boilerplates";
export const scope = (value = "") => `${STORE_NAMESPACE}.${value}`;
export default scope;