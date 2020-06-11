import React, { useState, useCallback } from 'react';
import {useDropzone} from 'react-dropzone';
import {v4 as uuidv4} from 'uuid';
import StyledButton from './StyledButton';
import HamsterProfile from './HamsterProfile';

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
        let hamId = uuidv4();
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
        await uploadFileToBackend(pic, newHamster.id)
        await createNewHamster(newHamster);
        await setTimeout(setCreatedHamsterId(newHamster.id),1500);
        setNewHamsterCreated(true);
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
        <div>
            {!newHamsterCreated
            ?
            <>
            <div className="form-group">
                <label>What is your hamsters name?</label>
                <input type="text" placeholder="Name" onChange={e => setName(e.target.value)} onBlur={() => {setNameTouched(true)}} className={nameClass} />
                <div className="form-error">{nameError}</div>
            </div>

            <div className="form-group">
                <label>How old is your hamster?</label>
                <input type="text" placeholder="Age" onChange={e => setAge(e.target.value)} onBlur={() => {setAgeTouched(true)}} className={ageClass} />
                <div className="form-error">{ageError}</div>
            </div>

            <div className="form-group">
                <label>What is your hamsters favourite food?</label>
                <input type="text" placeholder="Favourite food" onChange={e => setFavFood(e.target.value)} onBlur={() => {setFavFoodTouched(true)}} className={favFoodClass} />
                <div className="form-error">{favFoodError}</div>
            </div>

            <div className="form-group">
                <label>What does your hamster love?</label>
                <input type="text" placeholder="Loves" onChange={e => setLoves(e.target.value)} onBlur={() => {setLovesTouched(true)}} className={lovesClass} />
                <div className="form-error">{lovesError}</div>
            </div>
            
            <div className="form-group"  {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive
                    ? <p>Drop the picture here...</p>
                    : <p>Drag and drop your picture here, or click to select files</p>
                }
                {!!pic 
                    ? <p>Picture received successfully!</p> 
                    : null
                }
            </div>
            
            <div className="form-group">
                {formIsValid
                ? <StyledButton text="Click here to submit your hamster!" handleClick={handleSubmit} bounce={true} />
                : null}
            </div>
            </>

            : null

            }
            { createdHamsterId 
            ? 
            <>
                <HamsterProfile id={createdHamsterId} /> 
                <StyledButton text="Upload another hamster?" handleClick={handleReset} />
            </>
            : null }
            
            

            


        </div>
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