import Navbar from "../components/Navbar"
import Banner from "../components/Banner"
import Card from "../components/Card"

function Shop() {
    return (
        <><Navbar /><Banner />
        <div className="product-section">
            <Card />
        </div>
        </>
        
    )
}
export default Shop