import React, { useContext, useState } from "react";
import { TextField } from "../common/TextField";
import { Button } from "../common/Button";
import "../styles/create-hexagonal.css";
import { HexagonalContext } from "../../contexts/Hexagonal";
import { LoadingContext } from "../../contexts/Loading";
import { addHexagon } from "../../actions/hexagonal";

interface IHexagonal {
  hexagonalName: string;
  borderNumber: number;
  neighborName: string;
}
//CreateHexagonal component
export const CreateHexagonal: React.FC = () => {
  const [hexagonal, setHexagonal] = useState<IHexagonal>({
    hexagonalName: "",
    borderNumber: 0,
    neighborName: "",
  });
  const [error, setError] = useState<string>("");
  //Get the state and the dispatch properties form the HexagonalContext and rename them to hexagonalState and hexagonalDispatch resp.
  const { state: hexagonalState, dispatch: hexagonalDispatch } =
    useContext(HexagonalContext);
  //Get the state and the dispatch properties form the LoadingContext and rename them to loadingState and loadingDispatch resp.
  const { dispatch: loadingDispatch } = useContext(LoadingContext);

  const handleChange = (e: any) => {
    setError("");
    setHexagonal({
      ...hexagonal,
      [e.target.name]: e.target.value,
    });
  };

  //handleClick method that is executed when the add button is clicked
  const handleClick = () => {
    if (
      hexagonal.hexagonalName &&
      hexagonal.borderNumber 
      // hexagonal.neighborName
    ) {
      addHexagon(
        hexagonal.hexagonalName,
        hexagonal.neighborName,
        hexagonal.borderNumber
      )(hexagonalDispatch, loadingDispatch);
    } else {
      setError("Please fill all details");
    }
  };

  return (
    <div className="hexagonal-container">
      <div className="form">
        <h2>Add Hexagon</h2>
        <div className="form-content">
          <TextField
            value={hexagonal.hexagonalName}
            placeholder="Enter hexagonal name"
            label="Hexagonal Name"
            handleChange={handleChange}
            id="hexagonal_name_input_field"
            type="text"
            name="hexagonalName"
          />
          <TextField
            value={hexagonal.neighborName}
            placeholder="Enter neighbor name"
            label="Neighbor Name"
            handleChange={handleChange}
            id="neighbor_name_input_field"
            type="text"
            name="neighborName"
          />
          <TextField
            value={hexagonal.borderNumber}
            placeholder="Enter Border Number"
            label="Border"
            handleChange={handleChange}
            id="border_number_input_field"
            type="number"
            name="borderNumber"
          />

          <Button
            value="Add hexagonal"
            handleClick={handleClick}
            id="add_hexagonal_button"
          />

          {error !== "" && <p className="hexagonal-error">{error}</p>}
          {hexagonalState.addHexagonalMessageError !== "" && (
            <p className="hexagonal-error">
              {hexagonalState.addHexagonalMessageError}
            </p>
          )}

          {hexagonalState.addHexagonalMessage !== "" && (
            <p className="hexagonal-error">
              {hexagonalState.addHexagonalMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
