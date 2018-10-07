import * as React 						from "react";
import {
	Field,
	FieldSet,
	IFieldSetFields,
	FieldGroup
}									from "frobus-utils";
import renderField					from "./renderField";

import {Form, Input, Button, Icon}		from 'antd';

const {Item: FormItem} 			= Form;
const {Group: InputGroup} 			= Input;


export default function renderFields(set: IFieldSetFields, form, namespace = ''){
	if( Array.isArray(set) ){
		return set.map( set => renderFields(set, form, ) );
	}
	if( set instanceof Field ){
		return renderField(set, form, namespace);
	}
	if( set instanceof FieldSet ){
		return renderFields(set.fieldSet.fields, form, [namespace, set.fieldSet.namespace].filter(Boolean).join('.'));
	}
	if(set instanceof FieldGroup){
		return (
			<FormItem>
				<InputGroup>{ renderFields(set.fields, form, namespace) }</InputGroup>
			</FormItem>
		)
	}
	return set;
}

export {IFieldSetFields as IFields}