import IdentitasTps from "../../components/manualcount/identitasTps";
import {COLORS} from "../../constants/theme";

export default function IdentitasTpsProvinsi() {
    return (
        <IdentitasTps tingkat="provinsi" bgcolor={COLORS.blueProvinsi} title="Input DPRD Provinsi"/>
    );
}