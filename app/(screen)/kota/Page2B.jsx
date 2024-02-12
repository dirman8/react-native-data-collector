import ManualCount2B from "../../components/manualcount/Page2B";
import {COLORS} from "../../constants/theme";
import { kotaStorage } from '../../utils/storage';

export default function ManualCountKota2B() {
    return (
        <ManualCount2B tingkat="kota" storage={kotaStorage} bgcolor={COLORS.greenKota} title="Input DPRD Kota Surabaya"/>
    );
}