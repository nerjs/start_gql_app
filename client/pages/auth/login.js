import React from 'react'
import { withFormik, Field } from 'formik';
import * as yup from 'yup'

import Loader from 'icons/io/load-d'
import { schemaLogin as validationSchema } from 'utils/validate'

import { GroupButtonSubmit } from 'styled/forms'
import { Form, TextInput, PasswordInput, Group, OnceButton } from 'comp/form'
import { SimpleTitle } from 'styled/typo'
import send from 'utils/send'

import withCu from 'hocs/cu'

const AuthLogin = ({
	handleSubmit,
	isSubmitting,
	errors,
	status,
	...props
}) => {
	return (
		<React.Fragment>
			<SimpleTitle>Авторизация</SimpleTitle>
			<Form onSubmit={handleSubmit} error={status}>
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
				<OnceButton 
					label="Авторизация"
					disabled={isSubmitting || Object.keys(errors).length > 0}
					load={isSubmitting} />
			</Form>
		</React.Fragment>
	)
}


export default withCu(withFormik({
	mapPropsToValues: () => ({
		login : '',
		password: ''
	}),
	validationSchema,
	handleSubmit: async ( params, { props: { loginUser, location, history, ...props}, setStatus, setSubmitting }) => {
		setSubmitting(true)
		setStatus(null)
		try {
			await loginUser(params)
			send.info('Авторизация успешна!')
			history.push(location.state && location.state.referer ? location.state.referer : '/')
		} catch(e) {
			setStatus(e.message)
		}
		setSubmitting(false)
	}
})(AuthLogin))
