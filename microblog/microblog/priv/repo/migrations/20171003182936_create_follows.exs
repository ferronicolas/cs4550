defmodule Microblog.Repo.Migrations.CreateFollows do
  use Ecto.Migration

  def change do
    create table(:follows) do
      add :user_following_id, references(:users, on_delete: :delete_all), null: false
      add :user_being_followed_id, references(:users, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:follows, [:user_following_id])
    create index(:follows, [:user_being_followed_id])
  end
end
