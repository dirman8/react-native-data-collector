import SuccessPage from "../../components/manualcount/suceesspage";
import { pilpresStorage } from "../../utils/storage";

export default function SuccessPageKota() {
    return (
        <SuccessPage storage={pilpresStorage} datakey="pilpresStorage"/>
    )
}