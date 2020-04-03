


let batchingStrategy = {
    isBatchingUpdates: false,
    updaters: [],
    batchedUpdates() {
        this.updaters.forEach(updater => {
            updater.updateComponent();
        })
    }
}
class Updater {
    constructor(component) {
        this.component = component;
        this.pendingStates = [];
    }
    addState(particalState) {
        this.pendingStates.push(particalState);
        batchingStrategy.isBatchingUpdates ? batchingStrategy.updaters.push(this.component) : this.component.updateComponent();
    }
}


class User {
    constructor() {
        this.state = { num: 0 };
        this.$updater = new Updater(this)
    }
    setState(particalState) {
        this.$updater.addState(particalState);
    }
    updateComponent() {
        let pendingStates = this.$updater.pendingStates;
        pendingStates.forEach(particalState => Object.assign(this.state, particalState));
        this.$updater.pendingStates.length = 0;
        console.log(this.state);
    }
}
let user = new User();
let play = () => {
    user.setState({ num: 1 });
    user.setState({ num: 2 });
    user.setState({ num: 3 });
    setTimeout(() => {
        user.setState({ num: 4 });
        user.setState({ num: 5 });
        user.setState({ num: 6 });
    });
}
class Transaction {
    constructor(wrappers) {
        this.wrappers = wrappers;
    }
    perform(func) {
        this.wrappers.forEach(wrapper => wrapper.initialize());
        func.call();
        this.wrappers.forEach(wrapper => wrapper.close());
    }
}
let transaction = new Transaction([
    {
        initialize() {
            batchingStrategy.isBatchingUpdates = true;
        },
        close() {
            batchingStrategy.isBatchingUpdates = false;
            batchingStrategy.batchedUpdates();
        }
    },
    {
        initialize() {
            console.log('before2');
        },
        close() {
            console.log('after2');
        }
    }
]);
transaction.perform(play);

