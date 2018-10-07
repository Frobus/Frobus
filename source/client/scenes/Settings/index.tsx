import * as React 						from "react";
import {remote} 						from 'electron';

import {
	Form,
	Input,
	Button,
	Select,
	Icon
}										from 'antd';

import {FormComponentProps}  			from "antd/es/form/index.d";
import text 							from "@system/text";
import isDir 							from "@utils/isDir";
import NarrowContent					from "@components/Layout/NarrowContent";
import InputGroupDelimiter				from "@components/InputGroupDelimiter";
import showMessage						from "@system/showMessage";

import errorHandler						from "@system/errorHandler";
import lang								from "@system/lang";
import reload 							from "@system/reload";
import settings, {
	IField
}										from "@models/settings";

const {dialog} 					= remote;
const {Item: FormItem} 			= Form;
const {Group: InputGroup}		= Input;
const {Option} 					= Select;

class PageSettings extends React.PureComponent<IPageSettingsProps> {
	state = {
		saving: false,
		saved: false,
	}
	private savedTimeout: any;
	
	constructor(props){
		super(props);
		this.onSubmit.bind(this)
		this.onChange.bind(this)
	}

	onError(e){}


	async onSubmit(event){
		event.preventDefault();
		if( this.savedTimeout ) clearTimeout(this.savedTimeout);
		let values = await this.validate();
		if(!values) return;
		try {
			settings.set(values);
			showMessage("success", text("Settings saved!"));
			this.setState({
				saving: false,
				saved: true
			});
			this.savedTimeout = setTimeout(() => {
				this.setState({
					saving: false,
					saved: false
				});
			}, 3000);
		} catch(e){
			errorHandler(e);
			this.setState({
				saving: false,
				saved: false
			});
		}
	}
	async onChange(){
		await this.validate();
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
	openDialogHandler(fieldName){
		this.props.form.setFieldsValue({
			[fieldName]: (dialog.showOpenDialog({properties: ['openDirectory']}) || [''])[0]
		});
	}
	pathValidator(rule, value, callback){
		const _isDir = isDir(value);
		if( !value ) return callback();
		if( _isDir === true ) return callback();
		if( _isDir === false ) return callback( text('Path is not directory') );
		callback( text('Path not exists') );
	}
	renderField(field: IField){
		const { getFieldDecorator } = this.props.form;
		let fieldRules:any[] = [
			{
				required: true,
				message: text('Please, fill ' + field.title.toLocaleLowerCase()),
			}
		];

		if(field.validator != null) fieldRules.push({validator: field.validator});

		let fieldOptions = {
			initialValue: field.value,
			rules: fieldRules,
		}


		return (
			<FormItem key={ field.key } label={text( field.title )}>
				{ getFieldDecorator(field.key, fieldOptions)( this.renderInput(field) )}
			</FormItem>
		)
	}
	renderInput({ values, value }){
		if( Array.isArray(values) ){
			return (
				<Select>{
					values.map(item => (
						<Option key={item.value} value={item.value}>
							{ text(item.text) }
						</Option>
					))
				}</Select>
			)
		}

		return <Input />;
	}
	getFields(){
		return settings.getFields();
	}
	render (){
		return (
			<Form
				onSubmit={ this.onSubmit.bind(this) }
				onChange={ this.onChange.bind(this) }
			>
				<NarrowContent>
					{ this.getFields().map( field => this.renderField(field) ) }
					<FormItem>
						<InputGroup>
							{
								this.state.saved
								? <Button type="dashed"  htmlType="submit" size="large"><Icon type="check" />{ text('Success') }</Button>
								: <Button type="primary" htmlType="submit" size="large"><Icon type="save" />{ text('Save') }</Button>
							}
							<InputGroupDelimiter />
							<Button type="default" size="large" onClick={ () => reload() }><Icon type="reload" />{ text('Reload application') }</Button>
						</InputGroup>
					</FormItem>
				</NarrowContent>
			</Form>
		);
	}
}




interface IPageSettingsProps extends FormComponentProps {
	page ?: string,
}
const creator = Form.create();
export default creator(PageSettings);