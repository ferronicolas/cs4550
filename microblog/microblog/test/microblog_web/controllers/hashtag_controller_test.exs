defmodule MicroblogWeb.HashtagControllerTest do
  use MicroblogWeb.ConnCase

  alias Microblog.Posts

  @create_attrs %{}
  @update_attrs %{}
  @invalid_attrs %{}

  def fixture(:hashtag) do
    {:ok, hashtag} = Posts.create_hashtag(@create_attrs)
    hashtag
  end

  describe "index" do
    test "lists all hashtags", %{conn: conn} do
      conn = get conn, hashtag_path(conn, :index)
      assert html_response(conn, 200) =~ "Listing Hashtags"
    end
  end

  describe "new hashtag" do
    test "renders form", %{conn: conn} do
      conn = get conn, hashtag_path(conn, :new)
      assert html_response(conn, 200) =~ "New Hashtag"
    end
  end

  describe "create hashtag" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post conn, hashtag_path(conn, :create), hashtag: @create_attrs

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == hashtag_path(conn, :show, id)

      conn = get conn, hashtag_path(conn, :show, id)
      assert html_response(conn, 200) =~ "Show Hashtag"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, hashtag_path(conn, :create), hashtag: @invalid_attrs
      assert html_response(conn, 200) =~ "New Hashtag"
    end
  end

  describe "edit hashtag" do
    setup [:create_hashtag]

    test "renders form for editing chosen hashtag", %{conn: conn, hashtag: hashtag} do
      conn = get conn, hashtag_path(conn, :edit, hashtag)
      assert html_response(conn, 200) =~ "Edit Hashtag"
    end
  end

  describe "update hashtag" do
    setup [:create_hashtag]

    test "redirects when data is valid", %{conn: conn, hashtag: hashtag} do
      conn = put conn, hashtag_path(conn, :update, hashtag), hashtag: @update_attrs
      assert redirected_to(conn) == hashtag_path(conn, :show, hashtag)

      conn = get conn, hashtag_path(conn, :show, hashtag)
      assert html_response(conn, 200)
    end

    test "renders errors when data is invalid", %{conn: conn, hashtag: hashtag} do
      conn = put conn, hashtag_path(conn, :update, hashtag), hashtag: @invalid_attrs
      assert html_response(conn, 200) =~ "Edit Hashtag"
    end
  end

  describe "delete hashtag" do
    setup [:create_hashtag]

    test "deletes chosen hashtag", %{conn: conn, hashtag: hashtag} do
      conn = delete conn, hashtag_path(conn, :delete, hashtag)
      assert redirected_to(conn) == hashtag_path(conn, :index)
      assert_error_sent 404, fn ->
        get conn, hashtag_path(conn, :show, hashtag)
      end
    end
  end

  defp create_hashtag(_) do
    hashtag = fixture(:hashtag)
    {:ok, hashtag: hashtag}
  end
end
