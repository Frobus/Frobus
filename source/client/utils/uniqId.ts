let ids:any = Object.create(null);
export default function uniqId(prefix = ("uniqid_" + Date.now() + "__")){
	if( ids[prefix] == null ) ids[prefix] = 0;
	ids[prefix]++;
	return (prefix + "" + ids[prefix]);
}