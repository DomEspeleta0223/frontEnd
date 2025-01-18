import "./Form.css";
import React, {useState}  from "react";

function Form() {

    const [personalData,setPersonalData] = useState({
        fullName:'',
        age:'',
        email:'',
        address:'',
        petAnimalType:'',
        petName:'',
        petVaccinationNumber:'',});
    
    const handleChange = (e) => {
        const { id, value } = e.target;
        setPersonalData(prevData => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleOnclick = async (e) => {
        e.preventDefault();

        if((!personalData.fullName)||(!personalData.age)||(!personalData.email)||(!personalData.address)||(!personalData.petAnimalType)||(!personalData.petName)||(!personalData.petVaccinationNumber))
        {
            alert("Please fill all the requirements");
        }
        
        try{
            const response = await fetch("https://espeletaapi.azurewebsites.net/Submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(personalData),

            });
            if (response.ok)
            {
                const result = await response.json();
                alert("Form Submitted Successfully!"),

                setPersonalData ({
                    fullName:"",
                    age:"",
                    email:"",
                    address:'',
                    petAnimalType:"Select Animal",
                    petName:"",
                    petVaccinationNumber:""
                });
            }
            else
            {
                alert("Submission Failed.");
                console.error("API Error", response.statusText);

            }
        }
        catch(error){
            alert("An Error Occured");
        };
    };
    
return (
        <>
        <div className = "FrontPage">
            <div className = "Form">
                <h1> RABIES VACCINE REGISTRY</h1>
                    <div className = "InfoToProvide">
                        <label> Full Name </label>
                        <input 
                        type = "text"
                        id = "fullName"
                        placeholder = "Enter Full Name (Last Name, First Name MI.)"
                        value = {personalData.fullName} 
                        onChange = {handleChange}
                        required
                        />
                    </div>
                    <div className = "InfoToProvide">
                        <label> Age </label>
                        <input 
                        type = "number"
                        id = "age"
                        placeholder = "Enter Age"
                        value = {personalData.age} 
                        onChange = {handleChange}
                        required
                        />
                    </div>
                    <div className = "InfoToProvide">
                        <label> Email </label>
                        <input 
                        type = "email"
                        id = "email"
                        placeholder = "Enter Email"
                        value = {personalData.email}
                        onChange = {handleChange}
                        required
                        />
                    </div>
                    <div className = "InfoToProvide">
                        <label> Address </label>
                        <input 
                        type = "text"
                        id = "address"
                        placeholder = "Enter Address"
                        value = {personalData.address}
                        onChange = {handleChange}
                        required
                        />
                    </div>
                    <div className="InfoToProvide">
                    <label>Animal Type</label>
                    <select
                    id = "petAnimalType"
                    name = "Pet Animal Type"
                    value = {personalData.petAnimalType}
                    onChange = {handleChange}
                    required
                    >
                    <option value = "disabled"> Select Animal</option>
                    <option value = "Dog"> Dog </option>
                    <option value = "Cat"> Cat </option>
                    <option value = "Horse"> Horse </option>
                    <option value = "Horse"> Pig </option>
                    </select>
                    </div>
                    <div className = "InfoToProvide">
                        <label> Pet Name </label>
                        <input 
                        type = "text"
                        id = "petName"
                        placeholder = "Enter Pet Name"
                        value = {personalData.petName}
                        onChange = {handleChange}
                        required
                        />
                    </div>
                    <div className = "InfoToProvide">
                        <label> Pet Vaccination Number </label>
                        <input 
                        type = "text"
                        id = "petVaccinationNumber"
                        placeholder = "Enter Vaccination Number"
                        value = {personalData.petVaccinationNumber}
                        onChange = {handleChange}
                        required
                        />
                    </div>
                    <button onClick = {handleOnclick
                    }
                    type = "submit" className = "submitButton"> Submit
                    </button>
            </div>
        </div>
      </>
        );

}
export default Form