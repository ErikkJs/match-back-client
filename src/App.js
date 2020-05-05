import React from "react";
import styles from "./App.module.css";
import { Form, Header } from "./components";

//import { Cards, Chart, CountryPicker } from "./components";

class App extends React.Component {
  state = {};
  async componentDidMount() {}

  render() {
    return (
      <div>
        {" "}
        <Header />
        <div className={styles.container}>
          <Form />
        </div>
      </div>
    );
  }
}
export default App;
