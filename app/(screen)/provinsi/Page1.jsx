import ManualCount1 from "../../components/manualcount/Page1";
import {COLORS} from "../../constants/theme";
import { provinsiStorage } from '../../utils/storage';

export default function ManualCountProvinsi1() {
    return (
        <ManualCount1 tingkat="provinsi" storage={provinsiStorage} bgcolor={COLORS.blueProvinsi} title="Input DPRD Provinsi"/>
    );
}