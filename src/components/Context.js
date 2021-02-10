import React, { Component } from 'react'

export const DataContext = React.createContext();

export class DataProvider extends Component {

    state = {
        products: [
            {
                "_id": "1",
                "title": " Amira Sweater",
                "src": "https://s7d5.scene7.com/is/image/UrbanOutfitters/59886648_014_b?$xlarge$=&fit=constrain&fmt=webp&qlt=80&wid=683",
                "description": "Amira Cardigan",
                "content": "Lightweight cardigan in a ribbed knit. Cropped above the waist with a v-neck and button front. Finished with stitch detailing at the bell sleeves. Pairs perfectly with the UO Amira Sweater Tank Top. UO exclusive.",
                "price": 60,
                "colors": ["red", "black", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "2",
                "title": "Dress",
                "src": "https://s7d5.scene7.com/is/image/UrbanOutfitters/60728102_237_e?$xlarge$=&fit=constrain&fmt=webp&qlt=80&wid=683",
                "description": "Textured linen-blend frock dress",
                "content": "Lightweight cardigan in a ribbed knit. Cropped above the waist with a v-neck and button front. Finished with stitch detailing at the bell sleeves. Pairs perfectly with the UO Amira Sweater Tank Top. UO exclusive.",
                "price": 69,
                "colors": ["red", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "3",
                "title": "Racerback",
                "src": "https://s7d5.scene7.com/is/image/UrbanOutfitters/60112612_086_e?$xlarge$=&fit=constrain&fmt=webp&qlt=80&wid=683",
                "description": "Model is wearing size Small",
                "content": "Under featuring a high neck and racer back for full support. Engineered of signature seamless fabric to provide ultimate",
                "price": 50,
                "colors": ["lightblue", "white", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "4",
                "title": "Ryan RuchedSwimsuit",
                "src": "https://s7d5.scene7.com/is/image/UrbanOutfitters/55916043_001_b?$xlarge$=&fit=constrain&fmt=webp&qlt=80&wid=683",
                "description": "80% Nylon, 20% spandex",
                "content": "With ruched side ties and double shoulder straps, the Ryan one-piece by Out From Under makes the classic swimsuit more modern. Square neckline and cheeky coverage.",
                "price": 109,
                "colors": ["orange", "black", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "5",
                "title": "Embellished Lace Blouse",
                "src": "https://s7d5.scene7.com/is/image/UrbanOutfitters/60401197_065_b?$xlarge$=&fit=constrain&fmt=webp&qlt=80&wid=683",
                "description": " Item shown is size Small",
                "content": "Delicate lace blouse from Kimchi Blue decorated with floral embellished detailing. Long sleeve silhouette features lace-up tie closure at the front, v-neckline and elasticated bell cuffs.",
                "price": 144,
                "colors": ["orange", "black", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "6",
                "title": "Mini Hoop Earring",
                "src": "https://s7d5.scene7.com/is/image/UrbanOutfitters/53449997_070_b?$xlarge$=&fit=constrain&fmt=webp&qlt=80&wid=683",
                "description": "Mini hoops with mighty style, by Ellie Vail.",
                "content": "Mini hoops with mighty style, by Ellie Vail. Classic silhouette with a top latch closure, made of hypoallergenic gold-plated stainless steel.",
                "price": 250,
                "colors": ["orange", "black", "crimson", "teal"],
                "count": 1
            }
        ],
        cart: [],
        total: 0
        
    };

    addCart = (id) =>{
        const {products, cart} = this.state;
        const check = cart.every(item =>{
            return item._id !== id
        })
        if(check){
            const data = products.filter(product =>{
                return product._id === id
            })
            this.setState({cart: [...cart,...data]})
        }else{
            alert("The product has been added to cart.")
        }
    };

    reduction = id =>{
        const { cart } = this.state;
        cart.forEach(item =>{
            if(item._id === id){
                item.count === 1 ? item.count = 1 : item.count -=1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    };

    increase = id =>{
        const { cart } = this.state;
        cart.forEach(item =>{
            if(item._id === id){
                item.count += 1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    };

    removeProduct = id =>{
        if(window.confirm("Do you want to delete this product?")){
            const {cart} = this.state;
            cart.forEach((item, index) =>{
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })
            this.setState({cart: cart});
            this.getTotal();
        }
       
    };

    getTotal = ()=>{
        const{cart} = this.state;
        const res = cart.reduce((prev, item) => {
            return prev + (item.price * item.count);
        },0)
        this.setState({total: res})
    };
    
    componentDidUpdate(){
        localStorage.setItem('dataCart', JSON.stringify(this.state.cart))
        localStorage.setItem('dataTotal', JSON.stringify(this.state.total))
    };

    componentDidMount(){
        const dataCart = JSON.parse(localStorage.getItem('dataCart'));
        if(dataCart !== null){
            this.setState({cart: dataCart});
        }
        const dataTotal = JSON.parse(localStorage.getItem('dataTotal'));
        if(dataTotal !== null){
            this.setState({total: dataTotal});
        }
    }
   

    render() {
        const {products, cart,total} = this.state;
        const {addCart,reduction,increase,removeProduct,getTotal} = this;
        return (
            <DataContext.Provider 
            value={{products, addCart, cart, reduction,increase,removeProduct,total,getTotal}}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}
