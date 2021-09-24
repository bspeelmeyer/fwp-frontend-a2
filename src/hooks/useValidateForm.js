// password validation Source: 
// https://medium.com/@steven_creates/creating-a-custom-react-hook-for-password-validation-46fc421c16ee

// Customer hook validates the register form
import { useState, useEffect } from "react";
export const useValidateForm = ({name = "", firstPassword = "", secondPassword = "", requiredLength = 8, email = ""}) => {
    
    const [validLength, setValidLength] = useState(null);
    const [hasNumber, setHasNumber] = useState(null);
    const [upperCase, setUpperCase] = useState(null);
    const [lowerCase, setLowerCase] = useState(null);
    const [specialChar, setSpecialChar] = useState(null);
    const [match, setMatch] = useState(null);
    const [validEmail, setValidEmail] = useState(null);
    const [hasName, setHasName] = useState(null);

    useEffect(() => {
        setValidLength(firstPassword.length >= requiredLength ? true : false);
        setUpperCase(firstPassword.toLowerCase() !== firstPassword);
        setLowerCase(firstPassword.toUpperCase() !== firstPassword);
        setHasNumber(/\d/.test(firstPassword));
        setMatch(firstPassword && firstPassword === secondPassword);
        setSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(firstPassword));
        setValidEmail(/\S+@\S+\.\S+/.test(email));
        setHasName(/^[a-zA-Z ,.'-]+$/.test(name));
        

    }, [firstPassword, secondPassword, requiredLength, email, name]);


return [validLength, hasNumber, upperCase, lowerCase, match, specialChar, validEmail, hasName];
};