defmodule MicroblogWeb.HashtagController do
  use MicroblogWeb, :controller

  alias Microblog.Posts
  alias Microblog.Posts.Hashtag

  def index(conn, _params) do
    hashtags = Posts.list_hashtags()
    render(conn, "index.html", hashtags: hashtags)
  end

  def new(conn, _params) do
    changeset = Posts.change_hashtag(%Hashtag{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"hashtag" => hashtag_params}) do
    case Posts.create_hashtag(hashtag_params) do
      {:ok, hashtag} ->
        conn
        |> put_flash(:info, "Hashtag created successfully.")
        |> redirect(to: hashtag_path(conn, :show, hashtag))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    hashtag = Posts.get_hashtag!(id)
    render(conn, "show.html", hashtag: hashtag)
  end

  def edit(conn, %{"id" => id}) do
    hashtag = Posts.get_hashtag!(id)
    changeset = Posts.change_hashtag(hashtag)
    render(conn, "edit.html", hashtag: hashtag, changeset: changeset)
  end

  def update(conn, %{"id" => id, "hashtag" => hashtag_params}) do
    hashtag = Posts.get_hashtag!(id)

    case Posts.update_hashtag(hashtag, hashtag_params) do
      {:ok, hashtag} ->
        conn
        |> put_flash(:info, "Hashtag updated successfully.")
        |> redirect(to: hashtag_path(conn, :show, hashtag))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", hashtag: hashtag, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    hashtag = Posts.get_hashtag!(id)
    {:ok, _hashtag} = Posts.delete_hashtag(hashtag)

    conn
    |> put_flash(:info, "Hashtag deleted successfully.")
    |> redirect(to: hashtag_path(conn, :index))
  end
end
