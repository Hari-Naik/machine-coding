import { useCallback, useEffect, useRef, useState } from "react";
import type { Post } from "../types";
import axios from "axios";

const InfiniteScroll = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const fetchPosts = async (pageNum: number) => {
    setLoading(true);
    try {
      const res = await axios.get<Post[]>(
        "https://jsonplaceholder.typicode.com/posts",
        {
          params: { _limit: 10, _page: pageNum },
        }
      );

      setPosts(prev => [...prev, ...res.data]);
      if (res.data.length < 10) {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while fetching data. ");
    } finally {
      setLoading(false);
    }
  };

  const lastPostElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && hasMore) {
            setPage(prevPage => prevPage + 1);
          }
        },
        {
          threshold: 1,
        }
      );
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="p-4">
      {posts.map((post, index) => {
        if (posts.length === index + 1) {
          return (
            <div
              ref={lastPostElementRef}
              key={post.id}
              className="border-b py-4 hover:bg-gray-100 transition duration-200">
              <h2 className="text-lg md:text-xl font-bold">{post.title}</h2>
              <p className="text-gray-700">{post.body}</p>
            </div>
          );
        } else {
          return (
            <div
              key={post.id}
              className="border-b py-4 hover:bg-gray-100 transition duration-200">
              <h2 className="text-lg md:text-xl font-bold">{post.title}</h2>
              <p className="text-gray-700">{post.body}</p>
            </div>
          );
        }
      })}
      {loading && <p className="text-center py-4">Loading...</p>}
      {error && <p className="text-center text-red-500 py-4">{error}</p>}
    </div>
  );
};

export default InfiniteScroll;
