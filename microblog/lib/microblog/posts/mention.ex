defmodule Microblog.Posts.Mention do
  use Ecto.Schema
  import Ecto.Changeset
  alias Microblog.Posts.Mention


  schema "mentions" do
    field :message, :id
    field :user_id, :id

    timestamps()
  end

  @doc false
  def changeset(%Mention{} = mention, attrs) do
    mention
    |> cast(attrs, [])
    |> validate_required([])
  end
end
