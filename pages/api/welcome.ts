export default async (req, res) => {
    if (req.method === "GET") {
        const date_time_now = new Date().toISOString();
        res.status(200).json({
            "message": `Welcome to algotuno!. the time now is ${date_time_now}`,
        });
    }
}