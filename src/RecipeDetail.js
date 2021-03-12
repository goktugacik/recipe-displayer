import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Badge } from "antd";
import ReactPlayer from "react-player";
import SingleIngredient from "./components/SingleIngredient";

function RecipeDetail(props) {
  const id = useParams();
  const [mealDetail, setMealDetail] = useState({ meals: [] });

  useEffect(() => {
    async function onLoad() {
      let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id.id}`,
        {
          method: "GET",
        }
      );

      await response
        .json()
        .then((response) => {
          console.log("response", response);
          setMealDetail(response.meals[0]);
        })
        .catch((error) => console.log(error));
    }

    onLoad(id);
  }, [id]);

  return (
    <div className="recipe-details">
      <Row className="recipe-header">
        <Col className="title">
          <h1>{mealDetail.strMeal}</h1>
        </Col>
        <Col className="category-col">
          <div className="category-text">Category: </div>
          <div className="category">
            <Badge
              className="site-badge-count"
              count={mealDetail.strCategory}
              style={{ backgroundColor: "#1DA57A" }}
            />
          </div>
        </Col>
        <Col className="tags-col">
          <div className="tags-text">Tags: </div>

          <div className="tags">
            {mealDetail.strTags != null || "" ? (
              mealDetail.strTags
                .split(",")
                .map((e, index) => (
                  <Badge
                    key={index}
                    className="site-badge-count"
                    count={e}
                    style={{ backgroundColor: "#1DA57A" }}
                  />
                ))
            ) : (
              <div></div>
            )}
          </div>
        </Col>
      </Row>

      <Row className="photo-video">
        <Col className="photo" md={12} sm={24}>
          <img src={mealDetail.strMealThumb} alt={mealDetail.strMeal} />
        </Col>
        <Col className="video" md={12} sm={24}>
          <ReactPlayer
            width="100%"
            height="100%"
            controls={true}
            url={`https://www.youtube.com/embed/${mealDetail.strYoutube}`}
          />
        </Col>
      </Row>
      <Row className="ingredients-instructions">
        <Col className="ingredients" md={12} sm={24}>
          <div className="ingredients-list">
            {[...Array(20).keys()].map((e, index) =>
              mealDetail["strIngredient" + (e + 1)] !== "" ? (
                <SingleIngredient
                  key={index}
                  measurement={mealDetail["strMeasure" + (e + 1)]}
                  ingredient={mealDetail["strIngredient" + (e + 1)]}
                />
              ) : (
                ""
              )
            )}
          </div>
        </Col>
        <Col className="instructions" md={12} sm={24}>
          <p>{mealDetail.strInstructions}</p>
        </Col>
      </Row>
    </div>
  );
}

export default RecipeDetail;
