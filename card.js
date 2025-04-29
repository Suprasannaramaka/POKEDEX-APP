function PokemonCard({ pokemon }) {
    return (
      <div className="card">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <h3>{pokemon.name}</h3>
        <p>ID: {pokemon.id}</p>
        <div className="types">
          {pokemon.types.map((typeInfo) => (
            <span key={typeInfo.type.name} className={`type ${typeInfo.type.name}`}>
              {typeInfo.type.name}
            </span>
          ))}
        </div>
      </div>
    );
  }
  
  export default PokemonCard;
  