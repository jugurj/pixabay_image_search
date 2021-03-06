import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import './ImageResults.css';

class ImageResults extends Component {
    state = {
        dialogOpened: false,
        dialogContent: ''
    }

    handleOpen = (img) => {
        this.setState({ dialogOpened: true, dialogContent: img });
    }

    handleClose = () => {
        this.setState({ dialogOpened: false });
    }

    render() {
        const { images } = this.props
        let imageListContent;

        if (images) {
            imageListContent = (
                <GridList cols={3} className="column-grid">
                    {images.map(img => (
                        <GridTile
                            title={img.tags}
                            key={img.id}
                            subtitle={
                                <span>
                                    by <strong>{img.user}</strong>
                                </span>
                            }
                            actionIcon={
                                <IconButton onClick={() => this.handleOpen(img.largeImageURL)}>
                                    <ZoomIn color="white" />
                                </IconButton>
                            }
                        >
                            <img src={img.largeImageURL} alt="" />
                        </GridTile>
                    ))}
                </GridList>
            )
        } else {
            imageListContent = null;
        }

        const actions = [
            <FlatButton label="Close"
                primary={true}
                onClick={this.handleClose} />
        ]

        return (
            <div className="image-results-container">
                {imageListContent}
                <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.dialogOpened}
                    onRequestClose={this.handleClose}>
                    <img src={this.state.dialogContent} alt="" style={{ width: '100%' }} />
                </Dialog>
            </div>
        );
    }
}

ImageResults.propTypes = {
    images: PropTypes.array.isRequired
}

export default ImageResults;