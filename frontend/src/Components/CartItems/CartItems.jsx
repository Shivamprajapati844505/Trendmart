import './CartItems.css';
import { useContext } from 'react';
import { ShopContext } from './../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

function CartItems() {
    const { all_product, cartItems, removeFromCart ,getTotalCartAmount} = useContext(ShopContext);
    return (  
        <div className="cartitems">
            <div className="cartitms-format-main">
                <p>Product</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className="cartitems-format cartitms-format-main">
                                <img src={e.image} alt="" className="carticon-product-icon" />
                                <p className="title">{e.name}</p>
                                <p>&#8360;{e.new_price}</p>
                                <button className="cartitems-quantity">{cartItems[e.id]}</button>
                                <p>&#8360;{e.new_price * cartItems[e.id]}</p>
                                <img className='cartitems-remove-icon' src={remove_icon} onClick={() => removeFromCart(e.id)} alt="" />
                            </div>
                            <hr />
                        </div>
                    );
                }
              return null;
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>&#8360;{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Free</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>&#8360;{getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cartitems-promocode">
                          <p>If you have a promo code, Enter it here</p>
                          <div className="cartitems-promobox">
                            <input type="text" placeholder="promo code"/>
                            <button>Submit</button>
                          </div>
                </div>
            </div>
        </div>
    );
}

export default CartItems;
