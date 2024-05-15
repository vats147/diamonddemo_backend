//hostelar registration middleware
export const userregauth = async (req, res, next) => {
    console.log('user registration authentication validation ');

    // Regular expression to validate full name with at least two words separated by a space
    const nameRegex = /^[A-Za-z]+(\s[A-Za-z'-]+)+$/;


    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/;
    const passwordRegex = /^[a-zA-Z0-9]{5,9}$/;

    const name = req.body.name;
    const hemail = req.body.email;
    const hcontact = req.body.number;
    const password = req.body.password;


    if (
        nameRegex.test(name) &&
        emailRegex.test(hemail) &&
        phoneRegex.test(hcontact) &&
        passwordRegex.test(password)

    ) {
        next();
    } else {
        console.error('Unauthorized');
        res.sendStatus(401);
    }
};


