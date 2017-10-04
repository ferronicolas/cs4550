defmodule MicroblogWeb.MentionControllerTest do
  use MicroblogWeb.ConnCase

  alias Microblog.Posts

  @create_attrs %{}
  @update_attrs %{}
  @invalid_attrs %{}

  def fixture(:mention) do
    {:ok, mention} = Posts.create_mention(@create_attrs)
    mention
  end

  describe "index" do
    test "lists all mentions", %{conn: conn} do
      conn = get conn, mention_path(conn, :index)
      assert html_response(conn, 200) =~ "Listing Mentions"
    end
  end

  describe "new mention" do
    test "renders form", %{conn: conn} do
      conn = get conn, mention_path(conn, :new)
      assert html_response(conn, 200) =~ "New Mention"
    end
  end

  describe "create mention" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post conn, mention_path(conn, :create), mention: @create_attrs

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == mention_path(conn, :show, id)

      conn = get conn, mention_path(conn, :show, id)
      assert html_response(conn, 200) =~ "Show Mention"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, mention_path(conn, :create), mention: @invalid_attrs
      assert html_response(conn, 200) =~ "New Mention"
    end
  end

  describe "edit mention" do
    setup [:create_mention]

    test "renders form for editing chosen mention", %{conn: conn, mention: mention} do
      conn = get conn, mention_path(conn, :edit, mention)
      assert html_response(conn, 200) =~ "Edit Mention"
    end
  end

  describe "update mention" do
    setup [:create_mention]

    test "redirects when data is valid", %{conn: conn, mention: mention} do
      conn = put conn, mention_path(conn, :update, mention), mention: @update_attrs
      assert redirected_to(conn) == mention_path(conn, :show, mention)

      conn = get conn, mention_path(conn, :show, mention)
      assert html_response(conn, 200)
    end

    test "renders errors when data is invalid", %{conn: conn, mention: mention} do
      conn = put conn, mention_path(conn, :update, mention), mention: @invalid_attrs
      assert html_response(conn, 200) =~ "Edit Mention"
    end
  end

  describe "delete mention" do
    setup [:create_mention]

    test "deletes chosen mention", %{conn: conn, mention: mention} do
      conn = delete conn, mention_path(conn, :delete, mention)
      assert redirected_to(conn) == mention_path(conn, :index)
      assert_error_sent 404, fn ->
        get conn, mention_path(conn, :show, mention)
      end
    end
  end

  defp create_mention(_) do
    mention = fixture(:mention)
    {:ok, mention: mention}
  end
end
