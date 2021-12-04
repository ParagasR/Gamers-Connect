const withAuth = (req, res, nrext) => {
    if(!req.session.user_id) {
        res.redirect('/login');
    } else {
        next();
    }
}

module.exports = withAuth;