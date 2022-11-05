import { createStore } from 'vuex';
import { auth } from './auth.module';

const store = createStore({
    state: {
        origin: getOrigin()
    },
    modules: {
        auth,
    },
});

function getOrigin() {
    const origin = window.location.origin;
    const colonCount = origin.match(/:/g).length;
    return colonCount == 1 
        ? origin
        : origin.slice(0, origin.lastIndexOf(':'));
}

export default store;