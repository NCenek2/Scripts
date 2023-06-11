import React from "react";
import "./NotesApp.css";
import { FaTrash } from "react-icons/fa";

const NotesApp = () => {
  const [notesData, setNotesData] = React.useState([
    {
      id: new Date().getTime(),
      title: "First Note",
      noteContent: "",
    },
  ]);

  const [inputData, setInputData] = React.useState({
    id: new Date().getTime(),
    titleInput: "First Note",
    textAreaInput: "",
  });

  const titleInput = React.useRef(null);
  const focusTitle = () => titleInput.current.focus();
  const textInput = React.useRef(null);
  const focusText = () => textInput.current.focus();

  const handleAddNote = () => {
    const newID = new Date().getTime();
    setNotesData((prevData) => {
      const filteredData = prevData.filter(
        (note) => note.title != "" || note.noteContent != ""
      );
      return [
        {
          id: newID,
          title: "",
          noteContent: "",
        },
        ...filteredData,
      ];
    });
    setInputData((prevInputData) => {
      return {
        ...prevInputData,
        id: newID,
        titleInput: "",
        textAreaInput: "",
      };
    });
    focusTitle();
  };
  const handleNoteClick = (event) => {
    const { id } = event.target;
    const withFilteredNote = notesData
      .filter((note) => note.id == id)
      .map((note) => {
        setInputData((prevData) => {
          return {
            ...prevData,
            id: note.id,
            titleInput: note.title,
            textAreaInput: note.noteContent,
          };
        });
        return note;
      })[0];
    const withoutFilteredNote = notesData
      .filter((note) => note.id != id)
      .filter((note) => note.title != "" || note.noteContent != "");
    setNotesData([withFilteredNote, ...withoutFilteredNote]);

    focusText();
  };

  const handleTitleInput = (event) => {
    if (notesData.length < 1) {
      handleAddNote();
      return;
    }

    const { value } = event.target;
    const filteredData = notesData.filter((note) => note.id == inputData.id);
    const filteredDataID = filteredData[0].id;
    if (filteredData.length > 0) {
      setNotesData((prevData) =>
        prevData.map((prevNote) => {
          if (prevNote.id == filteredDataID) {
            return {
              ...prevNote,
              title: value,
            };
          }
          return { ...prevNote };
        })
      );
    }

    setInputData((prevData) => {
      return {
        ...prevData,
        titleInput: value,
      };
    });
  };

  const handleTextAreaInput = (event) => {
    if (notesData.length < 1) {
      handleAddNote();
      return;
    }

    const { value } = event.target;
    const filteredData = notesData.filter((note) => note.id == inputData.id);
    const filteredDataID = filteredData[0].id;
    if (filteredData.length > 0) {
      setNotesData((prevData) =>
        prevData.map((prevNote) => {
          if (prevNote.id == filteredDataID) {
            return {
              ...prevNote,
              noteContent: value,
            };
          }
          return { ...prevNote };
        })
      );
    }
    setInputData((prevData) => {
      return {
        ...prevData,
        textAreaInput: value,
      };
    });
  };

  const handleDelete = (event) => {
    const { id } = event.target;
    const filteringID = id - 1;
    setNotesData((prevData) => {
      const filteredData = prevData
        .filter((note) => note.id != filteringID)
        .filter((note) => note.title != "" || note.noteContent != "");
      if (filteredData.length != 0) {
        setInputData({
          id: filteredData[0].id,
          titleInput: filteredData[0].title,
          textAreaInput: filteredData[0].noteContent,
        });
        focusText();
      } else {
        setInputData({
          id: "",
          titleInput: "",
          textAreaInput: "",
        });
        focusTitle();
      }

      return filteredData;
    });
  };

  return (
    <div className="notes-body">
      <main className="notes-main">
        <header className="notes-header">
          <h1 className="notes-title">My Notes</h1>
          <button
            className="btn-sm btn-primary add-note"
            onClick={handleAddNote}
          >
            Add Note
          </button>
        </header>
        <section className="notes-section">
          <div className="notes-input-container">
            <label for="note-title">Title:</label>
            <input
              id="note-title"
              placeholder="New Note"
              className="note-title-input"
              value={inputData.titleInput}
              onChange={(event) => handleTitleInput(event)}
              ref={titleInput}
            ></input>
          </div>
          <textarea
            placeholder="Write Something!"
            className="note-textarea"
            value={inputData.textAreaInput}
            onChange={(event) => handleTextAreaInput(event)}
            ref={textInput}
          ></textarea>
        </section>
        <aside className="notes-aside">
          <h2 className="aside-notes-title">Notes</h2>
          {notesData.length ? (
            notesData.map((note) => {
              return (
                <div key={note.id} className="note-container">
                  <h3
                    id={note.id}
                    className="note-title"
                    onClick={(event) => handleNoteClick(event)}
                  >
                    {note.title.length > 0 ? note.title : note.noteContent}
                  </h3>
                  <div
                    id={note.id + 1}
                    onClick={(event) => handleDelete(event)}
                    className="trash-div"
                  >
                    <FaTrash className="trash-icon" />
                  </div>
                </div>
              );
            })
          ) : (
            <h3 className="no-notes-text">No Notes</h3>
          )}
        </aside>
      </main>
    </div>
  );
};

export default NotesApp;
