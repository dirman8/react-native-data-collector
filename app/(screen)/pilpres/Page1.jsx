import ManualCount1 from "../../components/manualcount/Page1";
import {COLORS} from "../../constants/theme";
import { pilpresStorage } from '../../utils/storage';

export default function ManualCountPilpres3() {
    return (
        <ManualCount1 tingkat="pilpres" storage={pilpresStorage} bgcolor={COLORS.grayPilpres} title="Input Pilpres"/>
    );
}