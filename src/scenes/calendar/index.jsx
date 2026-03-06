import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const queryClient = useQueryClient();

  // Dialog States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEventTitle, setNewEventTitle] = useState("");

  const [showUndo, setShowUndo] = useState(false);
  const [recentlyDeletedEvent, setRecentlyDeletedEvent] = useState(null);

  // 1. Fetch Events from JSON Server
  const { data: events = [] } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5000/events");
      return response.json();
    },
  });

  // 2. Mutation to Add Event
  const addMutation = useMutation({
    mutationFn: async (newEvent) => {
      await fetch("http://localhost:5000/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
      setIsAddOpen(false);
      setNewEventTitle("");
    },
  });

  // 3. Mutation to Delete Event
  const deleteMutation = useMutation({
    mutationFn: async (eventId) => {
      await fetch(`http://localhost:5000/events/${eventId}`, {
        method: "DELETE",
      });
    },
    onMutate: async (eventId) => {
      await queryClient.cancelQueries({ queryKey: ["events"] });
      const previousEvents = queryClient.getQueryData(["events"]);

      const eventToSave = previousEvents?.find((e) => e.id === eventId);
      if (eventToSave) {
        setRecentlyDeletedEvent({
          id: eventToSave.id,
          title: eventToSave.title,
          start: eventToSave.start,
          end: eventToSave.end,
          allDay: eventToSave.allDay,
        });
      }

      queryClient.setQueryData(["events"], (old) =>
        old?.filter((event) => event.id !== eventId),
      );

      return { previousEvents };
    },
    onSuccess: () => {
      console.log("onSettled removed - new code is running");
      setTimeout(() => setShowUndo(true), 100);
      setIsDeleteOpen(false);
      setShowUndo(true);
    },
    onError: (err, eventId, context) => {
      // Rollback on failure
      queryClient.setQueryData(["events"], context.previousEvents);
    },
    // ✅ onSettled removed — no refetch that would disrupt snackbar state
  });

  //Mutation to update events
  const updateMutation = useMutation({
    mutationFn: async (updatedEvent) => {
      // We use PATCH to only update the fields that changed (like 'start' and 'end')
      await fetch(`http://localhost:5000/events/${updatedEvent.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEvent),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
    },
  });

  const handleDateClick = (selected) => {
    setSelectedDate(selected);
    setIsAddOpen(true);
  };

  const handleAddSubmit = () => {
    if (!newEventTitle.trim()) return; // Don't add empty titles

    addMutation.mutate({
      id: `${selectedDate.dateStr}-${Date.now()}`, // Using Date.now() for unique IDs
      title: newEventTitle,
      start: selectedDate.startStr,
      end: selectedDate.endStr,
      allDay: selectedDate.allDay,
    });
  };

  const handleEventClick = (selected) => {
    setSelectedEvent(selected.event);
    setIsDeleteOpen(true);
  };

  const handleEventDrop = (info) => {
    const { event } = info;

    updateMutation.mutate({
      id: event.id,
      start: event.startStr,
      end: event.endStr,
      allDay: event.allDay,
    });
  };
  const handleEventResize = (info) => {
    const { event } = info;

    // Send the new end date to your JSON Server
    updateMutation.mutate({
      id: event.id,
      start: event.startStr,
      end: event.endStr, // This now reflects the stretched end date
      allDay: event.allDay,
    });
  };
  const handleUndo = () => {
    if (recentlyDeletedEvent) {
      addMutation.mutate(recentlyDeletedEvent);
      setShowUndo(false);
      setRecentlyDeletedEvent(null);
    }
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowUndo(false);
  };
  return (
    <Box m="20px">
      <Header title="CALENDAR" subtitle="Full Calendar Interactive Page" />

      <Box display="flex" justifyContent="space-between">
        {/* SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {events.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            events={events} // Controlled by TanStack Query
            eventDrop={handleEventDrop} // When moving an event to a new day
            eventResize={handleEventResize}
          />
        </Box>
      </Box>

      {/* ADD EVENT DIALOG */}
      <Dialog open={isAddOpen} onClose={() => setIsAddOpen(false)}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // Only call submit if validation passes
            if (newEventTitle.trim().length >= 3) {
              handleAddSubmit();
            }
          }}
        >
          <DialogTitle>Add New Event</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Event Title (min. 3 characters)"
              fullWidth
              variant="standard"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              // Visual feedback: show error state if user types something too short
              error={
                newEventTitle.length > 0 && newEventTitle.trim().length < 3
              }
              helperText={
                newEventTitle.length > 0 && newEventTitle.trim().length < 3
                  ? "Title must be at least 3 characters (excluding spaces)."
                  : ""
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsAddOpen(false)}>Cancel</Button>
            <Button
              type="submit"
              color="secondary"
              // Disabled if pending OR if trimmed text is too short
              disabled={
                addMutation.isPending || newEventTitle.trim().length < 3
              }
            >
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* DELETE DIALOG */}
      <Dialog open={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
        <DialogTitle>Delete Event?</DialogTitle>
        <DialogContent>
          Are you sure you want to delete "{selectedEvent?.title}"?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
          <Button
            onClick={() => deleteMutation.mutate(selectedEvent.id)}
            color="error"
            disabled={deleteMutation.isPending}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={showUndo}
        autoHideDuration={5000} // This is 5 seconds
        onClose={handleSnackbarClose} // Use the new handler
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="info"
          variant="filled" // Makes it more visible
          action={
            <Button color="inherit" size="small" onClick={handleUndo}>
              UNDO
            </Button>
          }
          sx={{ width: "100%" }}
        >
          Event deleted.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Calendar;
