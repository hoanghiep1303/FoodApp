import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Login.css';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import { showErrorMsg } from '../helpers/message';
import { showLoading } from '../helpers/loading';
import { signin } from '../api/auth';
import { setAuthentication, isAuthenticated } from '../helpers/auth';


const Login = () => {

  let navigate = useNavigate();
	let location = useLocation();

	useEffect(() => {
		if (isAuthenticated() && isAuthenticated().role === 1) {
			navigate('/admin/dashboard');
		} else if (isAuthenticated() && isAuthenticated().role === 0) {
			navigate('/user/dashboard');
		}
	}, [navigate]);

	const [formData, setFormData] = useState({
		email: 'admin@gmail.com',
		password: 'abc123',
		errorMsg: false,
		loading: false,
	});

	const { email, password, errorMsg, loading } = formData;

	const handleChange = evt => {
		setFormData({
			...formData,
			[evt.target.name]: evt.target.value,
			errorMsg: '',
		});
	};

	const handleSubmit = evt => {
		evt.preventDefault();

		// client-side validation
		if (isEmpty(email) || isEmpty(password)) {
			setFormData({
				...formData,
				errorMsg: 'All fields are required',
			});
		} else if (!isEmail(email)) {
			setFormData({
				...formData,
				errorMsg: 'Invalid email',
			});
		} else {
			const { email, password } = formData;
			const data = { email, password };

			setFormData({ ...formData, loading: true });

			signin(data)
				.then(response => {
					setAuthentication(response.data.token, response.data.user);
					const redirect = location.search.split('=')[1];

					if (isAuthenticated() && isAuthenticated().role === 1) {
						console.log('Redirecting to admin dashboard');
						navigate('/admin/dashboard');
					} else if (
						isAuthenticated() &&
						isAuthenticated().role === 0 &&
						!redirect
					) {
						console.log('Redirecting to user dashboard');
						navigate('/user/dashboard');
					} else {
						console.log('Redirecting to shipping');
						navigate('/shipping');
					}
				})
				.catch(err => {
					console.log('signin api function error: ', err);
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
          {errorMsg && showErrorMsg(errorMsg)}
          {loading && (
            <div className="text-center pb-3">{showLoading()}</div>
          )}
          <form onSubmit={handleSubmit} noValidate>
            <input name='email' value={email} type="email" placeholder="Email address" onChange={handleChange} />
            <input name='password' value={password} type="password" placeholder="Password" onChange={handleChange} />
            <button className="login-button" type="submit">login</button>
            <p className="message">Not registered? <Link to="/signup">Create an account</Link></p>
          </form>
          <hr className="my-4" />
          <button className="google-login-button" type="submit"><i className="fab fa-google me-2"></i> Sign in with google</button>
        </div>
      </div>
    </div>
  )
}

export default Login