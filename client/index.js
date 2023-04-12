import { NavigationContainer } from "@react-navigation/native";
import { registerRootComponent } from "expo";
import { SocketProvider } from "./src/context/SocketContext";

import App from "./src/App";

const AppWithNavigation = () => (
  <SocketProvider>
    <NavigationContainer>
      <App />
    </NavigationContainer>
  </SocketProvider>
);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(AppWithNavigation);
