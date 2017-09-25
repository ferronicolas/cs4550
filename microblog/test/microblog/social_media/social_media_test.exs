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
end
