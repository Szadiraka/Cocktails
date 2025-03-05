import React from 'react';

import './Drink.css';
import { Drink } from '../Types';

type DrinkProps = {
    drink: Drink;
};

const DrinkItem = ({drink}:DrinkProps) => {
  return (
    <div className='drink-card'>
        <div className="img">
            <img src={drink.strDrinkThumb} alt={drink.strDrink} />
        </div>
        <h3 className='title'>{drink.strDrink}</h3>
      
    </div>
  )
}

export default DrinkItem;
