import React, { useState } from "react";
import { Row, Col, Pagination } from "antd";
import MealThumbnail from "./components/MealThumbnail";
import InputBox from "./components/InputBox";
import Emoji from "./components/Emoji";

function SearchAndDisplay() {
  const [page, setPage] = useState(1);
  const [meals, setMeals] = useState([
    {
      strMeal: "Yemek1",
      strMealThumb: "http://placecorgi.com/200",
      strTags: "tag,tag2",
    },
    {
      strMeal: "Yemek2",
      strMealThumb: "http://placecorgi.com/200",
      strTags: "tag,tag2",
    },
    {
      strMeal: "Yemek3",
      strMealThumb: "http://placecorgi.com/200",
      strTags: "tag,tag2",
    },
  ]);

  const changePage = (p) => {
    setPage(p);
  };

  const onSearch = (value) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(meals);
        setPage(1);
        setMeals(response.meals);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Row>
        <Col className="searchParams" span={12} align="center">
          <div className="inputContainer">
            <InputBox
              id="food-search"
              placeholder="Search your favorite food"
              allowClear
              enterButton="Search Recipe"
              size="large"
              onSearch={onSearch}
            />
          </div>
        </Col>
        <Col className="results" span={12}>
          <Row className="pagination" align="center">
            <p>
              Found {meals.length} element <Emoji symbol="🍱" label="sheep" />
            </p>
            <Pagination
              showSizeChanger={false}
              current={page}
              onChange={changePage}
              pagesize={10}
              total={(meals.length * 10) / 6}
            />
          </Row>
          <Row gutter={[16, 16]}>
            {meals.slice((page - 1) * 6, page * 6).map((meal, index) => (
              <Col
                key={index + meal.strMeal}
                lg={8}
                md={12}
                sm={24}
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

export default SearchAndDisplay;
