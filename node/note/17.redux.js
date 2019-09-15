import { createStore, bindActionCreator, combineReducers, compose, applyMiddleware } from 'redux'

const store = createStore(fn)
store.getState();
store.dispatch({
    type: '',
    ...obj
});

function bindActionCreator(actions, dispatch) {
    let newActions = {};
    for (let key in actions) {
        newActions[key] = () => dispatch(actions[key].apply(null, arguments));
    }
    return newActions;
}
function combineReducers(reducers) {
    return function (stat = {}, action) {
        return Object.keys(reducers).reduce((newState, key) => {
            newState[key] = reducers[key](stat[key], action);
            return newState;
        }, {})
    }
}

class Provider extends Component {
    static childContextTypes = {
        store: PropTypes.object.isRequired
    }
    getChildContext() {
        return {
            store: this.props.store
        }
    }
    render() {
        return this.props.children
    }
}

function connect(mapStateToProps, mapDispatchToProps) {
    return function (Component) {
        class WrappedComponent extends Component {
            static contextTypes = {
                store: PropTypes.object.isRequired
            }
            constructor(props, context) {
                super(props);
                this.store = context.store;
                this.state = mapStateToProps(this.store.getState());
            }
            componentDidMount() {
                this.unsubscribe = this.store.subscribe(() => {
                    this.setState(mapStateToProps(this.store.getState()));
                })
            }
            componentWillUnmount() {
                this.unsubscribe();
            }
            render() {
                let actions = {};
                if (typeof mapDispatchToProps == 'object') {
                    actions = bindActionCreator(mapDispatchToProps, this.store.dispatch)
                } else {
                    actions = mapDispatchToProps(this.store.dispatch);
                }
                return <Component {...this.state} {...actions} />
            }
        }
        return WrappedComponent
    }
}

function createStore(reducer) {
    let state;
    let listeners = [];
    function getState() {
        return state;
    }
    function dispatch(action) {
        state = reducer(state, action);
        listeners.forEach(l => l(state));
    }
    function subscribe(lis) {
        listeners.push(lis);
        return function () {
            listeners.filter(l => l !== lis)
        }
    }
    dispatch({});
    return {
        getState,
        dispatch,
        subscribe
    }
}





