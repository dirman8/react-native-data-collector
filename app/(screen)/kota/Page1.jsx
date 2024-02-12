import ManualCount1 from "../../components/manualcount/Page1";
import {COLORS} from "../../constants/theme";
import { kotaStorage } from '../../utils/storage';

export default function ManualCountKota1() {
    return (
        <ManualCount1 tingkat="kota" storage={kotaStorage} bgcolor={COLORS.greenKota} title="Input DPRD Kota Surabaya"/>
    );
}