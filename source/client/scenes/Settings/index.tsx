import * as React 						from "react";
import {remote} 						from 'electron';

import Form								from '@components/antd/Form';
import Input, {
	Delimiter as InputGroupDelimiter
}										from '@components/antd/Input';
import Button							from '@components/antd/Button';
import Icon								from '@components/antd/Icon';
import Select							from '@components/antd/Select';

import {FormComponentProps}  			from "antd/es/form/index.d";
import text 							from "@system/text";
import isDir 							from "@utils/isDir";
import NarrowContent					from "@components/Layout/NarrowContent";
import showMessage						from "@system/showMessage";

import errorHandler						from "@system/errorHandler";
import lang, {
	getCurrent as getCurrentLang,
	setCurrent as setCurrentLang
}										from "@system/lang";
import reload 							from "@system/reload";
import settings 						from "@system/settings";

const {dialog} 					= remote;
const {Item: FormItem} 			= Form;
const {Group: InputGroup}		= Input;
const {Option} 					= Select;

interface SettingsValues {
	language: lang,
	projectsPath: string,
	boilerplatesPath: string,
}

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


	setSettings(settings: any): void;
	setSettings(propKey: any, value: any): void;
	setSettings(){
		if( this.savedTimeout ) clearTimeout(this.savedTimeout);
		let propKey = '';
		let value = {};
		switch(arguments.length){
			case 1: value = arguments[0]; break;
			case 2: propKey = arguments[0]; value = arguments[1]; break;
		}
		try {
			settings.set(propKey, value);
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
	getSettings(): any;
	getSettings(propKey: string): any;
	getSettings(propKey: string, defaultValue: any): any;
	getSettings(){
		let propKey = '';
		let defaultValue = {};
		switch(arguments.length){
			case 1: propKey = arguments[0]; defaultValue = ''; break;
			case 2: propKey = arguments[0]; defaultValue = arguments[1]; break;
		}
		return settings.get(propKey, defaultValue);
	}
	onError(e){}


	async onSubmit(event){
		event.preventDefault();
		let values = await this.validate() as SettingsValues | undefined;
		if(!values) return;

		const lang = values.language;
		setCurrentLang(lang);
		delete values.language;

		this.setSettings(values);
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
	render (){
		const { getFieldDecorator } = this.props.form;
		return (
			<Form
				onSubmit={ this.onSubmit.bind(this) }
				onChange={ this.onChange.bind(this) }
			>
				<NarrowContent>
					<FormItem label={text("Language")}>
						{ getFieldDecorator('language', {
							initialValue: getCurrentLang(),
							rules: [{
								required: true,
								message: text('Please choose language.'),
							}],
						})(
							<Select>{
								Object.keys(lang).map( langKey => <Option key={langKey} value={langKey}>{ text(lang[langKey]) }</Option> )
							}
							</Select>
						) }
					</FormItem>
					<FormItem label={text("Projects")}>
						<InputGroup compact>
							{ getFieldDecorator('projectsPath', {
								initialValue: this.getSettings('projectsPath', ''),
								rules: [{
									required: true,
									message: text('Please input projects path!'),
								}, {
									validator: this.pathValidator,
								}],
							})(
								<Input />
							) }
							<Button onClick={ this.openDialogHandler.bind(this, 'projectsPath') } icon="folder" title={ text('Select folder') }></Button>
						</InputGroup>
					</FormItem>
					<FormItem label={text("Boilerplates")}>
						<InputGroup compact>
							{ getFieldDecorator('boilerplatesPath', {
								initialValue: this.getSettings('boilerplatesPath', ''),
								rules: [{
									required: true,
									message: text('Please input boilerplates path!'),
								}, {
									validator: this.pathValidator,
								}],
							})(
								<Input />
							) }
							<Button onClick={ this.openDialogHandler.bind(this, 'boilerplatesPath') } icon="folder" title={ text('Select folder') }></Button>
						</InputGroup>
					</FormItem>
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