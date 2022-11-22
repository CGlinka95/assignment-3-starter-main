import { useState } from "react";

import Head from "next/head";

import Alert from "@mui/material/Alert";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Container from "@mui/material/Container";

import Grid from "@mui/material/Grid";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";

import OutlinedInput from "@mui/material/OutlinedInput";

import Paper from "@mui/material/Paper";

import SearchIcon from "@mui/icons-material/Search";

import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";

import NavBar from "../components/NavBar";
import Title from "../components/Title";

import FavouriteBooks from "../components/FavouriteBooks";

const FAVOURITE_BOOKS = [
  {
    id: 1,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    rating: 9,
  },
  {
    id: 2,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    rating: 8,
  },
];

export default function Home() {
  const [favouriteBooks, setFavouriteBooks] = useState(FAVOURITE_BOOKS);
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookRating, setBookRating] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddBook();
    loadAllBooks();
    handleFindBookTitle();
    handleFindBookAuthor();
  };

  const handleAddBook = () => {
    // If title is empty
    if (bookTitle.trim().length === 0) {
      setErrorMessage("Title is a required field, please enter a title.");
      return;
    }

    // If author is empty
    if (bookAuthor.trim().length === 0) {
      setErrorMessage("Author is a required field, please enter an author.");
      return;
    }

    // If rating is empty
    if (bookRating.trim().length === 0 || !isNumber(bookRating)) {
      setErrorMessage(
        "Rating is a required field and must be a number, please enter a rating."
      );
      return;
    }

    fetch(`http://localhost:3001/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: bookTitle,
        author: bookAuthor,
        rating: bookRating,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFavouriteBooks([...favouriteBooks, data]);
      });
    setBookTitle("");
    setBookAuthor("");
    setBookRating("");
    setErrorMessage("");
  };

  const isNumber = (value) => {
    return !isNaN(value);
  };

  const loadAllBooks = () => {
    fetch("http://localhost:3001/books", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFavouriteBooks(data);
      });
  };

  const handleFindBookTitle = () => {
    // Make a copy of the favouriteBooks list
    let findFavouriteBookList = [...favouriteBooks];
    // Check if the search is empty
    if (searchTitle.trim() !== "") {
      // Loop through the books and check if the title includes the search value
      findFavouriteBookList = findFavouriteBookList.filter((data) => {
        return data.title
          .toLowerCase()
          .includes(searchTitle.trim().toLowerCase());
      });
    }
    setFavouriteBooks(findFavouriteBookList);
    setSearchTitle("");
  };

  const handleFindBookAuthor = () => {
    // Make a copy of the favouriteBooks list
    let findFavouriteBookList = [...favouriteBooks];
    // Check if the search is empty
    if (searchAuthor.trim() !== "") {
      // Loop through the books and check if the author includes the search value
      findFavouriteBookList = findFavouriteBookList.filter((data) => {
        return data.author
          .toLowerCase()
          .includes(searchAuthor.trim().toLowerCase());
      });
    }
    setFavouriteBooks(findFavouriteBookList);
    setSearchAuthor("");
  };

  const handleDelete = (indexToDelete) => {
    const ITEMS_TO_REMOVE = 1;
    let newFavouriteBookList = [...favouriteBooks];
    newFavouriteBookList.splice(indexToDelete, ITEMS_TO_REMOVE);
    setFavouriteBooks;
  };

  return (
    <div>
      <Head>
        <title>Library App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar title={"Our Library"} />
      <main>
        <Container sx={{ paddingTop: "2rem" }} maxWidth="md">
          <form onSubmit={handleSubmit}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                marginBottom: "2rem",
              }}
            >
              <Title>Add a New Favourite</Title>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={5}>
                  <TextField
                    required
                    id="title"
                    name="title"
                    label="Book Title"
                    fullWidth
                    variant="standard"
                    value={bookTitle}
                    onChange={(event) => setBookTitle(event.target.value)}
                  />
                </Grid>
                <Grid item xs={10} sm={3}>
                  <TextField
                    required
                    id="author"
                    name="author"
                    label="Author"
                    fullWidth
                    variant="standard"
                    value={bookAuthor}
                    onChange={(event) => setBookAuthor(event.target.value)}
                  />
                </Grid>
                <Grid item xs={10} sm={1.5}>
                  <TextField
                    required
                    id="rating"
                    name="rating"
                    label="Rating"
                    fullWidth
                    variant="standard"
                    value={bookRating}
                    onChange={(event) => setBookRating(event.target.value)}
                  />
                </Grid>
                <Grid item xs={2} sm={2}>
                  <Button
                    variant="contained"
                    sx={{ mt: 1.5, ml: 1 }}
                    onClick={handleAddBook}
                  >
                    Add
                  </Button>
                </Grid>
                <Grid item xs={10}>
                  {errorMessage !== "" && (
                    <Alert severity="error">{errorMessage}</Alert>
                  )}
                </Grid>
              </Grid>
            </Paper>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Title>Favourite Books</Title>
              <Box
                sx={{
                  pt: 2,
                  pb: 2,
                }}
              >
                <Button variant="contained" onClick={loadAllBooks}>
                  Load All Favourited Books
                </Button>
              </Box>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <InputLabel htmlFor="search-field1">Search Title</InputLabel>
                  <OutlinedInput
                    id="search-field1"
                    name="searchTitle"
                    fullWidth
                    value={searchTitle}
                    onChange={(event) => setSearchTitle(event.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton onClick={handleFindBookTitle}>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel htmlFor="search-field2">Search Author</InputLabel>
                  <OutlinedInput
                    id="search-field2"
                    name="searchAuthor"
                    fullWidth
                    value={searchAuthor}
                    onChange={(event) => setSearchAuthor(event.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton onClick={handleFindBookAuthor}>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </Grid>
              </Grid>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Author</TableCell>
                    <TableCell>Rating</TableCell>
                  </TableRow>
                </TableHead>
                {favouriteBooks.map((book, index) => {
                  return (
                    <FavouriteBooks
                      key={index}
                      title={book.title}
                      author={book.author}
                      rating={book.rating}
                    />
                  );
                })}
                <FavouriteBooks />
              </Table>
            </Paper>
          </form>
        </Container>
      </main>
    </div>
  );
}
