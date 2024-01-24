import IdentitasTps from "../../components/manualcount/identitasTps";
import ManualCount1 from "../../components/manualcount/Page1";
import {COLORS} from "../../constants/theme";

export default function IdentitasTpsKota({navigation}) {
    return (
        <IdentitasTps tingkat="kota" bgcolor={COLORS.greenKota} title="Input DPRD Kota Surabaya"/>
    );
}