import SuccessPage from "../../components/manualcount/suceesspage";
import { provinsiStorage } from "../../utils/storage";

export default function SuccessPageKota() {
    return (
        <SuccessPage storage={provinsiStorage} datakey="provinsiStorage"/>
    )
}