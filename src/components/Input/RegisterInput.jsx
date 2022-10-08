import React from "react";
import useInput from "../../hooks/useInput";
import PropTypes from "prop-types";

function RegisterInput({ register }) {

    const [name, setName] = useInput("");
    const [email, setEmail] = useInput("");
    const [password, setPassword] = useInput("");
    const [confirmPassword, setConfirmPassword] = useInput("");

    const registerHandler = () => {
        register({ name, email, password, confirmPassword });
    }

    return (
        <div className="input-register">
            <label htmlFor="name" >Name</label>
            <input type="text" onChange={setName} value={name} id="name" />
            <label htmlFor="email" >Email</label>
            <input type="email" onChange={setEmail} value={email} id="email" />
            <label htmlFor="password" >Password</label>
            <input type="password" onChange={setPassword} value={password} id="password" />
            <label htmlFor="confirmPassword" >Confirm Password</label>
            <input type="password" onChange={setConfirmPassword} value={confirmPassword} id="confirmPassword" />
            <button type="button" onClick={registerHandler}>Register</button>
        </div>
    );
}

RegisterInput.propTypes = {
    register: PropTypes.func.isRequired
};

export default RegisterInput;