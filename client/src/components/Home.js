import React, { useEffect } from 'react';
import { showLoading } from '../helpers/loading';
import Card from './Card';
import { getNewArrivals } from '../redux/actions/filterActions';
import { getProductsByCount } from '../redux/actions/productActions';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getNewArrivals());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getProductsByCount());
	}, [dispatch]);

	const { newArrivals } = useSelector(state => state.filters);
	const { products } = useSelector(state => state.products);
	const { loading } = useSelector(state => state.loading);

	return (
		<section className='home-page'>
			{/* <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
				<div className="carousel-indicators">
					<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
					<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
					<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
				</div>
				<div className="carousel-inner">
					<div className="carousel-item active">
						<img src="burger 1.jpg" className="d-block w-100 h-100" alt="..."/>
					</div>
					<div className="carousel-item">
						<img src="burger 1.jpg" className="d-block w-100 h-100" alt="..."/>
					</div>
					<div className="carousel-item">
						<img src="burger 1.jpg" className="d-block w-100 h-100" alt="..."/>
					</div>
				</div>
				<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
					<span className="carousel-control-prev-icon" aria-hidden="true"></span>
					<span className="visually-hidden">Previous</span>
				</button>
				<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
					<span className="carousel-control-next-icon" aria-hidden="true"></span>
					<span className="visually-hidden">Next</span>
				</button>
			</div> */}
			{loading ? (
				<div className='text-center'>{showLoading()}</div>
			) : (
				<>
					<div className='container'>
						<hr className='py-4' />
						<h3 className='py-4'>New Arrivals</h3>
						<div className='row'>
							{newArrivals &&
								newArrivals.map(newArrival => (
									<Card
										key={newArrival._id}
										product={newArrival}
										homePage={true}
									/>
								))}
						</div>

						<hr className='py-4' />
						<h3 className='py-4'>Menu</h3>
						<div className='row'>
							{products &&
								products.map(product => (
									<Card
										key={product._id}
										product={product}
										homePage={true}
									/>
								))}
						</div>
					</div>
				</>
			)}
		</section>
	)
}

export default Home