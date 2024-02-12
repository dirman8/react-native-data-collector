import ManualCount1B from "../../components/manualcount/Page1B";
import {COLORS} from "../../constants/theme";
import { pusatStorage } from '../../utils/storage';

export default function ManualCountKota1B() {
    return (
        <ManualCount1B tingkat="pusat" storage={pusatStorage} bgcolor={COLORS.yellowPusat} title="Input DPR RI"/>
    );
}