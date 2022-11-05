import { createStore } from 'vuex';
import { auth } from './auth.module';

const store = createStore({
    state() {
        return {
            origin: window.location.origin
        }
    },
    modules: {
        auth,
    },
});

export default store;