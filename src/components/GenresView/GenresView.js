import React from 'react';

import GenreCard from './GenreCard';
import { Header, Wrapper } from './styled';

import d from './categories-response.json';
const genres = d.categories.items;

const gridTemplateColumns = w => {
  switch (true) {
    case w <= 547:
      return 'repeat(2, minmax(16px, 218px))';
    case w >= 548 && w <= 771:
      return 'repeat(3, minmax(146px, 230px))';
    case w >= 772 && w <= 979:
      return 'repeat(4, minmax(166px, 217px))';
    default:
      return 'repeat(6, minmax(145px, 230px))';
  }
};

class Genres extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header>Genres & Moods</Header>
        <Wrapper template={gridTemplateColumns(this.props.windowWidth)}>
          {genres.map(genre => <GenreCard key={genre.id} {...genre} />)}
        </Wrapper>
      </React.Fragment>
    );
  }
}

export default Genres;
