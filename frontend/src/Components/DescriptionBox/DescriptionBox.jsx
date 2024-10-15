import './DescriptionBox.css'

function DescriptionBox() {
    return ( 
        <div className="descriptionbox">
            <div className="descriptionbox-navigator">
                <div className="descriptionbox-nav-box">Description</div>
                <div className="descriptionbox-nav-box fade">Reviews(122)</div>
            </div>
               <div className="descriptionbox-description">
                <p>A cloth e-commerce website allows users to browse, select, and purchase a variety of clothing items online. It typically includes features like product categories (e.g., men, women, kids), detailed product descriptions, size and color options, high-quality images, and a shopping cart.</p> <br />
                <p> The site should have a user-friendly interface with filters to narrow down searches by brand, price, size, or style. It often integrates a secure payment gateway, user reviews, and a personalized recommendation system.</p>
               </div>

        </div>
     );
}

export default DescriptionBox;