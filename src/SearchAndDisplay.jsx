import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Pagination, Select, Button } from "antd";
import MealThumbnail from "./components/MealThumbnail";
import InputBox from "./components/InputBox";
import Emoji from "./components/Emoji";

const { Option } = Select;

function SearchAndDisplay() {
  const latest = ["52908", "52803", "52928", "52891", "52897", "52973"];
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState(["test"]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [init, setInit] = useState(false);

  //fetch latest meals onload
  // learn how to run once with dependencies
  useEffect(() => {
    function onLoad() {
      latest.map(async (l) => {
        //console.log(l);
        let response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${l}`,
          {
            method: "GET",
          }
        );
        await response
          .json()
          .then((response) => {
            //console.log("response", response.meals[0].strMeal);
            setMeals((meals) => [...meals, response.meals[0]]);
            // console.log(meals, "set");
          })
          .catch((error) => console.log(error));
      });
    }
    onLoad();
  }, []);

  //fetch categories onload
  useEffect(() => {
    async function onLoad() {
      await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          if (response.categories) {
            setCategories(response.categories);
          } else setCategories([]);
        })
        .catch((error) => console.log(error));
    }

    onLoad();
  }, []);

  let options = categories.map((c, index) => (
    <Option key={c.strCategory + index} value={c.strCategory}>
      {c.strCategory}
    </Option>
  ));

  const changePage = (p) => {
    setPage(p);
  };

  async function onSearch(value) {
    setInit(true);
    console.log("deneme");
    await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((response) => {
        if (response.meals) {
          setPage(1);
          setMeals(response.meals);
        } else setMeals([]);
      })
      .catch((error) => console.log(error));
  }

  function onSelectChange(value) {
    console.log(`selected ${value}`);
    setSelectedCategory(value);
  }

  function onSearchCategory() {
    if (selectedCategory !== "" && selectedCategory !== undefined) {
      let path = `category/` + selectedCategory;
      history.push(path);
    }
  }

  return (
    <div>
      <Row>
        <Col className="searchParams" md={12} sm={24} align="center">
          <div className="inputContainer">
            <InputBox
              id="food-search"
              placeholder="Search your favorite food"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={onSearch}
            />
          </div>
          <div className="selectContainer">
            <div className="select-width">
              <Select
                showSearch
                allowClear={true}
                placeholder="Select a category"
                optionFilterProp="children"
                onChange={onSelectChange}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {options}
              </Select>
              <Button onClick={onSearchCategory} type="primary">
                Search
              </Button>
            </div>
          </div>
        </Col>
        <Col className="results" md={12} sm={24}>
          <Row className="pagination" align="center">
            {init ? (
              <p>
                Found {meals.length} Recipes <Emoji symbol="🍱" label="bento" />
              </p>
            ) : (
              <p>
                Latest Recipes <Emoji symbol="🍱" label="bento" />
              </p>
            )}

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
                className="thumbnail-col"
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
