// password validation Source: 
// https://medium.com/@steven_creates/creating-a-custom-react-hook-for-password-validation-46fc421c16ee

// Customer hook validates the register form
import { useState, useEffect } from "react";
export const useValidateForm = ({user_name = "",first_name = "", last_name = "", firstPassword = "", secondPassword = "", requiredLength = 8,max_name_length = 40, max_username_length = 32, email = ""}) => {
    
    const [validLength, setValidLength] = useState(null);
    const [hasNumber, setHasNumber] = useState(null);
    const [upperCase, setUpperCase] = useState(null);
    const [lowerCase, setLowerCase] = useState(null);
    const [specialChar, setSpecialChar] = useState(null);
    const [match, setMatch] = useState(null);
    const [validEmail, setValidEmail] = useState(null);
    const [hasName, setHasName] = useState(null);
    const [hasFirstName, setHasFirstName] = useState(null);
    const [hasLastName, setHasLastName] = useState(null);
    const [checkLengthUserName, setCheckLengthUserName] = useState(null);
    const [checkLengthFirstName, setCheckLengthFirstName] = useState(null);
    const [checkLengthLastName, setCheckLengthLastName] = useState(null);

    useEffect(() => {
        setValidLength(firstPassword.length >= requiredLength ? true : false);
        setUpperCase(firstPassword.toLowerCase() !== firstPassword);
        setLowerCase(firstPassword.toUpperCase() !== firstPassword);
        setHasNumber(/\d/.test(firstPassword));
        setMatch(firstPassword && firstPassword === secondPassword);
        setSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(firstPassword));
        setValidEmail(/\S+@\S+\.\S+/.test(email));
        setHasName(/^[a-z\d\-_\s]+$/i.test(user_name));
        setHasFirstName(/^[a-zA-Z ,.'-]+$/.test(first_name));
        setHasLastName(/^[a-zA-Z ,.'-]+$/.test(last_name));
        setCheckLengthUserName(user_name.length <= max_username_length ? true : false);
        setCheckLengthFirstName(first_name.length <= max_name_length ? true : false);
        setCheckLengthLastName(last_name.length <= max_name_length ? true : false);
        

    }, [firstPassword, secondPassword, requiredLength, email, user_name, first_name, last_name, max_name_length, max_username_length]);


return [validLength, hasNumber, upperCase, lowerCase, match, specialChar, validEmail, hasName, hasFirstName, hasLastName, checkLengthUserName, checkLengthFirstName, checkLengthLastName];
};