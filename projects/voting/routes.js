const routes = require('next-routes')();

routes.add('/polls/new','/polls/new');
routes.add('/polls/:address','/polls/show')
// routes.add('/polls/:address/requests/new','/polls/requests/new')
// routes.add('/polls/:address/requests','/polls/requests/index')
module.exports =routes;





