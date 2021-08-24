exports.login = (req, res, next) => {
    const dbresults = () => {
            let sql = 'SELECT * FROM user_stats WHERE Username=? AND Password=?';
        db.query(sql, [req.query.Username, req.query.Password], (err, rows) => {
            if(err) {throw err;
            } else {    
            console.log('User is logged in.');
            res.json(rows);
            }
        });
    }

    res.status(200).json({Success: true, data: dbresults});
    console.log(dbresults);
}