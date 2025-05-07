var timeout;
var serverTimeOutValue;
document.onmousemove = resetTimer;
document.onkeydown = resetTimer;

function resetTimer() {
    clearTimeout(timeout);
    if (serverTimeOutValue != undefined) {
        timeout = setTimeout(logout, serverTimeOutValue);
    }
}

function getTimeOutValue() {
    getTimeoutValueFromServer(function (serverTimeout) {
        serverTimeOutValue = serverTimeout;
    });
}

function getTimeoutValueFromServer(callback) {
    $.get('/Home/GetUserInactivityTimeout', function (data) {
        callback(data);
    });
}

function logout() {
    var form = document.createElement('form');
    form.method = 'POST';
    form.action = '/Account/LogOff';
    //The Identity Server usually manages CSRF protection internally, employing methods such as SameSite cookies, secure headers,
    //    or other integrated measures.Therefore, manually inserting the __RequestVerificationToken may be
    //    unnecessary or could disrupt the security protocols established by the Identity Server.

    //Reverted the change made to remove the __RequestVerificationToken from the form.
    // Add anti-forgery token
    var input = document.createElement('input');
    input.type = 'hidden';
    input.name = '__RequestVerificationToken';
    input.value = getAntiForgeryToken();
    form.appendChild(input);

    document.body.appendChild(form);
    form.submit();
}

function getAntiForgeryToken() {
    return document.querySelector('[name="__RequestVerificationToken"]').value;
}

setTimeout(function () {
    serverTimeOutValue = getTimeOutValue();
}, 2000)

// window.onbeforeunload = function () {
//     if (navigator.sendBeacon) {
//         navigator.sendBeacon('/Account/EndSession');
//     } else {
//         fetch('/Account/EndSession', { method: 'POST', keepalive: true });
//     }
// };

