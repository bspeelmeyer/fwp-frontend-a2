import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

// import components and fragments
import Header from "../fragments/Header";
import Footer from "../fragments/Footer";
import LandingPage from "./LandingPage";
import Register from "./Register";
import Signin from "./Signin";


// Main application function
function App() {
  return (

    // Top level container
    <div className="d-flex flex-column min-vh-100">

      {/* Begin react router */}
      <Router>

        {/* Get header fragment */}
        <Header />

        {/* Main content container */}
        <div name="main container" className="container my-3">

          {/* Switch for react router */}
          <Switch>

            {/* Route for landing page */}
            <Route exact path="/" component={ LandingPage }/>

            {/* Route for register page */}
            <Route path="/register" component={ Register }/>

            {/* Route for signin page */}
            <Route path="/signin" component={ Signin }/>
          </Switch>

        </div>

        {/* Get footer fragment */}
        <Footer />

      </Router>
    </div>
  );
}

export default App;
