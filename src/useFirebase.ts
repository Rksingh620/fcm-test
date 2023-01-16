import React, { useEffect, useMemo, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  Messaging,
  onMessage,
} from "firebase/messaging";

const useFirebase = () => {
  const [messaging, setMessaging] = useState<Messaging>();
  const [fcmToken, setFcmToken] = useState<string>("");
  const firebaseConfig = useMemo(
    () => ({
      apiKey: "AIzaSyBPJ4moFq_0EaJAQeogSw2O7a4tw9JhyD8",
      authDomain: "fcm-test-19479.firebaseapp.com",
      projectId: "fcm-test-19479",
      storageBucket: "fcm-test-19479.appspot.com",
      messagingSenderId: "602324912057",
      appId: "1:602324912057:web:a8315f0b82f603af321868",
      measurementId: "G-JEMM12QQDR",
    }),
    []
  );
  const [isTokenFound, setTokenFound] = useState(false);
  const getTokenFCM = async (messaging: Messaging) => {
    return getToken(messaging, {
      vapidKey:
        "BMzaax-ibACNJX2u7NxrglIk8UfOf27YHWmGbHtj4pv2ye4iENTvZobWO3ygZE5Z8Q_NN8HQwJxGDi-Nso2uIfk",
    })
      .then((currentToken) => {
        if (currentToken) {
          setFcmToken(currentToken);
          console.log("current token for client: ", currentToken);
          setTokenFound(true);
          // Track the token -> client mapping, by sending to backend server
          // show on the UI that permission is secured
        } else {
          console.log(
            "No registration token available. Request permission to generate one."
          );
          setTokenFound(false);
          // shows on the UI that permission is required
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
        // catch error while creating client token
      });
  };

  useEffect(() => {
    try {
      const app = initializeApp(firebaseConfig);
      const messaging = getMessaging(app);
      setMessaging(messaging);
      if (!isTokenFound) {
        getTokenFCM(messaging);
      }
    } catch (error) {
      console.log(error);
    }
  }, [firebaseConfig, isTokenFound]);
  const onMessageReceive = (cb: (message: any) => void) => {
    if (messaging) {
      onMessage(messaging, cb);
    }
  };
  return { messaging, onMessageReceive, fcmToken };
};

export default useFirebase;
