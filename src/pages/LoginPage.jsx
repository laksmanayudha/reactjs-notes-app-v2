import React from "react";
import { Link } from "react-router-dom";
import LoginInput from "../components/Input/LoginInput";
import { routes } from ".";
import { login } from "../utils/network-data";
import PropTypes from "prop-types";
import content from "../utils/content";
import LocaleContext from "../contexts/LocaleContext";
// import { useNavigate } from "react-router-dom";

function LoginPage({ loginSuccess }) {

    const { locale } = React.useContext(LocaleContext);
    const [ errorMessage, setErrorMessage ] = React.useState("");
    // const navigate = useNavigate();

    const onLoginHandler = async ({ email, password }) => {
        const {error, data, message} = await login({ email, password });

        if (!error) {
            loginSuccess(data);
            // navigate(routes("home"));
        }else{
            setErrorMessage(message)
        }

    }
    

    return (
        <section className="login-page">
            <h2>{ content[locale].loginPage.header }</h2>
            {errorMessage && <p className="error-message">{ errorMessage }</p>}
            <LoginInput login={onLoginHandler} />
            <p>{ content[locale].loginPage.footer } <Link to={routes("register")} >{content[locale].loginPage.toRegister}</Link> </p>
        </section>
    );
}

LoginPage.propTypes = {
    loginSuccess: PropTypes.func.isRequired
};

export default LoginPage