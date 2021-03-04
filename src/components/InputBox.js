import React from "react";
import { Input } from "antd";

const { Search } = Input;

function InputBox(props) {
  return (
    <div className="inputBox">
      <Search
        id={props.id}
        placeholder={props.placeholder}
        allowClear
        enterButton={props.enterButton}
        size={props.size}
        onSearch={props.onSearch}
      />
    </div>
  );
}

export default InputBox;
