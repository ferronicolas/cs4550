defmodule Microblog.Posts do
  @moduledoc """
  The Posts context.
  """

  import Ecto.Query, warn: false
  alias Microblog.Repo

  alias Microblog.Posts.Message

  @doc """
  Returns the list of messages.

  ## Examples

      iex> list_messages()
      [%Message{}, ...]

  """
  def list_messages do
    Repo.all(Message)
  end

  @doc """
  Gets a single message.

  Raises `Ecto.NoResultsError` if the Message does not exist.

  ## Examples

      iex> get_message!(123)
      %Message{}

      iex> get_message!(456)
      ** (Ecto.NoResultsError)

  """
  def get_message!(id), do: Repo.get!(Message, id)


  def get_messages_by_user_id(user_id) do
	# Repo.all_by!(Message, user_id: user_id)
  	query = from p in Message, where: p.user_id == ^user_id, order_by: [desc: p.inserted_at]
	Repo.all(query)
  end

  def get_messages_by_hashtag(keyword) do
	query1 = from p in Microblog.Posts.Keyword, where: p.keyword == ^keyword
	result = Repo.all(query1)
	IO.puts("HERE!!!")
	IO.inspect(result)
	result = Enum.map(result, fn x -> x.id end)
	query2 = from p in Microblog.Posts.Hashtag, where: p.keyword_id in ^result
	result2 = Repo.all(query2)	
	IO.puts("HERE!!!")
	IO.inspect(result2)
	result2 = Enum.map(result2, fn x -> x.message_id end)
	query = from m in Message, where: m.id in ^result2, order_by: [desc: m.inserted_at]
    Repo.all(query)
  end

  def get_my_friends_posts(user_id) do
	query1 = from p in Microblog.Accounts.Follow, where: p.user_following_id == ^user_id
	result = Repo.all(query1)
	result = Enum.map(result, fn x -> x.user_being_followed_id end)
	query = from m in Message, where: m.user_id in ^result, order_by: [desc: m.inserted_at]
    Repo.all(query)
  end

  @doc """
  Creates a message.

  ## Examples

      iex> create_message(%{field: value})
      {:ok, %Message{}}

      iex> create_message(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_message(attrs \\ %{}) do
    message = %Message{}
	today = Ecto.Date.utc()
	message = Map.put(message, :date, today)
	IO.puts("ACA")
	IO.inspect(message)
	message
    |> Message.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a message.

  ## Examples

      iex> update_message(message, %{field: new_value})
      {:ok, %Message{}}

      iex> update_message(message, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_message(%Message{} = message, attrs) do
    message
    |> Message.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Message.

  ## Examples

      iex> delete_message(message)
      {:ok, %Message{}}

      iex> delete_message(message)
      {:error, %Ecto.Changeset{}}

  """
  def delete_message(%Message{} = message) do
    Repo.delete(message)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking message changes.

  ## Examples

      iex> change_message(message)
      %Ecto.Changeset{source: %Message{}}

  """
  def change_message(%Message{} = message) do
    Message.changeset(message, %{})
  end

  alias Microblog.Posts.Mention

  @doc """
  Returns the list of mentions.

  ## Examples

      iex> list_mentions()
      [%Mention{}, ...]

  """
  def list_mentions do
    Repo.all(Mention)
  end

  @doc """
  Gets a single mention.

  Raises `Ecto.NoResultsError` if the Mention does not exist.

  ## Examples

      iex> get_mention!(123)
      %Mention{}

      iex> get_mention!(456)
      ** (Ecto.NoResultsError)

  """
  def get_mention!(id), do: Repo.get!(Mention, id)

  @doc """
  Creates a mention.

  ## Examples

      iex> create_mention(%{field: value})
      {:ok, %Mention{}}

      iex> create_mention(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_mention(attrs \\ %{}) do
    %Mention{}
    |> Mention.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a mention.

  ## Examples

      iex> update_mention(mention, %{field: new_value})
      {:ok, %Mention{}}

      iex> update_mention(mention, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_mention(%Mention{} = mention, attrs) do
    mention
    |> Mention.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Mention.

  ## Examples

      iex> delete_mention(mention)
      {:ok, %Mention{}}

      iex> delete_mention(mention)
      {:error, %Ecto.Changeset{}}

  """
  def delete_mention(%Mention{} = mention) do
    Repo.delete(mention)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking mention changes.

  ## Examples

      iex> change_mention(mention)
      %Ecto.Changeset{source: %Mention{}}

  """
  def change_mention(%Mention{} = mention) do
    Mention.changeset(mention, %{})
  end

  alias Microblog.Posts.Keyword

  @doc """
  Returns the list of keywords.

  ## Examples

      iex> list_keywords()
      [%Keyword{}, ...]

  """
  def list_keywords do
    Repo.all(Keyword)
  end

  @doc """
  Gets a single keyword.

  Raises `Ecto.NoResultsError` if the Keyword does not exist.

  ## Examples

      iex> get_keyword!(123)
      %Keyword{}

      iex> get_keyword!(456)
      ** (Ecto.NoResultsError)

  """
  def get_keyword!(id), do: Repo.get!(Keyword, id)

  def get_keyword_by_string(string) do
	query = from p in Keyword, where: p.keyword == ^string
	Repo.all(query)
	end


  @doc """
  Creates a keyword.

  ## Examples

      iex> create_keyword(%{field: value})
      {:ok, %Keyword{}}

      iex> create_keyword(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_keyword(attrs \\ %{}) do
    %Keyword{}
    |> Keyword.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a keyword.

  ## Examples

      iex> update_keyword(keyword, %{field: new_value})
      {:ok, %Keyword{}}

      iex> update_keyword(keyword, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_keyword(%Keyword{} = keyword, attrs) do
    keyword
    |> Keyword.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Keyword.

  ## Examples

      iex> delete_keyword(keyword)
      {:ok, %Keyword{}}

      iex> delete_keyword(keyword)
      {:error, %Ecto.Changeset{}}

  """
  def delete_keyword(%Keyword{} = keyword) do
    Repo.delete(keyword)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking keyword changes.

  ## Examples

      iex> change_keyword(keyword)
      %Ecto.Changeset{source: %Keyword{}}

  """
  def change_keyword(%Keyword{} = keyword) do
    Keyword.changeset(keyword, %{})
  end

  alias Microblog.Posts.Hashtag

  @doc """
  Returns the list of hashtags.

  ## Examples

      iex> list_hashtags()
      [%Hashtag{}, ...]

  """
  def list_hashtags do
    Repo.all(Hashtag)
  end

  @doc """
  Gets a single hashtag.

  Raises `Ecto.NoResultsError` if the Hashtag does not exist.

  ## Examples

      iex> get_hashtag!(123)
      %Hashtag{}

      iex> get_hashtag!(456)
      ** (Ecto.NoResultsError)

  """
  def get_hashtag!(id), do: Repo.get!(Hashtag, id)

  @doc """
  Creates a hashtag.

  ## Examples

      iex> create_hashtag(%{field: value})
      {:ok, %Hashtag{}}

      iex> create_hashtag(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_hashtag(attrs \\ %{}) do
	%Hashtag{}
    |> Hashtag.changeset(attrs)
    |> Repo.insert()
  end

  def create_hashtag_mio(hashtag) do
    hashtag
	|> Repo.insert()
  end

  @doc """
  Updates a hashtag.

  ## Examples

      iex> update_hashtag(hashtag, %{field: new_value})
      {:ok, %Hashtag{}}

      iex> update_hashtag(hashtag, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_hashtag(%Hashtag{} = hashtag, attrs) do
    hashtag
    |> Hashtag.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Hashtag.

  ## Examples

      iex> delete_hashtag(hashtag)
      {:ok, %Hashtag{}}

      iex> delete_hashtag(hashtag)
      {:error, %Ecto.Changeset{}}

  """
  def delete_hashtag(%Hashtag{} = hashtag) do
    Repo.delete(hashtag)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking hashtag changes.

  ## Examples

      iex> change_hashtag(hashtag)
      %Ecto.Changeset{source: %Hashtag{}}

  """
  def change_hashtag(%Hashtag{} = hashtag) do
    Hashtag.changeset(hashtag, %{})
  end
end
