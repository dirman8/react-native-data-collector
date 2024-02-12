import ManualCount2B from "../../components/manualcount/Page2B";
import {COLORS} from "../../constants/theme";
import { pusatStorage } from '../../utils/storage';

export default function ManualCountPusat2B() {
    return (
        <ManualCount2B tingkat="pusat" storage={pusatStorage} bgcolor={COLORS.yellowPusat} title="Input DPR RI"/>
    );
}