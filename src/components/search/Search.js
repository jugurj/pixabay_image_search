import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RadioGroup from 'material-ui/RadioButton/RadioButtonGroup';
import RadioButton from 'material-ui/RadioButton';
import Divider from 'material-ui/Divider';
import axios from 'axios';
import ImageResults from '../image-results/ImageResults';

import './Search.css';

class Search extends Component {
    state = {
        searchKey: '',
        amount: 15,
        apiUrl: 'https://pixabay.com/api/',
        apiKey: '11585456-99ba2f8ce1875f17d8bb321c3',
        images: []
    }

    onKeyChange = (e) => {
        const val = e.target.value;
        this.setState({ [e.target.name]: val }, () => {
            if (val === '') {
                this.setState({ images: [] })
            } else {
                axios.get(`${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchKey}&image_type=photo&per_page=${this.state.amount}&safesearch=true`)
                    .then(res => this.setState({ images: res.data.hits }))
                    .catch(err => console.log(err));
            }
        });
    }

    onAmountChange = (e, value) => {
        this.setState({ amount: value })
    }

    render() {

        const style = {
            textfield: {
                color: '#f44336'
            }
        }

        return (

            <div className="search-container">
                <TextField
                    className="search-field"
                    name="searchKey"
                    value={this.state.searchKey}
                    onChange={this.onKeyChange}
                    floatingLabelText="Search For Images"
                    style={style.textfield}
                    fullWidth={true} /><br />
                <h4>Select Amount:</h4>
                <RadioGroup
                    className="radio-btn-group"
                    name="amount"
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                    defaultSelected={this.state.amount}
                >
                    <RadioButton value={9} label="9" />
                    <RadioButton value={15} label="15" />
                    <RadioButton value={21} label="21" />
                    <RadioButton value={30} label="30" />
                </RadioGroup>
                <Divider className="search-divider" />
                {this.state.images.length > 0 ? (<ImageResults images={this.state.images} />) : <p>No Images found.</p>}
            </div>
        );
    }
}

export default Search;