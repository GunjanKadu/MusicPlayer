import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import idFromHref from '../../utils/idFromHref';

import CoverArt from '../CoverArt';
import Loading from '../Loading';
import { Header, Wrapper } from './styled';

import { gridTemplateColumns, rootUrl } from '../../variables';

class CategoryView extends React.Component {
  componentDidMount() {
    this.props.fetchCategoryPlaylist(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.clearCategoryPlaylist();
  }

  handleClick = (href, playClicked) => {
    const id = idFromHref(href);
    const {
      fetchedPlaylistId,
      history,
      isPlaying,
      startPlaylist,
      setPause,
    } = this.props;

    if (playClicked) {
      if (isPlaying && fetchedPlaylistId === id) {
        return setPause(id);
      } else {
        return startPlaylist(href);
      }
    }

    if (history) {
      return history.push(`/${href.replace(rootUrl + '/', '')}`);
    }
  };

  render() {
    const { fetchedPlaylistId, isPlaying, windowWidth } = this.props;
    if (!this.props.playlist) {
      return <Loading />;
    }
    return (
      <React.Fragment>
        <Header>Popular Playlists</Header>
        <Wrapper template={gridTemplateColumns(windowWidth)}>
          {this.props.playlist.map(p => {
            const icon = p.images[0].url;
            return (
              <CoverArt
                key={p.id}
                {...p}
                icon={icon}
                handleClick={this.handleClick}
                showPlayBtn={fetchedPlaylistId === p.id && isPlaying}
              />
            );
          })}
        </Wrapper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  playlist: state.categoryPlaylist,
  activePlaylistHref: state.playlist.href,
  featured: state.featured,
  isPlaying: state.isPlaying,
});

const mapDispatchToProps = (dispatch, getState) => ({
  fetchCategoryPlaylist: id => {
    dispatch(actions.fetchCategoryPlaylist(id));
  },
  clearCategoryPlaylist: () => {
    dispatch(actions.clearCategoryPlaylist());
  },
  startPlaylist: href => {
    dispatch(actions.startPlaylist({ href }));
  },
  setPause: id => {
    dispatch(actions.setPause(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryView);
