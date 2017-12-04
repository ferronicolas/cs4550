# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Microblog.Repo.insert!(%Microblog.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.


alias Microblog.Repo
alias Microblog.Accounts.User

Repo.delete_all(User)
Repo.insert!(%User{email: "hola@gmail.com", username: "Hola", password_hash: "kasfasf"})
Repo.insert!(%User{email: "hola2@gmail.com", username: "Hola2", password_hash: "asfasf"})
Repo.insert!(%User{email: "hola3@gmail.com", username: "Hola3", password_hash: "asfasasff"})
Repo.insert!(%User{email: "hola4@gmail.com", username: "Hola4", password_hash: "2sdfd"})
Repo.insert!(%User{email: "hola5@gmail.com", username: "Hola5", password_hash: "aksnflkas"})
