import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import {Form, Input, Select, List, Radio} from 'semantic-ui-react'
import PropTypes from 'prop-types';
import styles from './Search.scss'
import axios from 'axios'


const options =[
    {key:'nu', text:'Pokedex Number', value: 'number'},
    {key:'n', text: 'Name', value: 'name'}

]
function searching(term){
    return x=>{
        if(term === ''){
            return null;
        }
        else{
            return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
        }

    }
}
function sortName(a,b){
    var x = a.name.toLowerCase();
    var y = b.name.toLowerCase();
    return x < y ? -1 : x > y ? 1 : 0;
}
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchterm:'zzzzzzzzzzzzzzzzzzzz',
            sortby: 'number',
            order: 'ascending'
        }
        this.searchHandler = this.searchHandler.bind(this)
        this.dropdownHandler = this.dropdownHandler.bind(this)
        this.radioHandler = this.radioHandler.bind(this)
    }

    searchHandler(e){
            this.setState({searchterm:e.target.value});
    }
    dropdownHandler(e, data){
        this.setState({sortby:data['value']});
    }
    radioHandler(e, data){
        this.setState({order:data['value']});

    }
    componentWillReceiveProps(nextProps){

    }

  render() {
            let pokemonlist1 = this.props.location.query.pokemon.slice(0).filter(searching(this.state.searchterm)).map(val => {
                let id = val['url'].slice(val['url'].length - 4, val['url'].length - 1);
                while (id[0] < '0' || id[0] > '9') {
                    id = id.slice(1, id.length);
                }

                return (
                    <List.Item key={val['name']}>
                        <List.Content>
                            <List.Header as={Link} to={"/detail/" + id}>{val['name']}</List.Header>
                            <List.Description>Pokedex#:{id}</List.Description>
                        </List.Content>
                    </List.Item>
                )
            })
      let pokemonlist2 = this.props.location.query.pokemon.slice(0).reverse().filter(searching(this.state.searchterm)).map(val => {
          let id = val['url'].slice(val['url'].length - 4, val['url'].length - 1);
          while (id[0] < '0' || id[0] > '9') {
              id = id.slice(1, id.length);
          }

          return (
              <List.Item key={val['name']}>
                  <List.Content>
                      <List.Header as={Link} to={"/detail/" + id}>{val['name']}</List.Header>
                      <List.Description>Pokedex#:{id}</List.Description>
                  </List.Content>
              </List.Item>
          )
      })
      let pokemonlist3 = this.props.location.query.pokemon.slice(0).sort(sortName).filter(searching(this.state.searchterm)).map(val => {
          let id = val['url'].slice(val['url'].length - 4, val['url'].length - 1);
          while (id[0] < '0' || id[0] > '9') {
              id = id.slice(1, id.length);
          }
          return (
              <List.Item key={val['name']}>
                  <List.Content>
                      <List.Header as={Link} to={"/detail/" + id}>{val['name']}</List.Header>
                      <List.Description>Pokedex#:{id}</List.Description>
                  </List.Content>
              </List.Item>
          )
      })
      let pokemonlist4 = this.props.location.query.pokemon.slice(0).sort(sortName).reverse().filter(searching(this.state.searchterm)).map(val => {
          let id = val['url'].slice(val['url'].length - 4, val['url'].length - 1);
          while (id[0] < '0' || id[0] > '9') {
              id = id.slice(1, id.length);
          }
          return (
              <List.Item key={val['name']}>
                  <List.Content>
                      <List.Header as={Link} to={"/detail/" + id}>{val['name']}</List.Header>
                      <List.Description>Pokedex#:{id}</List.Description>
                  </List.Content>
              </List.Item>
          )
      })
      let pokemonlist = pokemonlist1;
      if(this.state.order === 'descending'){
          pokemonlist = pokemonlist2;
      }
      if(this.state.sortby === 'name'){
          pokemonlist = pokemonlist3;
          if(this.state.order === 'descending'){
              pokemonlist = pokemonlist4;
          }

      }


      return(
          <div className='Search'>
              <div className= 'Form'>
                <Form>
                    <Form.Field control={Input} placeholder ='Enter a pokemon' onChange={this.searchHandler}/>
                    <Form.Field label='Sort by' value={this.state.sortby} control={Select} options={options} onChange={this.dropdownHandler}/>
                    <Form.Field>
                        <Radio label='Ascending' value='ascending' checked={this.state.order === 'ascending'} onChange={this.radioHandler}/>
                    </Form.Field>
                    <Form.Field>
                        <Radio label='Descending' value='descending' checked={this.state.order === 'descending'} onChange={this.radioHandler}/>
                    </Form.Field>
                </Form>
              </div>
              <div className = 'Result'>
                 <List celled inverted>
                    {pokemonlist}
                </List>
              </div>


          </div>
      )
  }
}
export default Search
Search.propTypes = {
    pokemon: PropTypes.object
};