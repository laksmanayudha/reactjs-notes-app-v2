import React from "react";
import { MdGTranslate } from "react-icons/md";
import LocaleContext from "../../contexts/LocaleContext";

function TranslateButton() {

    const { locale, changeLocale } = React.useContext(LocaleContext);

    return <button onClick={changeLocale} type="button" className="toggle-locale" >{locale === "id" ? "English " : "Indonesia "} <MdGTranslate /></button>;
}

export default TranslateButton;