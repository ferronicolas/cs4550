defmodule MicroblogWeb.FollowController do
  use MicroblogWeb, :controller

  alias Microblog.Accounts
  alias Microblog.Accounts.Follow

  def follow(conn, %{"follow" => follow_params}) do
	case Accounts.follow(follow_params["user_following_id"], follow_params["user_being_followed_id"]) do
		{:ok, follow} ->
			conn
        	|> put_flash(:info, "Followed user " <> Accounts.get_user!(follow_params["user_being_followed_id"]).username)
       	 	|> redirect(to: user_path(conn, :show, follow_params["user_being_followed_id"]))
    	{:error, %Ecto.Changeset{} = changeset} ->
        	render(conn, "new.html", changeset: changeset)
    end
  end


  def index(conn, _params) do
    follows = Accounts.list_follows()
    render(conn, "index.html", follows: follows)
  end

  def new(conn, _params) do
    changeset = Accounts.change_follow(%Follow{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"follow" => follow_params}) do
	case Accounts.create_follow(follow_params) do
      {:ok, follow} ->
        conn
        |> put_flash(:info, "Follow created successfully.")
        |> redirect(to: user_path(conn, :show, follow_params.user_following_id))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    follow = Accounts.get_follow!(id)
    render(conn, "show.html", follow: follow)
  end

  def edit(conn, %{"id" => id}) do
    follow = Accounts.get_follow!(id)
    changeset = Accounts.change_follow(follow)
    render(conn, "edit.html", follow: follow, changeset: changeset)
  end

  def update(conn, %{"id" => id, "follow" => follow_params}) do
    follow = Accounts.get_follow!(id)

    case Accounts.update_follow(follow, follow_params) do
      {:ok, follow} ->
        conn
        |> put_flash(:info, "Follow updated successfully.")
        |> redirect(to: follow_path(conn, :show, follow))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", follow: follow, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    follow = Accounts.get_follow!(id)
    {:ok, _follow} = Accounts.delete_follow(follow)

    conn
    |> put_flash(:info, "Follow deleted successfully.")
    |> redirect(to: follow_path(conn, :index))
  end
end
