import React, { useState, useCallback } from 'react';
import {useDropzone} from 'react-dropzone';
import StyledButton from './StyledButton';
import HamsterProfile from './HamsterProfile';
import styled from 'styled-components';

const UploadForm = styled.section`
    margin: 1em;
    margin-top: 0;
    & > h1 {
        margin: 0 0 0.3em 0;
        text-align: center;
    }
`

const FormGroup = styled.div`
    display: block;
    margin-bottom: 2em;
    & label {
        display: block;
    }
    & input {
        display: block;
        box-sizing: border-box;
        width: 100%;
        height: 2em;
        padding: 0.5em;
    }
    & .valid {
        border: 1px solid #5bbE36;
    }
    & .invalid {
        border: 1px solid #DD2626
    }
`

const FormError = styled.div`
    position: absolute;
    color: #DD2626;
`

const DragAndDrop = styled(FormGroup)`
    background-color: rgba(255,255,255,0.5);
    padding: 1em;
`


const Upload = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [favFood, setFavFood] = useState('');
    const [loves, setLoves] = useState('');

    const [pic, setPic] = useState(null);

    const [newHamsterCreated, setNewHamsterCreated] = useState(false);
    const [createdHamsterId, setCreatedHamsterId] = useState(null);

    const [nameTouched, setNameTouched] = useState(false);
    const [ageTouched, setAgeTouched] = useState(false);
    const [favFoodTouched, setFavFoodTouched] = useState(false);
    const [lovesTouched, setLovesTouched] = useState(false);

    // Dropzone
    const onDrop = useCallback(acceptedFiles => { setPic(acceptedFiles[0]); },[])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    const handleReset = () => {
        setName('');
        setAge('');
        setFavFood('');
        setLoves('');
        setPic(null);
        setNewHamsterCreated(false);
        setCreatedHamsterId(null);
        setNameTouched(false);
        setAgeTouched(false);
        setFavFoodTouched(false);
        setLovesTouched(false);
    }

    const handleSubmit = async () => {
        let hamId = Number("1337" + Math.round(Math.random()*1E8));
        const newHamster = {
            "id": hamId,
            name,
            "age": Number(age),
            favFood,
            loves,
            "imgName": `hamster-${hamId}.${pic.name.split('.').pop()}`,
            "wins": 0,
            "defeats": 0,
            "games": 0
        }
        await setCreatedHamsterId(newHamster.id);
        await uploadFileToBackend(pic, newHamster.id)
        await createNewHamster(newHamster);
        await setTimeout(() => {
            setNewHamsterCreated(true);
        }, 1000); 
    }
    
    
    // Validation
    let [nameClass, nameError] = nameTouched
    ? validateName(name)
    : ['','']
    
    let [ageClass, ageError] = ageTouched
    ? validateAge(age)
    : ['','']
    
    let [favFoodClass, favFoodError] = favFoodTouched
    ? validateFavFood(favFood)
    : ['','']
    
    let [lovesClass, lovesError] = lovesTouched
    ? validateLoves(loves)
    : ['','']
    
    let formIsValid = (
        nameError === '' && 
        ageError === '' && 
        favFoodError === '' && 
        lovesError === '' && 
        nameTouched === true && 
        ageTouched === true && 
        favFoodTouched === true && 
        lovesTouched === true && 
        !!pic === true)


    return (
        <UploadForm>
            {!newHamsterCreated
            ?
            <>
            <h1>Upload a new hamster</h1>
            <FormGroup>
                <label>What is your hamsters name?</label>
                <input type="text" placeholder="Name" onChange={e => setName(e.target.value)} onBlur={() => {setNameTouched(true)}} className={nameClass} />
                <FormError>{nameError}</FormError>
            </FormGroup>

            <FormGroup>
                <label>How old is your hamster?</label>
                <input type="text" placeholder="Age" onChange={e => setAge(e.target.value)} onBlur={() => {setAgeTouched(true)}} className={ageClass} />
                <FormError>{ageError}</FormError>
            </FormGroup>

            <FormGroup>
                <label>What is your hamsters favourite food?</label>
                <input type="text" placeholder="Favourite food" onChange={e => setFavFood(e.target.value)} onBlur={() => {setFavFoodTouched(true)}} className={favFoodClass} />
                <FormError>{favFoodError}</FormError>
            </FormGroup>

            <FormGroup>
                <label>What does your hamster love?</label>
                <input type="text" placeholder="Loves" onChange={e => setLoves(e.target.value)} onBlur={() => {setLovesTouched(true)}} className={lovesClass} />
                <FormError>{lovesError}</FormError>
            </FormGroup>
            
            <DragAndDrop  {...getRootProps()}>
                <input {...getInputProps()} />
                {!pic
                ? 
                    isDragActive
                    ? <p>Drop the picture here...</p>
                    : <p>Drag and drop your picture here, or <strong>click</strong> to browse for a picture</p>
                
                : null}
                
                {!!pic 
                    ? <p>Picture received successfully!</p> 
                    : null
                }
            </DragAndDrop>
            
            <FormGroup>
                {formIsValid
                ? <StyledButton text="Click here to submit your hamster!" handleClick={handleSubmit} bounce={true} />
                : null}
            </FormGroup>
            </>

            : null

            }
            { newHamsterCreated 
            ? 
            <>
                <HamsterProfile id={createdHamsterId} /> 
                <StyledButton text="Upload another hamster?" handleClick={handleReset} />
            </>
            : null }

        </UploadForm>
    )
}

const uploadFileToBackend = (file, id) => {
    const headers = new Headers();
    headers.append("Authorization", "q7RY4dfQ59pzY8zA");

    const formdata = new FormData();
    formdata.append("pic", file, file.name);
    formdata.append("hamsterId", id);

    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: formdata,
        redirect: 'follow'
    };

    fetch("/pics/", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

const createNewHamster = (hamster) => {
    const headers = new Headers();
    headers.append("Authorization", "q7RY4dfQ59pzY8zA");
    headers.append("Content-Type", "application/json");

    const raw = JSON.stringify(hamster);

    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: raw,
        redirect: 'follow'
    };

    fetch("/hamsters", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

const validateName = name => {
    if(name.length > 0){
        return ['valid', '']
    }else{
        return ['invalid','Please enter a name']
    }
}

const validateAge = age => {
    if(isNaN(age) || age === ''){
        return ['invalid', 'Please enter a valid age as a number']
    }else if(age < 0 || age > 5){
        return ['invalid', 'Please enter age as a number between 0-5']
    }else{
        return ['valid','']
    }
}

const validateFavFood = favFood => {
    if(favFood.length > 0){
        return ['valid', '']
    }else{
        return ['invalid','Please enter the hamsters favourite food']
    }
}

const validateLoves = loves => {
    if(loves.length > 0){
        return ['valid', '']
    }else{
        return ['invalid','Please enter what the hamster loves']
    }
}



export default Upload;