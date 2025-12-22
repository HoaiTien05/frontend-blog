import { Form, Input, Button, Card, message, Switch } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { postAPI } from "../core/services/postAPI";
import { useState } from "react";
import { Spin } from "antd";

export default function PostEditor() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const [isPublished, setIsPublished] = useState(false);

  const { data: post, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: () =>
      id ? postAPI.getPostBySlug(id).then((res) => res.data) : null,
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => postAPI.createPost(data),
    onSuccess: (response) => {
      message.success("Post created successfully!");
      navigate(`/posts/${response.data.slug}`);
    },
    onError: () => {
      message.error("Failed to create post!");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: any) =>
      id ? postAPI.updatePost(id, data) : Promise.reject(),
    onSuccess: (response) => {
      message.success("Post updated successfully!");
      navigate(`/posts/${response.data.slug}`);
    },
    onError: () => {
      message.error("Failed to update post!");
    },
  });

  const onFinish = (values: any) => {
    const payload = {
      ...values,
      published: isPublished,
    };

    if (id) {
      updateMutation.mutate(payload);
    } else {
      createMutation.mutate(payload);
    }
  };

  if (id && isLoading) return <Spin fullscreen />;

  return (
    <Card style={{ maxWidth: 800, margin: "0 auto" }}>
      <h2>{id ? "Edit Post" : "Create New Post"}</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={post || {}}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter post title!" }]}
        >
          <Input placeholder="Post title" />
        </Form.Item>

        <Form.Item label="Excerpt" name="excerpt" rules={[{ required: false }]}>
          <Input.TextArea rows={2} placeholder="Brief summary (optional)" />
        </Form.Item>

        <Form.Item
          label="Content"
          name="content"
          rules={[{ required: true, message: "Please enter post content!" }]}
        >
          <Input.TextArea
            rows={10}
            placeholder="Write your post content here..."
          />
        </Form.Item>

        <Form.Item label="Published">
          <Switch checked={isPublished} onChange={setIsPublished} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={createMutation.isPending || updateMutation.isPending}
          >
            {id ? "Update Post" : "Create Post"}
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={() => navigate("/posts")}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
