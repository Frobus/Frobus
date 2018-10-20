export const STORE_NAMESPACE = "appnavigation";
export const scope = (value = "") => `${STORE_NAMESPACE}.${value}`;
export default scope;