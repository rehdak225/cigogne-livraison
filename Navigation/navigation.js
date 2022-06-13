
import { createStackNavigator } from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'

import Index from '../Components/index'
import Connexion from '../Components/connexion'
import Inscription from '../Components/inscription'

const ConnexionStackNavigator = createStackNavigator({
  
    Index: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
      screen: Index,
      navigationOptions: {
        headerShown: false,
      },
    },
    Connexion: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
    screen: Connexion,
    navigationOptions: {
      headerShown: false,
    },
    },
    Inscription: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
    screen: Inscription,
    navigationOptions: {
      headerShown: false,
    },
    },
  })
  

export default createAppContainer(ConnexionStackNavigator)