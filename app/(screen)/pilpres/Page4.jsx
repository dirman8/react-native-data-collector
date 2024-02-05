import ManualCount4 from "../../components/manualcount/Page4";
import {COLORS} from "../../constants/theme";
import { capres } from '../../constants/capres';

export default function ManualCountPilpres4() {
    const parties = capres;

    return (
        <ManualCount4 parties={parties} tingkat="pilpres" bgcolor={COLORS.grayPilpres} title="Input Pilpres"/>
    );
}