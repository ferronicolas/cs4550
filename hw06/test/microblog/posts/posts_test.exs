defmodule Microblog.PostsTest do
  use Microblog.DataCase

  alias Microblog.Posts

  describe "messages" do
    alias Microblog.Posts.Message

    @valid_attrs %{date: ~D[2010-04-17], message: "some message"}
    @update_attrs %{date: ~D[2011-05-18], message: "some updated message"}
    @invalid_attrs %{date: nil, message: nil}

    def message_fixture(attrs \\ %{}) do
      {:ok, message} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Posts.create_message()

      message
    end

    test "list_messages/0 returns all messages" do
      message = message_fixture()
      assert Posts.list_messages() == [message]
    end

    test "get_message!/1 returns the message with given id" do
      message = message_fixture()
      assert Posts.get_message!(message.id) == message
    end

    test "create_message/1 with valid data creates a message" do
      assert {:ok, %Message{} = message} = Posts.create_message(@valid_attrs)
      assert message.date == ~D[2010-04-17]
      assert message.message == "some message"
    end

    test "create_message/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Posts.create_message(@invalid_attrs)
    end

    test "update_message/2 with valid data updates the message" do
      message = message_fixture()
      assert {:ok, message} = Posts.update_message(message, @update_attrs)
      assert %Message{} = message
      assert message.date == ~D[2011-05-18]
      assert message.message == "some updated message"
    end

    test "update_message/2 with invalid data returns error changeset" do
      message = message_fixture()
      assert {:error, %Ecto.Changeset{}} = Posts.update_message(message, @invalid_attrs)
      assert message == Posts.get_message!(message.id)
    end

    test "delete_message/1 deletes the message" do
      message = message_fixture()
      assert {:ok, %Message{}} = Posts.delete_message(message)
      assert_raise Ecto.NoResultsError, fn -> Posts.get_message!(message.id) end
    end

    test "change_message/1 returns a message changeset" do
      message = message_fixture()
      assert %Ecto.Changeset{} = Posts.change_message(message)
    end
  end

  describe "mentions" do
    alias Microblog.Posts.Mention

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def mention_fixture(attrs \\ %{}) do
      {:ok, mention} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Posts.create_mention()

      mention
    end

    test "list_mentions/0 returns all mentions" do
      mention = mention_fixture()
      assert Posts.list_mentions() == [mention]
    end

    test "get_mention!/1 returns the mention with given id" do
      mention = mention_fixture()
      assert Posts.get_mention!(mention.id) == mention
    end

    test "create_mention/1 with valid data creates a mention" do
      assert {:ok, %Mention{} = mention} = Posts.create_mention(@valid_attrs)
    end

    test "create_mention/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Posts.create_mention(@invalid_attrs)
    end

    test "update_mention/2 with valid data updates the mention" do
      mention = mention_fixture()
      assert {:ok, mention} = Posts.update_mention(mention, @update_attrs)
      assert %Mention{} = mention
    end

    test "update_mention/2 with invalid data returns error changeset" do
      mention = mention_fixture()
      assert {:error, %Ecto.Changeset{}} = Posts.update_mention(mention, @invalid_attrs)
      assert mention == Posts.get_mention!(mention.id)
    end

    test "delete_mention/1 deletes the mention" do
      mention = mention_fixture()
      assert {:ok, %Mention{}} = Posts.delete_mention(mention)
      assert_raise Ecto.NoResultsError, fn -> Posts.get_mention!(mention.id) end
    end

    test "change_mention/1 returns a mention changeset" do
      mention = mention_fixture()
      assert %Ecto.Changeset{} = Posts.change_mention(mention)
    end
  end

  describe "keywords" do
    alias Microblog.Posts.Keyword

    @valid_attrs %{keyword: "some keyword"}
    @update_attrs %{keyword: "some updated keyword"}
    @invalid_attrs %{keyword: nil}

    def keyword_fixture(attrs \\ %{}) do
      {:ok, keyword} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Posts.create_keyword()

      keyword
    end

    test "list_keywords/0 returns all keywords" do
      keyword = keyword_fixture()
      assert Posts.list_keywords() == [keyword]
    end

    test "get_keyword!/1 returns the keyword with given id" do
      keyword = keyword_fixture()
      assert Posts.get_keyword!(keyword.id) == keyword
    end

    test "create_keyword/1 with valid data creates a keyword" do
      assert {:ok, %Keyword{} = keyword} = Posts.create_keyword(@valid_attrs)
      assert keyword.keyword == "some keyword"
    end

    test "create_keyword/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Posts.create_keyword(@invalid_attrs)
    end

    test "update_keyword/2 with valid data updates the keyword" do
      keyword = keyword_fixture()
      assert {:ok, keyword} = Posts.update_keyword(keyword, @update_attrs)
      assert %Keyword{} = keyword
      assert keyword.keyword == "some updated keyword"
    end

    test "update_keyword/2 with invalid data returns error changeset" do
      keyword = keyword_fixture()
      assert {:error, %Ecto.Changeset{}} = Posts.update_keyword(keyword, @invalid_attrs)
      assert keyword == Posts.get_keyword!(keyword.id)
    end

    test "delete_keyword/1 deletes the keyword" do
      keyword = keyword_fixture()
      assert {:ok, %Keyword{}} = Posts.delete_keyword(keyword)
      assert_raise Ecto.NoResultsError, fn -> Posts.get_keyword!(keyword.id) end
    end

    test "change_keyword/1 returns a keyword changeset" do
      keyword = keyword_fixture()
      assert %Ecto.Changeset{} = Posts.change_keyword(keyword)
    end
  end

  describe "hashtags" do
    alias Microblog.Posts.Hashtag

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def hashtag_fixture(attrs \\ %{}) do
      {:ok, hashtag} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Posts.create_hashtag()

      hashtag
    end

    test "list_hashtags/0 returns all hashtags" do
      hashtag = hashtag_fixture()
      assert Posts.list_hashtags() == [hashtag]
    end

    test "get_hashtag!/1 returns the hashtag with given id" do
      hashtag = hashtag_fixture()
      assert Posts.get_hashtag!(hashtag.id) == hashtag
    end

    test "create_hashtag/1 with valid data creates a hashtag" do
      assert {:ok, %Hashtag{} = hashtag} = Posts.create_hashtag(@valid_attrs)
    end

    test "create_hashtag/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Posts.create_hashtag(@invalid_attrs)
    end

    test "update_hashtag/2 with valid data updates the hashtag" do
      hashtag = hashtag_fixture()
      assert {:ok, hashtag} = Posts.update_hashtag(hashtag, @update_attrs)
      assert %Hashtag{} = hashtag
    end

    test "update_hashtag/2 with invalid data returns error changeset" do
      hashtag = hashtag_fixture()
      assert {:error, %Ecto.Changeset{}} = Posts.update_hashtag(hashtag, @invalid_attrs)
      assert hashtag == Posts.get_hashtag!(hashtag.id)
    end

    test "delete_hashtag/1 deletes the hashtag" do
      hashtag = hashtag_fixture()
      assert {:ok, %Hashtag{}} = Posts.delete_hashtag(hashtag)
      assert_raise Ecto.NoResultsError, fn -> Posts.get_hashtag!(hashtag.id) end
    end

    test "change_hashtag/1 returns a hashtag changeset" do
      hashtag = hashtag_fixture()
      assert %Ecto.Changeset{} = Posts.change_hashtag(hashtag)
    end
  end
end
