import React 					from "react";
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

import text 					from "@system/text";

const {dialog} 				= remote;
const {Item: FormItem} 		= Form;
const {Group: InputGroup} 	= Input;

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 8 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 16 },
	},
};

interface IPageSettingsProps extends FormComponentProps {
	page ?: string,
}

class DialogOpenButton extends React.Component {
	render(){
		return <Button onClick={ this.open }>Select folder</Button>;
	}
	open(){
		const result = dialog.showOpenDialog({properties: ['openDirectory']});
		console.log(result);
	}
}

async function validate() {
	return new Promise((resolve, eject) => {
		this.props.form.validateFieldsAndScroll((err, values) => {
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
		const values = await this.validate();
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
	onError(e){
		console.error(e);
	}
	render (){
		const { getFieldDecorator } = this.props.form;
		return (
			<Form
				onSubmit={ this.onSubmit.bind(this) }
				onChange={ this.onChange.bind(this) }
			>
				<FormItem
					label={text("Default projects path")}
				>
					{getFieldDecorator('text', {
						rules: [{
							required: true,
							message: text('Please input projects path!'),
						}],
					})(
						<InputGroup compact>
							<Input />
							<DialogOpenButton />
						</InputGroup>
					)}
				</FormItem>
				<FormItem>
					<Button type="primary" htmlType="submit">Register</Button>
				</FormItem>
			</Form>
		);
	}
}

const creator = Form.create();
export default creator(PageSettings);