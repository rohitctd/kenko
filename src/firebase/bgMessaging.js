import firebase from "react-native-firebase";
import type { RemoteMessage } from "react-native-firebase";
import { Platform } from "react-native";

export default async (message: RemoteMessage) => {
  switch (Platform.OS) {
    case "ios":
      const localNotification = new firebase.notifications.Notification()
        .setTitle(JSON.parse(message.data.body).title)
        .setBody(JSON.parse(message.data.body).msg)
        .setNotificationId(new Date().valueOf().toString())
        .setSound("default");

      firebase
        .notifications()
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
        .setTitle(JSON.parse(message.data.body).title)
        .setBody(JSON.parse(message.data.body).msg)
        .setNotificationId(new Date().valueOf().toString())
        .setSound("default")
        .android.setChannelId("channelId")
        .android.setSmallIcon("app_logo")
        .android.setLargeIcon("app_logo")
        .android.setColor("#000000") // you can set a color here
        .android.setPriority(firebase.notifications.Android.Priority.High);

      notifications.displayNotification(notiff).catch(err => console.log(err));

      break;

    default:
  }

  return Promise.resolve();
};
