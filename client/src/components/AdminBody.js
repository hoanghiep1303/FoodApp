import React from 'react';
import Card from './Card';
import { useSelector } from 'react-redux';

const AdminBody = () => {

  const { products } = useSelector(state => state.products);

  return (
    <div className='container'>
      <div className='row g-4'>
          {products &&
            products.map(product => (
              <Card key={product._id} product={product} adminPage={true} />
            ))}
      </div>
    </div>
  )
}

export default AdminBody