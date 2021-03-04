import React from "react";
import { Badge } from "antd";
function MealThumbnail(props) {
  return (
    <div className="MealThumbnail fade">
      <Badge.Ribbon text={props.meal.strCategory}>
        <div className="imgContainer">
          <img
            className="fade"
            src={props.meal.strMealThumb}
            alt={props.meal.strMealThumb}
          />
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

      <p>{props.meal.strMeal}</p>
    </div>
  );
}

export default MealThumbnail;
