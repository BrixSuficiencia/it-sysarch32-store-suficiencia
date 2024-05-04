import React, { Component } from 'react'
import { ProductsContextProvider } from './Global/ProductsContext'
import { Home } from './components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom' // Import Route and Routes
import { Signup } from './components/Signup'
import { Login } from './components/Login'
import { NotFound } from './components/NotFound'
import { auth, db } from './config/Config.js'
import { CartContextProvider } from './Global/CartContext'
import { Cart } from './components/Cart'
import { Cashout } from './components/Cashout'

export class App extends Component {

    state = {
        user: null,
    }

    componentDidMount() {
      auth.onAuthStateChanged(user => {
          if (user) {
              db.collection('SignedUpUsersData').doc(user.uid).get()
                  .then(snapshot => {
                      if (snapshot.exists) {
                          this.setState({
                              user: {
                                  uid: user.uid, // Set uid property
                                  ...snapshot.data() // Merge with other user data
                              }
                          });
                      } else {
                          console.log("User data does not exist");
                      }
                  })
                  .catch(error => {
                      console.error("Error fetching user data:", error);
                  });
          } else {
              this.setState({
                  user: null
              });
          }
      });
  }
  
  
    render() {
        return (
            <ProductsContextProvider>
                <CartContextProvider>
                    <BrowserRouter>
                        <Routes> {/* Wrap all your routes inside Routes */}
                            {/* home */}
                            <Route exact path='/' element={<Home user={this.state.user} />} />
                            {/* signup */}
                            <Route path="/signup" element={<Signup history={history} />} />
                            {/* login */}
                            <Route path="/login" element={<Login history={history} />} />
                            {/* cart products */}
                            <Route path="/cartproducts" element={<Cart user={this.state.user} />} />
                            {/* cashout */}
                            <Route path='/cashout' element={<Cashout user={this.state.user} />} />
                            {/* NotFound */}
                            <Route path='*' element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </CartContextProvider>
            </ProductsContextProvider>
        )
    }
}

export default App;
