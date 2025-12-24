import { Card, Form, Input, Button, Avatar, Spin, message } from "antd";
import { useQuery, useMutation } from "@tanstack/react-query";
import { authAPI } from "../core/services/authAPI";
// import { useAppSelector } from "../core/redux";
import { useState } from "react";

export default function Profile() {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => authAPI.getProfile().then((res) => res.data),
  });

  const updateMutation = useMutation({
    mutationFn: (data: any) => authAPI.updateProfile(data),
    onSuccess: () => {
      message.success("Profile updated!");
      setIsEditing(false);
    },
    onError: () => {
      message.error("Failed to update profile!");
    },
  });

  const onFinish = (values: any) => {
    updateMutation.mutate(values);
  };

  if (isLoading) return <Spin fullscreen />;

  return (
    <Card style={{ maxWidth: 600, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <Avatar size={80} style={{ backgroundColor: "#87d068" }}>
          {profile?.username[0]?.toUpperCase()}
        </Avatar>
        <h2 style={{ marginTop: 16 }}>{profile?.username}</h2>
        <p style={{ color: "#999" }}>{profile?.email}</p>
      </div>

      {!isEditing ? (
        <div>
          <p>
            <strong>Bio:</strong> {profile?.bio || "No bio yet"}
          </p>
          <Button type="primary" onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        </div>
      ) : (
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={profile}
        >
          <Form.Item label="Username" name="username">
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>

          <Form.Item label="Bio" name="bio">
            <Input.TextArea rows={4} placeholder="Tell us about yourself..." />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={updateMutation.isPending}
          >
            Save Changes
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </Form>
      )}
    </Card>
  );
}
