import ManualCount1 from "../../components/manualcount/Page1";
import {COLORS} from "../../constants/theme";
import { pusatStorage } from '../../utils/storage';

export default function ManualCountPusat1() {
    return (
        <ManualCount1 tingkat="pusat" storage={pusatStorage} bgcolor={COLORS.yellowPusat} title="Input DPR RI"/>
    );
}