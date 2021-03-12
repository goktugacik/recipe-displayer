import React, { useState } from "react";
import { Checkbox } from "antd";
function SingleIngredient(props) {
  const [checked, setChecked] = useState(false);

  function onChange(e) {
    setChecked(e.target.checked);
    console.log(props.measurement, props.ingredient);
  }

  return (
    <div className={`single-ingredient ${checked ? "checked" : ""}`}>
      <Checkbox onChange={onChange}>
        <b>{props.measurement} </b>
        {props.ingredient}
      </Checkbox>
    </div>
  );
}

export default SingleIngredient;
