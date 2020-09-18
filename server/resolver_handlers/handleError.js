// handle errors
const handleAuthErrors = (err) => {
    let errors = { email: '', password: '' };

    // duplicate email error
    if (err.code === 11000) {
        errors.email = 'This email is already registered';
        return errors;
    }

    return errors;
}

module.exports = handleAuthErrors;
