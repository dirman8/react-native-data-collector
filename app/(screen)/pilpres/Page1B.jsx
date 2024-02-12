import ManualCount1B from "../../components/manualcount/Page1B";
import {COLORS} from "../../constants/theme";
import { pilpresStorage } from '../../utils/storage';

export default function ManualCountPilpres1B() {
    return (
        <ManualCount1B tingkat="pilpres" storage={pilpresStorage} bgcolor={COLORS.grayPilpres} title="Input Pilpres"/>
    );
}