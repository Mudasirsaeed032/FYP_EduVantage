import Joi from 'joi';

// Function to check if an email is disposable
const isDisposableEmail = (email) => {
    const disposableDomains = ['mailinator.com', 'trashmail.com', 'tempmail.com']; // Add more disposable domains as needed
    const domain = email.split('@')[1];
    return disposableDomains.includes(domain);
};

export const userSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .email({ tlds: { allow: true } }) // Enable built-in TLD list
        .trim() // Removes leading and trailing whitespace
        .custom((value, helpers) => {
            if (isDisposableEmail(value)) {
                return helpers.error('any.invalid', { message: 'Disposable emails are not allowed' });
            }
            return value;
        })
        .max(320)
        .required(),
    password: Joi.string()
        .min(8)
        .pattern(new RegExp('(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}'))
        .message('Password must include at least one letter, one number, and one special character')
        .required(),
});