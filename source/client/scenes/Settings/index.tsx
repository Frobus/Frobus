import * as React 					from "react";
import {
	Form,
	Row,
	Col,
	Input,
	Button,
	Icon
} 								from 'antd';
import {FormComponentProps}  	from "antd/es/form";
import {remote} 				from 'electron';
import * as fs 						from "fs";

import text 					from "@system/text";
import errorHandler 			from "@system/errorHandler";
import isDir 					from "@utils/isDir";
import NarrowContent			from "@components/Layout/NarrowContent";

const {dialog} 				= remote;
const {Item: FormItem} 		= Form;
const {Group: InputGroup} 	= Input;

interface IPageSettingsProps extends FormComponentProps {
	page ?: string,
}

class DialogOpenButton extends React.Component {
	render(){
		return <Button onClick={ this.open }>{ text('Select folder') }</Button>;
	}
	open(){
		const result = dialog.showOpenDialog({properties: ['openDirectory']});
		console.log('result:', result);
	}
}

async function validate() {
	return new Promise((resolve, eject) => {
		this.props.form.validate((err, values) => {
			if( err ){
				resolve(false);
			} else {
				resolve(values);
			}
		});
	});
}

class PageSettings extends React.PureComponent<IPageSettingsProps> {
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
	onError(e){}
	render (){
		const { getFieldDecorator } = this.props.form;
		return (
			<Form
				onSubmit={ this.onSubmit.bind(this) }
				onChange={ this.onChange.bind(this) }
				className="ant-form__narrow"
			>
				<NarrowContent>
					<FormItem
						label={text("Default projects path")}
					>
						<InputGroup compact>
							{getFieldDecorator('project-path', {
								rules: [{
									required: true,
									message: text('Please input projects path!'),
								}, {
									validator: (rule, value, callback) => {
										const _isDir = isDir(value);
										if( !value ) return callback();
										if( _isDir === true ) return callback();
										if( _isDir === false ) return callback( text('Path is not directory') );
										callback( text('Path not exists') );
									},
								}],
							})(
								<Input />
							)}
							<DialogOpenButton />
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

const creator = Form.create();
export default creator(PageSettings);