import { useState, useEffect } from "react";
import BlogList from "./BlogList";
import axios from "axios";
import { setConstantValue } from "typescript";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [facts, setFacts] = useState([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  function increment() {
    setCount((prevCount) => {
      return prevCount + 1;
    });
  }

  function decrement() {
    setCount((prevCount) => {
      return prevCount - 1;
    });
  }

  useEffect(() => {
    // fetching cat fact
    axios
      .get("https://catfact.ninja/fact")
      .then((response: any) => {
        setFacts(response.data.fact);
      })
      .catch((error) => {
        console.log(error);
      });
    // fetching blog data from json file (mock rest api)
    axios
      .get("http://localhost:8000/blogs")
      .then((response) => {
        setBlogs(response.data);
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Error: Blogs are currently hosted locally.");
      });
  }, []);

  return (
    <div className="home">
      <div className="catFacts">
        <h2>Cat Fact</h2>
        <p>{facts}</p>
      </div>

      <div className="counterButton">
        <h3>Counter Button</h3>

        <div className="counter">
          <button onClick={decrement}>-</button>
          <p>{count}</p>
          <button onClick={increment}>+</button>
        </div>
      </div>

      <div className="title">
        {isLoading ? <h2>Loading ...</h2> : <h2>All Blogs!</h2>}
      </div>
      {blogs && <BlogList blogs={blogs} />}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default Home;
