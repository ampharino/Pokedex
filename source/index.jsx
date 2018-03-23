import React, {Component} from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import axios from 'axios'
import 'semantic-ui-css/semantic.min.css';
import {Menu, Header} from 'semantic-ui-react'

// Include your new Components here
import Home from './components/Home/Home.jsx';
import Search from './components/Search/Search.jsx';
import Detailview from "./components/Detailview/Detailview.jsx";
import Gallery from './components/Gallery/Gallery.jsx'


// Include any new stylesheets here
// Note that components' stylesheets should NOT be included here.
// They should be 'require'd in their component class file.

require('./styles/main.scss');

class App extends Component {
    constructor(props){
        super(props);
        this.state={
            activeItem: 'home',
            pokemon:[],
            pokemondata:[],
            pokemontypes:[]

        }
        this.handleItemClick = this.handleItemClick.bind(this)
    }
    componentDidMount(){
        axios.get('https://pokeapi.co/api/v2/type/')
            .then(response=>{
                this.setState({pokemontypes:response.data.results});

            });
        axios.get('https://pokeapi.co/api/v2/pokemon/?limit=151')
            .then(response => {
                let arr = this.state.pokemondata;
                this.setState({pokemon:response.data.results});
                for( var i =0; i < this.state.pokemon.length; i+=3){
                    axios.get(this.state.pokemon[i]['url'])
                        .then(response =>{
                            arr.push(response.data);
                            arr.sort(function(a,b){
                                return Number(a.id)-Number(b.id)});
                            this.setState({
                                pokemondata:arr
                            });
                        })
                }
            })



    }
    handleItemClick(e,{name}){
        this.setState(
            {activeItem: name}
        )
    }
    render(){
        const {activeItem}= this.state;
        return(
            <div className = "container">

                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path ='/search' component={Search}/>
                    <Route path='/detail/:id' component={Detailview}/>
                    <Route path='/gallery/:type?' component={Gallery}/>
                </Switch>
                <div className = "titleheader">
                    <Header className='Title' as ='h1' >
                        GEN I <span className ='Fancy'>POKEDEX</span>
                    </Header>

                <Menu className = 'Menu' inverted pointing secondary borderless compact size='massive' >
                    <Menu.Item name = 'home'  active={activeItem ==='home'} onClick={this.handleItemClick} as={Link} to ='/'>
                        Home
                    </Menu.Item>
                    <Menu.Item name = 'search'  active={activeItem === 'search'} onClick={this.handleItemClick} as={Link}
                               to ={{pathname:'/search' , query:{pokemon:this.state.pokemon}}}>
                        Search
                    </Menu.Item>
                    <Menu.Item name = 'gallery'  active={activeItem === 'gallery'} onClick={this.handleItemClick} as={Link}
                               to ={{pathname:'/gallery/all/' , query:{pokemondata:this.state.pokemondata, pokemontypes:this.state.pokemontypes}}}>
                        Gallery
                    </Menu.Item>
                </Menu>
                </div>
            </div>
        )
    }
}
export default App


render((
        <Router>
            <App/>
        </Router>
    // Define your router and replace <Home /> with it!

),document.getElementById('app'))
