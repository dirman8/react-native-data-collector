import ManualCount1B from "../../components/manualcount/Page1B";
import {COLORS} from "../../constants/theme";
import { kotaStorage } from '../../utils/storage';

export default function ManualCountKota1B() {
    return (
        <ManualCount1B tingkat="kota" storage={kotaStorage} bgcolor={COLORS.greenKota} title="Input DPRD Kota Surabaya"/>
    );
}