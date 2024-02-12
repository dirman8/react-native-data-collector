import ManualCount2B from "../../components/manualcount/Page2B";
import {COLORS} from "../../constants/theme";
import { pilpresStorage } from '../../utils/storage';

export default function ManualCountPilpres2B() {
    return (
        <ManualCount2B tingkat="pilpres" storage={pilpresStorage} bgcolor={COLORS.grayPilpres} title="Input Pilpres"/>
    );
}