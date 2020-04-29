import React from "react";
import styles from "./App.module.css";
import { Form } from "./components";
//import { Cards, Chart, CountryPicker } from "./components";

class App extends React.Component {
  state = {
  };
  async componentDidMount() {
  
  }

  render() {
    return (
      <div className={styles.container}>
        <Form/>
      </div>
    );
  }
}
export default App;
