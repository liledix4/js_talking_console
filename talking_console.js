let status = {
    document: {
        mouseOver: null,
        visibility: null,
    },
    window: {
        focused: null,
    },
};
let messages;


export async function talkingFrontend(inputMessages, callback) {
    function go(event) {
        callback( fireEvent(event) );
    }

    messages = inputMessages;

    document.addEventListener('mouseleave', go);
    document.addEventListener('mouseenter', go);
    document.addEventListener('visibilitychange', go);
    window.addEventListener('blur', go);
    window.addEventListener('focus', go);
    window.addEventListener('resize', go);
}


function tell(msg) {
    if (typeof msg === 'object') {
        const random = parseInt( Math.random() * msg.length );
        return msg[random];
    }
    else if (typeof msg === 'string')
        return msg;
}


function fireEvent(event) {
    const typeEvent  = event.type;
    const typeTarget = event.target.constructor.name;

    switch (typeTarget) {
        case 'HTMLDocument':
            return statusCombos(
                fDocument(
                    typeEvent,
                    event.target.visibilityState
                )
            );
        case 'Window':
            return statusCombos(
                fWindow(typeEvent)
            );
    }
}


function statusCombos(uneditedMessage) {
    // 2DO
    // if (status.window.focused === true)
    //     console.log(messages.window.focused);
    return uneditedMessage;
}


function fDocument(eventType, visibility) {
    switch (eventType) {
        case 'mouseleave':
            status.document.mouseOver = false;
            return tell(messages.document.mouse.isLeft);
        case 'mouseenter':
            status.document.mouseOver = true;
            return tell(messages.document.mouse.isBack);
        case 'visibilitychange':
            if (visibility === 'visible') {
                status.document.visibility = true;
                return tell(messages.document.isVisible);
            }
            else if (visibility === 'hidden') {
                status.document.visibility = false;
                return tell(messages.document.isInvisible);
            }
    }
}
function fWindow(eventType) {
    switch (eventType) {
        case 'blur':
            status.window.focused = false;
            return tell(messages.window.isUnfocused);
        case 'focus':
            status.window.focused = true;
            return tell(messages.window.isFocused);
        case 'resize':
            return tell(messages.window.isResized);
    }
}