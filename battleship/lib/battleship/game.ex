defmodule Battleship.Game do

	alias Battleship.GameAgent

	def evaluateOutcome(payload) do
		if GameAgent.get(payload["game"])[:user_1] == payload["user"] do
			ships = GameAgent.get(payload["game"])[:user_1_ships]
		else
			ships = GameAgent.get(payload["game"])[:user_2_ships]
		end
		payload = Map.put(payload, :hit_ship, :true)
	end
  
end