import React from 'react'
import { withFormik, Field } from 'formik';
import * as yup from 'yup'

import Loader from 'icons/io/load-d'
import { schemaReg as validationSchema } from 'utils/validate'

import { GroupButtonSubmit } from 'styled/forms'
import { Form, TextInput, PasswordInput, Group, OnceButton } from 'comp/form'
import { SimpleTitle } from 'styled/typo'

const AuthReg = ({
	handleSubmit,
	isSubmitting,
	errors,
	status,
	...props
}) => {
	// console.log('reg: ',props)
	// console.log('errors: ',errors)

	return (
		<React.Fragment>
			<SimpleTitle>Регистрация</SimpleTitle>
			<Form onSubmit={handleSubmit} error={status} >
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
					name="confirmPassword" 
					label="повторить пароль"
					required 
					placeholder="Повторить пароль"
					component={Group}
				/>
				<OnceButton 
					label="Регистрация"
					disabled={isSubmitting || Object.keys(errors).length > 0}
					load={isSubmitting} />
			</Form>
		</React.Fragment>
	)
}


export default withFormik({
	mapPropsToValues: () => ({
		login : '',
		password: '',
		confirmPassword: ''
	}),
	validationSchema,
	handleSubmit: async ( params, { props: { registerUser, location, history, ...props}, setStatus, setSubmitting }) => {
		setSubmitting(true)
		setStatus(null)
		try {
			await registerUser(params)
			send.info('Регистрация успешна!')
			history.push(location.state && location.state.referer ? location.state.referer : '/')
		} catch(e) {
			setStatus(e.message)
		}
		setSubmitting(false)
	}
})(AuthReg)
