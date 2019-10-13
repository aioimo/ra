import React from 'react';

const createGame = async ({ auth, payload }) => {
  const url = `${auth.api.apiRoot}/api/games`;

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      'auth-token': auth.getRawToken()
    }
  });

  if (!response.ok) {
    throw new Error(`API ERROR: ${response.statusText}`);
  }

  return await response.json();
};

const fetchGames = async ({ auth }) => {
  const url = `${auth.api.apiRoot}/api/games`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': auth.getRawToken()
    }
  });

  if (!response.ok) {
    throw new Error(`API ERROR: ${response.statusText}`);
  }

  return await response.json();
};

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: []
    };
  }

  async componentDidMount() {
    const { auth } = this.props;
    const res = await fetchGames({ auth });
    this.setState({ games: res.data });
  }

  createNewGame = async e => {
    e.preventDefault();
    const { auth } = this.props;
    const payload = { numberPlayers: 3 };
    await createGame({ auth, payload });
    const res = await fetchGames({ auth });
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
