import './NewsLetter.css'
function NewsLetter() {
    return (
        <div className="newsletter">
                <h1>Get Exclusive Offers On Your Email</h1>
                <p>Subcribe to our newletter and stay updated</p>
        
          <div>
              <input type="email" placeholder="Enter Your Email id"/>
            <button>Subscribe</button>
          </div>
        </div>
      );
}

export default NewsLetter;