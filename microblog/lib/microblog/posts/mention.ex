defmodule Microblog.Posts.Mention do
  use Ecto.Schema
  import Ecto.Changeset
  alias Microblog.Posts.Mention


  schema "mentions" do
	belongs_to :message, Microblog.Posts.Message
    belongs_to :user_id, Microblog.Accounts.User
    
	timestamps()
  end

  @doc false
  def changeset(%Mention{} = mention, attrs) do
    mention
    |> cast(attrs, [])
    |> validate_required([])
  end
end
