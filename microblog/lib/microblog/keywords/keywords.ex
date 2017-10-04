defmodule Microblog.Keywords do
  @moduledoc """
  The Keywords context.
  """

  import Ecto.Query, warn: false
  alias Microblog.Repo

  alias Microblog.Keywords.Keyword

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

  alias Microblog.Keywords.Hashtag

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
