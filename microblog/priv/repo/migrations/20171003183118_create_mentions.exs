defmodule Microblog.Repo.Migrations.CreateMentions do
  use Ecto.Migration

  def change do
    create table(:mentions) do
      add :message_id, references(:messages, on_delete: :delete_all), null: false
      add :user_id, references(:users, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:mentions, [:message_id])
    create index(:mentions, [:user_id])
  end
end
