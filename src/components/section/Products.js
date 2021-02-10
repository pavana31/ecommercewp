import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {DataContext} from '../Context'
import '../css/Products.css'
// import {UndrawAddToCart} from 'react-undraw-illustrations';
import Fade from 'react-reveal/Fade';
export class Products extends Component {

    static contextType = DataContext;

    render() {
        const {products,addCart} = this.context;
        return (
            <div id="product">
                <Fade right>
         
    
               {
                   products.map(product =>(
                       <div className="card" key={product._id}>
                           <Link to={`/product/${product._id}`}>
                               <img src={product.src} alt=""/>
                           </Link>
                           <div className="content">
                               <h3>
                                   <Link to={`/product/${product._id}`}>{product.title}</Link>
                               </h3>
                               <span>${product.price}</span>
                               <p>{product.description}</p>
                               <button onClick={()=> addCart(product._id)}>Add to cart</button>
                           </div>
                       </div>
                   ))
               }
               <br/>
              
               </Fade>
               
         {/* <UndrawAddToCart
    primaryColor='#6c68fb'
    height= '150px'
    alignItem='right'
    /> */}
  
    
     
        
            </div>
            
           
        )
    }
}

export default Products