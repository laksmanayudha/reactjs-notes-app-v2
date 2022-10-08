import React from "react";
import { Routes, Route } from "react-router-dom";
import LogoutButton from "./components/Button/LogoutButton";
import NavBar from "./components/NavBar/NavBar";
import { getNavigations, getPages } from "./pages";
import { putAccessToken, getUserLogged } from "./utils/network-data";
import ThemeContext from "./contexts/ThemeContext";
import ToggleThemeButton from "./components/Button/ToggleThemeButton";
import TranslateButton from "./components/Button/TranslateButton";
import LocaleContext from "./contexts/LocaleContext";
import content from "./utils/content";

class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      navigations: getNavigations({ auth: false }),
      pages: getPages({ auth: false }),
      authedUser: null,
      initializing: true,
      themeContextValue: {
        theme: localStorage.getItem("theme") || "light",
        changeTheme: () => {
          this.setState((prevState) => {
            // get new theme
            const newTheme = prevState.themeContextValue.theme === "light" ? "dark" : "light";
            // save new theme to localStorage
            localStorage.setItem("theme", newTheme);

            return {
              themeContextValue: {
                ...prevState.themeContextValue,
                theme: newTheme
              }
            };
          });
        }
      },
      localeContextValue: {
        locale: localStorage.getItem("locale") || "id",
        changeLocale: () => {
          this.setState((prevState) => {
            // get new locale
            const newLocale = prevState.localeContextValue.locale === "id" ? "en" : "id";
            // save new locale to localStorage
            localStorage.setItem("locale", newLocale);

            return {
              localeContextValue: {
                ...prevState.localeContextValue,
                locale: newLocale
              }
            };
          });
        }
      }
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogoutHandler = this.onLogoutHandler.bind(this);
  }

  async componentDidMount() {

    // get authed user
    const { error, data } = await getUserLogged();

    if (!error) {
      this.setState(() => {
        return {
          navigations: getNavigations({ auth: true }),
          pages: getPages({ auth: true }),
          authedUser: data
        };
      });
    }

    // set loading to false
    this.setState(() => {
      return {
        initializing: false
      };
    });

    // set default theme or saved theme
    document.documentElement.setAttribute("data-theme", this.state.themeContextValue.theme);
  }

  componentDidUpdate(prevProps, prevState) {

    // change theme on document (html tag) when theme state updated
    if (prevState.themeContextValue.theme !== this.state.themeContextValue.theme) {
      document.documentElement.setAttribute("data-theme", this.state.themeContextValue.theme);
    }
  }

  async onLoginSuccess({ accessToken }) {

    // put accesstoken to localStorage
    putAccessToken(accessToken);
    // get authed user
    const { error, data } = await getUserLogged();

    if (!error) {
      this.setState(() => {
        return {
          navigations: getNavigations({ auth: true }),
          pages: getPages({ auth: true }),
          authedUser: data
        };
      });
    }
  }

  onLogoutHandler() {
    // get no auth pages
    this.setState(() => {
      return {
        authedUser: null,
        pages: getPages({ auth: false }),
        navigations: getNavigations({ auth: false })
      };
    });

    // remove token from localStorage
    putAccessToken("");
  }

  render() {

    if (this.state.initializing) {
      return null;
    }

    return (
      <ThemeContext.Provider value={this.state.themeContextValue}>
        <LocaleContext.Provider value={this.state.localeContextValue}>
          <div className="app-container">
            <header>
              <NavBar navLinks={this.state.navigations} title={ content[this.state.localeContextValue.locale].navBar.appName } >
                <TranslateButton />
                <ToggleThemeButton />
                {this.state.authedUser !== null && <LogoutButton name={this.state.authedUser.name} logout={this.onLogoutHandler} />}
              </NavBar>
            </header>
      
            <main>
              <Routes>
                {this.state.pages.map((page, index) => (
                  <Route 
                    path={page.href} 
                    element={page.el({ loginSuccess: this.onLoginSuccess })} 
                    key={index} 
                  />
                ))}
              </Routes>
            </main>
          </div>
        </LocaleContext.Provider>
      </ThemeContext.Provider>
    );
  }
}

export default App;
