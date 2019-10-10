import * as signalR from '@aspnet/signalr';

export const HUB_CONNECTION_PENDING = 'HUB_CONNECTION_PENDING';
export const HUB_CONNECTION_ESTABLISHED = "HUB_CONNECTION_ESTABLISHED";
export const HUB_CONNECTION_DISCONNECTED = "HUB_CONNECTION_DISCONNECTED";
export const HUB_NOTIFICATION_RECEIVED = "HUB_NOTIFICATION_RECEIVED";

export function connectToHub(connectionId) {
    return {
        type: HUB_CONNECTION_ESTABLISHED,
        id: connectionId
    }
}

export function connectToHub()
{
    return (dispatch)=>{
        

        
    };
}

export function hubDisconnected() {
    return {
        type: HUB_CONNECTION_DISCONNECTED
    }
}

export function hubNotification(data) {
    return {
        type: HUB_NOTIFICATION_RECEIVED,
        payload: data
    };
}

export function hubPending() {
    return {
        type: HUB_CONNECTION_PENDING
    }
}