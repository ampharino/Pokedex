import React, { Component } from 'react'
import axios from 'axios'
import {Grid, Image, Loader, List, Label, Button, Icon, Header} from 'semantic-ui-react'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import styles from'./Detailview.scss'

class Detailview extends Component{
    constructor(props){
        super(props);
        this.state={
            pokemonpic:'',
            pokemonname:'',
            pokemontypes:[],
            pokemonabilities:[],
            pokemonid:'',
            pokemondesc:'',
            pokemonspecies:''
        }
    }
    componentWillMount(){
       let promise= axios.get('https://pokeapi.co/api/v2/pokemon/'+ this.props.match.params.id + '/')
            .then(response => {
                console.log(response.data);
                this.setState({
                    pokemonpic: response.data['sprites']['front_default'],
                    pokemonname:response.data['name'],
                    pokemontypes:response.data['types'],
                    pokemonabilities:response.data['abilities'],
                    pokemonid:response.data['id']

                });
            })
        axios.get('https://pokeapi.co/api/v2/pokemon-species/'+ this.props.match.params.id + '/')
            .then(response=>{
                console.log(response.data);
                this.setState({
                    pokemondesc:response.data['flavor_text_entries'][44]['flavor_text'],
                    pokemonspecies:response.data['genera'][0]['genus']
                });
            });
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.match.params.id != this.props.match.params.id){
            let promise= axios.get('https://pokeapi.co/api/v2/pokemon/'+ nextProps.match.params.id + '/')
                .then(response => {
                    console.log(response.data);
                    this.setState({
                        pokemonpic: response.data['sprites']['front_default'],
                        pokemonname:response.data['name'],
                        pokemontypes:response.data['types'],
                        pokemonabilities:response.data['abilities'],
                        pokemonid:response.data['id']
                    });

                })
            axios.get('https://pokeapi.co/api/v2/pokemon-species/'+ nextProps.match.params.id + '/')
                .then(response=>{
                    console.log(response.data);
                    this.setState({
                        pokemondesc:response.data['flavor_text_entries'][44]['flavor_text'],
                        pokemonspecies:response.data['genera'][0]['genus']
                    });
                });
        }
       else{
            console.log("no need to update");
        }

    }

    render() {
        let abilities = this.state.pokemonabilities.map(val =>{
            return(
                <List.Item key={val['ability']['name']}>
                    {val['ability']['name']}
                </List.Item>
            )
        })
        let types = this.state.pokemontypes.map(val=>{
            return(
                <Label className ={val['type']['name']}key={val['type']['name']}>
                    {val['type']['name']}
                </Label>
            )
        })
        let prev = (Number(this.props.match.params.id)-1).toString();
        let next = (Number(this.props.match.params.id)+1).toString();
        if(Number(prev) < 1){
            prev = '151';
        }
        if(Number(next) > 151){
            next = '1';
        }
        return (
            <div className = 'Detail'>
            <Grid celled>
                <Grid.Row className = 'Heading'>
                    <Grid.Column width={4} stretched>
                        <h2>{this.state.pokemonname}</h2>
                    </Grid.Column>
                    <Grid.Column width={2} stretched>

                    <h3>#{this.state.pokemonid}</h3>

                    </Grid.Column>
                    <Grid.Column width={4}>
                        {types}
                    </Grid.Column>
                    <Grid.Column width={6}>
                        {this.state.pokemonspecies} POKéMON
                    </Grid.Column>

                </Grid.Row>
                <Grid.Row className = 'Content'>
                    <Grid.Column width={4} >
                        <Image fluid src={this.state.pokemonpic}/>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <List>
                        <h3>Abilities:</h3>
                        {abilities}
                        </List>
                    </Grid.Column>
                    <Grid.Column width={7} >
                        {this.state.pokemondesc}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
                <div className ='Left'>
                    <Button as={Link} to={"/detail/" + prev +'/'}>
                        Prev
                    </Button>

                </div>
                <div className = 'Right'>
                    <Button as={Link} to={"/detail/" + next + '/'}>
                       Next
                    </Button>


                </div>
            </div>
        )

    }

}
export default Detailview
