import React from "react";
import { Badge } from "antd";
import { Link } from "react-router-dom";
function MealThumbnail(props) {
  return (
    <div className="MealThumbnail fade">
      <Badge.Ribbon
        className={props.meal.strCategory ? "" : "none"}
        text={
          <Link to={`/category/${props.meal.strCategory}`}>
            {props.meal.strCategory}
          </Link>
        }
      >
        <div className="imgContainer">
          <Link to={`/recipe/${props.meal.idMeal}`}>
            <img
              className="fade"
              src={props.meal.strMealThumb}
              alt={props.meal.strMealThumb}
            />
          </Link>
          <div className="tags">
            {props.meal.strTags != null || "" ? (
              props.meal.strTags
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
        </div>
      </Badge.Ribbon>
      <Link to={`/recipe/${props.meal.idMeal}`}>
        <p>{props.meal.strMeal}</p>
      </Link>
    </div>
  );
}

export default MealThumbnail;
