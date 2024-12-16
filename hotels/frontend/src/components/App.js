
import React from 'react'

import api from '../utils/api.js'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'

function App(props) {
  const history = useHistory();

  const [selectedCard, setSelectedCard] = React.useState({ name: "", link: "" });

  const [cards, setCards] = React.useState([]);


  React.useEffect(() => {
    api.getInitialCards()
      .then((res) => {

        setCards(res)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  
  const MainComponent = () => {

    return (<>
      <Header signOut={signOut} buttonText="Выйти" link="/sign-up" userEmail={userData.email} />
      <Main cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onCardClick={handleCardClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} />
      <Footer />

    </>)
  }

  return (
 <MainComponent/>
  );
}

export default App;


