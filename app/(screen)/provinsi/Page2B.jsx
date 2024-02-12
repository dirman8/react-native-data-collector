import ManualCount2B from "../../components/manualcount/Page2B";
import {COLORS} from "../../constants/theme";
import { provinsiStorage } from '../../utils/storage';

export default function ManualCountProvinsi2B() {
    return (
        <ManualCount2B tingkat="provinsi" storage={provinsiStorage} bgcolor={COLORS.blueProvinsi} title="Input DPRD Provinsi"/>
    );
}