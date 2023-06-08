import React, { useContext, useEffect, useState } from "react";
import { HexagonalContext } from "../../contexts/Hexagonal";
import { LoadingContext } from "../../contexts/Loading";
import { getNeighbor } from "../../actions/hexagonal";

interface Props {
  hexagonalName: string;
}

interface HexagonalNeighbor {
  border_number: number;
  name: string;
}
const HexagonNeighbors: React.FC<Props> = ({ hexagonalName }) => {
  const [neighbors, setNeighbors] = useState<HexagonalNeighbor[]>([]);
  //Get the state and the dispatch properties form the HexagonalContext and rename them to hexagonalState and hexagonalDispatch resp.
  const { state: hexagonalState, dispatch: hexagonalDispatch } =
    useContext(HexagonalContext);
  //Get the state and the dispatch properties form the LoadingContext and rename them to loadingState and loadingDispatch resp.
  const { dispatch: loadingDispatch } = useContext(LoadingContext);

  useEffect(() => {
    fetchNeighbors(hexagonalName);
  }, [hexagonalName]);

  const fetchNeighbors = async (hexagonName: string) => {
    await getNeighbor(hexagonName)(hexagonalDispatch, loadingDispatch);
  };

  useEffect(() => {
  
    setNeighbors(hexagonalState.getNeighbor);
  }, [hexagonalState.getNeighbor]);

  return (
    <div>
      <h3>Neighbors of {hexagonalName}</h3>
      <ul>
        {neighbors?.map((neighbor) => (
          <li key={neighbor.name}>
            Border {neighbor.border_number}: {neighbor.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HexagonNeighbors;
