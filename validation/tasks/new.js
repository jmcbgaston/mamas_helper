const Validator = require('validator'); 
const validText = require('../valid-text'); 

module.exports = function validateNewTaskInput(data) {
    let errors = {}; 

    data.title = validText(data.title) ? data.title : ""; 

    if (!Validator.isLength(data.title, { min: 2 })) {
      errors.title = 'Title must be at least 2 characters';
    }

    return {
        errors, 
        isValid: Object.keys(errors).length === 0
    }; 
}; 