defmodule Microblog.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Microblog.Accounts.User
  alias Microblog.Posts.Message

  schema "users" do
    field :email, :string
    field :username, :string
    has_many :messages, Message
#	has_many :follows, Microblog.Accounts.Follows
 	
	field :password_hash, :string
	field :pw_tries, :integer
	field :pw_last_try, :utc_datetime

	field :password, :string, virtual: true
	field :password_confirmation, :string, virtual: true

    timestamps()
  end

  @doc false
  def changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:email, :username, :password, :password_confirmation])
	|> validate_confirmation(:password)
	|> validate_password(:password)
	|> put_pass_hash()
    |> validate_required([:email, :username])
  end

  # From notes
  def validate_password(changeset, field, options \\ []) do
	validate_change(changeset, field, fn _, password ->
		case valid_password?(password) do
			{:ok, _} -> []
			{:error, msg} -> [{field, options[:message] || msg}]
		end
     end)
  end

  # From notes
  def put_pass_hash(%Ecto.Changeset{valid?: true, changes: %{password: password}} = changeset) do
	change(changeset, Comeonin.Argon2.add_hash(password))
  end

  def put_pass_hash(changeset), do: changeset

  def valid_password?(password) when byte_size(password) > 7 do
	{:ok, password}
  end

  def valid_password?(_), do: {:error, "The password is too short"}

end
