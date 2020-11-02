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
    "endpoint": "https://fcm.googleapis.com/fcm/send/fmA7jKybm_Q:APA91bFdmTpjOiXBXWqJ9aGEq6J_lw-OCTEx53cTntlvIJ-OqfXQIndOrF9cO7HvMiP3InkY7Rrv51IanoMHeyHgbgpmNGulcr1UmSB6uZygKxtqas6VDVI4TcJXTKOzOSicQfDriSfz",
    "keys": {
        "p256dh": "BHM4YoKeZAurb2zsV5j1uQj3EAKmJzLrDrsYvLdutk/Jps0CQhyPMXDWklXyWZkGOJa2MDAX9XCtd8tvkFFwCQs=",
        "auth": "0kJC6HVx/N414blhNse5pg=="
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