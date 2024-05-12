import { getMessaging, getToken } from 'firebase/messaging';
import { vapidKey } from '@/config/firebaseConfig';
import { requestService } from './request-service';

class FcmTokenService {
  getMessagingToken() {
    if (Notification.permission !== 'denied' && localStorage.getItem('notifications') === 'true') {
      const messaging = getMessaging();

      getToken(messaging, { vapidKey })
        .then((currentToken) => {
          if (currentToken) {
            requestService.post('/update-token', { token: currentToken })
          } else {
            console.log('No registration token available. Request permission to generate one.')
          }
        })
        .catch((err) => {
          console.log('An error occurred while retrieving token. ', err)
        })
    } else {
      console.log('Notifications are denied')
    }
  }
}

export const fcmTokenService = new FcmTokenService()