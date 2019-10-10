

export function signalRInvokeMiddleware(store) {
    return (next) => async (action) => {
        switch (action.type) {
        case "SIGNALR_INCREMENT_COUNT": 
            connection.invoke('IncrementCounter');
            break;   
        case "SIGNALR_DECREMENT_COUNT": 
            connection.invoke('DecrementCounter');
            break;   
        }
     
        return next(action);
    }
}



export function signalRRegisterCommands(store, callback) {

    connection.on('IncrementCounter', data => {
        store.dispatch({ type: 'INCREMENT_COUNT'})
        console.log("Count has been incremented");
    })

    connection.on('DecrementCounter', data => {
        store.dispatch({ type: 'DECREMENT_COUNT'})
        console.log("Count has been decremented");
    })

    connection.start().then(callback());

}