import * as React 				from "react";
import {
	Form,
	Switch,
	Input,
	Select,
	Icon,
	Button,
}								from "antd"
import {Field, IField}			from "frobus-utils";
import {
	WrappedFormUtils,
	GetFieldDecoratorOptions
}						 		from "antd/es/form/Form.d";
import {remote}					from "electron";

import text						from "@system/text";
import isFile					from "@utils/isFile";
import isDir					from "@utils/isDir";
const {Item: FormItem} 			= Form;
const {Option} 					= Select;
const {Group: InputGroup}		= Input;
const {dialog}					= remote;


export default function renderField(fieldInstance: Field, form: WrappedFormUtils, namespace = '') {
	const field:IField = fieldInstance.field;
	if(field.type == 'raw') return <FormItem key={Math.random()}>{field.content}</FormItem>;

	const getFieldDecorator = form.getFieldDecorator;

	let fieldOptions:GetFieldDecoratorOptions = {
		rules: [],
	};
	if(field.required){
		fieldOptions.rules.push({
			required: true,
			message: text('Required field'),
		})
	}
	if(field.validator){
		fieldOptions.rules.push({
			validator: field.validator
		});
	}
	switch(field.type){
		case "text":
			fieldOptions = {
				...fieldOptions,
				valuePropName: 'value',
				initialValue: field.value || '',
			}
		break;
		case "select":
			fieldOptions = {
				...fieldOptions,
				valuePropName: 'value',
				initialValue: field.value || '',
			}
		break;
		case "switch":
			fieldOptions = {
				...fieldOptions,
				valuePropName: 'checked',
				initialValue: field.checked,
			}
		break;
	}
	const key = (namespace ? `${namespace}.` : '') + field.name;
	switch(field.type){
		case 'file':
		case 'dir':
			const checkMethod = field.type == 'file' ? isFile : isDir;
			const type = field.type == 'file' ? 'file' : 'directory';
			if(!field.validator){
				fieldOptions.rules.push({
					validator: function(rule, value, callback){
						if(Array.isArray(value)) value = value[0];
						const val = checkMethod(value);
						if(field.required && !val) return callback();
						if(val === true) return callback();
						if(val === false) return callback( `${ text(`is not ${type}`) }` );
						return callback();
					}
				});
			}
		break;
	}

	let input:any = getFieldDecorator(key, fieldOptions)( renderFieldInput(field) );
	switch(field.type){
		case 'file':
		case 'dir':
			const onClick = () => {
				const path = dialog.showOpenDialog({properties: [field.type == 'file' ? 'openFile' : 'openDirectory']});
				form.setFieldsValue({
					[field.name]: path,
				})
			}
			input = (
				<InputGroup compact>
					{input}
					<Button size={ field.size } onClick={onClick} icon={ {file: 'file', dir: 'folder'}[field.type] } />
				</InputGroup>
			);
		break;
	}

	return (
		<FormItem key={ key } label={text( field.caption || '' )}>
			{input}
		</FormItem>
	)
}

function renderFieldInput(field: IField){
	switch(field.type){
		case "text": return (
			<Input size={ field.size } placeholder={ field.placeholder } />
		);
		case "switch": return (
			<Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} />
		);
		case "select": return (
			<Select size={ field.size } placeholder={ field.placeholder }>
				{ field.values.map((value) => <Option key={value}>{value}</Option>) }
			</Select>
		);
		case "dir":
		case "file": return (
			<Input size={ field.size } placeholder={ field.placeholder } />
		);
	}
	return <div>Unknown</div>;
}