import "./App.css";
import { CastObject, casts } from "./staics/casts";

function App() {
  let timer = 0;

  const rotation = Object.values(casts).reduce(
    (acc, cast) => {
      const currTimer = timer;
      timer += cast.cast_time || cast.channal || (cast.gcd ? 1.5 : 0);
      return [
      ...acc,
      {
        ...cast,
        timer: currTimer,
      },
    ]},
    [] as Array<CastObject & { timer: number}>
  );

  return (
    <>
      {rotation.map((cast) => <><div>{cast.timer} - {cast.name}</div></>)}
    </>
  );
}

export default App;
