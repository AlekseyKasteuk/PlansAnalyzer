import Main from '../components/pages/Main';
import AuthPage from '../components/pages/AuthPage';
import CreateTeam from '../components/pages/CreateTeam';
import LoadingPage from '../components/pages/LoadingPage';
import Login from '../components/pages/Login';
import CreateSite from '../components/pages/CreateSite';

const routes = {
    auth: {
        page: AuthPage,
        schema: 'reset'
    },
    createTeam: {
        page: CreateTeam,
        schema: 'popup'
    },
    main: {
        page: Main,
        type: 'replace'
    },
    loading: {
        page: LoadingPage,
        initial: true
    },
    login: {
        page: Login,
        schema: 'popup'
    },
    createSite: {
        page: CreateSite,
        schema: 'popup'
    }
};


module.exports = routes;
