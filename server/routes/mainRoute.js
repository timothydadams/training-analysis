const path = require('path');

export const mainRoute = {
    path: '/*',
    method: 'get',
    handler: (req, res) => {
        res.status(200).sendFile(path.join(__dirname, '../../dist/index.html'), function(err) {
            if (err) {
              res.status(500).send(err)
            }
          })
    },
};
