/* EDIT COURSE */
export default async function handler(req, res) {
    if (req.method != "POST")
        return res
            .status(400)
            .json({ success: false, error: "Expected get request." });
    // admin check
}