defmodule Microblog.SocialMedia.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Microblog.SocialMedia.User


  schema "users" do
    field :email, :string
    field :username, :string

    timestamps()
  end

  @doc false
  def changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:email, :username])
    |> validate_required([:email, :username])
  end
end
