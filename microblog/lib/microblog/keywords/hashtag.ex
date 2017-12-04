defmodule Microblog.Keywords.Hashtag do
  use Ecto.Schema
  import Ecto.Changeset
  alias Microblog.Keywords.Hashtag


  schema "hashtags" do
    belongs_to :message, Microblog.Posts.Message
    belongs_to :keyword, Microblog.Posts.Keyword

    timestamps()
  end

  @doc false
  def changeset(%Hashtag{} = hashtag, attrs) do
    hashtag
    |> cast(attrs, [])
    |> validate_required([])
  end
end
