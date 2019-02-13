import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import ImageResults from '../image-results/ImageResults';

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

    onAmountChange = (e, index, value) => {
        this.setState({ amount: value })
    }

    render() {
        return (
            <div>
                <TextField
                    name="searchKey"
                    value={this.state.searchKey}
                    onChange={this.onKeyChange}
                    floatingLabelText="Search For Images"
                    fullWidth={true} /><br />
                <SelectField
                    name="amount"
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                    floatingLabelText="Amount"
                >
                    <MenuItem value={5} primaryText="5" />
                    <MenuItem value={10} primaryText="10" />
                    <MenuItem value={15} primaryText="15" />
                    <MenuItem value={30} primaryText="30" />
                    <MenuItem value={50} primaryText="50" />
                </SelectField><br />
                {this.state.images.length > 0 ? (<ImageResults images={this.state.images} />) : <p>No Images found.</p>}
            </div>
        );
    }
}

export default Search;