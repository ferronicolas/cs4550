defmodule Microblog.KeywordsTest do
  use Microblog.DataCase

  alias Microblog.Keywords

  describe "keywords" do
    alias Microblog.Keywords.Keyword

    @valid_attrs %{keyword: "some keyword"}
    @update_attrs %{keyword: "some updated keyword"}
    @invalid_attrs %{keyword: nil}

    def keyword_fixture(attrs \\ %{}) do
      {:ok, keyword} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Keywords.create_keyword()

      keyword
    end

    test "list_keywords/0 returns all keywords" do
      keyword = keyword_fixture()
      assert Keywords.list_keywords() == [keyword]
    end

    test "get_keyword!/1 returns the keyword with given id" do
      keyword = keyword_fixture()
      assert Keywords.get_keyword!(keyword.id) == keyword
    end

    test "create_keyword/1 with valid data creates a keyword" do
      assert {:ok, %Keyword{} = keyword} = Keywords.create_keyword(@valid_attrs)
      assert keyword.keyword == "some keyword"
    end

    test "create_keyword/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Keywords.create_keyword(@invalid_attrs)
    end

    test "update_keyword/2 with valid data updates the keyword" do
      keyword = keyword_fixture()
      assert {:ok, keyword} = Keywords.update_keyword(keyword, @update_attrs)
      assert %Keyword{} = keyword
      assert keyword.keyword == "some updated keyword"
    end

    test "update_keyword/2 with invalid data returns error changeset" do
      keyword = keyword_fixture()
      assert {:error, %Ecto.Changeset{}} = Keywords.update_keyword(keyword, @invalid_attrs)
      assert keyword == Keywords.get_keyword!(keyword.id)
    end

    test "delete_keyword/1 deletes the keyword" do
      keyword = keyword_fixture()
      assert {:ok, %Keyword{}} = Keywords.delete_keyword(keyword)
      assert_raise Ecto.NoResultsError, fn -> Keywords.get_keyword!(keyword.id) end
    end

    test "change_keyword/1 returns a keyword changeset" do
      keyword = keyword_fixture()
      assert %Ecto.Changeset{} = Keywords.change_keyword(keyword)
    end
  end

  describe "hashtags" do
    alias Microblog.Keywords.Hashtag

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def hashtag_fixture(attrs \\ %{}) do
      {:ok, hashtag} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Keywords.create_hashtag()

      hashtag
    end

    test "list_hashtags/0 returns all hashtags" do
      hashtag = hashtag_fixture()
      assert Keywords.list_hashtags() == [hashtag]
    end

    test "get_hashtag!/1 returns the hashtag with given id" do
      hashtag = hashtag_fixture()
      assert Keywords.get_hashtag!(hashtag.id) == hashtag
    end

    test "create_hashtag/1 with valid data creates a hashtag" do
      assert {:ok, %Hashtag{} = hashtag} = Keywords.create_hashtag(@valid_attrs)
    end

    test "create_hashtag/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Keywords.create_hashtag(@invalid_attrs)
    end

    test "update_hashtag/2 with valid data updates the hashtag" do
      hashtag = hashtag_fixture()
      assert {:ok, hashtag} = Keywords.update_hashtag(hashtag, @update_attrs)
      assert %Hashtag{} = hashtag
    end

    test "update_hashtag/2 with invalid data returns error changeset" do
      hashtag = hashtag_fixture()
      assert {:error, %Ecto.Changeset{}} = Keywords.update_hashtag(hashtag, @invalid_attrs)
      assert hashtag == Keywords.get_hashtag!(hashtag.id)
    end

    test "delete_hashtag/1 deletes the hashtag" do
      hashtag = hashtag_fixture()
      assert {:ok, %Hashtag{}} = Keywords.delete_hashtag(hashtag)
      assert_raise Ecto.NoResultsError, fn -> Keywords.get_hashtag!(hashtag.id) end
    end

    test "change_hashtag/1 returns a hashtag changeset" do
      hashtag = hashtag_fixture()
      assert %Ecto.Changeset{} = Keywords.change_hashtag(hashtag)
    end
  end
end
