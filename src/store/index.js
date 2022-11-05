import { createStore } from 'vuex';
import { auth } from './auth.module';

const store = createStore({
    state: {
        origin: window.location.origin.slice(0, window.location.origin.lastIndexOf(':'))
    },
    modules: {
        auth,
    },
});

export default store;