# Code gotten from the notes in class and is slightly modified

defmodule MicroblogWeb.SessionController do
  use MicroblogWeb, :controller

  alias Microblog.Accounts

  def login(conn, %{"email" => email}) do
    user = Accounts.get_user_by_email(email)

    if user do
      # cart = conn.assigns[:current_cart]
      # NuMart.Shop.update_cart(cart, %{user_id: user.id})

      conn
      |> put_session(:user_id, user.id)
      |> put_flash(:info, "Logged in as #{user.email}")
 	  |> redirect(to: user_path(conn, :show, user.id))
    else
      conn
      |> put_session(:user_id, nil)
      |> put_flash(:error, "No such user")
	  |> redirect(to: user_path(conn, :index))
    end
  end

  def logout(conn, _args) do
    conn
    |> put_session(:user_id, nil)
    |> put_flash(:info, "Logged out.")
    |> redirect(to: "/users")
  end
end
