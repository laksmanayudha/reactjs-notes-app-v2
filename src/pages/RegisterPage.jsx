import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { routes } from ".";
import RegisterInput from "../components/Input/RegisterInput";
import content from "../utils/content";
import { checkConfirmPassword, register } from "../utils/network-data";
import LocaleContext from "../contexts/LocaleContext";

function RegisterPage() {

    const navigate = useNavigate();
    const { locale } = React.useContext(LocaleContext);
    const [ errorMessage, setErrorMessage ] = React.useState("");

    const onRegisterHandler = async ({ name, email, password, confirmPassword }) => {

        if (checkConfirmPassword(password, confirmPassword)) {
            const { error, message } = await register({ name, email, password });
            if (!error) {
                navigate(routes("login"));
            }else{
                setErrorMessage(message);
            }
        }else{
            setErrorMessage("Password and password confirm must be same.");
        }

    }

    return (
        <section className="register-page">
            <h2>{ content[locale].registerPage.header }</h2>
            {errorMessage && <p className="error-message">{ errorMessage }</p>}
            <RegisterInput register={onRegisterHandler} />
            <p>{ content[locale].registerPage.footer } <Link to={routes("login")}>{ content[locale].registerPage.toLogin }</Link> </p>
        </section>
    );
}

export default RegisterPage;