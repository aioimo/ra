import React from 'react';
import { get, post } from '../../lib/request';

const createGame = payload => post('games', payload);
const fetchGames = () => get('games');

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: []
    };
  }

  async componentDidMount() {
    const res = await fetchGames();
    this.setState({ games: res.data });
  }

  createNewGame = async e => {
    e.preventDefault();
    const payload = { numberPlayers: 3 };
    await createGame(payload);
    const res = await fetchGames();
    this.setState({ games: res.data });
  };

  render() {
    const { games } = this.state;
    return (
      <div>
        <h1>Home Page</h1>
        <form onSubmit={this.createNewGame}>
          <button type='submit'>Create Game</button>
        </form>
        <div style={{ border: '1px solid black' }}>
          <ul>
            {games.map(game => {
              return (
                <li key={game._id}>
                  {game._id} - {game.status}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
