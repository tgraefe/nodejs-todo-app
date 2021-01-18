exports.getIndex = (req, res, next) => {
    res.render('index', {
        title: 'Todos',
        username: 'Tobi',
        membershipLevel: 'Pro User',
        content: 'todos'
    })
}