import ManualCount2 from "../../components/manualcount/Page2";
import {COLORS} from "../../constants/theme";
import { pusatStorage } from '../../utils/storage';

export default function ManualCountPusat2() {
    return (
        <ManualCount2 tingkat="pusat" storage={pusatStorage} bgcolor={COLORS.yellowPusat} title="Input DPR RI"/>
    );
}