import SuccessPage from "../../components/manualcount/suceesspage";
import { pilpresStorage } from "../../utils/storage";
import { capres } from '../../constants/capres';

export default function SuccessPagePilpres() {
    return (
        <SuccessPage capres={capres} tingkat="pilpres" storage={pilpresStorage} datakey="statuspilpres"/>
    )
}