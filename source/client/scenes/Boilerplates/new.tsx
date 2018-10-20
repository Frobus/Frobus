import * as React 						from "react";

import {Field, FieldGroup}				from "frobus-utils";

import {Form, Input, Button, Icon}		from 'antd';
import {FormComponentProps}  			from "antd/es/form/index.d";

import InputGroupDelimiter				from "@components/InputGroupDelimiter";
import renderFields, {IFields} 			from "@utils/renderFields";
import isDir							from "@utils/isDir";
import isFile							from "@utils/isFile";
import path 							from "@utils/path";
import text 							from "@system/text";
import errorHandler						from "@system/errorHandler";
import showMessage						from "@system/showMessage";
import addBoilerplate 					from "@models/boilerplates/addBoilerplate";

const {Item: FormItem} 			= Form;
const {Group: InputGroup}		= Input;

class BoilerplatesNew extends React.PureComponent<IPageSettingsProps> {
	onError(e){}

	async onSubmit(event){
		console.log('onSubmit')
		event.preventDefault();
		let values:any = await this.validate();
		if(!values) return;
		try {
			addBoilerplate({
				name: values.boilerplateName,
				path: Array.isArray(values.boilerplatePath) ? values.boilerplatePath[0] : values.boilerplatePath,
			})
			showMessage("success", text("Boilerplate added!"));
		} catch(e){
			errorHandler(e);
		}
	}
	async onChange(){
		await this.validate();
		let boilerplatePath = this.props.form.getFieldValue("boilerplatePath");
		let boilerplateName = this.props.form.getFieldValue("boilerplateName");
		console.log(boilerplatePath)
		if(!boilerplateName && boilerplatePath){
			boilerplateName = boilerplatePath.replace(/\\/g, '/').split('/').pop();
			this.props.form.setFieldsValue({
				'boilerplateName': boilerplateName
			})
		}
	}
	async validate(){
		return new Promise((resolve, eject) => {
			this.props.form.validateFieldsAndScroll((err, values) => {
				if( err ){
					eject(err);
					return;
				}
				resolve(values);
			});
		}).catch(this.onError.bind(this));
	}
	getFields(): IFields {
		return new FieldGroup([
			new Field({
				type: 'dir',
				name: 'boilerplatePath',
				placeholder: text('Boilerplate path'),
				size: "large",
				required: true,
				validator: function(rule, value, callback){
					if(Array.isArray(value)) value = value[0];
					const _isDir = isDir(value);
					if(!value) return callback();
					if(_isDir === false) return callback( `${text(`not directory`)}` );
					if(_isDir === undefined) return callback( `${text(`not exist`)}` );
					const packageJson = isFile(path(value, "package.json"));
					if( packageJson === undefined ) return callback( `package.json ${text(`not exist`)}` );
					if( packageJson === false ) return callback( `package.json ${text(`not file`)}` );

					return callback();
				},
			}),
			<InputGroupDelimiter key={Math.random()} />,
			new Field({
				type: 'text',
				name: 'boilerplateName',
				placeholder: text('Boilerplate name'),
				required: true,
				size: "large",
			}),
			<InputGroupDelimiter key={Math.random()} />,
			new Field({
				type: 'raw',
				content: <Button size="large" type="primary" htmlType="submit" icon="file-add">Добавить</Button>,
			})
		]);
	}
	render(){
		return (
			<Form
				onSubmit={ this.onSubmit.bind(this) }
				onChange={ this.onChange.bind(this) }
			>
				{ renderFields(this.getFields(), this.props.form) }
			</Form>
		)
	}
}
interface IPageSettingsProps extends FormComponentProps {
	page ?: string,
}
const creator = Form.create();
export default creator(BoilerplatesNew);
