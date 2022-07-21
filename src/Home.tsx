import { useState, useEffect } from "react";
import BlogList from "./BlogList";
import { setConstantValue } from "typescript";
import axios from "axios";
import useFetch from "./useFetch";

const Home = () => {
  const [count, setCount] = useState(0);
  const [facts, setFacts] = useState([]);
  const {
    data: blogs,
    isLoading,
    errorMessage,
  } = useFetch("http://localhost:8000/blogs");

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
