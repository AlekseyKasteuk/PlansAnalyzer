import Sites from '../components/pages/Sites';
import AuthPage from '../components/pages/AuthPage';
import CreateTeam from '../components/pages/CreateTeam';
import LoadingPage from '../components/pages/LoadingPage';

const routes = {
    auth: {
        page: AuthPage
    },
    createTeam: {
        page: CreateTeam
    },
    sites: {
        page: Sites
    },
    loading: {
        page: LoadingPage
    }
};


module.exports = routes;
