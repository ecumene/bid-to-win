const gpRank = (req, res, next) => {
    let sql = 'SELECT * FROM gp_rank WHERE Username=?';
    db.query(sql, req.query.Username, (err, rows) => {
        if(err) {throw err;
        } else {
            res.status(200).json({Success: true, data});
        }        
    });    
}

const winsRank = (req, res, next) => {
    let sql = 'SELECT * FROM wins_rank WHERE Username=?';
    db.query(sql, req.query.Username, (err, rows) => {
        if(err) {throw err;
        } else {
            res.status(200).json({Success: true, data});
        }
    });    
}

const winPercRank = (req, res, next) => {
    let sql = 'SELECT * FROM winperc_rank WHERE Username=?';
    db.query(sql, req.query.Username, (err, rows) => {
        if(err) {throw err;
        } else {
            res.status(200).json({Success: true, data});
        }
    });    
}

const leaderboard = (req, res, next) => {
    let sql = 'SELECT * FROM winperc_rank WHERE row_num < 11';
    db.query(sql, (err, rows) => {
        if(err) {throw err;
        } else {
            res.status(200).json({Success: true, data});
        }
    });
}

module.exports = {gpRank, winsRank, winPercRank, leaderboard};

// exports.login = (req, res, next) => {
//     const dbresults = () => {
//             let sql = 'SELECT * FROM leaderboard.user_stats WHERE Username=? AND Password=?';
//         db.query(sql, [req.query.Username, req.query.Password], (err, rows) => {
//             if(err) {throw err;
//             } else {    
//             console.log('User is logged in.');
//             res.json(rows);
//             }
//         });
//     }

//     res.status(200).json({Success: true, data: dbresults});
//     console.log(data);
// }