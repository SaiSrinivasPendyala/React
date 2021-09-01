import React, { useState } from 'react';

function SyllabusForm(fields) {
    const title = fields.syllabusData.title;
	const description = fields.syllabusData.description;
	const index = fields.number + 1;
	const data = {title:title, description:description};
    // const submit = () => {

    // }
    return (
        <>
            <br></br><label>Syllabus-{index}</label><br></br>
            <input type="text" name="title" defaultValue={title}></input><br></br>
            <input type="text" name="description" defaultValue={description}></input><br></br>
            <button onClick={saveSyllabusItem}>Save</button>
            <button>Cancel</button><br></br><br></br>
        </>
    );
}

function SyllabusCard(fields) {
    return (
        <>
            <h1>Syllabus-{fields.number + 1}</h1>
            <p>{fields.syllabusData.title}</p>
            <p>{fields.syllabusData.description}</p>
            <button>Edit</button>
            <button>Delete</button><br></br><br></br>
        </>
    );
}

function saveSyllabusItem(fields, index) {
    fields.syllabusData.editMode = false;

}

    

function App() {
    const title = "Welcome to Oxford!";
    const [syllabusItems, addSyllabusItems] = useState([]);

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
        addSyllabusItems(syllabusItemsCopy);
    }

    // const saveSyllabusItem = (event) => {
    //     console.log("Hello!");
    // }
    return (
        <div>
            <h1>{title}</h1>
            <br></br><button onClick={addEmptyObject}>Add Syllabus</button><br></br>
            {syllabusItems.map((syllabusItem, index) => {
                if(syllabusItem.editMode === false) {
                    return (
                        <SyllabusCard key={index} syllabusData={syllabusItem} number={index}></SyllabusCard>
                    );
                }
                if(syllabusItem.editMode === true) {
                    return (
                        <SyllabusForm key={index} syllabusData={syllabusItem} number={index}></SyllabusForm>
                    );
                }
            })}
        </div>
    );
}

export default App;

