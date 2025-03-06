import {ChangeEvent, useState,useContext} from 'react';
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { Filters } from '../Types';
import { ContextData } from '../MyContext';

import './Content.css';

import { Drink } from '../Types';
import DrinkItem from '../Drink/Drink';
export type ContentProps = {
    drinks: Drink[],
    filters:Filters,
    saveChanges:(filter:Filters)=>void
}

const Content = () => {
  const [content, setContent] = useState("");
  const {filters,saveChanges, drinks} = useContext<ContentProps>(ContextData);

  const changeContent=(e:ChangeEvent<HTMLInputElement>)=>{
    const {name,value} = e.target;
     setContent(value);
     const newFilters={...filters,[name]:value};
     console.log(newFilters);
     saveChanges(newFilters);
  }



  return (
    
    <main className='content'>
      {/* Header */}
      <header className='header'>
        <div className="flex-container">
            <div className="logo"></div>
            <div className="search">
              <input type="text" name='searchByName' value={content} onChange={changeContent} placeholder='Search...'  />
              <HiMiniMagnifyingGlass  className='searchIcon'/>
            </div>
        </div> 
      </header>

        {/* Container */}
        <div className="container">
          {drinks.map((drink)=>(
            <DrinkItem key={drink.idDrink} drink={drink} />
          ))}
           
        </div>   
   </main>  
   
  )
}

export default Content;
