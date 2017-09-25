defmodule Microblog.SocialMedia.Message do
  use Ecto.Schema
  import Ecto.Changeset
  alias Microblog.SocialMedia.Message


  schema "messages" do
    field :date, :date
    field :message, :string
    field :userId, :integer

    timestamps()
  end

  @doc false
  def changeset(%Message{} = message, attrs) do
    message
    |> cast(attrs, [:message, :date, :userId])
    |> validate_required([:message, :date, :userId])
  end
end
