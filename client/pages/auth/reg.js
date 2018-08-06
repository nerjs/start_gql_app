import React from 'react'
import { withFormik, Field } from 'formik';
import * as yup from 'yup'

import Loader from 'icons/io/load-d'

import { Form, GroupButtonSubmit } from 'styled/forms'
import { TextInput, PasswordInput, Group, OnceButton } from 'comp/form'

const AuthReg = ({
	handleSubmit,
	isSubmitting,
	errors,
	...props
}) => {
	// console.log('reg: ',props)
	console.log('errors: ',errors)

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
			<OnceButton 
				label="Регистрация"
				disabled={isSubmitting || Object.keys(errors).length > 0}
				load={isSubmitting} />
		</Form>
	)
}

const validationSchema = yup.object()
							.shape({
								login: yup.string()
										.min(process.env.VALIDATE_LOGIN_MIN,`Длинна логина не должна быть меньше ${process.env.VALIDATE_LOGIN_MIN}`)
										.max(process.env.VALIDATE_LOGIN_MAX,`Длинна логина не должна быть больше ${process.env.VALIDATE_LOGIN_MAX}`)
										.matches(/^[\*\<\>a-zA-Z0-9_-]+$/,'Логин должен состоять из символов: [a-zA-Z0-9]-_'),
								password: yup.string()
										.min(process.env.VALIDATE_PASSWORD_MIN,`Длинна пароля не должна быть меньше ${process.env.VALIDATE_PASSWORD_MIN}`)
										.max(process.env.VALIDATE_PASSWORD_MAX,`Длинна пароля не должна быть больше ${process.env.VALIDATE_PASSWORD_MAX}`)
										.matches(/^[\*\<\>a-zA-Z0-9_-]+$/,'Пароль должен состоять из символов: [a-zA-Z0-9]-_'),
								repeatPassword: yup.mixed()
													.test('match','test', function(){
														console.log(this)
													})
							})

export default withFormik({
	mapPropsToValues: () => ({
		login : '',
		password: '',
		repeatPassword: ''
	}),
	validationSchema,
	handleSubmit: (props, { setFieldError, setSubmitting, ...params }) => {
		// console.log('props: ',props)
		// console.log('params: ',params)
		setSubmitting(true)
		// setFieldError('login','tratata')
		setTimeout(()=>setSubmitting(false),3000)
	}
})(AuthReg)

// console.log(isValidEmail)