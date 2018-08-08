import * as yup from 'yup'

export const login = yup.string()
						.min(process.env.VALIDATE_LOGIN_MIN,`Длинна логина не должна быть меньше ${process.env.VALIDATE_LOGIN_MIN}`)
						.max(process.env.VALIDATE_LOGIN_MAX,`Длинна логина не должна быть больше ${process.env.VALIDATE_LOGIN_MAX}`)
						.matches(/^[\*\<\>a-zA-Z0-9_-]+$/,'Логин должен состоять из символов: [a-zA-Z0-9]-_');

export const password = yup.string()
							.min(process.env.VALIDATE_PASSWORD_MIN,`Длинна пароля не должна быть меньше ${process.env.VALIDATE_PASSWORD_MIN}`)
							.max(process.env.VALIDATE_PASSWORD_MAX,`Длинна пароля не должна быть больше ${process.env.VALIDATE_PASSWORD_MAX}`)
							.matches(/^[\*\<\>a-zA-Z0-9_-]+$/,'Пароль должен состоять из символов: [a-zA-Z0-9]-_');


export const confirmPassword = yup.string()
									.test('match','Пароли не совпадают', function(){
										return this.parent.password == this.parent.confirmPassword
									})



export const schemaReg = yup.object()
							.shape({login, password, confirmPassword })



export const schemaLogin = yup.object()
							.shape({login, password })
