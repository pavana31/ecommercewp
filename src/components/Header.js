import React, { Component } from 'react'
import Menu from './svg/bars-solid.svg'
import Close from './svg/times-solid.svg'
import CartIcon from './svg/shopping-cart-solid.svg'
import {Link} from 'react-router-dom'
import './css/Header.css'
import {DataContext} from './Context'


export class Header extends Component {
    static contextType = DataContext;

    state = {
        toggle: false
    }

    menuToggle = () =>{
        this.setState({toggle: !this.state.toggle})
    }


    render() {
        const {total} = this.context;
        const {toggle} = this.state;
        const {cart} = this.context;
        return (
            <header>
                <div className="menu" onClick={this.menuToggle}>
                    <img src={Menu} alt="" width="20"/>
                </div>
                <div className="logo">
                    <h1><Link to="/">Go Girl</Link></h1>
                </div>
       
                <nav>
                    <ul className={toggle ? "toggle" : ""}>
                        <li><Link to="/">Home</Link></li>
                        
                        {/* <li><Link to="/about">About</Link></li> */}
                        {/* <li><Link to="/login">Login / Register</Link></li> */}
                        <li className="close" onClick={this.menuToggle}>
                            <img src={Close} alt="" width="20"/>
                        </li>
                    </ul>
                     &nbsp;
                     <h3>Total: ${total}</h3>
                     &nbsp; &nbsp; &nbsp;
                    <div className="nav-cart">
                        <span>{cart.length}</span>
                        <Link to="/cart">
                            <img src={CartIcon} alt="" width="20"/>

                        </Link>
                        
                    
                       
                    
                    </div>
                </nav>
            </header>
        )
    }
}

export default Header