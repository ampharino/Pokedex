import React, { Component } from 'react'
import axios from 'axios'
import {Image, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import styles from './Gallery.scss'

function sortSprites(a,b){
    let x =  a.slice(a.length - 7, a.length-4);
    while (x[0] < '0' || x[0] > '9') {
        x = x.slice(1, x.length);
    }
    let y =  b.slice(b.length - 7, b.length-4);
    while (y[0] < '0' || y[0] > '9') {
        y = y.slice(1, y.length);
    }
    return Number(x)-Number(y)
}

class Gallery extends Component{
    constructor(props){
        super(props)
        this.state={
            pokemonsprites:[],
            currpokemonsprites:[],
            pokemontypes:[],

        }
    }

    componentDidMount(){
        this.setState({
            pokemontypes:this.props.location.query.pokemontypes
        });
        let arr = [];
        for( var i =0; i < this.props.location.query.pokemondata.length; i++){
            arr.push(this.props.location.query.pokemondata[i]['sprites']['front_default']);
            arr.sort(sortSprites)
            this.setState({
                pokemonsprites:arr
            });

        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            pokemontypes:nextProps.location.query.pokemontypes
        });
        let arr = [];
        for( var i =0; i < nextProps.location.query.pokemondata.length; i++){
            arr.push(nextProps.location.query.pokemondata[i]['sprites']['front_default']);
            arr.sort(sortSprites)
            this.setState({
                pokemonsprites:arr
            });

        }
        this.setState({currpokemonsprites:[]})
        let arr3 = [];
        if(nextProps.match.params.type === 'all'){
            arr3 = this.state.pokemonsprites;
            this.setState({
                currpokemonsprites:arr3
            })
        }
        else{
             for(var i =0; i < nextProps.location.query.pokemondata.length; i++){
                for(var j=0; j < nextProps.location.query.pokemondata[i]['types'].length; j++){
                    if(nextProps.location.query.pokemondata[i]['types'][j]['type']['name'].toLowerCase().includes(nextProps.match.params.type)){
                        arr3.push(this.state.pokemonsprites[i]);
                        this.setState({currpokemonsprites:arr3});
                        break;
                }
            }

        }}
    }
    render() {
        let output;
        if (this.props.match.params.type === 'all') {
            output = this.state.pokemonsprites.map(val => {
                let id = val.slice(val.length - 7, val.length - 4);
                while (id[0] < '0' || id[0] > '9') {
                    id = id.slice(1, id.length);
                }

                return (
                    <Image shape='rounded' key={val} src={val} as={Link} to={"/detail/" + id + '/'}/>
                )
            })
        }
        else {
            output = this.state.currpokemonsprites.map(val => {
                let id = val.slice(val.length - 7, val.length - 4);
                while (id[0] < '0' || id[0] > '9') {
                    id = id.slice(1, id.length);
                }

                return (
                    <Image shape='rounded' key={val} src={val} as={Link} to={"/detail/" + id + '/'  }/>
                )
            })
        }
        console.log(this.props.location.query.pokemontypes);
        let filters= this.state.pokemontypes.map(val=>{
            return(
                <Button className = {val['name']} key={val['name']} as={Link}
                        to={{pathname:'/gallery/'+val['name'], query:{pokemondata:this.props.location.query.pokemondata,
                            pokemontypes:this.props.location.query.pokemontypes}}}>
                    {val['name']}
                </Button>
            )
        })

        return(
            <div className = 'Gallery'>
                <Button active={this.props.match.params.type === 'all'}inverted as={Link}
                        to={{pathname:'/gallery/all', query:{pokemondata:this.props.location.query.pokemondata,
                            pokemontypes:this.props.location.query.pokemontypes}}}>
                    All
                </Button>
                {filters}
                <Image.Group size = 'small'>
                    {output}
                </Image.Group>
            </div>
        )
    }
}
export default Gallery

Gallery.propTypes = {
    pokemondata:PropTypes.object,
    pokemontypes:PropTypes.object
}

