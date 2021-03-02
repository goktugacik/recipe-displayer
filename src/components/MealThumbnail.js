import React from "react";

function MealThumbnail(props) {
  return (
    <div className="MealThumbnail">
      <img src={props.meal.strMealThumb} alt={props.meal.strMealThumb} />
      <p>{props.meal.strMeal}</p>
    </div>
  );
}

export default MealThumbnail;
