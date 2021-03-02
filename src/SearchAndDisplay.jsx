import React, { useState } from "react";
import { Row, Col, Pagination, Input } from "antd";
import MealThumbnail from "./components/MealThumbnail";

const { Search } = Input;

function SearchAndDisplay() {
  const [page, setPage] = useState(1);
  const [meals, setMeals] = useState([
    { strMeal: "Yemek1", strMealThumb: "http://placecorgi.com/200" },
    { strMeal: "Yemek2", strMealThumb: "http://placecorgi.com/200" },
    { strMeal: "Yemek3", strMealThumb: "http://placecorgi.com/200" },
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
        setMeals(response.meals);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Row>
        <Col className="searchParams" span={12} align="center">
          <Search
            placeholder="input recipe name"
            allowClear
            enterButton="Search Recipe"
            size="large"
            onSearch={onSearch}
          />
        </Col>
        <Col className="results" span={12}>
          <Row className="pagination" align="center">
            <p>Found {meals.length} element</p>
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
              <Col key={index} lg={8} md={12} sm={24} align="center">
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
