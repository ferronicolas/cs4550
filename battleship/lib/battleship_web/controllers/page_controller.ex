defmodule BattleshipWeb.PageController do
  use BattleshipWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end

  def get_rand(conn, _params) do
    json_result = Poison.encode!(%{:random_number => Enum.random(0..10000000000)})
    conn 
    |> put_resp_content_type("application/json")
    |> send_resp(200, json_result)
  end

  def join_rand(conn, %{"rand" => rand}) do
    json_result = Poison.encode!(%{:result => :ok})
    conn 
    |> put_resp_content_type("application/json")
    |> send_resp(200, json_result)
  end

end
