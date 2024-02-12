import ManualCount4 from "../../components/manualcount/Page4";
import {COLORS} from "../../constants/theme";
import { capres } from '../../constants/capres';
import { pilpresStorage } from '../../utils/storage';

export default function ManualCountPilpres4() {
    const parties = capres;

    return (
        <ManualCount4 parties={parties} tingkat="pilpres" storage={pilpresStorage} bgcolor={COLORS.grayPilpres} title="Input Pilpres"/>
    );
}