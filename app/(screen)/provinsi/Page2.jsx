import ManualCount2 from "../../components/manualcount/Page2";
import {COLORS} from "../../constants/theme";
import { provinsiStorage } from '../../utils/storage';

export default function ManualCountProvinsi2() {
    return (
        <ManualCount2 tingkat="provinsi" storage={provinsiStorage} bgcolor={COLORS.blueProvinsi}/>
    );
}