import { Card, Spin, Empty, Button, Form, Input, message, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postAPI } from "../core/services/postAPI";
import { commentAPI } from "../core/services/commentAPI";
import { useAppSelector } from "../core/redux";
import { useState } from "react";

export default function PostDetail() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const queryClient = useQueryClient();
  const { user } = useAppSelector((state) => state.auth);
  const [commentText, setCommentText] = useState("");

  const { data: post, isLoading } = useQuery({
    queryKey: ["post", slug],
    queryFn: () =>
      slug ? postAPI.getPostBySlug(slug).then((res) => res.data.data) : null,
  });

  const { data: comments = [] } = useQuery({
    queryKey: ["comments", post?.id],
    queryFn: () =>
      post?.id
        ? commentAPI.getComments(post.id).then((res) => res.data.data)
        : [],
    enabled: !!post?.id,
  });

  const deleteMutation = useMutation({
    mutationFn: () =>
      post?.id ? postAPI.deletePost(post.id) : Promise.reject(),
    onSuccess: () => {
      message.success("Post deleted!");
      navigate("/posts");
    },
  });

  const commentMutation = useMutation({
    mutationFn: (content: string) =>
      post?.id ? commentAPI.addComment(post.id, { content }) : Promise.reject(),
    onSuccess: () => {
      setCommentText("");
      queryClient.invalidateQueries({ queryKey: ["comments", post?.id] });
      message.success("Comment added!");
    },
  });

  const handleDeletePost = () => {
    if (window.confirm("Delete this post?")) {
      deleteMutation.mutate();
    }
  };

  const handleAddComment = () => {
    if (!commentText.trim()) {
      message.error("Please write a comment!");
      return;
    }
    commentMutation.mutate(commentText);
  };

  if (isLoading) return <Spin fullscreen />;
  if (!post) return <Empty />;

  return (
    <div>
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
          }}
        >
          <div>
            <h1>{post.title}</h1>
            <p style={{ color: "#999" }}>
              By {post.author?.username} •{" "}
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
          {/* {user?.id === post.authorId && ( */}
          <Space>
            <Button
              icon={<EditOutlined />}
              onClick={() => navigate(`/posts/${post.id}/edit`)}
            >
              Edit
            </Button>
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={handleDeletePost}
              loading={deleteMutation.isPending}
            >
              Delete
            </Button>
          </Space>
          {/* )} */}
        </div>

        <div style={{ marginTop: 24, lineHeight: 1.6 }}>{post.content}</div>
      </Card>

      <Card style={{ marginTop: 24 }} title="Comments">
        {user && (
          <Form layout="vertical" style={{ marginBottom: 24 }}>
            <Form.Item label="Add a comment">
              <Input.TextArea
                rows={3}
                placeholder="Share your thoughts..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
            </Form.Item>
            <Button
              type="primary"
              onClick={handleAddComment}
              loading={commentMutation.isPending}
            >
              Post Comment
            </Button>
          </Form>
        )}

        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", gap: 12 }}>
                <img
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  alt="avatar"
                  style={{ width: 40, height: 40, borderRadius: 20 }}
                />
                <div>
                  <div
                    style={{ display: "flex", alignItems: "baseline", gap: 8 }}
                  >
                    <strong>{comment.author?.username}</strong>
                    <span style={{ color: "#999", fontSize: 12 }}>
                      {new Date(comment.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p style={{ marginTop: 8 }}>{comment.content}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Empty description="No comments yet" />
        )}
      </Card>
    </div>
  );
}
