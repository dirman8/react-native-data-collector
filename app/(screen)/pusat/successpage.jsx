import SuccessPage from "../../components/manualcount/suceesspage";
import { pusatStorage } from "../../utils/storage";

export default function SuccessPageKota() {
    return (
        <SuccessPage storage={pusatStorage} datakey="pusatStorage"/>
    )
}