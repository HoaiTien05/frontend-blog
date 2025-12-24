import { Card, Button, List, Space, Empty, Input, Spin, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postAPI } from "../core/services/postAPI";
import { useAppSelector } from "../core/redux";
import { useState } from "react";

export default function PostList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAppSelector((state) => state.auth);
  const page = 1;
  const [search, setSearch] = useState("");

  const { data: postsData, isLoading } = useQuery({
    queryKey: ["posts", page, search],
    queryFn: () =>
      postAPI.getPosts({ page, q: search }).then((res) => res.data),
  });

  const deleteMutation = useMutation({
    mutationFn: (postId: string) => postAPI.deletePost(postId),
    onSuccess: () => {
      message.success("Post deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => {
      message.error("Failed to delete post!");
    },
  });

  const handleDelete = (postId: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deleteMutation.mutate(postId);
    }
  };

  const posts = postsData?.data?.posts || [];

  return (
    <div>
      <Card style={{ marginBottom: 24 }}>
        <h1>All Posts</h1>
        <Input.Search
          placeholder="Search posts..."
          allowClear
          onSearch={setSearch}
          style={{ marginBottom: 16 }}
        />
      </Card>

      {isLoading ? (
        <Spin fullscreen />
      ) : posts.length > 0 ? (
        <List
          dataSource={posts}
          renderItem={(post) => (
            <Card
              key={post.id}
              style={{ marginBottom: 16, cursor: "pointer" }}
              onClick={() => navigate(`/posts/${post.slug}`)}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                }}
              >
                <div style={{ flex: 1 }}>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt || post.content.substring(0, 150)}...</p>
                  <p style={{ color: "#999", fontSize: 12 }}>
                    By {post.author?.username} •{" "}
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {user?.id === post.authorId && (
                  <Space onClick={(e) => e.stopPropagation()}>
                    <Button
                      type="text"
                      icon={<EditOutlined />}
                      onClick={() => navigate(`/posts/${post.id}/edit`)}
                    />
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleDelete(post.id)}
                      loading={deleteMutation.isPending}
                    />
                  </Space>
                )}
              </div>
            </Card>
          )}
        />
      ) : (
        <Empty description="No posts found" />
      )}
    </div>
  );
}
