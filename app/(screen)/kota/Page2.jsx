import ManualCount2 from "../../components/manualcount/Page2";
import {COLORS} from "../../constants/theme";
import { kotaStorage } from '../../utils/storage';

export default function ManualCountKota2() {
    return (
        <ManualCount2 tingkat="kota" storage={kotaStorage} bgcolor={COLORS.greenKota} title="Input DPRD Kota Surabaya"/>
    );
}