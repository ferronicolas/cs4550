defmodule Microblog.Posts.Hashtag do
  use Ecto.Schema
  import Ecto.Changeset
  alias Microblog.Posts.Hashtag


  schema "hashtags" do
#    belongs_to :message_id, Microblog.Posts.Message
#    belongs_to :keyword_id, Microblog.Posts.Keyword
	field :message_id, :integer
	field :keyword_id, :integer
	

    timestamps()
  end

  @doc false
  def changeset(%Hashtag{} = hashtag, attrs) do
    hashtag
    |> cast(attrs, [])
    |> validate_required([])
  end
end
