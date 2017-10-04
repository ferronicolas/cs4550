defmodule MicroblogWeb.MentionController do
  use MicroblogWeb, :controller

  alias Microblog.Posts
  alias Microblog.Posts.Mention

  def index(conn, _params) do
    mentions = Posts.list_mentions()
    render(conn, "index.html", mentions: mentions)
  end

  def new(conn, _params) do
    changeset = Posts.change_mention(%Mention{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"mention" => mention_params}) do
    case Posts.create_mention(mention_params) do
      {:ok, mention} ->
        conn
        |> put_flash(:info, "Mention created successfully.")
        |> redirect(to: mention_path(conn, :show, mention))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    mention = Posts.get_mention!(id)
    render(conn, "show.html", mention: mention)
  end

  def edit(conn, %{"id" => id}) do
    mention = Posts.get_mention!(id)
    changeset = Posts.change_mention(mention)
    render(conn, "edit.html", mention: mention, changeset: changeset)
  end

  def update(conn, %{"id" => id, "mention" => mention_params}) do
    mention = Posts.get_mention!(id)

    case Posts.update_mention(mention, mention_params) do
      {:ok, mention} ->
        conn
        |> put_flash(:info, "Mention updated successfully.")
        |> redirect(to: mention_path(conn, :show, mention))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", mention: mention, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    mention = Posts.get_mention!(id)
    {:ok, _mention} = Posts.delete_mention(mention)

    conn
    |> put_flash(:info, "Mention deleted successfully.")
    |> redirect(to: mention_path(conn, :index))
  end
end
