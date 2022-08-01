import React, { Fragment } from 'react';
import "../styles/Header.css";
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../helpers/auth';
import { useSelector } from 'react-redux';


const Header = () => {

    let navigate = useNavigate();
    const { cart } = useSelector(state => state.cart);

    const handleLogout = evt => {
        logout(() => {
            navigate('/signin');
        });
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">FoodApp</Link>
                <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarCollapse">
                    {!isAuthenticated() && (
                        <Fragment>
                            <div className="navbar-nav">
                                <Link to="/" className="nav-item nav-link active"><i className="fa-solid fa-house"></i> Home</Link>
                                <Link to="/order" className="nav-item nav-link"><i className="fa-solid fa-burger"></i> Order</Link>
                                {/* <div className="nav-item dropdown">
                                    <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Messages</Link>
                                    <div className="dropdown-menu">
                                        <Link to="#" className="dropdown-item">Inbox</Link>
                                        <Link to="#" className="dropdown-item">Sent</Link>
                                        <Link to="#" className="dropdown-item">Drafts</Link>
                                    </div>
                                </div> */}
                            </div>
                            {/* <form className="d-flex">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Search" />
                                    <button type="button" className="btn btn-secondary"><i className="fa-solid fa-magnifying-glass"></i></button>
                                </div>
                            </form> */}
                            <div className="navbar-nav">
                                <Link to="/signin" className="nav-item nav-link"><i className="fa-solid fa-right-to-bracket"></i> Login</Link>
                                <Link to="/signup" className="nav-item nav-link"><i className="fa-solid fa-user-plus"></i> Sign Up</Link>
                                <div className='nav-item me-3' style={{ position: 'relative' }}>
                                    <Link to='/cart' className='nav-link'>
                                        <i className='fas fa-shopping-cart'></i>{' '}
                                        Cart{' '}
                                        <span className='badge bg-warning text-dark' style={{ position: 'absolute', top: '0px', }}>
                                            {cart.length}
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </Fragment>
                    )}

                    {isAuthenticated() && isAuthenticated().role === 0 && (
                        <Fragment>
                            <div className="navbar-nav">
                                <Link to="/" className="nav-item nav-link active"><i className="fa-solid fa-house"></i> Home</Link>
                                <Link to="/order" className="nav-item nav-link"><i className="fa-solid fa-burger"></i> Order</Link>
                            </div>
                            <div className="navbar-nav">
                                <div className="nav-item dropdown">
                                    <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"> UserDashboard</Link>
                                    <div className="dropdown-menu">
                                        <Link to="/user/dashboard" className="dropdown-item">UserDashboard</Link>
                                        <Link to="#" className="dropdown-item">User Profile</Link>
                                        <Link to="#" className="dropdown-item">Drafts</Link>
                                        <Link to="/signin" className="dropdown-item" onClick={handleLogout}>Logout</Link>
                                    </div>
                                </div>
                                <div className='nav-item me-3' style={{ position: 'relative' }}>
                                    <Link to='/cart' className='nav-link'>
                                        <i className='fas fa-shopping-cart'></i>{' '}
                                        Cart{' '}
                                        <span className='badge bg-warning text-dark' style={{ position: 'absolute', top: '0px', }}>
                                            {cart.length}
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </Fragment>
                    )}

                    {isAuthenticated() && isAuthenticated().role === 1 && (
                        <Fragment>
                            <div className="navbar-nav">
                                <Link to="/" className="nav-item nav-link active"><i className="fa-solid fa-house"></i> Home</Link>
                                <Link to="/order" className="nav-item nav-link"><i className="fa-solid fa-burger"></i> Order</Link>
                            </div>
                            <div className="navbar-nav">
                                <div className="nav-item dropdown">
                                    <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"> AdminDashboard</Link>
                                    <div className="dropdown-menu">
                                        <Link to="/admin/dashboard" className="dropdown-item">AdminDashboard</Link>
                                        <Link to="#" className="dropdown-item">User Profile</Link>
                                        <Link to="#" className="dropdown-item">Drafts</Link>
                                        <Link to="/signin" className="dropdown-item" onClick={handleLogout}>Logout</Link>
                                    </div>
                                </div>
                                <div className='nav-item me-3' style={{ position: 'relative' }}>
                                    <Link to='/cart' className='nav-link'>
                                        <i className='fas fa-shopping-cart'></i>{' '}
                                        Cart{' '}
                                        <span className='badge bg-warning text-dark' style={{ position: 'absolute', top: '0px', }}>
                                            {cart.length}
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </Fragment>
                    )}

                    {isAuthenticated() && (
                        <Fragment>
                            <div className="navbar-nav">
                                <Link to="/signin" className="nav-item nav-link" onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i> Logout</Link>
                            </div>
                        </Fragment>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Header