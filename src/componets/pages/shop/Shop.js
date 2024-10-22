import "./shop.css";
import Card1 from "../../commen coponet/card_product/Card1";
import Subscribe from "../../commen coponet/Subscribe/Subscribe";
import { useNavigate } from "react-router-dom";

import { card2 } from "../../pages/Data/Data";
const Shop = () => {

  const navigate = useNavigate();

  const henadleNavigate = (items) => {
    console.log(items, "========>itemsitems");
    // JSON.stringify(localStorage.setItem("shop", items));
    JSON.stringify(localStorage.setItem("carddata", JSON.stringify(items)));

    navigate("/shop_singel");
  };

  return (
    <>
      <section className="shop_sec_1">
        <div className="relative">
          <div className="bg_img">
            <div className="Shop">
              <h1 className="color vm">Shop</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="shop_sec_2">
        <div className="container">
          <div className="row">
            {card2.map((item2, index) => (
              <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={index}  onClick={() => henadleNavigate(item2)}>
                <Card1 Card2={item2} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="container">
 <Subscribe />
 </div>
    </>
  );
};

export default Shop;
