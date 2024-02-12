import ManualCount1B from "../../components/manualcount/Page1B";
import {COLORS} from "../../constants/theme";
import { provinsiStorage } from '../../utils/storage';

export default function ManualCountProvinsi1B() {
    return (
        <ManualCount1B tingkat="provinsi" storage={provinsiStorage} bgcolor={COLORS.blueProvinsi} title="Input DPRD Provinsi"/>
    );
}