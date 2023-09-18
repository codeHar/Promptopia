"use client";

import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import { useDebounce } from "@uidotdev/usehooks";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);
  const debouncedSearchTerm = useDebounce(searchText, 300);

  const searchInPrompt = (post) => {
    const regex = new RegExp(debouncedSearchTerm);
    const result = regex.exec(post?.prompt);
    console.log({ result });
    return result;
  };

  const searchByTag = (post) => {
    const regex = new RegExp(debouncedSearchTerm);
    const result = regex.exec(post?.tag);
    console.log({ result });
    return result;
  };

  const searchByUserName = (post) => {
    const regex = new RegExp(debouncedSearchTerm);
    const result = regex.exec(post?.creator.username);
    console.log({ result });
    return result;
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName)
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();

      setAllPosts(data);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const filteredPosts = allPosts.filter((post) => {
      return searchInPrompt(post)
        ? true
        : searchByTag(post)
        ? true
        : searchByUserName(post)
        ? true
        : false;
    });
    console.log({ filteredPosts });
    setSearchedResults(filteredPosts);
  }, [debouncedSearchTerm]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
