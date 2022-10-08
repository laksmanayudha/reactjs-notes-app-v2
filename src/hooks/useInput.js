import React from "react";

function useInput(value) {
    const [input, setInput] = React.useState(value);
    const onChangeHandler = (event) => {
        setInput(event.target.value);
    }

    return [input, onChangeHandler];
}

export default useInput;