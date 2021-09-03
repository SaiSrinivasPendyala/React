import React, { useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import "./App.css";
// import Axios from 'axios';

function SyllabusForm(fields) {
    const [title, setTitle] = useState(fields.syllabusData.title);
	const [description, setDescription] = useState(fields.syllabusData.description);
	const index = fields.index + 1;
	
    const onTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const onDescChange = (event) => {
        setDescription(event.target.value);
    }

    const itemData = {
        "title": title,
        "description": description
    };
    
    const saveItem = () => {
        const index = fields.index;
        fields.onSave(index, itemData);
    }

    const cancelForm = () =>
	{
		const index = fields.index;
		const syllabusItem = fields.syllabusData;
		fields.onCancel(index, syllabusItem);
	};

    return (
        <>
            <br></br><label>Syllabus-{index}</label><br></br>
            <input type="text" name="title" defaultValue={title} onChange={onTitleChange} placeholder="Enter syllabus title"></input><br></br>
            <input type="text" name="description" defaultValue={description} onChange={onDescChange} placeholder="Enter syllabus description"></input><br></br>
            <button onClick={saveItem}>Save</button>
            <button onClick={cancelForm}>Cancel</button><br></br><br></br>
        </>
    );
}

function SyllabusCard(fields) {

    const editForm = () => {
        const index = fields.index;
        fields.onEdit(index);
    };

    const deleteCard = () => {
        const index = fields.index;
        fields.onDelete(index);
    };
    return (
        <>
            <p>Syllabus-{fields.index + 1}</p>
            <p>{fields.syllabusData.title}</p>
            <p>{fields.syllabusData.description}</p>
            <button onClick={editForm}>Edit</button>
            <button onClick={deleteCard}>Delete</button><br></br><br></br>
        </>
    );
}

function App() {
    const title = "Welcome to Tecnics!";
    const [syllabusItems, addSyllabusItem] = useState([]);

    var event = Event;
    const addEmptyObject = (event) => {
        const syllabusItemsCopy = [...syllabusItems];
        syllabusItemsCopy.push(
            {
                title: "",
                description: "",
                editMode: true
            }
        );
        addSyllabusItem(syllabusItemsCopy);
    }

    const handleSaveButton = (index, itemData) => {
        const syllabusItemsCopy = [...syllabusItems];
        // syllabusItemsCopy[index] = data;
        // syllabusItemsCopy[index].editMode = false;
        const title = itemData.title;
        const description = itemData.description;
        syllabusItemsCopy[index] = {title:title, description:description, editMode: false, titleError:"", descError:""};
        if(title === "" || description === "") {
			syllabusItemsCopy[index].editMode = true;
			if(title === "") {
				syllabusItemsCopy[index].titleError = "Please enter a valid title!";
			}
			if(description === "") {
				syllabusItemsCopy[index].descriptionError = "Please enter a valid description!";
			}
		}
        addSyllabusItem(syllabusItemsCopy);
        console.log(syllabusItemsCopy);
    };

    const handleEditButton = (index) => {
        const syllabusItemsCopy = [...syllabusItems];
        syllabusItemsCopy[index].editMode = true;
        addSyllabusItem(syllabusItemsCopy);
    }

    const handleDeleteButton = (index) => {
        const syllabusItemsCopy = [...syllabusItems];
        const itemObject = syllabusItemsCopy[index];
        const title = itemObject.title;
        const description = itemObject.description;
        const options = {
            title: "Tecnics says...",
            message: "Are you sure you want to delete Syllabus-" + index + 1 + " with\nTitle: " + title +
            "\n and Description: " + description + "?",
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        syllabusItemsCopy.splice(index, 1);
                        addSyllabusItem(syllabusItemsCopy);
                        alert("Syllabus item deleted successfully!");
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        console.log("Chill Bro!");
                    }
                }
            ]
        };
        confirmAlert(options);
    }

    const handleCancelButton = (index, syllabusItem) => {
        const syllabusItemsCopy = [...syllabusItems];
        const isFormEmpty = (syllabusItemsCopy[index].title === "" || syllabusItemsCopy[index].description === "") ? true : false;
		if(isFormEmpty) {
            syllabusItemsCopy.splice(index, 1);
        }
        else {
            syllabusItemsCopy[index].editMode = false;
        }
        addSyllabusItem(syllabusItemsCopy);
    }

    return (
        <div>
            <h1>{title}</h1>
            <br></br><button onClick={addEmptyObject}>Add Syllabus</button><br></br>
            {syllabusItems.map((syllabusItem, index) => {
                if(syllabusItem.editMode === false) {
                    return (
                        <SyllabusCard key={index} syllabusData={syllabusItem} index={index} onEdit={handleEditButton} onDelete={handleDeleteButton}></SyllabusCard>
                    );
                }
                if(syllabusItem.editMode === true) {
                    return (
                        <SyllabusForm key={index} syllabusData={syllabusItem} index={index} onSave={handleSaveButton} onCancel={handleCancelButton}></SyllabusForm>
                    );
                }
            })}
        </div>
    );
}

export default App;

