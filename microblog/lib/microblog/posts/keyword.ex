defmodule Microblog.Posts.Keyword do
  use Ecto.Schema
  import Ecto.Changeset
  alias Microblog.Posts.Keyword


  schema "keywords" do
    field :keyword, :string

    timestamps()
  end

  @doc false
  def changeset(%Keyword{} = keyword, attrs) do
    keyword
    |> cast(attrs, [:keyword])
    |> validate_required([:keyword])
  end
end
