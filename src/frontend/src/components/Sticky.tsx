import React, { useEffect, useState } from 'react';
import { Delete, Save, Edit } from "@mui/icons-material";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  IconButton,
  Alert,
} from "@mui/material";
import {
  getAllStickyNotes,
  createStickyNote,
  updateStickyNote,
  deleteStickyNote
} from '../services/sticky.service';
import { StickyNote } from '../types/sticky';

const Sticky: React.FC = () => {
  const [notes, setNotes] = useState<StickyNote[]>([]);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string>('');
  const [editDescription, setEditDescription] = useState<string>('');
  const [newTitle, setNewTitle] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchStickyNotes = async () => {
      try {
        const data = await getAllStickyNotes();
        setNotes(data);
      } catch (error) {
        setErrorMessage('Failed to fetch Sticky Notes. Please try again later.');
      }
    };

    fetchStickyNotes();
  }, []);

  const handleCreateNote = async () => {
    if (newTitle && newDescription) {
      const newNote = await createStickyNote({ title: newTitle, description: newDescription });
      setNotes([...notes, newNote]);
      setNewTitle('');
      setNewDescription('');
    }
  };

  const handleEditNote = (note: StickyNote) => {
    setEditingNoteId(note._id);
    setEditTitle(note.title);
    setEditDescription(note.description);
  };

  const handleUpdateNote = async (id: string) => {
    if (editTitle && editDescription) {
      const updatedNote = await updateStickyNote(id, { title: editTitle, description: editDescription });
      setNotes(notes.map(note => (note._id === id ? updatedNote : note)));
      setEditingNoteId(null);
      setEditTitle('');
      setEditDescription('');
    }
  };

  const handleDeleteNote = async (id: string) => {
    await deleteStickyNote(id);
    setNotes(notes.filter(note => note._id !== id));
  };

  return (
    <Container maxWidth="lg">
      <CssBaseline />
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Display error message if fetching notes fails */}
        {errorMessage && (
          <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
            {errorMessage}
          </Alert>
        )}

        {/* Display message if no sticky notes are found */}
        {!errorMessage && notes.length === 0 && (
          <Alert severity="success" sx={{ mt: 2, width: "100%" }}>
            No sticky notes found. Create a new sticky note to get started!
          </Alert>
        )}

        <Grid container spacing={3} sx={{ mt: 4 }}>
          {notes.map(note => (
            <Grid item key={note._id} xs={12} sm={6} md={4} lg={3}>
              <Paper elevation={3} sx={{ padding: 2, position: 'relative', height: '100%' }}>
                <Box
                  component="form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdateNote(note._id);
                  }}
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      mb: 1,
                    }}
                  >
                    <IconButton
                      color="success"
                      onClick={() => {
                        if (editingNoteId === note._id) {
                          handleUpdateNote(note._id);
                        } else {
                          handleEditNote(note);
                        }
                      }}
                    >
                      {editingNoteId === note._id ? <Save /> : <Edit />}
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteNote(note._id)}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id={`edit-title-${note._id}`}
                    label="Title"
                    name="edit-title"
                    value={editingNoteId === note._id ? editTitle : note.title}
                    onChange={(e) => setEditTitle(e.target.value)}
                    disabled={editingNoteId !== note._id}
                    sx={{ flexGrow: 1 }}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id={`edit-description-${note._id}`}
                    label="Description"
                    name="edit-description"
                    multiline
                    rows={4}
                    value={editingNoteId === note._id ? editDescription : note.description}
                    onChange={(e) => setEditDescription(e.target.value)}
                    disabled={editingNoteId !== note._id}
                    sx={{ flexGrow: 2 }}
                  />
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Box
          component="form"
          sx={{
            mt: 6,
            width: { xs: "100%", sm: "75%", md: "50%" }, // Responsive width
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          noValidate
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Create New Sticky Note
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="description"
            label="Description"
            name="description"
            multiline
            rows={4}
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleCreateNote}
          >
            Create Note
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Sticky;
