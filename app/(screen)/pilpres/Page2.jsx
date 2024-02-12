import ManualCount2 from "../../components/manualcount/Page2";
import {COLORS} from "../../constants/theme";
import { pilpresStorage } from '../../utils/storage';

export default function ManualCountPilpres2() {
    return (
        <ManualCount2 tingkat="pilpres" storage={pilpresStorage} bgcolor={COLORS.grayPilpres} title="Input Pilpres"/>
    );
}