import React from "react";
import useInput from "../../hooks/useInput";
import PropTypes from "prop-types";

function LoginInput({ login }) {

    const [email, setEmail] = useInput("");
    const [password, setPassword] = useInput("");

    const loginHandler = () => {
        login({ email, password });
    }

    return (
        <div className="input-login">
            <label htmlFor="email">Email</label>
            <input type="email" onChange={setEmail} value={email} id="email" />
            <label htmlFor="password" >Password</label>
            <input type="password" onChange={setPassword} value={password} id="password" />
            <button type="button" onClick={loginHandler}>Login</button>
        </div>
    );
}

LoginInput.propTypes = {
    login: PropTypes.func.isRequired
};

export default LoginInput;