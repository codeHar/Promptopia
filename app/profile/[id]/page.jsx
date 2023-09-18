"use client";

import Profile from "@components/Profile";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const OtherProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getUserPosts = async () => {
      const res = await fetch(`/api/users/${params.id}/posts`);

      const data = await res.json();

      setPosts(data);
    };

    getUserPosts();
  }, []);

  return (
    <Profile
      name={userName}
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={() => {}}
      handleDelete={() => {}}
    />
  );
};

export default OtherProfile;
