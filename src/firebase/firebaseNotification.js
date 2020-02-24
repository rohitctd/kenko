import { notifications, messaging } from "./Firebase";
import firebase from "react-native-firebase";
import { Platform } from "react-native";

export function firebaseListeners() {
  notifications.onNotification(
    notification => {
      displayNotificationFromCustomData();
    },
    error => {
      console.log(error);
    }
  );

  notifications.onNotificationOpened(
    notificationOpen => {
      displayNotificationFromCustomData();
    },
    error => {
      console.log(error);
    }
  );

  notifications
    .getInitialNotification()
    .then(notificationOpen => {
      if (notificationOpen)
        displayNotificationFromCustomData();
    })
    .catch(error => console.log(error));

  messaging.onMessage(
    message => {
      displayNotificationFromCustomData();
    },
    error => console.log(error)
  );
}

function displayNotificationFromCustomData() {
  switch (Platform.OS) {
    case "ios":
      const localNotification = new firebase.notifications.Notification()
        .setTitle("Title of Notification")
        .setBody("Body of Notification")
        .setNotificationId(new Date().valueOf().toString())
        .setSound("default");

      notifications
        .displayNotification(localNotification)
        .catch(err => console.log(err));

      break;

    case "android":
      const channel = new firebase.notifications.Android.Channel(
        "channelId",
        "Channel Name",
        firebase.notifications.Android.Importance.Max
      ).setDescription("A natural description of the channel");

      firebase.notifications().android.createChannel(channel);

      const notiff = new firebase.notifications.Notification()
        .setTitle("Title of Notification")
        .setBody("Body of Notification")
        .setNotificationId(new Date().valueOf().toString())
        .setSound("default")
        .android.setChannelId("channelId")
        .android.setSmallIcon("ic_launcher")
        .android.setLargeIcon("ic_launcher")
        .android.setColor("#000000") 
        .android.setPriority(firebase.notifications.Android.Priority.High);

      notifications.displayNotification(notiff).catch(err => console.log(err));

      break;

    default:
  }
}
