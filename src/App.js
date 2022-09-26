import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import { getNavigations, getPages } from "./pages";

class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      navigations: getNavigations(),
      pages: getPages()
    };
  }

  render() {
    return (
      <div className="app-container">
        
        <header>
          <NavBar navLinks={this.state.navigations} />
        </header>
  
        <main>
          <Routes>
            {this.state.pages.map((page, index) => (
              <Route path={page.href} element={page.el} key={index} />
            ))}
          </Routes>
        </main>
  
      </div>
    );
  }
}

export default App;
