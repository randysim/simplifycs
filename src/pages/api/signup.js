/* 
NORMAL EMAIL NON-GOOGLE SIGNUP
*/

export default function handler(req, res) {
    if (req.method != "POST") return res.status(400);

    let email = req.body.email;
    let username = req.body.username;
    let pass = req.body.password;
    let confirmPass = req.body.confirmPass; // to see if they match

    if (!email) return res.status(200).json({ error: "Missing Email", success: false });
    if (!username) return res.status(200).json({ error: "Missing Username", success: false });
    if (!pass) return res.status(200).json({ error: "Missing Password", success: false });
    if (pass !== confirmPass) return res.status(200).json({ error: "Passwords do not match", success: false });

    email = email.toLowerCase();
    
    // check if its a valid email
    // check if email isn't pending verification or if email doesn't exist already
    // check if password meets password requirements (check on frontend as well)
    // check if username is valid

    // send confirmation email, add to temporary signup database
}