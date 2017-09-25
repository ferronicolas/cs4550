defmodule Microblog.Repo.Migrations.CreateMessages do
  use Ecto.Migration

  def change do
    create table(:messages) do
      add :message, :text
      add :date, :date
      add :userId, :integer

      timestamps()
    end

  end
end
