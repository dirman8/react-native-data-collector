import { useStateMachine } from "little-state-machine";
import updateForm from "../components/form/updateForm";

const ExtractObjectValues = () => {
	const { actions, state } = useStateMachine({ updateForm });

	return state;
};

export const extractState = ExtractObjectValues;
