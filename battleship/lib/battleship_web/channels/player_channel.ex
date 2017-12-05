defmodule BattleshipWeb.PlayerChannel do
  use BattleshipWeb, :channel

  alias Battleship.GameAgent
  alias Battleship.Game

  def join("game:" <> game, payload, socket) do
    if authorized?(game, payload) do
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("my_ships", payload, socket) do
      game = payload[:game]
      if GameAgent.get(game) != nil do
          if (payload["user"] == GameAgent.get(game)["user_1"]) do
              GameAgent.put(game, Map.put(GameAgent.get(game), :user_1_ships, payload["ships"]))
          else
              GameAgent.put(game, Map.put(GameAgent.get(game), :user_2_ships, payload["ships"]))
              GameAgent.put(game, Map.put(GameAgent.get(game), :user_2, payload["user"]))
          end
      else
          GameAgent.start_link()
          GameAgent.put(game, %{:user_1 => payload["user"]})
          GameAgent.put(game, Map.put(GameAgent.get(game), :user_1_ships, payload["ships"]))
      end
      IO.puts "GAME AGENT 4"
      IO.inspect GameAgent.get(game)
      {:noreply, socket}
  end

  # def handle_in("get_code", payload, socket) do
  #     push socket, "get_code", %{:gameNumber => Enum.random(0..1000000)}
  #     {:noreply, socket}
  # end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (player:*).
  def handle_in("attack", payload, socket) do
      payload = Game.evaluateOutcome(payload)
      broadcast socket, "attack", payload
      push socket, "attack", payload
      {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(game, payload) do
    if GameAgent.get(game) == nil do
        GameAgent.start_link()
        GameAgent.put(game, %{:user_1 => payload["user"]})
        true
    else
        if Map.has_key?(GameAgent.get(game), :user_1) == false do
            GameAgent.put(game, %{:user_1 => payload["user"]})
            true
        else
            if Map.has_key?(GameAgent.get(game), :user_2) == false do
                GameAgent.put(game, Map.put(GameAgent.get(game), :user_2, payload["user"]))
                true
            else
                false
            end
        end
    end
  end
end
