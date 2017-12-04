# Code gotten from the notes in class and is slightly modified

defmodule MicroblogWeb.SessionController do
  use MicroblogWeb, :controller

  alias Microblog.Accounts

  # TODO: Move to user.ex
  def update_tries(throttle, prev) do
    if throttle do
      prev + 1
    else
      1
    end
  end

  def throttle_attempts(user) do
    y2k = DateTime.from_naive!(~N[2000-01-01 00:00:00], "Etc/UTC")
    prv = DateTime.to_unix(user.pw_last_try || y2k)
    now = DateTime.to_unix(DateTime.utc_now())
    thr = (now - prv) < 3600

    if (thr && user.pw_tries > 5) do
      nil
    else
      changes = %{
          pw_tries: update_tries(thr, user.pw_tries),
          pw_last_try: DateTime.utc_now(),
      }
      IO.inspect(user)
      {:ok, user} = Ecto.Changeset.cast(user, changes, [:pw_tries, :pw_last_try])
      |> Microblog.Repo.update
      user
    end
  end


  # TODO: Move to user.ex
  def get_and_auth_user(email, password) do
    user = Accounts.get_user_by_email(email)
    user = throttle_attempts(user)
    case Comeonin.Argon2.check_pass(user, password) do
      {:ok, user} -> user
      _else       -> nil
    end
  end


  def login(conn, %{"email" => email, "password" => password}) do
	user = get_and_auth_user(email, password)
    # user = Accounts.get_user_by_email(email)

    if user do
      # cart = conn.assigns[:current_cart]
      # NuMart.Shop.update_cart(cart, %{user_id: user.id})

      conn
      |> put_session(:user_id, user.id)
      |> put_flash(:info, "Logged in as #{user.email}")
	  #|> redirect(to: user_path(conn, :show, user.id))
	  |> redirect(to: message_path(conn, :index))
   else
      conn
      |> put_session(:user_id, nil)
      |> put_flash(:error, "No such combination of email/password")
	  |> redirect(to: user_path(conn, :index))
    end
  end

  def logout(conn, _args) do
    conn
    |> put_session(:user_id, nil)
    |> put_flash(:info, "Logged out.")
    |> redirect(to: user_path(conn, :new))
  end
end
