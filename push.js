const webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BGS5tvv0bKJxLCRz3jOazWFAyiBKIkUJWDHDX6EauvIZ5SI5jU6_b1obWJz1Y-N4YVKCm9JY_ojKyVyf1iVabKU",
    "privateKey": "MY2L3Fo4Z6HfVQHd_AIRmjJw6vqpHu_6BurRUeeOutM"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/c6kcwocgTBI:APA91bFQZtUCuEuUc9nYWfJ2EP8IP1GpSnDEoSe4JwC-00oYACMBSzjCXcR8uxJR9njOw04XmtTFjStOWsZL6SNSzHOuV4ZreJqzge1j-C_SI3B7uyPquj5sJmqq6ea8eqHzCHCn9Zv8",
    "keys": {
        "p256dh": "BCUHvuyZKaVqWdo6tGFI2V2pGFUy5dVjRU6erc4SPtBfeJ77o0H0jvNKrLfyJqNqnisSHgn7zOetKkIddKZzp8U=",
        "auth": "E/QCLY/mM8f5NCyk3dYdbg=="
    }
};

const payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

const options = {
    gcmAPIKey: '861189328458',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);