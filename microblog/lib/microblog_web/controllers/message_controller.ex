defmodule MicroblogWeb.MessageController do
  use MicroblogWeb, :controller

  alias Microblog.Posts
  alias Microblog.Posts.Message

  def index(conn, _params) do
    messages = Posts.list_messages()
    render(conn, "index.html", messages: messages)
  end

  def new(conn, _params) do
    changeset = Posts.change_message(%Message{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"message" => message_params}) do
    case Posts.create_message(message_params) do
      {:ok, message} ->
        if (message_params["message"] =~ "#") do
			array = String.split(message_params["message"], " ")
			for element <- array do
				if String.length(element) > 1 and String.at(element, 0) == "#" do
					string = String.slice(element, 1..-1)
					# Check if keyword already in db and retrieve id in case it is
					keywordInDb = Posts.get_keyword_by_string(string)
					if length(keywordInDb) == 0 do
						case Posts.create_keyword(%{"keyword" => string}) do
						{:ok, keyword} ->
							keywordInDb = keyword.id
						end
					else 
						IO.inspect(keywordInDb)
						IO.inspect(Enum.at(keywordInDb, 0))
						keywordInDb = Enum.at(keywordInDb, 0).id
					end
					# Add association keyword - message
					Posts.create_hashtag_mio(%Microblog.Posts.Hashtag{:keyword_id => keywordInDb, :message_id => message.id})
				end
			end
		end 
		conn
        |> put_flash(:info, "Message created successfully.")
        |> redirect(to: user_path(conn, :show, message.user_id))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    message = Posts.get_message!(id)
    render(conn, "show.html", message: message)
  end

  def search(conn, %{"keyword" => keyword}) do
	messages = Posts.get_messages_by_hashtag(keyword)
	render(conn, "keywords_index.html", keyword: keyword)
  end

  def edit(conn, %{"id" => id}) do
    message = Posts.get_message!(id)
    changeset = Posts.change_message(message)
    render(conn, "edit.html", message: message, changeset: changeset)
  end

  def update(conn, %{"id" => id, "message" => message_params}) do
    message = Posts.get_message!(id)

    case Posts.update_message(message, message_params) do
      {:ok, message} ->
        conn
        |> put_flash(:info, "Message updated successfully.")
        |> redirect(to: message_path(conn, :show, message))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", message: message, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    message = Posts.get_message!(id)
    {:ok, _message} = Posts.delete_message(message)

    conn
    |> put_flash(:info, "Message deleted successfully.")
    |> redirect(to: message_path(conn, :index))
  end
end
