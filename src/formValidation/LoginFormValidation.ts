function isValidEmail(email: string) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isPasswordValid(password: string) {
    return ( 
        !!password && 
        password.trim() !=='' &&
        password.length >= 8 &&  
        /[A-Z]/.test(password) &&  
        /[a-z]/.test(password) && 
        /\d/.test(password) 
        );
}

export const LoginFormValidation = (name: string, value: string) => {
    switch (name) {
        case 'email':
            if (!isValidEmail(value)) {
                return false;
            }
            break;
        case 'password':
            if (!isPasswordValid(value)) {
                return false;
            }
            break;
    }
    return true; 
}

