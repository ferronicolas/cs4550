defmodule Microblog.Posts.Message do
  use Ecto.Schema
  import Ecto.Changeset
  alias Microblog.Posts.Message


  schema "messages" do
    field :date, :date
    field :message, :string
    belongs_to :user, Microblog.Accounts.User

    timestamps()
  end

  @doc false
  def changeset(%Message{} = message, attrs) do
    message
    |> cast(attrs, [:message, :user_id])
    |> validate_required([:message, :user_id])
  end
end
