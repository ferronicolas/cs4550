defmodule Microblog.Keywords.Hashtag do
  use Ecto.Schema
  import Ecto.Changeset
  alias Microblog.Keywords.Hashtag


  schema "hashtags" do
    field :message, :id
    field :keyword, :id

    timestamps()
  end

  @doc false
  def changeset(%Hashtag{} = hashtag, attrs) do
    hashtag
    |> cast(attrs, [])
    |> validate_required([])
  end
end
