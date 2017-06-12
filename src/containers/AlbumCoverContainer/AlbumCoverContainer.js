import React, { Component } from 'react';
import { connect } from 'react-redux';

import AlbumActionButton from '../../components/AlbumActionButton';
import AlbumCoverWrapper from '../../components/AlbumCoverWrapper';
import AlbumCoverImage from '../../components/AlbumCoverImage';
import AlbumCoverName from '../../components/AlbumCoverName';

import * as actions from '../../actions';

class AlbumCover extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showActionBtn: false,
      height: 0,
      width: 0,
    }

    this.hidePlayBtn = this.hidePlayBtn.bind(this);
    this.showPlayBtn = this.showPlayBtn.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.updateImageSize = this.updateImageSize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateImageSize);

    // Fix initial rendering in Firefox
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateImageSize);
  }

  updateImageSize() {
    const images = document.getElementsByClassName('AlbumCoverImage');
    if (images.length) {
      this.setState(() => ({
        width: images[0].width + 1,
        height: images[0].width + 1,
      }));
    }
  }

  showPlayBtn() {
    this.setState(() => ({
      showActionBtn: true,
    }));
  }

  hidePlayBtn() {
    this.setState(() => ({
      showActionBtn: false,
    }));
  }

  handleClick(e) {
    if (e.target.nodeName === 'DIV') {
      this.props.history.push('/playlist', this.props.playlistId);
    } else if (e.target.nodeName === 'I') {
      if (e.target.id === 'play') {
        this.props.startPlaying(this.props.playlistId, this.props.fetchedPlaylistId);
      } else if (e.target.id === 'pause') {
        this.props.setPause();
      }
    }
  }

  render() {
    const { isPlaying, fetchedPlaylistId, playlistId } = this.props;
    const { showActionBtn, width, height } = this.state;
    const isThisPlaying = isPlaying && (fetchedPlaylistId === playlistId)
    const actionButton = isThisPlaying ? 'pause' : 'play';

    return (
      <AlbumCoverWrapper
        onMouseLeave={this.hidePlayBtn}
        onMouseOver={this.showPlayBtn}
      >
        <AlbumCoverImage
          image={this.props.image}
          name={this.props.name}
        >
          {(showActionBtn || isThisPlaying) && (
            <AlbumActionButton
              width={width}
              height={height}
              onClick={this.handleClick}
              actionButton={actionButton}
            />
          )}
        </AlbumCoverImage>
        <AlbumCoverName name={this.props.name} />
      </AlbumCoverWrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  isPlaying: state.isPlaying,
  fetchedPlaylistId: state.fetchedPlaylistId,
});

const mapDispatchToProps = dispatch => ({
  startPlaying: (id, playlistId) => {
    dispatch(actions.startPlaying(id, playlistId));
  },
  setPause: id => {
    dispatch(actions.setPause(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumCover);
