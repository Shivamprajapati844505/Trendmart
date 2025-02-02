import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from "../Assets/arrow.png";
import hero_image from "../Assets/hero_image.png";
import {useNavigate} from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();
    return (  
        <div className="hero">
          <div className="hero-left">
            <h2>NEW ARRIVALS ONLY</h2>
            <div>
               <div className="hero-hand-icon">
                 <p>new</p>
                 <img src={hand_icon} alt=""/>
              </div>
              <p>Collections</p>
              <p>for everyone</p>
            </div>
            <div className="hero-latest-btn">
            <button onClick={() => navigate("/newcollections")}>
        Latest Collection
      </button>
            </div>
          </div>
          <div className="hero-right">
            <img src={hero_image} alt="" />
          </div>
      </div>
    );
}

export default Hero;