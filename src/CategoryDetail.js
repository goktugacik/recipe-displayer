import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Pagination } from "antd";
import Emoji from "./components/Emoji";
import MealThumbnail from "./components/MealThumbnail";

function CategoryDetail() {
  const category = useParams();
  const [meals, setMeals] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function onLoad(category) {
      console.log(category.category);
      await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.category}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          if (response.meals) {
            setPage(1);
            setMeals(response.meals);
          } else setMeals([]);
        })
        .catch((error) => console.log(error));
    }

    onLoad(category);
  }, [category]);

  const changePage = (p) => {
    setPage(p);
  };
  return (
    <div className="catergory-detail">
      <Row>
        <Col className="results" span={24}>
          <Row className="pagination" align="center">
            {meals && meals.length > 0 ? (
              <p>
                Found {meals.length} Recipes on {category.category} catetgory
                <Emoji symbol="🍱" label="bento" />
              </p>
            ) : (
              <p>
                No meal found on {category.category} catetgory
                <Emoji symbol="🍱" label="bento" />
              </p>
            )}

            <Pagination
              showSizeChanger={false}
              current={page}
              onChange={changePage}
              pagesize={10}
              total={(meals.length * 10) / 12}
            />
          </Row>
          <Row gutter={[32, 32]}>
            {meals.slice((page - 1) * 12, page * 12).map((meal, index) => (
              <Col
                className="thumbnail-col"
                key={index + meal.strMeal}
                lg={6} //4
                md={8} //3
                sm={12} //2
                align="center"
              >
                <MealThumbnail key={index} meal={meal} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default CategoryDetail;
