import React,{useState, useEffect} from 'react';
import './App.css';
import Posts from './components/Posts';
import axios from 'axios';
import Pagination from './components/Pagination';


function App() {

  const [posts, setPosts] = useState([]);
  const [ loading, setLoading] = useState(false);
  const [ currentPage, setCurrentPage] = useState(1);
  const [ postPerPage] = useState(10);


  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
      setLoading(false);
    }
    fetchPosts();
  },[]);


  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);

  }

  console.log()

  return (
    <div className="container">
      <h1 className="text-primary mb-3">My blog</h1>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination postPerPage={postPerPage} totalPosts={posts.length} paginate={paginate}/>
    </div>
  );
}

export default App;
