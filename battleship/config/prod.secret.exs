use Mix.Config

# In this file, we keep production configuration that
# you'll likely want to automate and keep away from
# your version control system.
#
# You should document the content of this
# file or create a script for recreating it, since it's
# kept out of version control and might be hard to recover
# or recreate for your teammates (or yourself later on).
config :battleship, BattleshipWeb.Endpoint,
  secret_key_base: "mZGEIPWQIsXk+i87gI4fMNiBUgIC+8VVHPqs6LSUYUh2fXgvlssv0UJOil15pfV6"

# Configure your database
config :battleship, Battleship.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "battleship_prod",
  pool_size: 15
