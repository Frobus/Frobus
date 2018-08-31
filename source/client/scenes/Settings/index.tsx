import * as React 				from "react";
import {remote} 				from 'electron';

import Form						from '@components/antd/Form';
import Input					from '@components/antd/Input';
import Button					from '@components/antd/Button';

import {FormComponentProps}  	from "antd/es/form/index.d";
import text 					from "@system/text";
import errorHandler 			from "@system/errorHandler";
import isDir 					from "@utils/isDir";
import NarrowContent			from "@components/Layout/NarrowContent";

const {dialog} 					= remote;
const {Item: FormItem} 			= Form;
const {Group: InputGroup} 		= Input;


class PageSettings extends React.PureComponent<IPageSettingsProps> {
	constructor(props){
		super(props);
		this.onSubmit.bind(this)
		this.onChange.bind(this)
		this.openDialogProjectPath = this.openDialogProjectPath.bind(this);
		this.projectPathValidator = this.projectPathValidator.bind(this);
	}
	async onSubmit(event){
		event.preventDefault();
		const values = await this.validate();
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
	openDialogProjectPath(){
		this.props.form.setFieldsValue({
			'project-path': (dialog.showOpenDialog({properties: ['openDirectory']}) || [''])[0]
		});
	}
	projectPathValidator(rule, value, callback){
		const _isDir = isDir(value);
		if( !value ) return callback();
		if( _isDir === true ) return callback();
		if( _isDir === false ) return callback( text('Path is not directory') );
		callback( text('Path not exists') );
	}
	onError(e){}
	render (){
		const { getFieldDecorator } = this.props.form;
		return (
			<Form
				onSubmit={ this.onSubmit.bind(this) }
				onChange={ this.onChange.bind(this) }
			>
				<NarrowContent>
					<FormItem label={text("Default projects path")}>
						<InputGroup compact>
							{getFieldDecorator('project-path', {
								rules: [{
									required: true,
									message: text('Please input projects path!'),
								}, {
									validator: this.projectPathValidator,
								}],
							})(
								<Input />
							)}
							<Button onClick={ this.openDialogProjectPath }>{ text('Select folder') }</Button>
						</InputGroup>
					</FormItem>
					<FormItem>
						<Button type="primary" htmlType="submit" size="large">{ text('Save') }</Button>
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