import React from 'react'
import { withFormik, Field } from 'formik';
import * as yup from 'yup'

import { Form, GroupButtonSubmit } from 'styled/forms'
import { TextInput, PasswordInput, Group } from 'comp/form'

const AuthReg = ({
	handleSubmit,
	...props
}) => {
	// console.log('reg: ',props)

	return (
		<Form onSubmit={handleSubmit} >
			<Field 
				type="text"
				name="login"
				label="Логин"
				placeholder="Введите логин"
				required 
				helperText={`Минимально ${process.env.VALIDATE_LOGIN_MIN}, максимально ${process.env.VALIDATE_LOGIN_MAX} символа.`}
				component={Group}
			/>
			<Field 
				type="password"
				name="password"
				label="Пароль"
				required 
				helperText={`Минимально ${process.env.VALIDATE_PASSWORD_MIN}, максимально ${process.env.VALIDATE_PASSWORD_MAX} символа.`}
				placeholder="Введите пороль"
				component={Group}
			/>
			<Field 
				type="password"
				name="repeatPassword" 
				label="повторить пароль"
				required 
				placeholder="Повторить пароль"
				component={Group}
			/>
			<GroupButtonSubmit type="submit">Регистрация</GroupButtonSubmit>
		</Form>
	)
}

export default withFormik({
	mapPropsToValues: () => ({
		login : '',
		password: '',
		repeatPassword: ''
	}),
	handleSubmit: (props, { setFieldError}) => {
		console.log(props)
		setFieldError('login','login')
	}
})(AuthReg)