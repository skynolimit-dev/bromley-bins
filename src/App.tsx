import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { trash, person, informationCircle } from 'ionicons/icons';
import { Storage } from '@ionic/storage';
import { useEffect, useState } from 'react';
import { setDeviceInfo } from './lib/user';
import { initStore } from './lib/store';

import TabHome from './pages/TabHome';
import TabMyDetails from './pages/TabMyDetails';
import TabAbout from './pages/TabAbout';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';


setupIonicReact();

const App: React.FC = () => {

  const [appInitialised, setAppInitialised] = useState(false);

  const store = new Storage();

  initStore();

  // Start the server healthchecks, and create the store, then call out to create the data
  async function initApp() {

    // If the last init is within the past 30 seconds, return
    if (appInitialised)
      return;

    // Otherwise, initialise the app
    else {
      console.info('Initialising app');
      await store.create();
      await setDeviceInfo(store);
      setAppInitialised(true);
    }
  }

  useEffect(() => {
    if (!appInitialised)
      initApp();
  }, []);

  if (appInitialised) {
    return (
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Redirect exact path="/" to="/tabHome" />
              <Route path="/tabHome" render={() => <TabHome />} exact={true} />
              <Route path="/tabMyDetails" render={() => <TabMyDetails />} exact={true} />
              <Route path="/tabAbout" render={() => <TabAbout />} exact={true} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="tabHome" href="/tabHome">
                <IonIcon aria-hidden="true" icon={trash} />
                <IonLabel>My collections</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tabMyDetails" href="/tabMyDetails">
                <IonIcon aria-hidden="true" icon={person} />
                <IonLabel>My bin details</IonLabel>
              </IonTabButton>
              <IonTabButton tab="about" href="/tabAbout">
                <IonIcon aria-hidden="true" icon={informationCircle} />
                <IonLabel>About</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    )
  }
}

export default App;
