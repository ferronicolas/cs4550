defmodule Microblog.SocialMediaTest do
  use Microblog.DataCase

  alias Microblog.SocialMedia

  describe "messages" do
    alias Microblog.SocialMedia.Message

    @valid_attrs %{date: ~D[2010-04-17], message: "some message", userId: 42}
    @update_attrs %{date: ~D[2011-05-18], message: "some updated message", userId: 43}
    @invalid_attrs %{date: nil, message: nil, userId: nil}

    def message_fixture(attrs \\ %{}) do
      {:ok, message} =
        attrs
        |> Enum.into(@valid_attrs)
        |> SocialMedia.create_message()

      message
    end

    test "list_messages/0 returns all messages" do
      message = message_fixture()
      assert SocialMedia.list_messages() == [message]
    end

    test "get_message!/1 returns the message with given id" do
      message = message_fixture()
      assert SocialMedia.get_message!(message.id) == message
    end

    test "create_message/1 with valid data creates a message" do
      assert {:ok, %Message{} = message} = SocialMedia.create_message(@valid_attrs)
      assert message.date == ~D[2010-04-17]
      assert message.message == "some message"
      assert message.userId == 42
    end

    test "create_message/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = SocialMedia.create_message(@invalid_attrs)
    end

    test "update_message/2 with valid data updates the message" do
      message = message_fixture()
      assert {:ok, message} = SocialMedia.update_message(message, @update_attrs)
      assert %Message{} = message
      assert message.date == ~D[2011-05-18]
      assert message.message == "some updated message"
      assert message.userId == 43
    end

    test "update_message/2 with invalid data returns error changeset" do
      message = message_fixture()
      assert {:error, %Ecto.Changeset{}} = SocialMedia.update_message(message, @invalid_attrs)
      assert message == SocialMedia.get_message!(message.id)
    end

    test "delete_message/1 deletes the message" do
      message = message_fixture()
      assert {:ok, %Message{}} = SocialMedia.delete_message(message)
      assert_raise Ecto.NoResultsError, fn -> SocialMedia.get_message!(message.id) end
    end

    test "change_message/1 returns a message changeset" do
      message = message_fixture()
      assert %Ecto.Changeset{} = SocialMedia.change_message(message)
    end
  end

  describe "users" do
    alias Microblog.SocialMedia.User

    @valid_attrs %{email: "some email", username: "some username"}
    @update_attrs %{email: "some updated email", username: "some updated username"}
    @invalid_attrs %{email: nil, username: nil}

    def user_fixture(attrs \\ %{}) do
      {:ok, user} =
        attrs
        |> Enum.into(@valid_attrs)
        |> SocialMedia.create_user()

      user
    end

    test "list_users/0 returns all users" do
      user = user_fixture()
      assert SocialMedia.list_users() == [user]
    end

    test "get_user!/1 returns the user with given id" do
      user = user_fixture()
      assert SocialMedia.get_user!(user.id) == user
    end

    test "create_user/1 with valid data creates a user" do
      assert {:ok, %User{} = user} = SocialMedia.create_user(@valid_attrs)
      assert user.email == "some email"
      assert user.username == "some username"
    end

    test "create_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = SocialMedia.create_user(@invalid_attrs)
    end

    test "update_user/2 with valid data updates the user" do
      user = user_fixture()
      assert {:ok, user} = SocialMedia.update_user(user, @update_attrs)
      assert %User{} = user
      assert user.email == "some updated email"
      assert user.username == "some updated username"
    end

    test "update_user/2 with invalid data returns error changeset" do
      user = user_fixture()
      assert {:error, %Ecto.Changeset{}} = SocialMedia.update_user(user, @invalid_attrs)
      assert user == SocialMedia.get_user!(user.id)
    end

    test "delete_user/1 deletes the user" do
      user = user_fixture()
      assert {:ok, %User{}} = SocialMedia.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> SocialMedia.get_user!(user.id) end
    end

    test "change_user/1 returns a user changeset" do
      user = user_fixture()
      assert %Ecto.Changeset{} = SocialMedia.change_user(user)
    end
  end

  describe "messages" do
    alias Microblog.SocialMedia.Message

    @valid_attrs %{date: ~D[2010-04-17], message: "some message"}
    @update_attrs %{date: ~D[2011-05-18], message: "some updated message"}
    @invalid_attrs %{date: nil, message: nil}

    def message_fixture(attrs \\ %{}) do
      {:ok, message} =
        attrs
        |> Enum.into(@valid_attrs)
        |> SocialMedia.create_message()

      message
    end

    test "list_messages/0 returns all messages" do
      message = message_fixture()
      assert SocialMedia.list_messages() == [message]
    end

    test "get_message!/1 returns the message with given id" do
      message = message_fixture()
      assert SocialMedia.get_message!(message.id) == message
    end

    test "create_message/1 with valid data creates a message" do
      assert {:ok, %Message{} = message} = SocialMedia.create_message(@valid_attrs)
      assert message.date == ~D[2010-04-17]
      assert message.message == "some message"
    end

    test "create_message/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = SocialMedia.create_message(@invalid_attrs)
    end

    test "update_message/2 with valid data updates the message" do
      message = message_fixture()
      assert {:ok, message} = SocialMedia.update_message(message, @update_attrs)
      assert %Message{} = message
      assert message.date == ~D[2011-05-18]
      assert message.message == "some updated message"
    end

    test "update_message/2 with invalid data returns error changeset" do
      message = message_fixture()
      assert {:error, %Ecto.Changeset{}} = SocialMedia.update_message(message, @invalid_attrs)
      assert message == SocialMedia.get_message!(message.id)
    end

    test "delete_message/1 deletes the message" do
      message = message_fixture()
      assert {:ok, %Message{}} = SocialMedia.delete_message(message)
      assert_raise Ecto.NoResultsError, fn -> SocialMedia.get_message!(message.id) end
    end

    test "change_message/1 returns a message changeset" do
      message = message_fixture()
      assert %Ecto.Changeset{} = SocialMedia.change_message(message)
    end
  end
end
