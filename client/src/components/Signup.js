import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { useState, useEffect } from 'react';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import equals from 'validator/lib/equals';
import { showErrorMsg, showSuccessMsg } from '../helpers/message';
import { showLoading } from '../helpers/loading';
import { signup } from '../api/auth';
import { isAuthenticated } from '../helpers/auth';


const Signup = () => {

	let navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated() && isAuthenticated().role === 1) {
			navigate('/admin/dashboard');
		} else if (isAuthenticated() && isAuthenticated().role === 0) {
			navigate('/user/dashboard');
		}
	}, [navigate]);

	const [formData, setFormData] = useState({
		email: 'user@gmail.com',
		password: 'abc123',
		password2: 'abc123',
		successMsg: false,
		errorMsg: false,
		loading: false,
	});
	const {
		email,
		password,
		password2,
		successMsg,
		errorMsg,
		loading,
	} = formData;

	const handleChange = evt => {
		setFormData({
			...formData,
			[evt.target.name]: evt.target.value,
			successMsg: '',
			errorMsg: '',
		});
	};

	const handleSubmit = evt => {
		evt.preventDefault();

		if (
			isEmpty(email) ||
			isEmpty(password) ||
			isEmpty(password2)
		) {
			setFormData({
				...formData,
				errorMsg: 'All fields are required',
			});
		} else if (!isEmail(email)) {
			setFormData({
				...formData,
				errorMsg: 'Invalid email',
			});
		} else if (!equals(password, password2)) {
			setFormData({
				...formData,
				errorMsg: 'Passwords do not match',
			});
		} else {
			const { email, password } = formData;
			const data = { email, password };

			setFormData({ ...formData, loading: true });

			signup(data)
				.then(response => {
					console.log('Axios signup success: ', response);
					setFormData({
						email: '',
						password: '',
						password2: '',
						loading: false,
						successMsg: response.data.successMessage,
					});
				})
				.catch(err => {
					console.log('Axios signup error: ', err);
					setFormData({
						...formData,
						loading: false,
						errorMsg: err.response.data.errorMessage,
					});
				});
		}
	};

	return (
		<div className="ls-page">
			<div className="login-page">
				<div className="login-form">
					{successMsg && showSuccessMsg(successMsg)}
					{errorMsg && showErrorMsg(errorMsg)}
					{loading && (
						<div className="text-center pb-3">{showLoading()}</div>
					)}
					<form onSubmit={handleSubmit} noValidate>
						<input name='email' value={email} type="email" placeholder="Email address" onChange={handleChange} />
						<input name='password' value={password} type="password" placeholder="Create password" onChange={handleChange} />
						<input name='password2' value={password2} type="password" placeholder="Confirm password" onChange={handleChange} />
						<button className="login-button" type="submit">sign up</button>
						<p className="message">Already have an account? <Link to="/signin">Login here</Link></p>
					</form>
					<hr className="my-4" />
					<button className="google-login-button" type="submit"><i className="fab fa-google me-2"></i> Sign in with google</button>
				</div>
			</div>
		</div>
	)
}

export default Signup