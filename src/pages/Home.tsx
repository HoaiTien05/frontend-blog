import { Card, Row, Col, Button, Statistic, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { postAPI } from "../core/services/postAPI";
import { useAppSelector } from "../core/redux";

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { data: postsData } = useQuery({
    queryKey: ["posts"],
    queryFn: () => postAPI.getPosts({ limit: 5 }).then((res) => res.data),
  });

  const recentPosts = postsData?.data || [];

  return (
    <div>
      <Card
        style={{
          marginBottom: 24,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
        }}
      >
        <h1 style={{ color: "white", marginBottom: 16 }}>
          Welcome to Mini Blog
        </h1>
        <p style={{ color: "#f0f0f0", marginBottom: 24 }}>
          Share your thoughts, read great stories, and connect with writers
          worldwide.
        </p>
        {isAuthenticated ? (
          <Button
            type="primary"
            size="large"
            onClick={() => navigate("/create-post")}
          >
            Start Writing
          </Button>
        ) : (
          <Button
            type="primary"
            size="large"
            onClick={() => navigate("/register")}
          >
            Get Started
          </Button>
        )}
      </Card>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Statistic title="Total Posts" value={postsData?.total || 0} />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Statistic title="Active Writers" value={42} />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Statistic title="Total Readers" value={1024} />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Statistic title="This Month" value={18} suffix="posts" />
        </Col>
      </Row>

      <Card title="Recent Posts">
        {recentPosts.length > 0 ? (
          <div>
            {recentPosts.map((post) => (
              <Card
                key={post.id}
                style={{ marginBottom: 16, cursor: "pointer" }}
                onClick={() => navigate(`/posts/${post.slug}`)}
              >
                <h3>{post.title}</h3>
                <p>{post.excerpt || post.content.substring(0, 100)}...</p>
                <p style={{ color: "#999", fontSize: 12 }}>
                  By {post.author?.username} •{" "}
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </Card>
            ))}
            <Button type="link" onClick={() => navigate("/posts")}>
              View All Posts →
            </Button>
          </div>
        ) : (
          <Empty description="No posts yet. Be the first to write!" />
        )}
      </Card>
    </div>
  );
}
