defmodule Microblog.Repo.Migrations.CreateHashtags do
  use Ecto.Migration

  def change do
    create table(:hashtags) do
      add :message_id, references(:messages, on_delete: :delete_all)
      add :keyword_id, references(:keywords, on_delete: :delete_all)

      timestamps()
    end

    create index(:hashtags, [:message_id])
    create index(:hashtags, [:keyword_id])
  end
end
