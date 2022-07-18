import { useState, useEffect } from "react";
import BlogList from "./BlogList";
import axios from "axios";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [facts, setFacts] = useState([]);
  const [count, setCount] = useState(0);
  const [isPending, setIsPending] = useState(true);

  // function isLoading(isPending) {
  //   let title: string;

  //   if (isPending == true) {
  //     {
  //       title = "Is Loading ...";
  //     }
  //   } else {
  //     {
  //       title = "All Blogs";
  //     }
  //   }
  //   return title;
  // }

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
    axios.get("https://catfact.ninja/fact").then((result: any) => {
      console.log(result.data.fact);
      setFacts(result.data.fact);
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:8000/blogs")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setBlogs(data);
          setIsPending(false);
        });
    }, 3000);
  }, []);

  return (
    <div className="home">
      <div className="catFacts">
        <h2>Cat Facts </h2>
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
        {isPending ? <h2>Loading ...</h2> : <h2> All Blogs!</h2>}
      </div>
      {blogs && <BlogList blogs={blogs} />}
    </div>
  );
};

export default Home;
