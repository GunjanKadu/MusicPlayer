import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import FeaturedContainer from '../FeaturedContainer';
import GenresContainer from '../GenresContainer';

import { Container, ListWrapper, NavItem } from './styled';

class MainContainer extends Component {
  render() {
    return (
      <Container>
        <nav>
          <ListWrapper>
            <li>
              <NavItem to="/browse/featured">FEATURED</NavItem>
            </li>
            <li>
              <NavItem to="/browse/genres">GENRES & MOODS</NavItem>
            </li>
            <li>
              <NavItem to="/browse/newreleases">NEW RELEASES</NavItem>
            </li>
            <li>
              <NavItem to="/browse/discover">DISCOVER</NavItem>
            </li>
          </ListWrapper>
        </nav>
        <Route
          path="/browse/featured"
          render={routeProps => <FeaturedContainer {...routeProps} />}
        />
        <Route path="/browse/genres" component={GenresContainer} />
      </Container>
    );
  }
}

export default MainContainer;
