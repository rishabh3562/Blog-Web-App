import React, { useEffect, useState } from "react";
import "./Slider.css";
// import { category } from "../../assets/data/data";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import axios from "axios";
const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="next">
        <MdNavigateNext className="icon" />
      </button>
    </div>
  );
};
const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="prev">
        <GrFormPrevious className="icon" />
      </button>
    </div>
  );
};
function Category() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  {
    console.log("cats in slider.js", cats);
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 350,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {cats ? (
        <section className="category">
          <div className="content">
            <Slider {...settings}>
              {cats.map((item) => (
                <div className="boxs" key={item._id}>
                  <div className="box">
                    {/* {console.log("item.id", `${item._id}`)} */}
                    <img src={`${item.imageUrl}`} alt="cover" />
                    <div className="overlay">
                      <h4>{item.name}</h4>
                      <p>{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>
      ) : null}
    </>
  );
}
export default Category;
